"use client";

import { FC, ReactNode, createContext, useState } from "react";
import { SlotData } from "../entities/api-types";

interface PickedDateContextType {
  pickedDate: string;
  slotsForDate: SlotData[];
  pickedSlot: SlotData;
  setPickedDate: (date: string) => void;
  setSlotsForDate: (slots: SlotData[]) => void;
  setPickedSlot: (slot: SlotData) => void;
}

export const PickedDateContext = createContext<PickedDateContextType>(
  {} as PickedDateContextType
);

interface PickedDateProviderProps {
  children: ReactNode;
}

export const PickedDateProvider: FC<PickedDateProviderProps> = ({
  children,
}) => {
  const [pickedDate, setPickedDate] = useState<string>("");
  const [slotsForDate, setSlotsForDate] = useState<SlotData[]>([]);
  const [pickedSlot, setPickedSlot] = useState<SlotData>({} as SlotData);

  return (
    <PickedDateContext.Provider
      value={{
        pickedSlot,
        pickedDate,
        slotsForDate,
        setPickedDate,
        setSlotsForDate,
        setPickedSlot,
      }}
    >
      {children}
    </PickedDateContext.Provider>
  );
};
