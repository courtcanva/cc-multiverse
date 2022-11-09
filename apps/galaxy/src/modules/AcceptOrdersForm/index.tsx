import AcceptOrders from "./AcceptOrdersForm";
import { Text } from "@cc/ui-chakra";
const AcceptedOrders = () => {
  return (
    <>
      <Text fontSize="23" fontWeight="bold">
        Open Orders
      </Text>
      <AcceptOrders />
    </>
  );
};
export default AcceptedOrders;
