import React from "react";
import renderWithMockedProvider from "../../../testHelper";
import user from "@testing-library/user-event";
import { renderHook, screen, waitFor } from "@testing-library/react";
import SignUp from "../../../../pages/sign-up";
import customAxios from "../../../../services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import userSignUp from "../../../../services/signup/useSignUp";
import { act } from "react-dom/test-utils";
