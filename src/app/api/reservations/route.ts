import { db } from "@/entities/database";

export async function POST(req: Request) {
    const data = await req.json()

    const newReservation = await db.insertInto("reservations").values({ reservation_date: data.date, reservation_time: data.time, user_id: data.userId, slot_id: data.slotId }).returningAll().executeTakeFirst();
    return new Response(JSON.stringify(newReservation), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 201
    })
}