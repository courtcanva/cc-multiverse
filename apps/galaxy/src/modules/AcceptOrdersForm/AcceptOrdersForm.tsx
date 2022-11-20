import React from "react";
import { Button, Checkbox, Stack } from "@chakra-ui/react";
import useGetOrders from "@src/services/orders/useOrders";
import dayjs from "dayjs";
import { DataTable } from "@cc/ui-chakra/src/general/Table/DataTable";
import { createColumnHelper } from "@tanstack/react-table";

const OpenOrdersList = () => {
  const { isLoading, handleAcceptOrderSubmit, lists } = useGetOrders();
  type Orders = {
    checked: boolean;
    contactInformation: string;
    designInformation: string;
    createdTime: string;
    customerId: string;
    id: number;
    orderId: string;
    suburb: string;
    postcode: string;
    status: string;
    totalAmount: number;
  };
  const columnHelper = createColumnHelper<Orders>();
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
    columnHelper.accessor("suburb", {
      cell: (info) => info.getValue(),
      header: "suburb",
    }),
    columnHelper.accessor("postcode", {
      cell: (info) => "$" + info.getValue(),
      header: "postcode",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("totalAmount", {
      cell: (info) => info.getValue(),
      header: "total amount",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("designInformation", {
      cell: (info) => (
        <Button colorScheme="teal" size="sm" value={info.getValue()}>
          detail
        </Button>
      ),
      header: "details",
    }),
  ];
  const sub = () => {
    const arr = checkedItems
      .map((val, i) => {
        if (val) return i;
      })
      .filter((val) => val !== undefined);
    const idArr = lists
      ?.map((val: any, i: number) => {
        const bool = arr.find((val) => val == i);
        // console.log(bool)
        if (bool != undefined) {
          return val.id;
        }
      })
      .filter((val: number | undefined) => val);
    handleAcceptOrderSubmit(idArr);
    (checkedItems.length = lists.length), checkedItems.fill(false, 0, lists.length);
  };

  return (
    <Stack
      border="1px"
      borderBottom="0px"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
    >
      <DataTable columns={columns} data={lists} />
      <Button onClick={sub} isLoading={isLoading}>
        submit
      </Button>
    </Stack>
  );
};

export default OpenOrdersList;
