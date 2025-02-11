'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@/context/FormContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Mail, User, Phone } from 'lucide-react';

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 }
  }
};

// Animation variants for form elements
const formElementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

// Interface for form errors
interface FormErrors {
  address?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export function LocationStep() {
  // Get form context
  const { formState, setFormState, nextStep, prevStep } = useForm();

  // Local state for form data and errors
  const [formData, setFormData] = useState({
    address: formState.location.address || '',
    email: formState.location.email || '',
    firstName: formState.location.firstName || '',
    lastName: formState.location.lastName || '',
    phone: formState.location.phone || ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isManualAddress, setIsManualAddress] = useState(false);

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length < 4) return phone;
    if (phone.length < 7) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: undefined }));

    // Handle phone number formatting
    if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhoneNumber(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length !== 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setFormState({ location: formData });
      nextStep();
    }
  };
  const handleGoBack = () => {
    setTimeout(prevStep, 300);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-2xl mx-auto"
    >
      {/* Header Section */}
      <motion.div variants={formElementVariants} className="text-center mb-8">
        <h2 className="text-2xl font-semibold">You&apos;re Almost Done!</h2>
        <h3 className="text-xl mt-4">Where are you located?</h3>
        <p className="text-gray-600 mt-2">
          Let us know your address so we can find the best vehicles in your area
          that match your budget of ${formState.budget}/month
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            {/* Address Section */}
            <motion.div variants={formElementVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="font-medium">Your Address</span>
              </div>
              <Input
                placeholder={isManualAddress ? "Enter your address manually" : "Start typing your address"}
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
              />
              <Button
                type="button"
                variant="link"
                className="text-blue-500 text-sm mt-2"
                onClick={() => setIsManualAddress(!isManualAddress)}
              >
                {isManualAddress
                  ? "Use address lookup"
                  : "I don't see my address. Let me type it in."
                }
              </Button>
            </motion.div>

            {/* Email Section */}
            <motion.div variants={formElementVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span className="font-medium">Email Address</span>
              </div>
              <Input
                type="email"
                placeholder="Where should we send your approval offers?"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </motion.div>

            {/* Name Section */}
            <motion.div variants={formElementVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-red-500" />
                <span className="font-medium">Your Name</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                <Input
                  placeholder="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
              </div>
            </motion.div>

            {/* Phone Section */}
            <motion.div variants={formElementVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span className="font-medium">Phone Number</span>
              </div>
              <Input
                placeholder="(___) ___-____"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </motion.div>
          </div>
        </Card>

        {/* Submit Button */}
        <motion.div variants={formElementVariants} className='flex flex-col sm:flex-row gap-4'>
          <Button

            onClick={() => handleGoBack()}
            className="w-full sm:w-1/2 bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
          >
            Go Back
          </Button>


          <Button
            type="submit"
            className="w-full sm:w-1/2 bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
          >
            Get Your Offers
          </Button>
        </motion.div>
      </form>

      {/* Privacy Notice */}
      <motion.p
        variants={formElementVariants}
        className="text-center text-xs text-gray-400 mt-4"
      >
        By continuing, you agree to our Terms of Service and Privacy Policy
      </motion.p>
    </motion.div>
  );
}
