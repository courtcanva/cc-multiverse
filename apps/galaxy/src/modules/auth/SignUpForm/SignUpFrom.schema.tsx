import * as yup from "yup";
import { phoneNumberRegex, postcodeRegex, abnRegex } from "@src/constants";

const stateList = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"];

export const SignUpFormInfoSchema = yup.object().shape({
  email: yup.string().required("The email is required").email("Invalid email address"),
  password: yup.string().required("Please confirm your password").min(8),
  confirmPassword: yup
    .string()
    .required("The confirm password is required")
    .min(8)
    .oneOf([yup.ref("password"), null], "Passwords don't match."),
  businessName: yup
    .string()
    .required("The business name is required")
    .min(1, "Business name must contain at least 1 character(s)"),
  legalName: yup
    .string()
    .required("The legal name is required")
    .min(1, "Legal name must contain at least 1 character(s)"),
  abn: yup
    .string()
    .required("The ABN number is required")
    .matches(abnRegex, "The ABN number should be 11 digit"),
  contactNumber: yup
    .string()
    .required("The contact number is required")
    .matches(
      phoneNumberRegex,
      "The contact number does not match required format. Example: 0411111111"
    ),
  businessAddress: yup
    .string()
    .required("The business address is required")
    .min(10, "You need to provide a valid business address"),
  companyPostcode: yup
    .string()
    .required("The postcode is required")
    .matches(postcodeRegex, "The postcode does not match the required format. Example: 4000"),
  companyState: yup.string().required("Please select a state").oneOf(stateList),
  firstName: yup
    .string()
    .required("The first name is required")
    .min(1, "First name must contain at least 1 character(s)"),
  lastName: yup
    .string()
    .required("The last name is required")
    .min(1, "Last name must contain at least 1 character(s)"),
  phoneNumber: yup
    .string()
    .required("The contact number is required")
    .matches(
      phoneNumberRegex,
      "The phone number does not match required format. Example: 0411111111"
    ),
  residentialAddress: yup
    .string()
    .required("The esidential address is required")
    .min(10, "You need to provide a valid residential address"),
  residentialPostcode: yup
    .string()
    .required("The postcode is required")
    .matches(postcodeRegex, "The postcode does not match the required format. Example: 4000"),
  residentialState: yup.string().required("Please select a state").oneOf(stateList),
});
