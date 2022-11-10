import type { NextPage } from "next";
import Head from "../utils/Head";
import Orders from "../modules/orders/index";

const OrdersPage: NextPage = () => {
  return (
    <Head title="Orders">
      <Orders />
    </Head>
  );
};

export default OrdersPage;
