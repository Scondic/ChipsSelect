import { forwardRef } from "react";

import "./ChipsInput.css";

export interface ChipsInputProps {
  placeholder: string;
  isSelected: [];
  onInputChange: (search: string) => void;
}

export const ChipsInput = forwardRef<HTMLInputElement, ChipsInputProps>(
  ({ placeholder, isSelected, onInputChange }, ref) => {
    return (
      <input
        className={"ChipsInput"}
        ref={ref}
        type="text"
        placeholder={isSelected.length ? undefined : placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onInputChange(event.target.value);
        }}
      />
    );
  }
);
