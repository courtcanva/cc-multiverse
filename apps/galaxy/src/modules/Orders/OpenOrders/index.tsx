import { Flex, Stack, Text } from "@cc/ui-chakra";
import OpenOrdersList from "@src/modules/Orders/OpenOrders/OpenOrdersList";
import Logo from "@src/components/Logo";

const OpenOrders = () => {
  return (
    <Flex>
      <Stack width="300px">
        <Text>Sidebar</Text>
      </Stack>

      {/* <Text fontSize="20" fontWeight="bold"> */}
      {/*   Open Orders List */}
      {/* </Text> */}
      {/* <Logo showText={false} /> */}
      {/* <Text height="72px" fontSize="22px" fontWeight="bold"> */}
      {/*   CourtCanva */}
      {/* </Text> */}
      <OpenOrdersList />
    </Flex>
  );
};

export default OpenOrders;
