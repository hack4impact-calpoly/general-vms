import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

import { datePreprocessSchema, laterDateAllowEqual } from "../utils";

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
export class BaseShiftDto extends createZodDto(ShiftSchema) {}

export class ShiftBodySchema {
  @IsInt()
  startTime;

  @IsInt()
  endTime;

  @Min(1)
  @IsInt()
  maxVolunteers;

  @Length(1, 20)
  @IsString()
  title;

  @Length(1, 100)
  @IsString()
  description;

  @Length(1, 20)
  @IsString()
  eventAdmin;
}

export class ShiftQuery {
  @IsOptional()
  @IsInt()
  startTime;

  @IsOptional()
  @IsInt()
  endTime;

  @IsOptional()
  @Min(1)
  @IsInt()
  maxVolunteers;

  @IsOptional()
  @Length(1, 20)
  @IsString()
  title;

  @IsOptional()
  @Length(1, 100)
  @IsString()
  description;

  @IsOptional()
  @Length(1, 20)
  @IsString()
  eventAdmin;
}
