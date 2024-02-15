import { procedure, router } from "@/trpc/server";
import { dbMiddleware } from "../middleware/db.middleware";
import { answers, sessionQuestions, sessions } from "@/db/schema";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";

export const appRouter = router({
    session: router({
        create: procedure
            .use(dbMiddleware)
            .mutation(async (opts) => {
                const session = (
                    await opts.ctx.db
                        .insert(sessions)
                        .values({})
                        .returning()
                        .execute()
                )[0];

                const questions = await opts.ctx.db.query.questions.findMany({
                    columns: {
                        id: true,
                    },
                    orderBy: () => sql`RANDOM()`,
                    limit: 10,
                });

                await opts.ctx.db.insert(sessionQuestions)
                    .values(questions.map((question) => ({
                        questionId: question.id,
                        sessionId: session.id,
                    })))

                return session;
            }),
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
            .input(z.object({
                sessionId: z.string().uuid()
            }))
            .query(async (opts) => {
                const sessionQuestions = await opts.ctx.db.query.sessionQuestions.findMany({
                    with: {
                        question: {
                            with: {
                                category: {
                                    columns: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                    where: (fields) => eq(fields.sessionId, opts.input.sessionId),
                });

                return sessionQuestions.map((sessionQuestion) => sessionQuestion.question);
            }),
    })
});

export type AppRouter = typeof appRouter;
