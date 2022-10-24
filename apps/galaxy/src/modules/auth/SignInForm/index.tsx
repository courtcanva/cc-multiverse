import SignInForm from "./SignInForm";
import { Flex, VStack, Stack, Text } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";

const SignIn = () => {
  return (
    <Flex alignItems="center" height="100%">
      <VStack marginX={{ base: "16px", sm: "16px", md: "200px" }} width={{ lg: "428px" }}>
        <Logo />
        <Text height="72px" fontSize="22px" fontWeight="bold">
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
