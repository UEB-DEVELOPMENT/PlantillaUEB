import React, { FC, ReactNode } from "react";
import { Label as UebLabel } from "@ueb-development/ui/components/label";
import { twMerge } from "tailwind-merge";

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

const Label: FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <UebLabel
      htmlFor={htmlFor}
      className={twMerge("mb-1.5 block text-foreground", className)}
    >
      {children}
    </UebLabel>
  );
};

export default Label;