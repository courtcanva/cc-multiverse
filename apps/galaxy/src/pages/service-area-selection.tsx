import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import ServiceAreaSelection from "@src/modules/auth/ServiceAreaSelectionForm/index";

const ServiceAreaSelectionPage: NextPage = () => {
  return (
    <HeaderLayout title="Select Service Area">
      <ServiceAreaSelection />
    </HeaderLayout>
  );
};

export default ServiceAreaSelectionPage;
