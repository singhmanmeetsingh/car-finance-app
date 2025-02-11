'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@/context/FormContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

// Animation variants for the entire step
const containerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      // When parent animates in, trigger child animations in sequence
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 }
  }
};

// Animation variants for individual elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

// Financing qualifications that will be displayed in the grid
const qualifications = [
  { text: 'Bad credit', category: 'credit' },
  { text: '$0 Down', category: 'payment' },
  { text: 'Repossessions', category: 'history' },
  { text: 'No credit', category: 'credit' },
  { text: 'Bankruptcy', category: 'history' },
  { text: 'Low payment', category: 'payment' },
  { text: 'Collections', category: 'history' },
  { text: 'Late payments', category: 'payment' }
];

export function BudgetStep() {
  const { formState, setFormState, nextStep } = useForm();

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleBudgetChange = (values: number[]) => {
    setFormState({ budget: values[0] });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-2xl font-semibold mb-4">What&apos;s Your Budget</h2>
        <div className="text-3xl font-bold text-red-500">
          {formatBudget(formState.budget)} / Month
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-8">
          <Slider
            defaultValue={[formState.budget]}
            max={800}
            min={150}
            step={10}
            onValueChange={handleBudgetChange}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>{formatBudget(150)}</span>
            <span>{formatBudget(500)}</span>
            <span>{formatBudget(800)}</span>
          </div>
        </Card>
      </motion.div>

      <motion.p variants={itemVariants} className="text-center text-sm text-gray-500">
        No obligation. No commitments. Only FREE offers.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {qualifications.map((qual) => (
          <motion.div
            key={qual.text}
            variants={itemVariants}
            className="flex items-center space-x-2 text-sm"
          >
            <div className="flex-shrink-0">
              <Check className="w-4 h-4 text-red-500" />
            </div>
            <span className="text-gray-700">{qual.text}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button
          onClick={nextStep}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
        >
          Continue to Vehicle Selection
        </Button>
      </motion.div>

      <motion.p variants={itemVariants} className="text-center text-xs text-gray-400">
        Pre-qualified offers with no impact to your credit score
      </motion.p>
    </motion.div>
  );
}
