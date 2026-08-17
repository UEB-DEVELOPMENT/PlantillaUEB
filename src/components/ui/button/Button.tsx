import React, { ReactNode } from "react";
import { Button as UebButton } from "@ueb-development/ui/components/button";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Additional classes
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <UebButton
      variant={variant === "outline" ? "outline" : "default"}
      size={size === "sm" ? "sm" : "default"}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </UebButton>
  );
};

export default Button;