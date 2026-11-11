"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import { InputGroup as UebInputGroup } from "@ueb-development/ui-core/components/input-group";
import { EnvelopeIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";

export default function InputGroup() {
  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };
  return (
    <ComponentCard title="Grupo de Entradas">
      <div className="space-y-6">
        <div>
          <Label>Correo Electrónico</Label>
          <UebInputGroup className="h-11">
            <UebInputGroup.Addon>
              <EnvelopeIcon />
            </UebInputGroup.Addon>
            <UebInputGroup.Input placeholder="info@gmail.com" type="text" />
          </UebInputGroup>
        </div>
        <div>
          <Label>Teléfono</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            onChange={handlePhoneNumberChange}
          />
        </div>{" "}
        <div>
          <Label>Teléfono</Label>
          <PhoneInput
            selectPosition="end"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
