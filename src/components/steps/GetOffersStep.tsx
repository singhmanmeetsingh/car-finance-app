'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@/context/FormContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Home, DollarSign, Briefcase, Clock } from 'lucide-react';

// Income source options
const incomeSourceOptions = [
  { value: '', label: 'Select income source' },
  { value: 'employment', label: 'Employment Income' },
  { value: 'self_employment', label: 'Self Employment' },
  { value: 'social_security', label: 'Social Security' },
  { value: 'disability', label: 'Disability Benefits' },
  { value: 'retirement', label: 'Retirement/Pension' },
  { value: 'investments', label: 'Investment Income' },
  { value: 'alimony', label: 'Alimony/Child Support' },
  { value: 'unemployment', label: 'Unemployment Benefits' },
  { value: 'other', label: 'Other Income Source' }
];

// Animation variants
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

// Custom Select component
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }
>(({ className, error, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={`
        w-full h-10 px-3 py-2
        text-gray-900 placeholder-gray-400
        bg-white border rounded-md
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
        ${error ? 'border-red-500' : 'border-gray-300'}
        ${className}
      `}
      {...props}
    />
    {error && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
));
Select.displayName = "Select";

export function GetOffersStep() {
  const { formState, updateGetOffers, validateGetOffers, prevStep, nextStep } = useForm();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateGetOffers({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle residence type selection
  const handleResidenceTypeSelect = (type: 'rent' | 'own') => {
    updateGetOffers({ residenceType: type });
    if (errors.residenceType) {
      setErrors(prev => ({ ...prev, residenceType: '' }));
    }
  };

  // Format currency input
  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers ? `$${parseInt(numbers).toLocaleString()}` : '';
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateGetOffers();

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      nextStep();
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'There was an error submitting your application. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={formElementVariants} className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Your 30 Seconds away</h2>
        <p className="text-gray-600 mt-2">
          We will send your offers as soon as you complete this final step
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="space-y-6">
            {/* Birth Date */}
            <motion.div variants={formElementVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-red-500" />
                <label htmlFor="birthDate" className="font-medium">
                  When is your birthday?
                </label>
              </div>
              <Input
                id="birthDate"
                type="date"
                name="birthDate"
                value={formState.getOffers.birthDate}
                onChange={handleChange}
                error={errors.birthDate}
                max={new Date().toISOString().split('T')[0]}
              />
            </motion.div>

            {/* Residence Type */}
            <motion.div variants={formElementVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <Home className="w-4 h-4 text-red-500" />
                <label className="font-medium">Do you rent or own?</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  onClick={() => handleResidenceTypeSelect('rent')}
                  className={`py-2 ${formState.getOffers.residenceType === 'rent'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Rent
                </Button>
                <Button
                  type="button"
                  onClick={() => handleResidenceTypeSelect('own')}
                  className={`py-2 ${formState.getOffers.residenceType === 'own'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Own
                </Button>
              </div>
              {errors.residenceType && (
                <p className="text-red-500 text-sm mt-1">{errors.residenceType}</p>
              )}
            </motion.div>

            {/* Residence Duration */}
            <motion.div variants={formElementVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-red-500" />
                <label className="font-medium">How long have you lived there?</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  name="residenceYears"
                  placeholder="Years"
                  min="0"
                  max="99"
                  value={formState.getOffers.residenceYears}
                  onChange={handleChange}
                  error={errors.residenceYears}
                />
                <Input
                  type="number"
                  name="residenceMonths"
                  placeholder="Months"
                  min="0"
                  max="11"
                  value={formState.getOffers.residenceMonths}
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            {/* Income Source */}
            <motion.div variants={formElementVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <Briefcase className="w-4 h-4 text-red-500" />
                <label htmlFor="incomeSource" className="font-medium">
                  What is your primary source of income?
                </label>
              </div>
              <Select
                id="incomeSource"
                name="incomeSource"
                value={formState.getOffers.incomeSource}
                onChange={handleChange}
                error={errors.incomeSource}
              >
                {incomeSourceOptions.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.value === ''}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
            </motion.div>

            {/* Income Duration */}
            <motion.div variants={formElementVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-red-500" />
                <label className="font-medium">How long have you received this income?</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  name="incomeYears"
                  placeholder="Years"
                  min="0"
                  max="99"
                  value={formState.getOffers.incomeYears}
                  onChange={handleChange}
                  error={errors.incomeYears}
                />
                <Input
                  type="number"
                  name="incomeMonths"
                  placeholder="Months"
                  min="0"
                  max="11"
                  value={formState.getOffers.incomeMonths}
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            {/* Monthly Income */}
            <motion.div variants={formElementVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-4 h-4 text-red-500" />
                <label className="font-medium">How much do you bring in monthly?</label>
              </div>
              <Input
                type="text"
                name="monthlyIncome"
                placeholder="Monthly income before deductions"
                value={formState.getOffers.monthlyIncome}
                onChange={(e) => {
                  const formatted = formatCurrency(e.target.value);
                  updateGetOffers({ monthlyIncome: formatted });
                }}
                error={errors.monthlyIncome}
              />
              <p className="text-sm text-gray-500 mt-1">
                Include all sources before deductions
              </p>
            </motion.div>
          </div>
        </Card>

        {/* Terms and Privacy Notice */}
        <motion.p variants={formElementVariants} className="text-sm text-gray-600">
          By clicking on the finalize button, I confirm my agreement to Get Your Car Approved{' '}
          <a href="#" className="text-red-500 hover:underline">Terms of Use</a>
          {' '}|{' '}
          <a href="#" className="text-red-500 hover:underline">Privacy Policy</a>
          {' '}and my consent to Get Your Car Approved obtaining credit reports about me to facilitate my application for a car loan.
        </motion.p>

        {/* Error Message */}
        {errors.submit && (
          <motion.p variants={formElementVariants} className="text-red-500 text-center">
            {errors.submit}
          </motion.p>
        )}

        {/* Action Buttons */}
        <motion.div variants={formElementVariants} className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            onClick={prevStep}
            className="w-full sm:w-1/2 bg-red-500 hover:bg-gray-600 text-white py-6 text-lg font-semibold"
          >
            Go Back
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-1/2 bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
          >
            {loading ? 'Processing...' : 'Finalize My CAR Approval Now'}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
