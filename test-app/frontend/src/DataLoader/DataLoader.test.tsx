import { render, screen, waitFor } from '@testing-library/react';
import { DEFAULT_CONTENT_TEXT } from '../dialogs/error-dialog/ErrorDialog';
import DataLoader from './DataLoader';

const DEFAULT_ONCE_LOADED_COMPONENT = () => <p>once loaded</p>;

describe('DataLoader component', () => {
  it('should pass through data to component when promise is resolved', () => {
    render(
      <DataLoader
        OnceLoadedComponent={({ data }: { data: string }) => <p>{data}</p>}
        errorComponent={<p>Special Error</p>}
        query={{
          execute: () => Promise.resolve('Hi there!'),
        }}
      />,
    );

    return waitFor(() => {
      expect(screen.getByText('Hi there!')).toBeTruthy();
    });
  });

  it('should pass through addtional props to component when promise is resolved', () => {
    render(
      <DataLoader
        OnceLoadedComponent={({ data, more }: { data: string, more: string }) => <p>{data} + {more}</p>}
        errorComponent={<p>Special Error</p>}
        query={{
          execute: () => Promise.resolve('Hi there!'),
        }}
        additionalLoadingCompProps={{
          more: 'wassup',
        }}
      />,
    );

    return waitFor(() => {
      expect(screen.getByText('Hi there! + wassup')).toBeTruthy();
    });
  });

  it('should show default loading component until promise resolves', async () => {
    const spy = jest.fn();

    const promise = new Promise((resolve) => {
      setTimeout(() => resolve('Hi'), 1000);
    });

    render(
      <DataLoader
        OnceLoadedComponent={DEFAULT_ONCE_LOADED_COMPONENT}
        query={{
          execute: () => promise,
          onResolve: spy,
        }}
      />,
    );

    expect(screen.getByText('Loading...')).toBeTruthy();
    expect(spy).not.toHaveBeenCalled();

    // wait 500ms and still expect nothing to have changed
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeTruthy();
      expect(spy).not.toHaveBeenCalled();
    }, {
      timeout: 500,
    });

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeTruthy();
      expect(spy).not.toHaveBeenCalled();
    }, {
      timeout: 500,
    });

    return waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeFalsy();
      expect(screen.getByText('once loaded')).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should show custom loading component when specified until promise resolves', async () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve('Hi'), 1000);
    });

    const text = 'Woah look at that im loading';

    render(
      <DataLoader
        OnceLoadedComponent={DEFAULT_ONCE_LOADED_COMPONENT}
        loadingOptions={{
          loadingComponent: <p>{text}</p>,
        }}
        query={{
          execute: () => promise,
        }}
      />,
    );

    // wait 500ms and still expect nothing to have changed
    await waitFor(() => {
      expect(screen.getByText(text)).toBeTruthy();
    }, {
      timeout: 1000,
    });

    return waitFor(() => {
      expect(screen.queryByText(text)).toBeFalsy();
    });
  });

  it('should show default loading component with overrides applied', () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve('Hi'), 1000);
    });

    render(
      <DataLoader
        OnceLoadedComponent={DEFAULT_ONCE_LOADED_COMPONENT}
        loadingOptions={{
          defaultDataLoaderOverrides: { caption: 'caption test' },
        }}
        query={{
          execute: () => promise,
        }}
      />,
    );

    expect(screen.getByText('caption test')).toBeTruthy();
  });

  it('should show error component when specified and error occurs', () => {
    const spy = jest.fn();

    render(
      <DataLoader
        OnceLoadedComponent={DEFAULT_ONCE_LOADED_COMPONENT}
        errorComponent={<p>Special Error</p>}
        query={{
          execute: () => Promise.reject(new Error('test error')),
          onReject: spy,
        }}
      />,
    );

    return waitFor(() => {
      expect(screen.getByText('Special Error', { exact: false })).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should show default error component upon error and no error component is specified', () => {
    render(
      <DataLoader
        OnceLoadedComponent={DEFAULT_ONCE_LOADED_COMPONENT}
        query={{
          execute: () => Promise.reject(new Error('test error')),
        }}
      />,
    );

    return waitFor(() => {
      // Check alert
      expect(screen.getByText('An error occurred while attempting to load data', { exact: false })).toBeTruthy();
      // Check popup
      expect(screen.getByText(DEFAULT_CONTENT_TEXT)).toBeTruthy();
    });
  });
});
