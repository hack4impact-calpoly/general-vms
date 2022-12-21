import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";
import { createZodDto } from "nestjs-zod";

import { ShiftSchema } from "@general-vms/shared";

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
