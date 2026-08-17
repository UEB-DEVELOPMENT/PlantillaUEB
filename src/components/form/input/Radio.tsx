"use client";
import React from "react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@ueb-development/ui/components/radio-group";

interface RadioProps {
  id: string; // Unique ID for the radio button
  name: string; // Radio group name
  value: string; // Value of the radio button
  checked: boolean; // Whether the radio button is checked
  label: string; // Label for the radio button
  onChange: (value: string) => void; // Handler for value change
  className?: string; // Optional additional classes
  disabled?: boolean; // Optional disabled state for the radio button
}

const Radio: React.FC<RadioProps> = ({
  id,
  name,
  value,
  checked,
  label,
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <RadioGroup
      name={name}
      value={checked ? value : undefined}
      onValueChange={(next) => next === value && onChange(value)}
      className={`flex items-center gap-3 ${className}`}
    >
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-center gap-3 text-sm font-medium ${
          disabled
            ? "cursor-not-allowed text-muted-foreground"
            : "text-foreground"
        }`}
      >
        <RadioGroupItem id={id} value={value} disabled={disabled} />
        {label}
      </label>
    </RadioGroup>
  );
};

export default Radio;