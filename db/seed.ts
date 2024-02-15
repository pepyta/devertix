import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
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
                name: "Unturned originally started as a Roblox game.",
                answer: false,
                categoryId: categories[0].id,
            },
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
            {
                name: "Caesar Salad originates from Italy.",
                answer: false,
                categoryId: categories[2].id,
            },
            {
                name: "Pizza was the first food consumed in space.",
                answer: false,
                categoryId: categories[2].id,

            },
            {
                name: "The Atlantic Ocean is the biggest ocean on Earth.",
                answer: false,
                categoryId: categories[1].id,

            },
            {
                name: "Mount Everest is the tallest mountain in the world.",
                answer: false,
                categoryId: categories[1].id,

            },
            {
                name: "The two longest rivers in the world are the Mississippi and the Nile.",
                answer: false,
                categoryId: categories[1].id,
            },
            {
                name: "Mcdonald's has the most restaurants by location in the United States.",
                answer: false,
                categoryId: categories[2].id,
            }
        ]).returning().execute();

        return {
            categories,
            questions,
        };
    });

    await client.end();
};

main();
