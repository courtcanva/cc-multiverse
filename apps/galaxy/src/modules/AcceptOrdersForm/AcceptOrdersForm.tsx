import { useState } from "react";
import { useForm } from "react-hook-form";
import useGetOrders, { FormData } from "../../services/orders/useOrders";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import {
  Flex,
  // Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  // Container,
  // Button,
  // FormControl,
  // FormLabel,
} from "@cc/ui-chakra";

interface OrderIdList {
  id: string;
}

const AcceptOrder = () => {
  const { isLoading, handleAcceptOrderSubmit, lists } = useGetOrders();
  const [checked, setChecked] = useState([""]);

  const change = (e: string[]) => {
    setChecked(e);
  };

  const sub = () => {
    const orders: OrderIdList[] = checked.map((val) => ({ id: val }));
    handleAcceptOrderSubmit(orders);
  };
  return (
    <Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>orderId</Th>
              <Th>status</Th>
              <Th>contactInformation</Th>
              <Th>details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {lists.map((val) => (
              <Tr key={val.id}>
                <Td>
                  <CheckboxGroup value={checked} onChange={change}>
                    <Checkbox key={val.id} value={val.id + ""}>
                      {val.id}
                    </Checkbox>
                  </CheckboxGroup>
                </Td>
                <Td> {val.orderId}</Td>
                <Td>{val.status}</Td>
                <Td>{val.contactInformation}</Td>
              </Tr>
            ))}
          </Tbody>
          <Button onClick={sub} isLoading={isLoading}>
            submit
          </Button>
        </Table>
      </TableContainer>
    </Flex>
  );
};

//   return (
//     <Container name="suburbs" as="form" onSubmit={handleSubmit(sub)}>
//       <FormControl>
//         <FormLabel>Select orders</FormLabel>
//         <CheckboxGroup value={checked} onChange={change}>
//           {lists.map((val) => (
//             <Checkbox key={val.id} value={val.id + ""}>
//               {val.id}
//             </Checkbox>
//           ))}
//         </CheckboxGroup>
//       </FormControl>

//       <Button onClick={sub} isLoading={isLoading}>
//         submit
//       </Button>
//     </Container>
//   );
// };

export default AcceptOrder;

// import { SetStateAction, useState } from "react";
// import { useForm } from "react-hook-form";
// import useGetOrders, { FormData } from "../../services/orders/useOrders";
// import {
//   Checkbox,
//   CheckboxGroup,
//   Button,
//   FormLabel,
//   FormControl,
//   Container,
// } from "@chakra-ui/react";

// interface OrderIdList {
//   id: string;
// }

// const defaultValues: FormData = { orders: [] };
// const AcceptOrders = () => {
//   const { isLoading, handleAcceptOrderSubmit, lists } = useGetOrders();
//   // const [checked, setChecked] = useState([""]);
//   const [checkedItems, setCheckedItems] = useState([false, false]);
//   const { handleSubmit } = useForm<FormData>({
//     defaultValues,
//   });

//   const allChecked = checkedItems.every(Boolean);
//   const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

//   // const change = (e: string[]) => {
//   //   setChecked(e);
//   // };
//   const change = (e) => {
//     setCheckedItems(e);
//   };

//   const sub = () => {
//     const orders: OrderIdList[] = checkedItems.map((val) => ({ id: val }));
//     handleAcceptOrderSubmit(orders);
//   };

//   return (
//     <Container name="suburbs" as="form" onSubmit={handleSubmit(sub)}>
//       <FormControl>
//         <FormLabel>Select orders</FormLabel>
//         <Checkbox isChecked={allChecked} isIndeterminate={isIndeterminate} onChange={change}>
//           {lists.map((val) => (
//             <Checkbox
//               key={val.id}
//               value={val.id + ""}
//               isChecked={checkedItems[0]}
//               onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
//             >
//               {val.id}
//             </Checkbox>
//           ))}
//         </Checkbox>
//       </FormControl>

//       <Button onClick={sub} isLoading={isLoading}>
//         submit
//       </Button>
//     </Container>
//   );
// };

// export default AcceptOrders;
