import { AppProps } from "next/app";
import GlobalLayout from "../layouts";
import { ThemeProvider } from "@cc/ui-chakra";
import React, { useEffect, useState } from "react";
import useToken from "@src/utils/useToken";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  // Not suppose to be here but this field is mandatory... So yeah, just throwing a random empty obj to it :)
  const randomTheme = {};
  const router = useRouter();
  const [res, setResponse] = useState(401);
  const { checkToken } = useToken();

  async function authCheck() {
    const stats = await checkToken();
    setResponse(stats!);
  }

  useEffect(() => {
    authCheck();
    res === 401 && router.push("/sign-in");
    // if (router.isReady) {
    //   !getToken() && router.push("/sign-in");
    // }
  }, [router.isReady]);

  return (
    <ThemeProvider theme={randomTheme}>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </ThemeProvider>
  );
}
