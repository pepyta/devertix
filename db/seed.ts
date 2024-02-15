import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import path from "path";
import postgres from "postgres";
import { z } from "zod";
import * as schema from "./schema";

const main = async () => {
    const databaseUrl = z.string().url().parse(process.env.DATABASE_URL);
    const client = postgres(databaseUrl, {
        max: 1,
    });

    const db = await drizzle(client, {
        schema,
    });

    await db.transaction(async (tx) => {
        const categories = await tx
            .insert(schema.categories)
            .values([
                {
                    name: "Entertainment",
                },
                {
                    name: "Travel",
                },
                {
                    name: "Gastronomy",
                },
            ]).returning().execute();

        const questions = await tx.insert(schema.questions).values([
            {
                name: "Sony made the Xbox game console.",
                answer: false,
                categoryId: categories[0].id,
            },
            {
                name: "Luxemburg's capital is Luxembourg.",
                answer: true,
                categoryId: categories[1].id,   
            },
            {
                name: "Cream cheese and cheese cream are the same.",
                answer: false,
                categoryId: categories[2].id,   
            },
            {
                name: "Omlette and scrambled egg is the same thing.",
                answer: false,
                categoryId: categories[2].id,   
            },
        ]).returning().execute();

        return {
            categories,
            questions,
        };
    });

    await client.end();
};

main();
