import { AppProps } from "next/app";
import Layout from "../layouts";
import { ThemeProvider } from "@cc/ui-chakra";

export default function App({ Component, pageProps }: AppProps) {
  // Not suppose to be here but this field is mandatory... So yeah, just throwing a random empty obj to it :)
  const randomTheme = {};

  return (
    <ThemeProvider theme={randomTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
