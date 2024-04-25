import {
    ColumnType,
    Generated,
    PostgresDialect,
    Kysely
  } from 'kysely'
  import { Pool } from 'pg';
  
  export interface Database {
    users: UsersTable;
    available_slots: AvailableSlotsTable;
    reservations: ReservationsTable;
  }

  export interface UsersTable {
    user_id: Generated<number>;
    user_name: string;
    user_email: string;
    user_phone: string;
  }

  export interface AvailableSlotsTable {
    slot_id: Generated<number>;
    slot_date: string;
    slot_time: string;
    is_available: boolean;
  }
  
  export interface ReservationsTable {
    reservation_id: Generated<number>;
    user_id: number;
    slot_id: number;
    reservation_date: string;
    reservation_time: string;
  }

  const dialect = new PostgresDialect({
	pool: new Pool({
		host: 'localhost',
		user: 'postgres',
		port: 5432,
		password: 'Svenska1997',
		database: 'reservation-app',
	}),
});

export const db = new Kysely<Database>({
	dialect,
});