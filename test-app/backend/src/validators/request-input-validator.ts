import { injectable } from 'inversify';
import 'reflect-metadata';

export interface IValidateAttrs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  additional?: unknown;
}

@injectable()
export abstract class SchemaRequestInputValidator {
  protected abstract runValidate<T>(data: unknown, attrs: IValidateAttrs): Promise<T>;

  validate<T>(data: unknown, attrs: IValidateAttrs): Promise<T> {
    return this.runValidate<T>(data, attrs);
  }
}
