
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';


// Define the structure of our form data
interface FormState {
  step: number;
  budget: number;
  vehicleType: string;
  location: {
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}
interface FormContextType {
  formState: FormState;
  setFormState: (state: Partial<FormState>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const initialState: FormState = {
  step: 1,
  budget: 400,
  vehicleType: '',
  location: {
    address: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  },
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}


export function FormProvider({ children }: { children: ReactNode }) {
  const [formState, setFormStateInternal] = useState<FormState>(initialState);

  // Function to update form state
  const setFormState = (newState: Partial<FormState>) => {
    setFormStateInternal(prev => ({
      ...prev,
      ...newState,
    }));
  };

  // Navigation functions
  const nextStep = () => {
    setFormStateInternal(prev => ({
      ...prev,
      step: Math.min(prev.step + 1, 4),
    }));
  };

  const prevStep = () => {
    setFormStateInternal(prev => ({
      ...prev,
      step: Math.max(prev.step - 1, 1),
    }));
  };

  return (
    <FormContext.Provider value={{ formState, setFormState, nextStep, prevStep }}>
      {children}
    </FormContext.Provider>
  );
}
