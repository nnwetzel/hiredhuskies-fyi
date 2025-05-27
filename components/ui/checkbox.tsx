import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={`w-4 h-4 text-black border-gray-300 rounded ${className}`}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox";

export { Checkbox };