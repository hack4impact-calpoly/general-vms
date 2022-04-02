import { IHttpQueryOptions } from './types';

export function generateFetchArgs(opts: IHttpQueryOptions): RequestInit {
  const headers = new Headers(opts.headers || {});
  let body: string | null = null;

  if (opts.payloadOpts?.isJson) {
    headers.append('Content-Type', 'application/json');
    body = JSON.stringify(opts.payloadOpts.payload);
  }

  const fetchArgs: RequestInit = {
    method: opts.method,
    body,
    headers: headers,
    redirect: 'follow',
    ...opts.fetchKwargs,
  };

  // delete undefined/null values
  Object.keys(fetchArgs).forEach((k: string) => {
    fetchArgs[k as keyof RequestInit] ?? delete fetchArgs[k as keyof RequestInit];
  });

  return fetchArgs;
}
