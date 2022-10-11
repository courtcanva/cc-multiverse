import { Box } from "@cc/ui-chakra";

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
    <Box as="footer" display="flex" height="30px" justifyContent="center" fontSize="sm" gap="80px">
      <Box>
        ©{new Date().getFullYear()}
        {FooterContent.copyRight}
      </Box>
      <Box>{FooterContent.policy}</Box>
      <Box>{FooterContent.conditions}</Box>
      <Box>{FooterContent.contact}</Box>
    </Box>
  );
};

export default Footer;
