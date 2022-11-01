import { rest } from "msw";

export const authHandlers = [
  rest.post("/staff/verify", async (req, res, ctx) => {
    const payload = await req.json();

    switch (payload?.token) {
      case "valid":
        return res(ctx.status(202));

      case "invalid":
        return res(ctx.status(401));

      default:
        req.passthrough();
    }
  }),
];
