import { Text, Stack, Flex } from "@cc/ui-chakra";
import OpenOrdersList from "@src/modules/Orders/OpenOrders/OpenOrdersList";

const OpenOrders = () => {
  return (
    <Flex>
      <Stack width="300px">
        <Text>Sidebar</Text>
      </Stack>

      {/* <Text fontSize="20" fontWeight="bold"> */}
      {/*   Open Orders List */}
      {/* </Text> */}
      <OpenOrdersList />
    </Flex>
  );
};

export default OpenOrders;
