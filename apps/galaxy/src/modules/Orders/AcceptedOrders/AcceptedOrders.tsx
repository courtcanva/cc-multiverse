import React from "react";
import { DataTable, Stack, VStack } from "@cc/ui-chakra";
import useGetOrders, { Order } from "@src/services/orders/useAcceptedOrders";
import dayjs from "dayjs";
import { createColumnHelper } from "@tanstack/react-table";
import Details from "./AcceptedOrderDetals";

const AcceptedOrdersList = () => {
  const { lists } = useGetOrders();
  const columnHelper = createColumnHelper<Order>();
  const columns = [
    columnHelper.accessor("createdTime", {
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
      header: "date",
    }),
    columnHelper.accessor("contactInformation", {
      cell: (info) => info.getValue()?.name,
      header: "name",
    }),
    columnHelper.accessor("contactInformation", {
      cell: (info) => info.getValue()?.phone,
      header: "phone",
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
  return (
    <VStack>
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

export default AcceptedOrdersList;
