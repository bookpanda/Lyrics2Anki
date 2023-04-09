import "$styles/global.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AppProvider } from "src/core/contexts/appProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lyrics2Anki</title>
        <meta content="App description" name="description" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default App;
