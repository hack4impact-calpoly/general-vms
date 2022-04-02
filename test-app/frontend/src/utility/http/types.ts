import { CustomWebError } from './CustomWebError';

export interface IPayloadOpts {
  payload: object;
  isJson: boolean;
}

export interface IHttpQueryOptions {
  uri: string;
  method: string;
  payloadOpts?: IPayloadOpts;
  headers?: {
    [key: string]: string;
  };
  fetchKwargs?: Partial<RequestInit>;
}

export interface IHttpError {
  webError: CustomWebError;
}

export interface IHttpQueryResult {
  loading: boolean;
  error: IHttpError | null;
  data: Response | null;
}

export interface IHttpQueryResultWithJson<T> extends IHttpQueryResult {
  resolvedJson: T | null;
}
