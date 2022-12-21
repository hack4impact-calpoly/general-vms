import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";
import { createZodDto } from "nestjs-zod";

import { ShiftSchema } from "@general-vms/shared";

export class BaseShiftDto extends createZodDto(ShiftSchema) {}
