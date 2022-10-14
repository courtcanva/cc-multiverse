import { useForm } from "react-hook-form";
import { useState } from "react";

import { states } from "@src/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./useSignUpFrom.schema";

export function useSignUpForm() {
  function checkIfEmailExist() {
    console.log(`${watch("staff.email")} does not exist, i think 🤔`);
    return true;
  }

  function checkIfAbnExist(): boolean {
    console.log(`${watch("franchise.abn")} does not exist, i think 🤔`);
    return true;
  }

  const defaultValues: SignUpFormValues = {
    franchise: {
      businessName: "",
      legalEntityName: "",
      abn: "",
      contactNumber: "",
      businessAddress: "",
      postcode: 0,
      state: undefined,
    },
    staff: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      residentialAddress: "",
      postcode: 0,
      state: undefined,
    },
  };

  const { control, watch, handleSubmit } = useForm<SignUpFormValues>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(SignUpFormInfoSchema),
  });

  const [currentStep, setCurrentStep] = useState(0);

  const steps: SignUpFormStep[] = [
    {
      onNext: () => checkIfEmailExist() && setCurrentStep((prevValue) => prevValue + 1),
      fields: [
        {
          name: "staff.email",
          label: "Email",
          placeholder: "Enter email address",
        },
        {
          type: "password",
          name: "staff.password",
          label: "Password",
          placeholder: "Enter password",
        },
        {
          type: "password",
          name: "staff.confirmPassword",
          label: "Confirm Password",
          placeholder: "Confirm Password",
        },
      ],
    },
    {
      onBack: () => setCurrentStep((prevValue) => prevValue - 1),
      onNext: () => checkIfAbnExist() && setCurrentStep((prevValue) => prevValue + 1),
      fields: [
        {
          name: "franchise.businessName",
          label: "Business Name",
          placeholder: "Enter business name",
        },
        {
          name: "franchise.legalEntityName",
          label: "Legal Name",
          placeholder: "Enter Legal name",
        },
        {
          name: "franchise.abn",
          label: "ABN",
          placeholder: "Enter ABN",
        },
        {
          type: "select",
          name: "franchise.state",
          label: "State (AU only)",
          placeholder: "Choose your state",
          options: states,
        },
        {
          name: "franchise.postcode",
          label: "Postcode",
          placeholder: "Enter postcode",
        },
        {
          name: "franchise.businessAddress",
          label: "Business Address",
          placeholder: "Enter business address details",
        },
      ],
    },
    {
      onBack: () => {
        setCurrentStep((prevValue) => prevValue - 1);
      },
      fields: [
        {
          name: "staff.firstName",
          label: "First Name",
          placeholder: "Enter first name",
        },
        {
          name: "staff.lastName",
          label: "Last Name",
          placeholder: "Enter last name",
        },
        {
          name: "staff.phoneNumber",
          label: "Phone Number",
          placeholder: "Phone No.",
        },
        {
          name: "staff.postcode",
          label: "Postcode",
          placeholder: "Enter postcode",
        },
        {
          type: "select",
          name: "staff.state",
          label: "State (AU only)",
          placeholder: "Choose state",
          options: states,
        },
        {
          name: "staff.residentialAddress",
          label: "Residential Address",
          placeholder: "Enter residential address details",
        },
      ],
    },
  ];

  const onSubmit = () => {
    handleSubmit(onSubmit);
  };

  return { steps, currentStep, control, onSubmit };
}
