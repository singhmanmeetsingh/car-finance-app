'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from '@/context/FormContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Truck, ChevronRight } from 'lucide-react';

// Define vehicle types with their properties for consistent usage
const vehicles = [
  {
    id: 'car',
    title: 'I Want a Car',
    icon: Car,
    description: 'Sedans, Coupes, Sports Cars',
  },
  {
    id: 'truck',
    title: 'I Want a Truck',
    icon: Truck,
    description: 'Pickup Trucks, Work Trucks',
  },
  {
    id: 'suv',
    title: 'I Want an SUV',
    icon: Truck,
    description: 'SUVs, Crossovers',
  },
  {
    id: 'van',
    title: 'I Want a Van',
    icon: Truck,
    description: 'Minivans, Cargo Vans',
  },
] as const;

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  tap: {
    scale: 0.98
  }
};

export function VehicleStep() {
  const { formState, setFormState, nextStep, prevStep } = useForm();

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(
    formState.vehicleType || null
  );

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setFormState({ vehicleType: vehicleId });
    setTimeout(nextStep, 300);
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
      className="space-y-8"
    >
      <motion.div
        variants={cardVariants}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold mb-2">What are you looking for?</h2>
        <p className="text-gray-500">Select the type of vehicle you're interested in</p>
      </motion.div>

      {/* Vehicle Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Card
                onClick={() => handleVehicleSelect(vehicle.id)}
                className={`p-6 cursor-pointer transition-colors ${selectedVehicle === vehicle.id
                  ? 'border-2 border-red-500 bg-red-50'
                  : 'hover:border-red-200'
                  }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${selectedVehicle === vehicle.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100'
                    }`}>
                    <vehicle.icon size={24} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{vehicle.title}</h3>
                    <p className="text-sm text-gray-500">{vehicle.description}</p>
                  </div>
                  <ChevronRight
                    className={`transition-opacity ${selectedVehicle === vehicle.id
                      ? 'opacity-100 text-red-500'
                      : 'opacity-0'
                      }`}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Quick Approval Button */}
      <motion.div variants={cardVariants} className='flex flex-col sm:flex-row gap-4'>
        <Button
          onClick={() => handleGoBack()}
          className="w-full sm:w-1/2 bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
        >
          Go Back
        </Button>

        <Button
          onClick={() => handleVehicleSelect('any')}
          className="w-full sm:w-1/2 bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
        >
          Get $0 Down Approval Offers Today!
        </Button>
      </motion.div>

      {/* Inventory Update Notice */}
      <motion.p
        variants={cardVariants}
        className="text-center text-sm text-gray-500"
      >
        Inventory updated {new Date().toLocaleDateString()}
      </motion.p>
    </motion.div>
  );
}
