"use client";
import React, { useState } from "react";
import {
  Select as UebSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ueb-development/ui/components/select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Seleccione una opción",
  onChange,
  className = "",
  defaultValue = "",
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  return (
    <UebSelect
      value={selectedValue || undefined}
      onValueChange={(value) => {
        setSelectedValue(value);
        onChange(value); // Trigger parent handler
      }}
    >
      <SelectTrigger className={`h-11 w-full rounded-lg ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </UebSelect>
  );
};

export default Select;