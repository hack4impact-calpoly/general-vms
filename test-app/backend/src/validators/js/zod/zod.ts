import 'reflect-metadata';
import { SchemaRequestInputValidator } from 'src/validators/request-input-validator';
import { injectable } from 'inversify';
import { z } from 'zod';

export interface ZodAdditionalAttrs {
  schema: z.ZodSchema;
  zodParams?: Partial<z.ParseParams>;
}

@injectable()
export class ZodValidator extends SchemaRequestInputValidator {
  runValidate<T>(data: unknown, { schema: zodSchema, zodParams }: ZodAdditionalAttrs): Promise<T> {
    return zodSchema.parseAsync(data, zodParams) as Promise<T>;
  }
}
