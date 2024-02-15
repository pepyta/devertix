import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema";
import { middleware } from "..";
import postgres from "postgres";
import { z } from "zod";

export const dbMiddleware = middleware(async (opts) => {
    const databaseUrl = z.string().url().parse(process.env.DATABASE_URL);
    const queryClient = postgres(databaseUrl);
    const db = drizzle(queryClient, { schema });

    const result = await opts.next({
        ctx: {
            db,
        },
    });

    await queryClient.end();

    return result;
});
