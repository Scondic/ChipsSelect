import "./ChipsOption.css";

export interface ChipsOptionProps {
  id: number;
  text: string;
  onClick: (event: any) => void;
}

export const ChipsOption = ({ id, text, onClick }: ChipsOptionProps) => {
  return (
    <div className="ChipsSelect__option" key={text} onClick={() => onClick(id)}>
      <div className="ChipsSelect__option-text">{text}</div>
      <div className="ChipsSelect__option-description">{text}</div>
    </div>
  );
};
