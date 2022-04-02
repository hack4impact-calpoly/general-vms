import { DataCircleLoader } from '../circle-loader/DataCircleLoader';
import { DataLoaderDefaultErrorComponent, IDataLoaderProps } from '../DataLoader';

export interface IDataLoaderViewerProps extends Omit<IDataLoaderProps<unknown>, 'query'> {
  loading: boolean;
  error: unknown;
  data: unknown;
}

const DataLoaderViewer = ({
  loading,
  loadingOptions,
  error,
  errorComponent,
  OnceLoadedComponent,
  additionalLoadingCompProps,
  data,
}: IDataLoaderViewerProps) => {
  if (loading) {
    return loadingOptions?.loadingComponent || <DataCircleLoader {...loadingOptions?.defaultDataLoaderOverrides} />;
  }

  if (error) {
    return errorComponent || <DataLoaderDefaultErrorComponent />;
  }

  return <OnceLoadedComponent {...additionalLoadingCompProps} data={data} />;
};

export default DataLoaderViewer;
