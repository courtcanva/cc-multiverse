import { Wrap, WrapItem, Center, Stack } from "@cc/ui-chakra";

const Footer = () => {
  return (
    <Wrap
      as="footer"
      justify="center"
      spacingX={{ base: "24px", lg: "32px" }}
      maxWidth={{ base: "428px", lg: "100%" }}
    >
      <WrapItem order={{ lg: 2 }}>Privacy policy</WrapItem>
      <WrapItem order={{ lg: 3 }}>Terms & Conditions</WrapItem>
      <WrapItem order={{ lg: 4 }}>Contact us</WrapItem>
      <WrapItem order={{ lg: 1 }}>
        ©{new Date().getFullYear()} Courtcanva All rights reserved
      </WrapItem>
    </Wrap>
  );
};

export default Footer;
