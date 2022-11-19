import React from "react";
import { Button, Checkbox, Stack } from "@cc/ui-chakra";
import useGetOrders from "@src/services/orders/useOrders";
import dayjs from "dayjs";
import { DataTable } from "@cc/ui-chakra";
import { createColumnHelper } from "@tanstack/react-table";

const OpenOrdersList = () => {
  const { lists } = useGetOrders("pending_orders");

  type Orders = {
    id: number;
    createdTime: string;
    suburb: string;
    postcode: string;
    totalAmount: number;
    designInformation: string;
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
    columnHelper.accessor("suburb", {
      cell: (info) => info.getValue(),
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
      cell: (info) => (
        <Button variant="secondary" value={info.getValue()}>
          detail
        </Button>
      ),
      header: "details",
    }),
  ];
  return (
    <Stack>
      <DataTable columns={columns} data={lists} />
    </Stack>
  );
};

export default OpenOrdersList;
