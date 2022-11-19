import { ReactNode } from "react";
import { Flex, Stack, VStack } from "@cc/ui-chakra";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <VStack height="100vh">
        <Flex flex={1} as="main" width="100%">
          {children}
        </Flex>
        <Stack>
          <Footer />
        </Stack>
      </VStack>
    </>
  );
};
export default Layout;
