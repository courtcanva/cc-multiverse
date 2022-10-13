import { ReactNode } from "react";
import { Box } from "@cc/ui-chakra";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Box as="main">{children}</Box>
      <Footer />
    </>
  );
};
export default Layout;
