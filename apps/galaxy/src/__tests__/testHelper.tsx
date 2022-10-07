import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@cc/ui-chakra";
import { NextRouter } from "next/router";

const renderWithMockedProvider = (children: ReactNode) => {
  // Not suppose to be here but this field is mandatory... So yeah, just throwing a random empty obj to it :)
  const randomTheme = {};
  return render(<ThemeProvider theme={randomTheme}>{children}</ThemeProvider>);
};

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...router,
  };
}

export default renderWithMockedProvider;
