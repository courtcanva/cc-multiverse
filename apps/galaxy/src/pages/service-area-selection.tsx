import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import ServiceAreaSelection from "@src/modules/auth/ServiceAreaSelection/index";

const ServiceAreaSelectionPage: NextPage = () => {
  return (
    <HeaderLayout title="Select Service Area">
      <ServiceAreaSelection />
    </HeaderLayout>
  );
};

export default ServiceAreaSelectionPage;
