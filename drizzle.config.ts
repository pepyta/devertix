import type { Config } from "drizzle-kit";
import { z } from "zod";

const { DATABASE_URL } = z.object({
    DATABASE_URL: z.string().url(),
}).parse(process.env);

export default {
    schema: "./db/schema.ts",
    out: "./db/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: DATABASE_URL,
    },
} satisfies Config;
