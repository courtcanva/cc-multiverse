import { Flex, Stack, Text } from "@cc/ui-chakra";
import OpenOrdersList from "@src/modules/Orders/OpenOrders/OpenOrdersList";
import Logo from "@src/components/Logo";

const OpenOrders = () => {
  return (
    <Flex>
      <Stack width="300px">
        <Text>Sidebar</Text>
      </Stack>
      <OpenOrdersList />
    </Flex>
  );
};

export default OpenOrders;
