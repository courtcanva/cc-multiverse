import { useState } from "react";
import { useForm } from "react-hook-form";
import useGetOrders, { FormData } from "../../services/orders/useOrders";
import {
  Checkbox,
  CheckboxGroup,
  Button,
  FormLabel,
  FormControl,
  Container,
} from "@chakra-ui/react";
// interface OrderData {
//   id: number;
// }

// type OrderList = {
//   contactInformation: string;
//   createdTime: string;
//   customerId: string;
//   id: number;
//   orderId: string;
//   postcode: string;
//   status: string;
//   totalAmount: number;
// };

interface OrderIdList {
  id: string;
}

const defaultValues: FormData = { orders: [] };
const AcceptOrders = () => {
  const { isLoading, handleAcceptOrderSubmit, lists } = useGetOrders();
  // const [lists, setList] = useState([
  //   {
  //     contactInformation: "",
  //     createdTime: "",
  //     customerId: "",
  //     id: 0,
  //     orderId: "",
  //     postcode: "",
  //     status: "",
  //     totalAmount: 0,
  //   },
  // ]);
  const [checked, setChecked] = useState([""]);
  const { handleSubmit } = useForm<FormData>({
    defaultValues,
  });
  const change = (e: string[]) => {
    setChecked(e);
    // console.log(e);
  };
  const sub = () => {
    const orders: OrderIdList[] = checked.map((val) => ({ id: val }));
    handleAcceptOrderSubmit(orders);
    // document.location.reload();
    // console.log(orders);
  };
  // useEffect(() => {
  //   // getOpenOrders().then((res) => {
  //   //   setList(res);
  //   //   console.log(res);
  //   // });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const response = getOpenOrders();
  //   setList(response);
  // }, []);
  return (
    <Container name="suburbs" as="form" onSubmit={handleSubmit(sub)}>
      <FormControl>
        <FormLabel>Select orders</FormLabel>
        <CheckboxGroup value={checked} onChange={change}>
          {lists.map((val) => (
            <Checkbox key={val.id} value={val.id + ""}>
              {val.id}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </FormControl>

      <Button onClick={sub} isLoading={isLoading}>
        submit
      </Button>
    </Container>
  );
};

export default AcceptOrders;
