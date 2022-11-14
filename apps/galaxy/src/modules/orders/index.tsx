import OpenOrders from "./OpenOrders";
import { Grid, GridItem, Image, Text } from "@cc/ui-chakra";

const Orders = () => {
  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateColumns={"263px 945px"}
      h="920px"
      gap="1"
      // color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="5px" bg="rgba(54, 73, 93, 0.16)" area={"nav"}>
        Nav
      </GridItem>
      <GridItem pl="5px" area={"main"}>
        <OpenOrders />
      </GridItem>
    </Grid>
    // <Flex>
    //   <Text fontSize="23" fontWeight="bold">
    //     Open Orders
    //   </Text>
    //   <OpenOrders />
    // </Flex>
    // <Flex>
    //   <Flex>
    //   </Flex>
    //   <Flex></Flex>
    // </Flex>
  );
};

export default Orders;
