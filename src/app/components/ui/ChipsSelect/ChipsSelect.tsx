import { PropsWithChildren, useRef, useState } from "react";

import { AngleDown, Chip, ChipsInput, ChipsOption } from "@/components";
import { useKeyPress, useSorting } from "@/hooks";

import "./ChipsSelect.css";

export interface ChipsSelectProps {
  sort: string;
  selected: any;
  setSelected: (prev: any) => void;
  options: any;
  setOptions: (prev: any) => void;
  placeholder: string;
}

export const ChipsSelect = ({
  sort,
  selected,
  setSelected,
  options,
  setOptions,
  placeholder,
}: PropsWithChildren<ChipsSelectProps>) => {
  const chipsInputRef = useRef<HTMLInputElement>(null);
  const chipsOptionsRef = useRef<HTMLDivElement>(null);
  const [isChipsInputFocused, setIsChipsInputFocused] = useState(false);
  const [chipsInputValue, setChipsInputValue] = useState("");
  const { sortedOptions } = useSorting(options, sort, chipsInputValue);

  const onHandleChipsSelectClick = () => {
    if (chipsInputRef.current) {
      chipsInputRef.current.focus();
      setIsChipsInputFocused(true);
    }
  };

  const onHandleChipsOptionClick = (id: number) => {
    // TODO: Костыль, но зато быстрый.
    // Вызов обновления стейта с языками
    chipsInputRef.current!.value = " ";
    chipsInputRef.current!.value = "";

    const index = options.findIndex((elem: any) => elem.id === id);

    const before = options.slice(0, index);
    const after = options.slice(index + 1);

    setOptions([...before, ...after]);
    setSelected((prev: any) => [...prev, options[index]]);
  };

  const onHandleChipsClick = (id: number) => {
    const index = selected.findIndex((elem: any) => elem.id === id);

    const before = selected.slice(0, index);
    const after = selected.slice(index + 1);

    setSelected([...before, ...after]);
    setOptions((prev: any) => [...prev, selected[index]]);
  };

  const onInputChange = (text: string) => {
    console.log(sortedOptions);
    setChipsInputValue(text);
  };

  useKeyPress("Escape", () => {
    setChipsInputValue("");
    setIsChipsInputFocused(false);
  });

  return (
    <div className={"ChipsSelect"} onClick={onHandleChipsSelectClick}>
      <div className="ChipsSelect__container">
        {selected.map(({ id, username }: any) => (
          <Chip id={id} text={username} onClick={onHandleChipsClick} key={id} />
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
        ref={chipsOptionsRef}
        className={
          isChipsInputFocused
            ? "ChipsSelect__select"
            : "ChipsSelect__select ChipsSelect__select-none"
        }
      >
        {sortedOptions.map(({ id, username }: any) => (
          <ChipsOption
            id={id}
            text={username}
            onClick={onHandleChipsOptionClick}
            key={username}
          />
        ))}
      </div>
    </div>
  );
};
