import SignInForm from "./SignInForm";
import { VStack, Stack, Text } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";

const SignIn = () => {
  return (
    <VStack height="calc(100vh - 30px)" justifyContent="center">
      <Logo />
      <Text height="72px" fontSize="22" fontWeight="bold">
        Sign in to CourtCanva Franchisee
      </Text>
      <Stack width="500px">
        <SignInForm />
      </Stack>
    </VStack>
  );
};

export default SignIn;
