import { PatchResponse, ReservationData, SlotData, UserData } from "@/entities/api-types";
import { AvailableSlotsTable, ReservationsTable, UsersTable } from "@/entities/database";
import axios, { AxiosResponse } from "axios";

export const fetchAvailableSpots = async (): Promise<SlotData[]> => {
    const response: AxiosResponse<SlotData[]> = await axios.get("/api/available-slots")
    return response.data;
}

export const fetchAvailableSpotsForDate = async (date: string): Promise<SlotData[]> => {
    const response: AxiosResponse<SlotData[]> = await axios.get(`/api/available-slots/${date}`)
    return response.data;
}

export const createOrGetExistingUser = async (data: UserData): Promise<UsersTable> => {
    const response: AxiosResponse<UsersTable> = await axios.post("/api/users", data);
    console.log(response.data);
    return response.data;
};

export const createReservation = async (data: ReservationData): Promise<ReservationsTable> => {
    const response: AxiosResponse<ReservationsTable> = await axios.post("/api/reservations", data);
    return response.data;
}

export const patchAvailableSlot = async (data: { slot_id: number }): Promise<number> => {
    const response: AxiosResponse<PatchResponse> = await axios.patch("/api/available-slots", data);
      return response.data.numUpdatedRows;
  };
