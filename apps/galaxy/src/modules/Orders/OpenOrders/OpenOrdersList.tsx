import React from "react";
import { Button, Checkbox, DataTable, Stack } from "@cc/ui-chakra";
import useGetOrders, { Order } from "@src/services/orders/useOrders";
import dayjs from "dayjs";
import { createColumnHelper } from "@tanstack/react-table";
import { HStack, VStack } from "@cc/ui-chakra";

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
        ></Checkbox>
      ),
      header: () => (
        <Checkbox
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) => {
            setCheckedItems([...checkedItems.fill(e.target.checked, 0, lists.length)]);
          }}
        ></Checkbox>
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
      cell: () => <Button variant="secondary">detail</Button>,
      header: "details",
      id: "details",
    }),
  ];

  const Submit = () => {
    const Orders = checkedItems
      .map((checked, index) => {
        if (checked) return index;
      })
      .filter((checked) => checked !== undefined);
    const orderIds = lists
      ?.map((checkedOrders: Order, index: number) => {
        const status = Orders.find((val) => val == index);
        if (status != undefined) {
          return checkedOrders.id;
        }
      })
      .filter((value: number | undefined) => value);
    handleAcceptOrderSubmit(orderIds);
    (checkedItems.length = lists.length), checkedItems.fill(false, 0, lists.length);
  };

  return (
    <VStack>
      <HStack>
        <Button onClick={Submit} isLoading={isLoading} variant="secondary" left={190}>
          Accept Order(s)
        </Button>
        <Button variant="primary" color="white" left={190}>
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
