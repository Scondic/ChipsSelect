import "./ChipsOption.css";

export interface ChipsOptionProps {
  id?: number;
  option?: string;
  description?: string;
  onClick?: (event: any) => void;
}

export const ChipsOption = ({
  id,
  option,
  description,
  onClick,
}: ChipsOptionProps) => {
  return (
    <div
      className="ChipsSelect__option"
      key={id}
      onClick={() => onClick && onClick(id)}
    >
      <div className="ChipsSelect__option-text">{option}</div>
      <div className="ChipsSelect__option-description">{description}</div>
    </div>
  );
};
