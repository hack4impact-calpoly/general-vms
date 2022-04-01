import { Alert } from '@mui/material';
import React, { ElementType, useEffect, useState } from 'react';
import { ErrorDialog } from '../dialogs/error-dialog/ErrorDialog';
import { DataCircleLoader, IDataCircleLoaderProps } from './circle-loader/DataCircleLoader';

interface Query<T> {
  execute: () => Promise<T>;
  onResolve?: () => void;
  onReject?: () => void;
}

interface ILoadingOptions {
  loadingComponent?: React.ReactElement;
  defaultDataLoaderOverrides?: IDataCircleLoaderProps;
}

interface Props<T> {
  loadingOptions?: ILoadingOptions;
  query: Query<T>;
  OnceLoadedComponent: ElementType;
  errorComponent?: React.ReactElement;
  additionalLoadingCompProps?: object;
}

const DataLoader = <T, >({
  loadingOptions,
  query,
  OnceLoadedComponent,
  errorComponent,
  additionalLoadingCompProps,
} : Props<T>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    try {
      query.execute()
        .then(
          (data: T) => {
            query.onResolve?.();
            setData(data);
          },
        ).catch(
          (e: Error) => {
            query.onReject?.();
            setError(e);
          },
        ).finally(() => setLoading(false));
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return loadingOptions?.loadingComponent || <DataCircleLoader {...loadingOptions?.defaultDataLoaderOverrides} />;
  }

  if (error) {
    return errorComponent || (
      <>
        <ErrorDialog open={true} />
        <Alert severity="error">An error occurred while attempting to load data</Alert>
      </>
    );
  }

  return <OnceLoadedComponent {...additionalLoadingCompProps} data={data} />;
};

export default DataLoader;
