import { useEffect, useState } from "react";
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
interface OrderData {
  id: number;
}
const defaultValues: FormData = { orders: [] };
const AcceptOrders = () => {
  const { isLoading, getOpenOrders, handleAcceptOrderSubmit } = useGetOrders();
  const [lists, setList] = useState([]);
  const [checked, setChecked] = useState([]);
  const { handleSubmit } = useForm<FormData>({
    defaultValues,
  });
  const change = (e: Array<string | number>) => {
    setChecked(e);
  };
  const sub = () => {
    const orders = checked.map((val) => ({ id: val }));
    handleAcceptOrderSubmit(orders).then();
    document.location.reload();
  };
  useEffect(() => {
    getOpenOrders().then((res) => {
      setList(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container name="suburbs" as="form" onSubmit={handleSubmit(sub)}>
      <FormControl>
        <FormLabel>Select Area Filter Mode</FormLabel>
        <CheckboxGroup value={checked} onChange={change}>
          {lists.map((val: OrderData) => (
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
