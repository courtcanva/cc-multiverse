import React from "react";
import { Button, Checkbox, DataTable, Stack } from "@cc/ui-chakra";
import useGetOrders, { DesignInformation } from "@src/services/orders/useOrders";
import dayjs from "dayjs";
import { createColumnHelper } from "@tanstack/react-table";

const OpenOrdersList = () => {
  const { lists } = useGetOrders("pending_orders");

  type Orders = {
    id: number;
    createdTime: string;
    postcode: string;
    totalAmount: number;
    designInformation: DesignInformation;
  };

  const columnHelper = createColumnHelper<Orders>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <Checkbox key={info.getValue()} value={info.getValue()}></Checkbox>,
      header: () => <Checkbox></Checkbox>,
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
  return (
    <Stack
      border="1px"
      borderBottom="0px"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
    >
      <DataTable columns={columns} data={lists} />
    </Stack>
  );
};

export default OpenOrdersList;
