import React from "react";
import { Button, ChakraProvider, Checkbox, Stack } from "@chakra-ui/react";
import useGetOrders from "@src/services/orders/useOrders";
import { OrderIdList } from "@src/services/orders/useOrders";
// import dayjs from "dayjs";
// import { DataTable } from "./DataTable";
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
      // cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
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
          return val.id; //  {id:val.}
        }
      })
      .filter((val: number | undefined) => val);
    // console.log(arr);
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
      {/* <ChakraProvider> */}
      <DataTable columns={columns} data={lists} />
      <Button onClick={sub} isLoading={isLoading}>
        submit
      </Button>
      {/* </ChakraProvider> */}
    </Stack>
  );
};

export default OpenOrdersList;

// import React, { useState } from "react";
// import { Button, ChakraProvider, Checkbox, Stack } from "@chakra-ui/react";
// import useGetOrders from "@src/services/orders/useOrders";
// // import dayjs from "dayjs";
// import { DataTable } from "@cc/ui-chakra/src/general/Table/DataTable";
// import { createColumnHelper } from "@tanstack/react-table";
// import { info } from "next/dist/build/output/log";

// const AcceptOrders = () => {
//   // const { lists } = useGetOrders("pending_orders");
//   type Orders = {
//     id: number;
//     createdTime: string;
//     suburb: string;
//     postcode: string;
//     totalAmount: number;
//     designInformation: string;
//   };
//   const columnHelper = createColumnHelper<Orders>();
//   const { isLoading, handleAcceptOrderSubmit, lists, setLists } = useGetOrders();
//   // const [checkedItems, setCheckedItems] = React.useState([false, false, false, false]);
//   // const allChecked = checkedItems.every(Boolean);
//   // const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
//   const [isAllChecked, setAllChecked] = useState(false);
//   React.useMemo(() => {
//     const allBool = lists.every((val) => val.checked === true);
//     setAllChecked(allBool);
//   }, [lists]);
//   const columns = [
//     columnHelper.accessor("id", {
//       cell: (info) => (
//         <Checkbox
//           onChange={(e) => {
//             lists[info.row.index].checked = e.target.checked;
//             // checkedItems[info.row.index] = e.target.checked;
//             setLists([...lists]);
//           }}
//           isChecked={lists[info.row.index].checked}
//         ></Checkbox>
//       ),
//       header: () => (
//         <Checkbox
//           isChecked={isAllChecked}
//           onChange={(e) => {
//             const arr = lists.map((val) => {
//               val.checked = e.target.checked;
//               return val;
//             });
//             setLists([...arr]);
//           }}
//         ></Checkbox>
//       ),
//     }),
//     // columnHelper.accessor("createdTime", {
//     //   cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
//     //   header: "date",
//     // }),
//     columnHelper.accessor("suburb", {
//       cell: (info) => info.getValue(),
//       header: "suburb",
//     }),
//     columnHelper.accessor("postcode", {
//       cell: (info) => "$" + info.getValue(),
//       header: "postcode",
//       meta: {
//         isNumeric: true,
//       },
//     }),
//     columnHelper.accessor("totalAmount", {
//       cell: (info) => info.getValue(),
//       header: "total amount",
//       meta: {
//         isNumeric: true,
//       },
//     }),
//     columnHelper.accessor("designInformation", {
//       cell: (info) => (
//         <Button colorScheme="teal" size="sm" value={info.getValue()}>
//           detail
//         </Button>
//       ),
//       header: "details",
//     }),
//   ];
//   return (
//     <Stack>
//       <ChakraProvider>
//         <DataTable columns={columns} data={lists} />
//         <Button onClick={handleAcceptOrderSubmit} isLoading={isLoading}>
//           submit
//         </Button>
//       </ChakraProvider>
//     </Stack>
//   );
// };

// export default AcceptOrders;
