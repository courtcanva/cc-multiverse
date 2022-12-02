import React from "react";
import { Button, Checkbox, DataTable, Stack, HStack, VStack } from "@cc/ui-chakra";
import useGetOrders, { Order } from "@src/services/orders/useOrders";
import dayjs from "dayjs";
import { createColumnHelper } from "@tanstack/react-table";
import Details from "./Details";

const OpenOrdersList = () => {
  const { isLoading, handleAcceptOrderSubmit, lists } = useGetOrders();
  const columnHelper = createColumnHelper<Order>();
  const [checkedItems, setCheckedItems] = React.useState([false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  React.useEffect(() => {
    (checkedItems.length = lists.length), checkedItems.fill(false, 0, lists.length);
  }, [lists]);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => (
        <Checkbox
          onChange={(e) => {
            const list = checkedItems;
            checkedItems[info.row.index] = e.target.checked;
            setCheckedItems([...list]);
          }}
          isChecked={checkedItems[info.row.index]}
        />
      ),
      header: () => (
        <Checkbox
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) => {
            setCheckedItems([...checkedItems.fill(e.target.checked, 0, lists.length)]);
          }}
        />
      ),
    }),
    columnHelper.accessor("createdTime", {
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
      header: "date",
    }),
    columnHelper.accessor("designInformation", {
      cell: (info) => info.getValue().constructionAddress?.city,
      header: "suburb",
    }),
    columnHelper.accessor("postcode", {
      cell: (info) => info.getValue(),
      header: "postcode",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("totalAmount", {
      cell: (info) => "$" + info.getValue(),
      header: "total amount",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("designInformation", {
      cell: (info) => <Details {...info} />,
      header: "details",
      id: "details",
    }),
  ];

  const onSubmitSelectedOrders = () => {
    const selectedOrderIds = lists
      .filter((_item, index) => checkedItems.at(index))
      .map((item) => item.id);
    handleAcceptOrderSubmit(selectedOrderIds);
    (checkedItems.length = lists.length), checkedItems.fill(false, 0, lists.length);
  };

  return (
    <VStack>
      <HStack alignSelf={"flex-end"}>
        <Button onClick={onSubmitSelectedOrders} isLoading={isLoading} variant="secondary">
          Accept Order(s)
        </Button>
        <Button variant="primary" color="white">
          Reject Order(s)
        </Button>
      </HStack>
      <Stack
        border="1px"
        borderBottom="0px"
        borderColor="gray.200"
        borderRadius="lg"
        overflow="hidden"
      >
        <DataTable columns={columns} data={lists} />
      </Stack>
    </VStack>
  );
};

export default OpenOrdersList;
