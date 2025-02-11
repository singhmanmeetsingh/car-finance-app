
import { useForm } from '@/context/FormContext';
import { motion } from 'framer-motion';

export function StepIndicator() {
  const { formState } = useForm();

  const steps = [
    { number: 1, name: 'Budget', active: formState.step >= 1 },
    { number: 2, name: 'Vehicle', active: formState.step >= 2 },
    { number: 3, name: 'Location', active: formState.step >= 3 },
    { number: 4, name: 'Get Offers', active: formState.step >= 4 },
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-between relative">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center relative z-10"
          >
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${step.active
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-500'
                }`}
              animate={{
                scale: formState.step === step.number ? 1.1 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              {step.number}
            </motion.div>

            <span
              className={`mt-2 text-sm ${step.active
                ? 'text-red-500 font-medium'
                : 'text-gray-500'
                }`}
            >
              {step.name}
            </span>
          </div>
        ))}

        <div className="absolute top-4 left-0 h-0.5 bg-gray-200 w-full -z-10">
          <motion.div
            className="h-full bg-red-500"
            initial={{ width: "0%" }}
            animate={{
              width: `${((formState.step - 1) / (steps.length - 1)) * 100}%`
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
