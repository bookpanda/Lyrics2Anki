import { ThemeProvider } from "@mui/material";
import "@styles/global.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
// import Script from "next/script";
import { AppProvider } from "../core/contexts/appProvider";
import { theme } from "../theme";

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Lyrics2Anki</title>
                <meta content="App description" name="description" />
            </Head>
            {/* <Script type="text/javascript" src="/static/kuroshiro.min.js"></Script>
      <Script
        type="text/javascript"
        src="/static/kuroshiro-analyzer-kuromoji.min.js"
      ></Script> */}
            <AppProvider>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </AppProvider>
        </>
    );
}

export default App;
