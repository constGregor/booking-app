import { UsersTable, db } from "@/entities/database";

export async function POST(req: Request) {
    const data = await req.json();
    
    const existingUser = await db.selectFrom("users").selectAll().where("user_email", "=", data.email).executeTakeFirst();
    
    if (existingUser) {
        return new Response(JSON.stringify(existingUser), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });
    } else {
        const newUser = await db.insertInto("users").values({ user_name: data.name, user_email: data.email, user_phone: data.phone }).returningAll().executeTakeFirst();
        
        return new Response(JSON.stringify(newUser), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });
    }
}