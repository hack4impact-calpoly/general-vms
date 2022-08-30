import { ZodValidator } from "src/validators/js/zod/zod";
import { z } from "zod";

const TEST_SCHEMA = z.number().min(1);

describe("ZodValidator", () => {
  function setup() {
    return {
      validator: new ZodValidator(),
    };
  }

  test("validation with valid data should pass", async () => {
    const { validator } = setup();

    const value = await validator.runValidate(8, { schema: TEST_SCHEMA });

    expect(value).toBe(8);
  });

  test("validation with invalid data should fail", async () => {
    const { validator } = setup();

    await expect(validator.runValidate(0, { schema: TEST_SCHEMA })).rejects.toEqual(
      expect.any(z.ZodError),
    );
  });
});
