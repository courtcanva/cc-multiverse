import { ReactNode } from "react";
import { Stack, VStack } from "@cc/ui-chakra";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <VStack height="100vh">
        <Stack flex={1} as="main">
          {children}
        </Stack>
        <Footer />
      </VStack>
    </>
  );
};
export default Layout;
