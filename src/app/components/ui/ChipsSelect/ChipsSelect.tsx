import { PropsWithChildren, useRef, useState } from "react";

import { AngleDown, Chip, ChipsInput, ChipsOption } from "@/components";
import { useKeyPress, useSorting } from "@/hooks";

import "./ChipsSelect.css";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export interface ChipsSelectProps {
  sort?: string;
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
  const optionSort = sort ? sort : "option";
  const chipsInputRef = useRef<HTMLInputElement>(null);
  const chipsOptionsRef = useRef<HTMLDivElement>(null);
  const [isChipsInputFocused, setIsChipsInputFocused] = useState(false);
  const [chipsInputValue, setChipsInputValue] = useState("");

  useKeyPress({
    keyString: "Escape",
    callback: () => {
      setChipsInputValue("");
      setIsChipsInputFocused(false);
    },
  });

  useOutsideClick({
    ref: chipsOptionsRef,
    callback: () => {
      setIsChipsInputFocused(false);
    },
  });

  const { sortedOptions } = useSorting({
    data: options,
    field: optionSort,
    sortBy: chipsInputValue,
  });

  const onHandleChipsSelectClick = () => {
    if (chipsInputRef.current) {
      chipsInputRef.current.focus();
      setIsChipsInputFocused(true);
    }
  };

  const onHandleChipsOptionClick = (id: number) => {
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
    setChipsInputValue(text);
  };

  return (
    <div className={"ChipsSelect"} onClick={onHandleChipsSelectClick}>
      <div className="ChipsSelect__container">
        {selected.map(({ id, option }: any) => (
          <Chip id={id} key={id} text={option} onClick={onHandleChipsClick} />
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
        {sortedOptions.length ? (
          sortedOptions.map(({ id, option, description }: any) => (
            <ChipsOption
              id={id}
              key={id}
              option={option}
              description={description}
              onClick={onHandleChipsOptionClick}
            />
          ))
        ) : (
          <ChipsOption
            option={"Нет данных"}
            description={"Проверьте передаваемые параметры"}
          />
        )}
      </div>
    </div>
  );
};
