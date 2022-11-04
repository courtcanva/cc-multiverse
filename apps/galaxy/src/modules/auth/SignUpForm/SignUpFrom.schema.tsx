import * as yup from "yup";
import YupPassword from "yup-password";
import "yup-phone-lite";
import { stateList } from "@src/constants";

// eslint-disable-next-line new-cap
YupPassword(yup);

export const RegisterInfoFormSchema = yup
  .object({
    username: yup.string().required("The email is required").email("Invalid email address"),
    password: yup
      .string()
      .required("Please confirm your password")
      .min(
        8,
        "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number"
      )
      .minUppercase(
        1,
        "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number"
      )
      .minNumbers(
        1,
        "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number"
      ),
    confirmPassword: yup
      .string()
      .required("The confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords don't match."),
  })
  .required();

export const CompanyInfoFormSchema = yup
  .object({
    businessName: yup
      .string()
      .required("The business name is required")
      .min(1, "Business name must contain at least 1 character(s)"),
    legalEntityName: yup
      .string()
      .required("The legal name is required")
      .min(1, "Legal name must contain at least 1 character(s)"),
    abn: yup
      .string()
      .required("The ABN number is required")
      .matches(/^[0-9]+$/, "The ABN must be only digits")
      .length(11, "The ABN number must be 11 digits"),
    contactNumber: yup
      .string()
      .required("The contact number is required")
      .phone("AU", "Please enter a valid AU phone number"),
    businessAddress: yup
      .string()
      .required("The business address is required")
      .min(10, "You need to provide a valid business address"),
    companyPostcode: yup
      .string()
      .length(4, "The postcode does not match the required format. Example: 4000")
      .required("The postcode is required")
      .matches(/^[0-9]+$/, "The postcode must be only digits"),
    companyState: yup.string().required("Please select a state").oneOf(stateList),
  })
  .required();

export const StaffInfoFormSchema = yup
  .object({
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
      .phone("AU", "Please enter a valid AU phone number"),
    residentialAddress: yup
      .string()
      .required("The esidential address is required")
      .min(10, "You need to provide a valid residential address"),
    residentialPostcode: yup
      .string()
      .length(4, "The postcode does not match the required format. Example: 4000")
      .required("The postcode is required")
      .matches(/^[0-9]+$/, "The postcode must be only digits"),
    residentialState: yup.string().required("Please select a state").oneOf(stateList),
  })
  .required();
