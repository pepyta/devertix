import { procedure, router } from "@/trpc/server";
import { dbMiddleware } from "../middleware/db.middleware";

export const appRouter = router({
    question: router({
        list: procedure
            .use(dbMiddleware)
            .query((opts) => opts.ctx.db.query.questions.findMany({
                columns: {
                    name: true,
                },
                with: {
                    category: {
                        columns: {
                            name: true,
                        },
                    },
                },
            })),
    })
});

export type AppRouter = typeof appRouter;
