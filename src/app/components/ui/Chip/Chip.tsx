import { PropsWithChildren } from "react";

import { Times } from "@/components";

import "./Chip.css";

export interface ChipsProps {
  text: string;
  onClick: (event: any) => void;
}

export const Chip = ({ text, onClick }: PropsWithChildren<ChipsProps>) => {
  return (
    <span className={"Chip"} onClick={onClick}>
      <span className={"Chip__text"}>{text}</span>
      <span className={"Chip__action"}>{<Times />}</span>
    </span>
  );
};
