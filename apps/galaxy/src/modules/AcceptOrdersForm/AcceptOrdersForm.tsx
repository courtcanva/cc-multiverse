// import userGetOrders from "../../services/orders/assignedOrders";
// import { useForm, SubmitHandler } from "react-hook-form";
import {
  Checkbox,
  CheckboxGroup,
  Button,
  FormLabel,
  FormControl,
  Container,
} from "@chakra-ui/react";
// import { useState, useEffect, SetStateAction } from "react";
// 上面旧

// import { Button, Container, FormControl, FormLabel } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
// import useOrders, { FormData } from "../../services/orders/useOrders";
import { useForm } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
import useGetOrders, { FormData } from "../../services/orders/useOrders";

// import { Select as ReactSelect, createFilter } from "chakra-react-select";
// 1.首先获取所有上一步筛选出的order的list
// 2.function进项set更改状态（1）click默认状态是unchecked点击一次改变一下
// 3.点击submit以后将状态为 checked的对应的id放入一个list
// 4.将list传入后端
// 5.test
// interface OrderData {
//   id: number;
// }

// interface OrderGroup {
//   label: string;
//   value: number;
// }

// interface FormData {
//   orders: OrderData[];
// }

// const defaultValues: FormData = { orders: [] };

// const ServiceAreaSelection = () => {
// const [, setOptions] = useState<OrderGroup[]>([]);
// // eslint-disable-next-line react-hooks/exhaustive-deps
// const ordersArr: OrderGroup[] = [];
// const { isLoading, handleAcceptOrderSubmit, getOpenOrders } = useGetOrders();
// const { handleSubmit } = useForm<FormData>({
//   defaultValues,
// });

// const submit: SubmitHandler<FormData> = (data) => {
//   handleAcceptOrderSubmit(data);
// };

// useEffect(() => {
//   getOpenOrders().then((result) => {
//     // result.map((order: OrderData) => {
//     //   const label = `${order.id}`;
//     //   return ordersArr.push({ value: order.id, label: label });
//     // });
//     // setOptions(ordersArr);
//   });
// }, [getOpenOrders, ordersArr]);

// return (
//   <Container as="form" onSubmit={handleSubmit(submit)}>
//     <HStack marginTop="48px">
//       <Button type="submit" isLoading={isLoading} variant="primary">
//         Submit
//       </Button>
//     </HStack>
//   </Container>
// );

// 新
interface OrderData {
  id: number;
}
const defaultValues: FormData = { orders: [] };
const AcceptOrders = () => {
  const { isLoading, getOpenOrders, handleAcceptOrderSubmit } = useGetOrders();
  const [lists, setList] = useState([]);
  const [checked, setChecked] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues,
  });
  const change = (e) => {
    setChecked(e);
  };
  const sub = () => {
    // eslint-disable-next-line no-console
    // console.log(data);
    const orders: Array<OrderData> = checked.map((val) => ({ id: val }));
    handleAcceptOrderSubmit(orders).then(() => {
      // console.log(res);
    });
  };
  useEffect(() => {
    getOpenOrders().then((res) => {
      // console.log(res);
      setList(res);
    });
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
