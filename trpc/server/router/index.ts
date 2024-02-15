import { procedure, router } from "@/trpc/server";
import { dbMiddleware } from "../middleware/db.middleware";
import { answers, sessions } from "@/db/schema";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";

export const appRouter = router({
    session: router({
        create: procedure
            .use(dbMiddleware)
            .mutation(async (opts) => (
                await opts.ctx.db
                    .insert(sessions)
                    .values({})
                    .returning()
                    .execute()
            )[0]),
    }),

    answer: router({
        create: procedure
            .use(dbMiddleware)
            .input(z.object({
                sessionId: z.string().uuid(),
                questionId: z.string().uuid(),
                choice: z.boolean(),
            }))
            .mutation((opts) => opts.ctx.db.insert(answers).values(opts.input)),

        list: procedure
            .use(dbMiddleware)
            .input(z.object({
                sessionId: z.string().uuid(),
            }))
            .query((opts) => opts.ctx.db.query.answers.findMany({
                where: (fields) => eq(fields.sessionId, opts.input.sessionId),
                with: {
                    question: true,
                },
            }))
    }),

    question: router({
        list: procedure
            .use(dbMiddleware)
            .query((opts) => opts.ctx.db.query.questions.findMany({
                columns: {
                    id: true,
                    name: true,
                },
                with: {
                    category: {
                        columns: {
                            name: true,
                        },
                    },
                },
                limit: 10,
            })),
    })
});

export type AppRouter = typeof appRouter;
