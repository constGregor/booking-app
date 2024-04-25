import { AvailableSlotsTable } from '@/entities/database';
import { Kysely } from 'kysely';

function generateAvailableSlots(startDate: Date): Omit<AvailableSlotsTable, 'slot_id'>[] {
    const slots: Omit<AvailableSlotsTable, 'slot_id'>[] = [];
    const times = ['10AM', '2PM', '4PM'];
    const endDate = new Date(new Date().getFullYear(), 5, 30);

    const offset = new Date().getTimezoneOffset();

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        times.forEach(time => {
            const localDate = new Date(date.getTime() - (offset * 60000));
            const slot = {
                slot_date: localDate.toISOString().slice(0, 10),
                slot_time: time, 
                is_available: true, 
            };
            slots.push(slot);
        });
    }

    return slots;
}


export async function up(db: Kysely<any>): Promise<void> {
    const today = new Date();
    const juneEndDate = new Date(today.getFullYear(), 5, 30); 

    await db.schema
        .createTable('users')
        .addColumn('user_id', 'serial', (col) => col.primaryKey())
        .addColumn('user_name', 'text', (col) => col.notNull())
        .addColumn('user_email', 'text', (col) => col.notNull().unique())
        .addColumn('user_phone', 'text', (col) => col.notNull())
        .execute();

    await db.schema
        .createTable('available_slots')
        .addColumn('slot_id', 'serial', (col) => col.primaryKey())
        .addColumn('slot_date', 'text', (col) => col.notNull())
        .addColumn('slot_time', 'text', (col) => col.notNull())
        .addColumn('is_available', 'boolean', (col) => col.notNull())
        .execute();

    await db.schema
        .createTable('reservations')
        .addColumn('reservation_id', 'serial', (col) => col.primaryKey())
        .addColumn('user_id', 'integer', (col) =>
            col.references('users.user_id').onDelete('cascade').notNull()
        )
        .addColumn('slot_id', 'integer', (col) =>
            col.references('available_slots.slot_id').onDelete('cascade').notNull()
        )
        .addColumn('reservation_date', 'text', (col) => col.notNull())
        .addColumn('reservation_time', 'text', (col) => col.notNull())
        .execute();

    const slots = generateAvailableSlots(today);
    await db.insertInto('available_slots').values(slots).execute();
}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('reservations').execute();
    await db.schema.dropTable('users').execute();
    await db.schema.dropTable('available_slots').execute();
}
