export interface SlotData {
    slot_id: number;
    slot_date: string;
    slot_time: string;
    is_available: boolean;
}

export interface UserData {
    name: string;
    email: string;
    phone: string;
}

export interface PatchResponse {
    numUpdatedRows: number;
}

export interface ReservationData {
date: string;
time: string;
slotId: number;
userId: number;
}