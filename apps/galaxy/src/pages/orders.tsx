import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import Orders from "../modules/orders/index";

const OrdersPage: NextPage = () => {
  return (
    <HeaderLayout title="Orders">
      <Orders />
    </HeaderLayout>
  );
};

export default OrdersPage;
