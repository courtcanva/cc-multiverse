import SignInForm from "./SignInForm";

import { Flex, Image, Text } from "@chakra-ui/react";

const SignIn = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex width="100%" flexDir="column" alignItems="center">
        <Flex flexDir="column" alignItems="center">
          <Image
            boxSize="104px"
            alt="dashboard-logo-192x192"
            src="/assets/dashboard-logo-192x192.png"
          />
          <Text fontSize="24" marginTop="24px" color="brand.secondary">
            CourtCanva
          </Text>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Text fontSize="20" marginTop="24px" marginBottom="48px" fontWeight="700">
            Sign in to CourtCanva Franchisee
          </Text>
        </Flex>
        <Flex width="360px" height="400px">
          <SignInForm />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignIn;
