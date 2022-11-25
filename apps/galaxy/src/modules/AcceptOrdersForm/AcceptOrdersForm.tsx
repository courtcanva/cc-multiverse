import React from "react";
import { Button, Checkbox, DataTable, Stack } from "@cc/ui-chakra";
import useGetOrders from "@src/services/orders/useOrders";
import dayjs from "dayjs";
import { createColumnHelper } from "@tanstack/react-table";
import { Order } from "@src/services/orders/useOrders";
import { HStack, VStack } from "@cc/ui-chakra";

const OpenOrdersList = () => {
  const { isLoading, handleAcceptOrderSubmit, lists } = useGetOrders();
  // type Orders = {
  //   checked: boolean;
  //   id: number;
  //   createdTime: string;
  //   postcode: string;
  //   totalAmount: number;
  //   designInformation: DesignInformation;
  // };
  const columnHelper = createColumnHelper<Order>();
  const [checkedItems, setCheckedItems] = React.useState([false]);
  React.useEffect(() => {
    (checkedItems.length = lists.length), checkedItems.fill(false, 0, lists.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
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
  const sub = () => {
    const arr = checkedItems
      .map((val, i) => {
        if (val) return i;
      })
      .filter((val) => val !== undefined);
    const idArr = lists
      ?.map((val: Order, i: number) => {
        const bool = arr.find((val) => val == i);
        if (bool != undefined) {
          return val.id;
        }
      })
      .filter((val: number | undefined) => val);
    handleAcceptOrderSubmit(idArr);
    (checkedItems.length = lists.length), checkedItems.fill(false, 0, lists.length);
  };

  return (
    <VStack>
      <HStack left={206}>
        <Button onClick={sub} isLoading={isLoading} variant="secondary" left={190}>
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
