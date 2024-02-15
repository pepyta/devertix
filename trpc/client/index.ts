import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/router";

export const trpc = createTRPCNext<AppRouter>({
    ssr: false,
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

console.log(trpc);