import app from "../../src/server";
import request from "supertest";
import { getDB } from "src/models/database/database";
import { FormModel, IFormDB } from "src/forms/form-db";
import { FormDataTransformer, MOCK_FORMS } from "@general-vms/shared";

describe("Form API", () => {
  test("GET /forms; Retrieves forms successfully", async () => {
    // Setup mock
    getDB<IFormDB>(FormModel).getForms = jest.fn().mockReturnValue(MOCK_FORMS);

    await request(app)
      .get("/api/forms")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          FormDataTransformer.transform({
            forms: MOCK_FORMS,
          }),
        );
      });
  });
});
