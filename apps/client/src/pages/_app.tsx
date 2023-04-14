import "$styles/global.scss";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
// import Script from "next/script";
import { AppProvider } from "src/core/contexts/appProvider";
import { theme } from "src/theme";

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
          {/* <CssBaseline /> */}
          <Component {...pageProps} />
        </ThemeProvider>
      </AppProvider>
    </>
  );
}

export default App;
