'use client';

import { AnimatePresence } from 'framer-motion';
import { useForm } from '@/context/FormContext';
import { BudgetStep } from './steps/BudgetStep';
import { VehicleStep } from './steps/VehicleStep';
import { LocationStep } from './steps/LocationStep';
// import { GetOffersStep } from './steps/GetOffersStep';

export function StepContent() {
  const { formState } = useForm();

  return (
    <AnimatePresence mode="wait">
      {formState.step === 1 && <BudgetStep key="budget" />}
      {formState.step === 2 && <VehicleStep key="vehicle" />}
      {formState.step === 3 && <LocationStep key="location" />}
      {/* {formState.step === 4 && <GetOffersStep key="offers" />} */}
    </AnimatePresence>
  );
}
