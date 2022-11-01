import { setupServer } from "msw/node";
import { authHandlers } from "./auth.mock-api";

export const mockServer = setupServer(...authHandlers);
