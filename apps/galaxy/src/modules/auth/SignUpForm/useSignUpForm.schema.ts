import { z } from "zod";
import { phoneNumberRegex, postcodeRegex, abnRegex } from "@src/constants";

export const stateList = ["QLD", "VIC", "NSW", "NT", "SA", "ACT", "TAS", "WA"] as const;

type StateList = typeof stateList[number];

const requiredErrorMsg = "This field is required";

export const SignUpFormInfoSchema = z.object({
  franchise: z.object({
    businessName: z
      .string({ required_error: requiredErrorMsg })
      .min(1, { message: "Business name must contain at least 1 character(s)" }),
    legalEntityName: z
      .string({ required_error: requiredErrorMsg })
      .min(1, { message: "Legal name must contain at least 1 character(s)" }),
    abn: z.string({ required_error: requiredErrorMsg }).regex(abnRegex, {
      message: "The ABN number should be 11 digit",
    }),
    contactNumber: z.string({ required_error: requiredErrorMsg }).regex(phoneNumberRegex, {
      message: "The contact number does not match required format. Example: 0411111111",
    }),
    businessAddress: z
      .string({ required_error: requiredErrorMsg })
      .min(10, { message: "You need to provide a valid business address" }),
    postcode: z.string({ required_error: requiredErrorMsg }).regex(postcodeRegex, {
      message: "The Postcode does not match the required format. Example: 4000",
    }),
    state: z.enum(stateList, {
      required_error: requiredErrorMsg,
    }),
  }),
  staff: z
    .object({
      firstName: z
        .string({ required_error: requiredErrorMsg })
        .min(1, { message: "First name must contain at least 1 character(s)" }),
      lastName: z
        .string({ required_error: requiredErrorMsg })
        .min(1, { message: "Last name must contain at least 1 character(s)" }),
      email: z
        .string({ required_error: requiredErrorMsg })
        .email({ message: "Invalid email address" }),
      password: z.string({ required_error: requiredErrorMsg }).min(8),
      confirmPassword: z.string({ required_error: requiredErrorMsg }).min(8),
      phoneNumber: z.string({ required_error: requiredErrorMsg }).regex(phoneNumberRegex, {
        message: "The Phone Number does not match required format. Example: 0411111111",
      }),
      residentialAddress: z
        .string({ required_error: requiredErrorMsg })
        .min(10, { message: "You need to provide a valid residential address" }),
      postcode: z.string({ required_error: requiredErrorMsg }).regex(postcodeRegex, {
        message: "The Postcode does not match the required format. Example: 4000",
      }),
      state: z.enum(stateList, {
        required_error: requiredErrorMsg,
      }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
        });
      }
    }),
});
