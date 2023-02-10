import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { useSorting } from "@/hooks/useSorting";
import { AngleDown, Chip, ChipsInput, ChipsOption } from "@/components";

import "./ChipsSelect.css";

export interface ChipsSelectProps {
  selected: any;
  setSelected: (prev: any) => void;
  options: any;
  setOptions: (prev: any) => void;
  placeholder: string;
}

export const ChipsSelect = ({
  selected,
  setSelected,
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
    setSelected((prev: any) => [...prev, ...selectedLanguage]);

    chipsInputRef.current!.value = "";
  };

  const onHandleChipsClick = (event: any) => {
    const selectedLanguage = selected.filter(
      (option: any) => option.name === event.target.outerText
    );

    const language = selected.filter(
      (option: any) => option.name !== event.target.outerText
    );

    setSelected([...language]);
    setOptions((prev: any) => [...prev, ...selectedLanguage]);
  };

  const onInputChange = (text: string) => {
    setChipsInputValue(text);
  };

  console.log(selected);

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
        {selected.map(({ name }: any) => (
          <Chip text={name} onClick={onHandleChipsClick} key={name} />
        ))}
        <ChipsInput
          ref={chipsInputRef}
          onInputChange={onInputChange}
          isSelected={selected}
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
