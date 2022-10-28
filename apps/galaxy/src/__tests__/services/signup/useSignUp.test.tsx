import axios from "@src/services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import { renderHook } from "@testing-library/react";
import useSignUp from "@src/services/signup/useSignUp";

const mockAxios = new MockAdapter(axios);

describe("useSignUp hook", () => {
  const mockRegisterData = {
    username: "Atester@gmail.com",
    password: "Azxc123123",
    confirmPassword: "Azxc123123",
    businessName: "Test Business Name",
    legalEntityName: "Test Business Pty Ltd",
    abn: "12345678909",
    contactNumber: "0411111111",
    businessAddress: "23 testing St, Mel",
    companyPostcode: "1234",
    companyState: "VIC",
    firstName: "First",
    lastName: "Last",
    phoneNumber: "0422222222",
    residentialAddress: "34 testing St, Mel",
    residentialPostcode: "1235",
    residentialState: "NSW",
  };
});
