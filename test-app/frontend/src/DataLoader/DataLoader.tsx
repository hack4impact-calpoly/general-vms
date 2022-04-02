import { Alert } from '@mui/material';
import React, { ElementType, useEffect, useState } from 'react';
import { ErrorDialog } from '../dialogs/error-dialog/ErrorDialog';
import { DataCircleLoader, IDataCircleLoaderProps } from './circle-loader/DataCircleLoader';

export interface Query<T> {
  execute: () => Promise<T>;
  onResolve?: (data: T) => void;
  onReject?: (e: Error) => void;
}

interface ILoadingOptions {
  loadingComponent?: React.ReactElement;
  defaultDataLoaderOverrides?: IDataCircleLoaderProps;
}

export interface IDataLoaderProps<T> {
  loadingOptions?: ILoadingOptions;
  query: Query<T>;
  OnceLoadedComponent: ElementType;
  errorComponent?: React.ReactElement;
  additionalLoadingCompProps?: object;
}

export const DataLoaderDefaultErrorComponent = () => {
  return (
    <>
      <ErrorDialog open={true} />
      <Alert severity="error">An error occurred while attempting to load data</Alert>
    </>
  );
};

const DataLoader = <T, >({
  loadingOptions,
  query,
  OnceLoadedComponent,
  errorComponent,
  additionalLoadingCompProps,
} : IDataLoaderProps<T>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    try {
      query.execute()
        .then(
          (data: T) => {
            query.onResolve?.(data);
            setData(data);
          },
        ).catch(
          (e: Error) => {
            query.onReject?.(e);
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
    return errorComponent || <DataLoaderDefaultErrorComponent />;
  }

  return <OnceLoadedComponent {...additionalLoadingCompProps} data={data} />;
};

export default DataLoader;
