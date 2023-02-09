import { forwardRef } from "react";

import "./ChipsInput.css";

export interface ChipsInputProps {
  placeholder: string;
  onInputChange: (search: string) => void;
}

export const ChipsInput = forwardRef<HTMLInputElement, ChipsInputProps>(
  ({ placeholder, onInputChange }, ref) => {
    return (
      <input
        className={"ChipsInput"}
        ref={ref}
        type="text"
        placeholder={placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onInputChange(event.target.value);
        }}
      />
    );
  }
);
