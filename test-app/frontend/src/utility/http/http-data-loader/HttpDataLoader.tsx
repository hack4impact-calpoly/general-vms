import { useState } from "react";
import DataLoader, { IDataLoaderProps, Query } from "../../../DataLoader/DataLoader";
import { CustomWebError } from "../CustomWebError";
import { generateFetchArgs } from "../helpers";
import { IHttpQueryOptions } from "../types";
import HttpRequestDataLoaderErrorComponent from "./HttpRequestDataLoaderError";

export type ResponseResolverFn<T> = (r: Response) => Promise<T>;

interface IProps<T> {
  httpOpts: Omit<IHttpQueryOptions, "method"> & { method?: string };
  dataLoaderProps: Omit<IDataLoaderProps<T>, "query" | "errorComponent">;
  responseResolver: ResponseResolverFn<T>;
}

interface ISetupQueryArgs {
  uri: string;
  fetchArgs: RequestInit;
  setError: (e: Error) => void;
}

function setupQuery({ uri, fetchArgs, setError }: ISetupQueryArgs): Query<Response> {
  return {
    execute: () =>
      new Promise((resolve, reject) => {
        fetch(uri, fetchArgs)
          .then((fetchRes: Response) => {
            if (!fetchRes || !fetchRes.ok) {
              reject(new CustomWebError(fetchRes?.status || CustomWebError.ERR_UNKNOWN));
            } else {
              resolve(fetchRes);
            }
          })
          .catch((e) => {
            if (e instanceof TypeError && e.message.toLowerCase().includes("failed to fetch")) {
              reject(new CustomWebError(CustomWebError.CONNECTION_REFUSED));
            }
            reject(e);
          });
      }),
    onReject: (e: Error) => setError(e),
  };
}

type ISetupQueryWithResolverArgs<T> = { resolver: ResponseResolverFn<T> } & ISetupQueryArgs;

function setupQueryWithResolver<T>({
  resolver,
  ...setupQueryArgs
}: ISetupQueryWithResolverArgs<T>): Query<T> {
  const query = setupQuery(setupQueryArgs);
  const originalQueryExecute = query.execute.bind(null);
  const newQueryFn = () =>
    new Promise<T>((resolve, reject) => {
      originalQueryExecute()
        .then((data) => {
          resolver(data)
            .then((res: T) => resolve(res))
            .catch(() => reject(new CustomWebError(CustomWebError.PARSE_ERROR)));
        })
        .catch((e: Error) => {
          reject(e);
        });
    });

  return {
    onReject: query.onReject,
    execute: newQueryFn,
  };
}

function HttpRequestDataLoader<T>({ dataLoaderProps, httpOpts, responseResolver }: IProps<T>) {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [query] = useState<Query<T>>(
    setupQueryWithResolver<T>({
      resolver: responseResolver,
      uri: httpOpts.uri,
      fetchArgs: generateFetchArgs({
        method: "GET", // Default method is GET unless specified
        ...httpOpts,
      }),
      setError,
    }),
  );

  return (
    <DataLoader
      query={query}
      errorComponent={<HttpRequestDataLoaderErrorComponent error={error} />}
      {...dataLoaderProps}
    />
  );
}

export default HttpRequestDataLoader;
