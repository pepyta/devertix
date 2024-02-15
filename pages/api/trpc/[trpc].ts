import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/trpc/server/router";

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
});
