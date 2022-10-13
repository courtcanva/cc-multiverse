import { Flex, Image, Text } from "@cc/ui-chakra";
import ServiceAreaSelection from "./ServiceAreaSelectionForm";

const SelectServiceArea = () => {
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
          <Text fontSize="24">CourtCanva</Text>
        </Flex>
        <Flex marginTop="12px" marginBottom="48px" flexDir="column" alignItems="center">
          <Text fontSize="23" fontWeight="bold">
            Please select and confirm your service area
          </Text>
        </Flex>
        <Flex width="100%" height="400px" justifyContent="center">
          <ServiceAreaSelection />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SelectServiceArea;
