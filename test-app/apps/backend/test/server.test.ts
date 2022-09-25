import app from "../src/server";
import * as supertest from "supertest";

describe("Server app", () => {
  it("GET /test", async () => {
    const message = "Hi there!";

    await supertest(app)
      .get("/test/")
      .expect(200)
      .then((response) => {
        expect(response.text).toBe(message);
      });
  });
});
