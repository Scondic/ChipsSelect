import { PropsWithChildren } from "react";

import { Times } from "@/components";

import "./Chip.css";

export interface ChipsProps {
  id: number;
  text: string;
  onClick: (id: number) => void;
}

export const Chip = ({ id, text, onClick }: PropsWithChildren<ChipsProps>) => {
  return (
    <span className={"Chip"} onClick={() => onClick(id)}>
      <span className={"Chip__text"}>{text}</span>
      <span className={"Chip__action"}>{<Times />} </span>
    </span>
  );
};
