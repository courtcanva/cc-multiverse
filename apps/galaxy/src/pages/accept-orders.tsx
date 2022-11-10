import type { NextPage } from "next";
import Head from "../utils/Head";
import AcceptOrders from "../modules/AcceptOrdersForm/index";

const OrdersPage: NextPage = () => {
  return (
    <Head title="Orders">
      <AcceptOrders />
    </Head>
  );
};

export default OrdersPage;
