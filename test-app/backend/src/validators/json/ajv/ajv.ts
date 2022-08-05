import 'reflect-metadata';
import Ajv from 'ajv';
import { SchemaRequestInputValidator } from 'src/validators/request-input-validator';
import { injectable, unmanaged } from 'inversify';

export interface AjvValidatorOptions {
  schemasPath?: string;
}

interface SchemaInfo {
  key: string;
  schema: object;
}

export interface AjvAdditionalAttributes {
  schema: string;
}

const SCHEMAS: SchemaInfo[] = [];

@injectable()
export class AjvValidator extends SchemaRequestInputValidator {
  ajv = new Ajv();

  options: AjvValidatorOptions;

  constructor(@unmanaged() options?: AjvValidatorOptions) {
    super();
    this.options = options;
  }

  async setup() {
    return new Promise<void>((resolve) => {
      this.loadAllSchemas(SCHEMAS);
      resolve();
    });
  }

  private loadAllSchemas(schemas: SchemaInfo[]) {
    schemas.forEach(({ key, schema }) => {
      if (!this.ajv.validateSchema(schema)) {
        throw new Error(`Invalid schema given. Key: ${key}. Schema: ${String(schema)}`);
      }
      this.ajv.addSchema(schema);
    });
  }

  runValidate<T>(data: unknown, attrs: AjvAdditionalAttributes): T {
    if (!this.ajv.validate(attrs.schema, data)) {
      return null;
    }

    return data as T;
  }
}
