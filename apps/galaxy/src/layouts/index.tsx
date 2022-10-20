import { ReactNode } from "react";
import { VStack, Flex } from "@cc/ui-chakra";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <VStack minHeight="100vh" alignItems="stretch" spacing={["32px", "72px"]}>
      <Flex flex={1} as="main" justifyContent="center">
        {children}
      </Flex>
      <Footer />
    </VStack>
  );
};
export default Layout;
