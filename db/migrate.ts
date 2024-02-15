import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import path from "path";
import postgres from "postgres";
import { z } from "zod";

const main = async () => {
    const databaseUrl = z.string().url().parse(process.env.DATABASE_URL);
    const client = postgres(databaseUrl, {
        max: 1,
    });

    await migrate(drizzle(client), {
        migrationsFolder: path.resolve(__dirname, "./migrations"),
    });

    await client.end();
};

main();
