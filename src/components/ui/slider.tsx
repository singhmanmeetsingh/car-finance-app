'use client';

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

// Define the props that our slider can accept
interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  // Add formatLabel function to customize the label display
  formatLabel?: (value: number) => string;
  // Add showLabel prop to control label visibility
  showLabel?: boolean;
}

// Create the Slider component using React.forwardRef
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({
  className,
  min = 0,
  max = 100,
  step = 1,
  formatLabel = (value: number) => value.toString(),
  showLabel = true,
  ...props
}, ref) => {
  // Calculate the percentage for positioning the value label
  // const getPercentage = (value: number) => {
  //   return ((value - min) / (max - min)) * 100;
  // };

  return (
    <SliderPrimitive.Root
      ref={ref}
      min={min}
      max={max}
      step={step}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      {/* Slider Track */}
      <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-gray-100">
        {/* Slider Range (filled part) */}
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-red-500" />
      </SliderPrimitive.Track>

      {/* Slider Thumb */}
      {props.defaultValue?.map((value, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cn(
            "block h-5 w-5 rounded-full border-2 border-red-500 bg-white",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
            "disabled:pointer-events-none disabled:opacity-50",
            "transition-all hover:scale-110"
          )}
        >
          {/* Value Label */}
          {showLabel && (
            <div
              className={cn(
                "absolute -top-8 left-1/2 -translate-x-1/2",
                "bg-red-500 text-white px-2 py-1 rounded text-sm",
                "opacity-0 transition-opacity",
                "group-hover:opacity-100"
              )}
            >
              {formatLabel(value)}
            </div>
          )}
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = "Slider";

export { Slider };
