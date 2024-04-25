import { db } from "@/entities/database";

export async function GET(req: Request, 
    { params }: { params: { date: string } } 
) {
    const { date } = params;
    const availableSlots = await db
        .selectFrom('available_slots')
        .selectAll()
        .where('slot_date', '=', date)
        .where('is_available', '=', true)
        .execute();
    return Response.json(availableSlots);
}