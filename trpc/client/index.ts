import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/router";

export const trpc = createTRPCNext<AppRouter>({
    ssr: false,
    overrides: {
        useMutation: {
            async onSuccess(opts) {
                await opts.originalFn();
                await opts.queryClient.invalidateQueries();
            },
        },
    },
    config: () => {
        return {
            links: [
                httpBatchLink({
                    url: "/api/trpc",
                }),
            ],
        };
    },
});
