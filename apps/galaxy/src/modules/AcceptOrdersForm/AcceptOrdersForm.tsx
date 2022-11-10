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

interface OrderIdList {
  id: string;
}

const defaultValues: FormData = { orders: [] };
const AcceptOrders = () => {
  const { isLoading, handleAcceptOrderSubmit, lists } = useGetOrders();
  const [checked, setChecked] = useState([""]);
  const { handleSubmit } = useForm<FormData>({
    defaultValues,
  });

  const change = (e: string[]) => {
    setChecked(e);
  };

  const sub = () => {
    const orders: OrderIdList[] = checked.map((val) => ({ id: val }));
    handleAcceptOrderSubmit(orders);
  };

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
