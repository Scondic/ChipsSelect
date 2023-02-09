import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { useSorting } from "@/hooks/useSorting";
import {
  AngleDown,
  Chip,
  ChipsInput,
  ChipsOption,
} from "@/components";

import "./ChipsSelect.css";

export interface ChipsSelectProps {
  value: any;
  onChange: (prev: any) => void;
  options: any;
  setOptions: (prev: any) => void;
  placeholder: string;
}

export const ChipsSelect = ({
  value,
  onChange,
  options,
  setOptions,
  placeholder,
}: PropsWithChildren<ChipsSelectProps>) => {
  const chipsInputRef = useRef<HTMLInputElement>(null);
  const [isChipsInputFocused, setIsChipsInputFocused] = useState(false);
  const [chipsInputValue, setChipsInputValue] = useState("");
  const { sortedOptions } = useSorting(options, chipsInputValue);

  const onHandleChipsSelectClick = () => {
    if (chipsInputRef.current) {
      chipsInputRef.current.focus();
      setIsChipsInputFocused(true);
    }
  };

  const onHandleChipsOptionClick = (event: any) => {
    let selectedLanguage = options.filter(
      (element: any) => element.name === event.target.outerText
    );
    let language = options.filter(
      (element: any) => element.name !== event.target.outerText
    );

    setOptions([...language]);
    onChange((prev: any) => [...prev, ...selectedLanguage]);

    chipsInputRef.current!.value = "";
  };

  const onHandleChipsClick = (event: any) => {
    const selectedLanguage = value.filter(
      (option: any) => option.name === event.target.outerText
    );

    const language = value.filter(
      (option: any) => option.name !== event.target.outerText
    );

    onChange([...language]);
    setOptions((prev: any) => [...prev, ...selectedLanguage]);
  };

  const onInputChange = (text: string) => {
    setChipsInputValue(text);
  };

  useEffect(() => {
    const onKeypress = ({ key }: { key: string }) => {
      if (key === "Escape") {
        setChipsInputValue("");
        setIsChipsInputFocused(false);
      }
    };

    window.addEventListener("keydown", onKeypress);
    return () => {
      window.removeEventListener("keydown", onKeypress);
    };
  }, [chipsInputValue]);

  return (
    <div className={"ChipsSelect"} onClick={onHandleChipsSelectClick}>
      <div className="ChipsSelect__container">
        {value.map(({ name }: any) => (
          <Chip text={name} onClick={onHandleChipsClick} key={name} />
        ))}
        <ChipsInput
          ref={chipsInputRef}
          onInputChange={onInputChange}
          placeholder={placeholder}
        />
        <div className="ChipsSelect__action">
          <AngleDown />
        </div>
      </div>
      <div
        className={
          isChipsInputFocused
            ? "ChipsSelect__select"
            : "ChipsSelect__select ChipsSelect__select-none"
        }
      >
        {sortedOptions.map(({ name }: any) => (
          <ChipsOption
            text={name}
            onClick={onHandleChipsOptionClick}
            key={name}
          />
        ))}
      </div>
    </div>
  );
};
