import { trpc } from "@/trpc/client";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import "@/styles/global.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <AppCacheProvider>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </AppCacheProvider>
    );
}

export default trpc.withTRPC(App);
