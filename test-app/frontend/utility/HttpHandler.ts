import { useEffect, useState } from 'react';

export class CustomWebError extends Error {
  responseCode: number;
  responseError: string;

  static getAppropriateErrorMsg(statCode) {
    switch (statCode) {
      case 200:
      case 201:
        return 'No known error occurred';
      case -1:
        return 'Unknown error occurred relating to fetch';
      case -2:
        return 'Bad error occurred when parsing to JSON';
      case 401:
        return 'User unauthorized';
      case 400:
        return 'Bad formatting on request';
      default:
        return 'Unknown error (most likely server error) occurred';
    }
  }

  constructor(statCode: number, message?: string) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    this.name = 'CustomWebError';
    this.responseCode = statCode;
    this.responseError = CustomWebError.getAppropriateErrorMsg(statCode);
  }
}

interface IPayloadOpts {
  payload: BodyInit;
  isJson: boolean;
}

interface IHttpQueryOptions {
  uri: string;
  method: string;
  payloadOpts?: IPayloadOpts;
  headers?: {
    [key: string]: string;
  };
  fetchKwargs?: Partial<RequestInit>;
}

interface IHttpError {
  webError: CustomWebError;
  status: number;
}

interface IHttpQueryResult {
  loading: boolean;
  error: IHttpError;
  data: Response;
  setError: React.Dispatch<React.SetStateAction<IHttpError>>;
}

export function useHttpQuery(opts: IHttpQueryOptions): IHttpQueryResult {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IHttpError>(null);
  const [data, setData] = useState<Response>(null);

  useEffect(() => {
    const addedHeaders = new Headers();

    if (opts.payloadOpts?.isJson) {
      addedHeaders.append('Content-Type', 'application/json');
      opts.payloadOpts.payload = JSON.stringify(opts.payloadOpts.payload);
    }

    const fetchArgs: RequestInit = {
      method: opts.method || 'GET',
      body: opts.payloadOpts?.payload,
      headers: {
        ...opts.headers,
      },
      redirect: 'follow',
      ...opts.fetchKwargs,
    };

    // delete undefined/null values
    Object.keys(fetchArgs).forEach((k: string) => { fetchArgs[k] ?? delete fetchArgs[k]; });

    fetch(opts.uri, fetchArgs).then((fetchRes?: Response) => {
      if (!fetchRes || !fetchRes.ok) {
        setError({
          webError: new CustomWebError(fetchRes.status || -1),
          status: fetchRes.status || -1,
        });
      } else {
        setData(fetchRes);
      }
      setLoading(false);
    }).catch((err: Error) => {
      setError({
        webError: new CustomWebError(-1, `fetch catch occurred with error: ${err.message}`),
        status: -1,
      });
      setLoading(false);
    });
  }, [opts]);

  return { loading, error, setError, data };
}

export interface IHttpQueryResultWithJson<T> extends IHttpQueryResult {
  resolvedJson: T;
}

export function useHttpQueryWithJsonResponse<T>(opts: IHttpQueryOptions): IHttpQueryResultWithJson<T> {
  const { loading, error, setError, data } = useHttpQuery(opts);
  const [resolvedData, setResolvedData] = useState<T>(null);

  useEffect(() => {
    if (!loading && data) {
      data.json().then((res: T) => setResolvedData(res)).catch(() => setError({ status: -2, webError: new CustomWebError(-2) }));
    }
  }, [loading, data]);

  return { loading, error, setError, data, resolvedJson: resolvedData };
}
