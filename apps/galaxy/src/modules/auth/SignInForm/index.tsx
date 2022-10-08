import SignInForm from "./SignInForm";
import { Flex, Image, Text } from "@cc/ui-chakra";

const SignIn = () => {
  return (
    <Flex height="calc(100vh - 30px)" justifyContent="center" alignItems="center">
      <Flex width="500px" flexDir="column" alignItems="center">
        <Flex flexDir="column" alignItems="center">
          <Image
            marginBottom="24px"
            boxSize="104px"
            alt="dashboard-logo-192x192"
            src="/assets/dashboard-logo-192x192.png"
          />
          <Text fontSize="24" color="brand.secondary">
            CourtCanva
          </Text>
        </Flex>
        <Flex marginTop="12px" marginBottom="48px" flexDir="column" alignItems="center">
          <Text variant="primary" fontWeight="700">
            Sign in to CourtCanva Franchisee
          </Text>
        </Flex>
        <Flex width="100%" height="400px" justifyContent="center">
          <SignInForm />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignIn;
