"use client";
import React, { useState } from "react";
import { InputGroup } from "@ueb-development/ui-core/components/input-group";
import { NativeSelect } from "@ueb-development/ui-core/components/native-select";

interface CountryCode {
  code: string;
  label: string;
}

interface PhoneInputProps {
  countries: CountryCode[];
  placeholder?: string;
  onChange?: (phoneNumber: string) => void;
  selectPosition?: "start" | "end";
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries,
  placeholder = "+1 (555) 000-0000",
  onChange,
  selectPosition = "start",
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [phoneNumber, setPhoneNumber] = useState<string>("+1");

  const countryCodes: Record<string, string> = countries.reduce(
    (acc, { code, label }) => ({ ...acc, [code]: label }),
    {}
  );

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    setPhoneNumber(countryCodes[newCountry]);
    onChange?.(countryCodes[newCountry]);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <InputGroup className="h-11">
      <InputGroup.Addon align={selectPosition === "start" ? "inline-start" : "inline-end"}>
        <NativeSelect
          size="sm"
          aria-label="País"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {countries.map((country) => (
            <NativeSelect.Option key={country.code} value={country.code}>
              {country.code}
            </NativeSelect.Option>
          ))}
        </NativeSelect>
      </InputGroup.Addon>
      <InputGroup.Input
        type="tel"
        aria-label="Teléfono"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder={placeholder}
      />
    </InputGroup>
  );
};

export default PhoneInput;
