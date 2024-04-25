import { FC } from "react";

interface Props {
  text: string;
}

export const HighlightedText: FC<Props> = ({ text }) => {
  return (
    <span className="font-bold text-orange-500 whitespace-nowrap">{text}</span>
  );
};
