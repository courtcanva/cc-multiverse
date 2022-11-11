import Head from "../utils/Head";
import { NextPage } from "next";
import OpenOrders from "@src/modules/DisplayOrders/OpenOrders";

const OpenOrdersPage: NextPage = () => {
  return (
    <Head title="OpenOrders">
      <OpenOrders />
    </Head>
  );
};

export default OpenOrdersPage;
