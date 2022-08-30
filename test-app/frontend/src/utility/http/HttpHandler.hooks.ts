import { useEffect, useState } from "react";
import { CustomWebError } from "./CustomWebError";
import { generateFetchArgs } from "./helpers";
import { IHttpError, IHttpQueryOptions, IHttpQueryResult, IHttpQueryResultWithJson } from "./types";

/**
 * Can use the DataLoaderViewer component with these hooks to get similar results to how the
 * HttpDataLoader component works.
 */

export function useHttpQuery(opts: IHttpQueryOptions): IHttpQueryResult {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IHttpError | null>(null);
  const [data, setData] = useState<Response | null>(null);

  useEffect(() => {
    const fetchArgs = generateFetchArgs(opts);

    fetch(opts.uri, fetchArgs)
      .then((fetchRes?: Response) => {
        if (!fetchRes || !fetchRes.ok) {
          setError({
            webError: new CustomWebError(fetchRes?.status || -1),
          });
        } else {
          setData(fetchRes);
        }
        setLoading(false);
      })
      .catch((err: Error) => {
        setError({
          webError: new CustomWebError(-1, `fetch catch occurred with error: ${err.message}`),
        });
        setLoading(false);
      });
  }, [opts]);

  return { loading, error, data };
}

export function useHttpQueryWithJsonResponse<T>(
  opts: IHttpQueryOptions,
): IHttpQueryResultWithJson<T> {
  const { loading, error, data } = useHttpQuery(opts);
  const [resolvedData, setResolvedData] = useState<T | null>(null);
  const [jsonError, setJsonError] = useState<IHttpError | null>(null);

  useEffect(() => {
    if (!loading && data && !error) {
      data
        .json()
        .then((res: T) => setResolvedData(res))
        .catch(() => setJsonError({ webError: new CustomWebError(-2) }));
    }
  }, [loading, data]);

  return { loading, error: error || jsonError, data, resolvedJson: resolvedData };
}
