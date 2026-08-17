import React, { FC } from "react";
import { Input as UebInput } from "@ueb-development/ui/components/input";

interface FileInputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FC<FileInputProps> = ({ className, onChange }) => {
  return (
    <UebInput
      type="file"
      className={`h-11 rounded-lg file:h-11 ${className}`}
      onChange={onChange}
    />
  );
};

export default FileInput;