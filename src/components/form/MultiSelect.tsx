"use client";
import React, { useState } from "react";
import { Combobox } from "@ueb-development/ui-core/components/combobox";
import { useComboboxAnchor } from "@ueb-development/ui-core/components/combobox";
import { Label } from "@ueb-development/ui-core/components/label";

interface Option {
  value: string;
  text: string;
  selected: boolean;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  defaultSelected = [],
  onChange,
  disabled = false,
}) => {
  const anchor = useComboboxAnchor();
  const [selected, setSelected] = useState<Option[]>(
    options.filter((o) => defaultSelected.includes(o.value))
  );

  const handleChange = (next: Option[]) => {
    setSelected(next);
    onChange?.(next.map((o) => o.value));
  };

  return (
    <div className="w-full space-y-1.5">
      <Label>{label}</Label>
      <Combobox
        multiple
        items={options}
        value={selected}
        onValueChange={handleChange}
        itemToStringLabel={(o: Option) => o.text}
        isItemEqualToValue={(a: Option, b: Option) => a.value === b.value}
        disabled={disabled}
      >
        <Combobox.Chips ref={anchor}>
          <Combobox.Value>
            {(values: Option[]) => (
              <>
                {values.map((o) => (
                  <Combobox.Chip key={o.value}>{o.text}</Combobox.Chip>
                ))}
                <Combobox.ChipsInput placeholder="Seleccione opción" />
              </>
            )}
          </Combobox.Value>
        </Combobox.Chips>
        <Combobox.Content anchor={anchor}>
          <Combobox.List>
            {(o: Option) => (
              <Combobox.Item key={o.value} value={o}>
                {o.text}
              </Combobox.Item>
            )}
          </Combobox.List>
          <Combobox.Empty>Sin resultados.</Combobox.Empty>
        </Combobox.Content>
      </Combobox>
    </div>
  );
};

export default MultiSelect;
