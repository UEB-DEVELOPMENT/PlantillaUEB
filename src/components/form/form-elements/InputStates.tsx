"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";

export default function InputStates() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  // Simulate a validation check
  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };
  return (
    <ComponentCard
      title="Estados de Entrada"
      desc="Estilos de validación para estados de error, éxito y deshabilitado en controles de formulario."
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Error Input */}
        <div>
          <Label>Correo Electrónico</Label>
          <Input
            type="email"
            defaultValue={email}
            error={error}
            onChange={handleEmailChange}
            placeholder="Ingrese su correo"
            hint={error ? "Esta dirección de correo no es válida." : ""}
          />
        </div>

        {/* Success Input */}
        <div>
          <Label>Correo Electrónico</Label>
          <Input
            type="email"
            defaultValue={email}
            success={!error}
            onChange={handleEmailChange}
            placeholder="Ingrese su correo"
            hint={!error ? "¡Correo válido!" : ""}
          />
        </div>

        {/* Disabled Input */}
        <div>
          <Label>Correo Electrónico</Label>
          <Input
            type="text"
            defaultValue="disabled@example.com"
            disabled={true}
            placeholder="Correo deshabilitado"
            hint="Este campo está deshabilitado."
          />
        </div>
      </div>
    </ComponentCard>
  );
}
