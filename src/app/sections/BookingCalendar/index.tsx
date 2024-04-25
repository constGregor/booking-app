"use client";

import "./index.css";
import { FormVisibilityContext } from "@/components/FormVisibilityContext";
import { PickedDateContext } from "@/components/PickedDateAndTimeContext";
import { Point, SlotsPopup } from "@/components/SlotsPopup";
import { SlotData } from "@/entities/api-types";
import { fetchAvailableSpotsForDate } from "@/services/api-calls";
import { RefObject, useContext, useRef, useState } from "react";
import Calendar from "react-calendar";

export const BookingCalendar = () => {
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const { toggleForm } = useContext(FormVisibilityContext);
  const {
    slotsForDate,
    pickedDate,
    setPickedDate,
    setSlotsForDate,
    setPickedSlot,
  } = useContext(PickedDateContext);
  const [slotsVisibility, setSlotsVisibility] = useState(false);
  const [slotsPosition, setSlotPosition] = useState<Point>({} as Point);

  const onDateClick = async (
    value: Date,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const localDate = new Date(
      value.getTime() - value.getTimezoneOffset() * 60000
    );
    const clickedDate = localDate.toISOString().slice(0, 10);
    const availableSlots = await fetchAvailableSpotsForDate(clickedDate);

    setPickedDate(clickedDate);
    setSlotsForDate(availableSlots);
    setSlotsVisibility(true);

    if (ref.current) {
      const containerRect = ref.current.getBoundingClientRect();
      const relativeX = event.clientX - containerRect.left;
      const relativeY = event.clientY - containerRect.top;
      setSlotPosition({ x: relativeX, y: relativeY });
    }
  };

  const onSlotClick = (slot: SlotData) => {
    toggleForm();
    setPickedSlot(slot);
    setSlotsVisibility(false);
  };

  return (
    <div className="flex flex-col items-center max-w-xl relative">
      <Calendar
        showFixedNumberOfWeeks={true}
        onClickDay={onDateClick}
        locale="en"
        inputRef={ref}
      />
      <SlotsPopup
        position={slotsPosition}
        pickedDate={pickedDate}
        slotsVisibility={slotsVisibility}
        slotsForDate={slotsForDate}
        onHandleSlotClick={onSlotClick}
      />
    </div>
  );
};
