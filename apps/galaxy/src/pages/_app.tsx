import { AppProps } from "next/app";
import GlobalLayout from "../layouts";
import { ThemeProvider, useToast } from "@cc/ui-chakra";
import React, { useEffect } from "react";
import { getToken, checkTokenExpiration } from "@src/utils/tokenService";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }: AppProps) => {
  // Not suppose to be here but this field is mandatory... So yeah, just throwing a random empty obj to it :)
  const randomTheme = {};
  const router = useRouter();
  const toast = useToast();

  const tokenExpired = () => {
    router.push("/sign-in");
    toast({
      description: "Sign in time out, Please sign in again",
      status: "error",
      duration: 6000,
      position: "top",
      isClosable: true,
    });
  };

  useEffect(() => {
    getToken() ? checkTokenExpiration() && tokenExpired() : router.push("/sign-in");
  }, []);

  return (
    <ThemeProvider theme={randomTheme}>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </ThemeProvider>
  );
};

export default App;
