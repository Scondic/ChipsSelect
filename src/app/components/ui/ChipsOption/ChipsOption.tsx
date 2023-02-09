import "./ChipsOption.css";

export interface ChipsOptionProps {
  text: string;
  onClick: (event: any) => void;
}

export const ChipsOption = ({ text, onClick }: ChipsOptionProps) => {
  return (
    <div className="ChipsSelect__option" key={text} onClick={onClick}>
      <div className="ChipsSelect__option-text">{text}</div>
      <div className="ChipsSelect__option-description">{text}</div>
    </div>
  );
};
