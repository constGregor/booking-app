import { SlotData } from "@/entities/api-types";
import { FC } from "react";
import { HighlightedText } from "../HighlightedText";

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
  if (!slotsVisibility) return null;
  if (slotsForDate.length === 0)
    return (
      <h2 className="text-center pt-4">
        No available time slots for <HighlightedText text={pickedDate} />
      </h2>
    );
  return (
    <div
      style={{ top: position.y, left: position.x }}
      className="absolute flex flex-col gap-2 font-semibold bg-slate-300 h-auto p-4 rounded-md"
    >
      <h2 className="text-center text-slate-700">
        Select time for {pickedDate}
      </h2>
      {slotsForDate.map((slot) => (
        <button
          key={slot.slot_id}
          className="bg-slate-600 px-4 py-2 rounded-md hover:bg-slate-900 transition-colors"
          type="button"
          onClick={() => onHandleSlotClick(slot)}
        >
          {slot.slot_time}
        </button>
      ))}
    </div>
  );
};
