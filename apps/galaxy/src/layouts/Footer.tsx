import { Wrap, WrapItem, Center } from "@cc/ui-chakra";

export const FooterContent: {
  copyRight: string;
  policy: string;
  conditions: string;
  contact: string;
} = {
  copyRight: " Courtcanva All rights reserved",
  policy: "Privacy policy",
  conditions: "Terms & Conditions",
  contact: "Contact us",
};

const Footer = () => {
  return (
    <Wrap as="footer" minHeight="30px" justify="center" spacingX={["20px", "80px"]}>
      <WrapItem>
        <Center>
          ©{new Date().getFullYear()}
          {FooterContent.copyRight}
        </Center>
      </WrapItem>
      <WrapItem>
        <Center>{FooterContent.policy}</Center>
      </WrapItem>
      <WrapItem>
        <Center>{FooterContent.conditions}</Center>
      </WrapItem>
      <WrapItem>
        <Center>{FooterContent.contact}</Center>
      </WrapItem>
    </Wrap>
  );
};

export default Footer;
