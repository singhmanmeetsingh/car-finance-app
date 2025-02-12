
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
  getOffers: {
    birthDate: string;
    residenceType: 'rent' | 'own' | '';
    residenceYears: string;
    residenceMonths: string;
    incomeSource: string;
    incomeYears: string;
    incomeMonths: string;
    monthlyIncome: string;
  };
}
interface FormContextType {
  formState: FormState;
  setFormState: (state: Partial<FormState>) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateGetOffers: (data: Partial<FormState['getOffers']>) => void;
  validateGetOffers: () => { isValid: boolean; errors: Record<string, string> };
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
  getOffers: {
    birthDate: '',
    residenceType: '',
    residenceYears: '',
    residenceMonths: '',
    incomeSource: '',
    incomeYears: '',
    incomeMonths: '',
    monthlyIncome: '',
  }
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

  console.log("formState", formState)

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
      step: Math.min(prev.step + 1, 5),
    }));
  };

  const prevStep = () => {
    setFormStateInternal(prev => ({
      ...prev,
      step: Math.max(prev.step - 1, 1),
    }));
  };
  const updateGetOffers = (data: Partial<FormState['getOffers']>) => {
    setFormStateInternal(prev => ({
      ...prev,
      getOffers: {
        ...prev.getOffers,
        ...data
      }
    }));
  };


  const validateGetOffers = () => {
    const errors: Record<string, string> = {};
    const { getOffers } = formState;

    // Birth date validation
    if (!getOffers.birthDate) {
      errors.birthDate = 'Birth date is required';
    } else {
      const birthDate = new Date(getOffers.birthDate);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        errors.birthDate = 'Must be at least 18 years old';
      } else if (age > 100) {
        errors.birthDate = 'Please enter a valid birth date';
      }
    }

    // Residence validation
    if (!getOffers.residenceType) {
      errors.residenceType = 'Please select if you rent or own';
    }

    if (!getOffers.residenceYears && !getOffers.residenceMonths) {
      errors.residenceYears = 'Please specify how long you have lived there';
    }

    // Income validation
    if (!getOffers.incomeSource) {
      errors.incomeSource = 'Please select your income source';
    }

    if (!getOffers.incomeYears && !getOffers.incomeMonths) {
      errors.incomeYears = 'Please specify how long you have received this income';
    }

    // Monthly income validation
    if (!getOffers.monthlyIncome) {
      errors.monthlyIncome = 'Monthly income is required';
    } else {
      const income = parseInt(getOffers.monthlyIncome.replace(/\D/g, ''));
      if (isNaN(income) || income < 100) {
        errors.monthlyIncome = 'Please enter a valid monthly income';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  return (
    <FormContext.Provider value={{
      formState, setFormState, nextStep, prevStep, updateGetOffers, validateGetOffers
    }}>
      {children}
    </FormContext.Provider>
  );
}
