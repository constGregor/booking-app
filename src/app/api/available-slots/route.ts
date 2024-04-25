import { db } from "@/entities/database";

export async function PATCH(req: Request) {
    const data = await req.json();
    const unavailableSlot = await db.updateTable('available_slots')
        .set({ is_available: false })
        .where('slot_id', "=", data.slot_id)
        .executeTakeFirst();
    return Response.json(
        { numUpdatedRows: 
            Number(unavailableSlot?.numUpdatedRows) 
        });
}