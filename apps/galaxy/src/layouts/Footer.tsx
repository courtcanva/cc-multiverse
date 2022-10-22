import { Wrap, WrapItem, Center, Stack } from "@cc/ui-chakra";

const Footer = () => {
  return (
    <Stack height={{ base: "64px", lg: "32px" }}>
      <Wrap
        as="footer"
        justify="center"
        spacingX={{ base: "16px", sm: "24px", lg: "32px" }}
        width={{ sm: "400px", lg: "100%" }}
      >
        <WrapItem order={{ lg: 2 }}>
          <Center>Privacy policy</Center>
        </WrapItem>
        <WrapItem order={{ lg: 3 }}>
          <Center>Terms & Conditions</Center>
        </WrapItem>
        <WrapItem order={{ lg: 4 }}>
          <Center>Contact us</Center>
        </WrapItem>
        <WrapItem order={{ lg: 1 }}>
          <Center>©{new Date().getFullYear()} Courtcanva All rights reserved</Center>
        </WrapItem>
      </Wrap>
    </Stack>
  );
};

export default Footer;
