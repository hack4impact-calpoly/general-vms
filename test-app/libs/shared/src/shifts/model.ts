import { z } from "nestjs-zod/z";
import { datePreprocessSchema, laterDateAllowEqual } from "../utils/date";

const BaseShift = z.object({
  start: datePreprocessSchema(),
  end: datePreprocessSchema(),
  maxVolunteers: z.number().min(1),
  title: z.string().min(1),
  description: z.union([z.string().min(1), z.undefined()]),
  eventAdmin: z.string(),
});

export type IShift = z.infer<typeof BaseShift>;

export const ShiftSchema = laterDateAllowEqual<IShift>(BaseShift, "start", "end");
