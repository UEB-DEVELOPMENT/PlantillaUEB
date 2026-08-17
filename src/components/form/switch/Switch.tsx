"use client";
import React, { useState } from "react";
import { Switch as UebSwitch } from "@ueb-development/ui/components/switch";

interface SwitchProps {
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  color?: "blue" | "gray"; // Added prop to toggle color theme
}

const Switch: React.FC<SwitchProps> = ({
  label,
  defaultChecked = false,
  disabled = false,
  onChange,
  color = "blue", // Default to blue color
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = (next: boolean) => {
    if (disabled) return;
    setIsChecked(next);
    if (onChange) {
      onChange(next);
    }
  };

  return (
    <label
      className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${
        disabled ? "text-muted-foreground" : "text-foreground"
      }`}
    >
      <UebSwitch
        checked={isChecked}
        onCheckedChange={handleToggle}
        disabled={disabled}
        className={color === "gray" ? "data-checked:bg-muted-foreground" : ""}
      />
      {label}
    </label>
  );
};

export default Switch;