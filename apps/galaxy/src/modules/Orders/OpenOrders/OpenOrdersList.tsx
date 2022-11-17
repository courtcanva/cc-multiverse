import React from "react";
import { Button, ChakraProvider, Checkbox, Stack } from "@chakra-ui/react";
import useGetOrders from "@src/services/orders/useOrders";
import dayjs from "dayjs";
import { DataTable } from "./DataTable";
import { createColumnHelper, RowSelection } from "@tanstack/react-table";
import { info } from "next/dist/build/output/log";

const OpenOrdersList = () => {
  //   const { lists } = useGetOrders();

  const lists = [
    {
      id: 11,
      orderId: "110",
      customerId: "103",
      status: "ASSIGNED_PENDING",
      contactInformation: '{"name": "Alex", "phone": "0404123456"}',
      designInformation:
        '{"design": {"courtSize": {"name": "court size", "width": 50, "length": 100, "lengthOfCorner": 2, "threePointLine": 3, "lineBorderWidth": 3, "sideBorderWidth": 3, "threePointRadius": 5, "centreCircleRadius": 10, "restrictedAreaWidth": 3, "restrictedAreaLength": 3}, "tileColor": [{"color": "red", "location": "l"}], "designName": "design name 1"}, "quotation": "quotation", "constructionDraw": "https://url", "quotationDetails": [{"color": "red", "quantity": 1}], "isNeedLevelGround": true, "constructionAddress": {"city": "Melbourne", "line1": "1/10 Collins Street", "line2": "", "state": "VIC", "country": "Australia", "postalCode": "3000"}}',
      createdTime: "2022-10-01T20:01:16.395+10:00",
      postcode: "3000",
      totalAmount: 999.0,
      suburb: null,
    },
    {
      id: 10,
      orderId: "109",
      customerId: "102",
      status: "ASSIGNED_PENDING",
      contactInformation: '{"name": "Alex", "phone": "0404123456"}',
      designInformation: '{"name": "draft 1"}',
      createdTime: "2022-11-09T21:01:16.395+11:00",
      postcode: "3003",
      totalAmount: 999.0,
      suburb: null,
    },
    {
      id: 12,
      orderId: "111",
      customerId: "103",
      status: "ASSIGNED_PENDING",
      contactInformation: '{"name": "Alex", "phone": "0404123456"}',
      designInformation:
        '{"design": {"courtSize": {"name": "court size", "width": 50, "length": 100, "lengthOfCorner": 2, "threePointLine": 3, "lineBorderWidth": 3, "sideBorderWidth": 3, "threePointRadius": 5, "centreCircleRadius": 10, "restrictedAreaWidth": 3, "restrictedAreaLength": 3}, "tileColor": [{"color": "red", "location": "l"}], "designName": "design name 1"}, "quotation": "quotation", "constructionDraw": "https://url", "quotationDetails": [{"color": "red", "quantity": 1}], "isNeedLevelGround": true, "constructionAddress": {"city": "Melbourne", "line1": "1/10 Collins Street", "line2": "", "state": "VIC", "country": "Australia", "postalCode": "3000"}}',
      createdTime: "2022-10-01T20:01:16.395+10:00",
      postcode: "3000",
      totalAmount: 999.0,
      suburb: null,
    },
    {
      id: 9,
      orderId: "108",
      customerId: "102",
      status: "ASSIGNED_PENDING",
      contactInformation: '{"name": "Alex", "phone": "0404123456"}',
      designInformation:
        '{"design": {"courtSize": {"name": "court size", "width": 50, "length": 100, "lengthOfCorner": 2, "threePointLine": 3, "lineBorderWidth": 3, "sideBorderWidth": 3, "threePointRadius": 5, "centreCircleRadius": 10, "restrictedAreaWidth": 3, "restrictedAreaLength": 3}, "tileColor": [{"color": "red", "location": "l"}], "designName": "design name 1"}, "quotation": "quotation", "constructionDraw": "https://url", "quotationDetails": [{"color": "red", "quantity": 1}], "isNeedLevelGround": true, "constructionAddress": {"city": "Melbourne", "line1": "1/10 Collins Street", "line2": "", "state": "VIC", "country": "Australia", "postalCode": "3000"}}',
      createdTime: "2022-10-10T21:01:16.395+11:00",
      postcode: "3003",
      totalAmount: 999.0,
      suburb: null,
    },
  ];

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
            setCheckedItems([
              e.target.checked,
              e.target.checked,
              e.target.checked,
              e.target.checked,
            ]);
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
  return (
    <Stack>
      <ChakraProvider>
        <DataTable columns={columns} data={lists} />
      </ChakraProvider>
    </Stack>
  );
};

export default OpenOrdersList;
