'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, ...props }, ref) => {
    const id = React.useId();

    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}

        <input
          id={id}
          type={type}
          className={cn(
            // Base styles
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
            // Focus styles
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
            // Error styles
            error && "border-red-500",
            // Disabled styles
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Custom classes
            className
          )}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />

        {error && (
          <div
            id={`${id}-error`}
            className="text-red-500 text-sm mt-1"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
