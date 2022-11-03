import { stateList } from "@src/constants";

export const formConfig = {
  username: {
    label: "Email",
    id: "username",
    placeholder: "Enter email",
    type: "email",
  },
  password: {
    label: "Password",
    id: "password",
    placeholder: "Enter password",
    type: "password",
  },
  confirmPassword: {
    label: "Confirm Password",
    id: "confirmPassword",
    placeholder: "Please Confirm your password",
    type: "password",
  },
  businessName: {
    label: "Business Name",
    id: "businessName",
    placeholder: "Enter business name",
  },
  legalEntityName: {
    label: "Legal Name",
    id: "legalName",
    placeholder: "Enter legal name",
  },
  abn: {
    label: "ABN",
    id: "abn",
    placeholder: "Enter ABN number",
  },
  contactNumber: {
    label: "Contact Number",
    id: "contactNumber",
    placeholder: "Enter contact number",
  },
  businessAddress: {
    label: "Company Address Details",
    id: "businessAddress",
    placeholder: "Enter your business address",
  },
  companyPostcode: {
    label: "Postcode",
    id: "companyPostcode",
    placeholder: "Enter postcode",
  },
  companyState: {
    title: "State (AU only)",
    id: "companyState",
    placeholder: "Select from the state list",
    options: stateList,
  },
  firstName: {
    label: "First Name",
    id: "firstName",
    placeholder: "Enter your first name",
  },
  lastName: {
    label: "Last Name",
    id: "lastName",
    placeholder: "Enter your last name",
  },
  phoneNumber: {
    label: "Phone Number",
    id: "phoneNumber",
    placeholder: "Enter your phone number",
  },
  residentialAddress: {
    label: "Residential Address",
    id: "residentialAddress",
    placeholder: "Enter your address",
  },
  residentialPostcode: {
    label: "Postcode",
    id: "residentialPostcode",
    placeholder: "Enter postcode",
  },
  residentialState: {
    title: "State (AU only)",
    id: "residentialState",
    placeholder: "Select from the state list",
    options: stateList,
  },
};
