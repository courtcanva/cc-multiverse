import Head from "../utils/Head";
import { NextPage } from "next";
import AcceptedOrders from "@src/modules/Orders/AcceptedOrders";

const AcceptedOrdersPage: NextPage = () => {
  return (
    <Head title="OpenOrders">
      <AcceptedOrders />
    </Head>
  );
};

export default AcceptedOrdersPage;
