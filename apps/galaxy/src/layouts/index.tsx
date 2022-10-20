import { ReactNode } from "react";
import { Box, VStack, Flex } from "@cc/ui-chakra";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <VStack minHeight="100vh" minWidth="100vw">
      <Flex flex={1} as="main" justifyContent="center" alignItems="center">
        {children}
      </Flex>
      <Footer />
    </VStack>
  );
};
export default Layout;
