import SignInForm from "./SignInForm";
import { Flex, VStack, Stack, Text } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";

const SignIn = () => {
  return (
    <Flex width="100%" height="100%" paddingTop="16px">
      <VStack marginX={{ base: "16px", lg: "200px" }}>
        <Logo />
        <Text height="72px" fontSize="22" fontWeight="bold">
          Sign in to CourtCanva Franchisee
        </Text>
        <Stack width="100%">
          <SignInForm />
        </Stack>
      </VStack>
    </Flex>
  );
};

export default SignIn;
