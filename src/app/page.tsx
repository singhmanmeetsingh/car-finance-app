
'use client';
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StepIndicator } from "@/components/layout/StepIndicator";
import { StepContent } from "@/components/StepConent";
import { FormProvider } from "@/context/FormContext";

export default function Home() {
  return (
    <FormProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              Buy Your Vehicle 100% Online
            </h1>
            <StepIndicator />
            <StepContent />
          </div>
        </main>
        <Footer />

      </div>
    </FormProvider>
  );
} 
