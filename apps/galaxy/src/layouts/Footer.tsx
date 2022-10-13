import { HStack, Text } from "@cc/ui-chakra";

const Footer = () => {
  return (
    <HStack as="footer" height="30px" justifyContent="center" fontSize="sm" spacing="80px">
      <Text>©{new Date().getFullYear()} Courtcanva All rights reserved</Text>
      <Text>Privacy policy</Text>
      <Text>Terms & Conditions</Text>
      <Text>Contact us</Text>
    </HStack>
  );
};

export default Footer;
