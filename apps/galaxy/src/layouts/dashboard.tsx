import { ReactNode } from "react";
import { Flex, Stack, VStack, HStack } from "@cc/ui-chakra";
import Footer from "./Footer";
import { Sidebar } from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

const dashboardLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <HStack>
        <Stack>
          <Sidebar />
        </Stack>
        <VStack height="100vh">
          <Flex flex={1} as="main" width="100%">
            {children}
          </Flex>
          <Stack>
            <Footer />
          </Stack>
        </VStack>
      </HStack>
    </>
  );
};
export default dashboardLayout;
