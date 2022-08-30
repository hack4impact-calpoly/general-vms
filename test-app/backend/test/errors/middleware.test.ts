import supertest from "supertest";
import express from "express";
import { BadRequestError, setupErrorHandlingMiddleware } from "src/errors";

describe("error middleware", () => {
  function setup(error?: Error | string | undefined) {
    const app = express();

    app.get("/test", (req, res) => {
      if (error instanceof Error) {
        throw error;
      } else if (typeof error === "string") {
        throw new Error(error);
      }

      res.send("done");
    });

    setupErrorHandlingMiddleware(app);

    return {
      app,
    };
  }

  it("should respond with a 200 when no error ", async () => {
    const { app } = setup();

    await supertest(app).get("/test").expect(200);
  });

  it("should respond with a 400 on a bad request error", async () => {
    const BAD_REQUEST_MSG = "bad request msg";

    const { app } = setup(new BadRequestError(BAD_REQUEST_MSG));

    await supertest(app)
      .get("/test")
      .expect(400)
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(response.body?.details.message).toBe(BAD_REQUEST_MSG);
      });
  });

  it("should respond with an internal server error when a generic error is thrown ", async () => {
    const { app } = setup(new Error("whatever error"));

    await supertest(app)
      .get("/test")
      .expect(500)
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(response.body?.details.message).toBe("An unexpected error occurred");
      });
  });
});
