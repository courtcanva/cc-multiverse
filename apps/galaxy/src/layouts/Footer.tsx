import { Wrap, WrapItem, Center, Stack } from "@cc/ui-chakra";

const Footer = () => {
  return (
    <Wrap
      as="footer"
      justify="center"
      spacingX={{ base: "16px", sm: "24px", lg: "32px" }}
      width={{ sm: "400px", lg: "100%" }}
    >
      <WrapItem order={{ lg: 2 }}>
        <Center>Privacy policy</Center>
      </WrapItem>
      <WrapItem order={{ lg: 3 }}>Terms & Conditions</WrapItem>
      <WrapItem order={{ lg: 4 }}>
        <Center>Contact us</Center>
      </WrapItem>
      <WrapItem order={{ lg: 1 }}>
        <Center>©{new Date().getFullYear()} Courtcanva All rights reserved</Center>
      </WrapItem>
    </Wrap>
  );
};

export default Footer;
