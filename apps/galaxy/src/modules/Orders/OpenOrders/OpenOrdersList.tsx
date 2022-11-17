import React from "react";
import { Button, ChakraProvider, Checkbox, Stack } from "@chakra-ui/react";
import useGetOrders from "@src/services/orders/useOrders";
import dayjs from "dayjs";
import { DataTable } from "./DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { info } from "next/dist/build/output/log";

const OpenOrdersList = () => {
  const {lists} = useGetOrders();

  type Orders = {
    id: number;
    createdTime: string;
    suburb: string;
    postcode: string;
    totalAmount: number;
    designInformation: string;
  };

  const columnHelper = createColumnHelper<Orders>();

  const [checkedItems, setCheckedItems] = React.useState([false, false, false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => (
        console.log("info=", info),
          <Checkbox
            isChecked = {checkedItems[info.row.index]}
            onChange = (e) => (
    let list = checkedItems
  list[info.row.index] = e.target.checked
  setCheckedItems(list)
)
  key={info.getValue()}
  value={info.getValue()}
  />
)
),
  header
    :
    () => (
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
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
]
  ;

  return (
    <Stack>
      <ChakraProvider>
        <DataTable columns={columns} data={lists}/>
      </ChakraProvider>
    </Stack>
  );
};

export default OpenOrdersList;
