import type { NextPage } from "next";
import Head from "../utils/Head";
import ServiceAreaSelection from "@src/modules/ServiceAreaSelectionForm/index";

const ServiceAreaSelectionPage: NextPage = () => {
  return (
    <Head title="Select Service Area">
      <ServiceAreaSelection />
    </Head>
  );
};

export default ServiceAreaSelectionPage;
