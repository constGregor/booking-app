import { SlotData } from "@/entities/api-types";
import { FC } from "react";
import { HighlightedText } from "../HighlightedText";
import { useDateFormat } from "@/hooks/useFormatDate";

export interface Point {
  x: number;
  y: number;
}

interface SlotsPopupProps {
  position: Point;
  pickedDate: string;
  slotsVisibility: boolean;
  slotsForDate: SlotData[] | [];
  onHandleSlotClick: (slot: SlotData) => void;
}

export const SlotsPopup: FC<SlotsPopupProps> = ({
  position,
  pickedDate,
  slotsVisibility,
  slotsForDate,
  onHandleSlotClick,
}) => {
  const formattedDate = useDateFormat(pickedDate);

  if (!slotsVisibility) return null;
  if (slotsForDate.length === 0)
    return (
      <h2 className="text-center pt-4">
        No available time slots for <HighlightedText text={formattedDate} />
      </h2>
    );
  return (
    <div
      style={{ top: position.y, left: position.x }}
      className="absolute w-full max-w-32 sm:max-w-48 flex flex-col gap-2 font-semibold bg-slate-300 h-auto p-2 xs:p-4 rounded-md shadow-xl"
    >
      <h2 className="text-center text-slate-800">
        Select time for {formattedDate}
      </h2>
      {slotsForDate.map((slot) => (
        <button
          key={slot.slot_id}
          className="bg-slate-700 px-4 py-2 rounded-md hover:bg-slate-900 transition-colors"
          type="button"
          onClick={() => onHandleSlotClick(slot)}
        >
          {slot.slot_time}
        </button>
      ))}
    </div>
  );
};
