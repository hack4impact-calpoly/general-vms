import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import HttpRequestDataLoader from './HttpDataLoader';
import { jsonResolver, justResolveResolver } from './resolvers';

const DEFAULT_DATA_LOADER_PROPS = {
  OnceLoadedComponent: () => <p>Hello</p>,
};

const DEFAULT_HTTP_OPTS = {
  uri: 'https://lol.com/test/uri',
};

function JSONOnceLoadedTestComponent(props: { data: { test: string } }) {
  return <p>{props.data.test}</p>;
}

describe('HttpDataLoader component', () => {
  it('should show OnceLoadedComponent on successful fetch with GET as default method', () => {
    fetchMock.mockResponseOnce('hello');

    render(
      <HttpRequestDataLoader
        dataLoaderProps={DEFAULT_DATA_LOADER_PROPS}
        responseResolver={justResolveResolver}
        httpOpts={DEFAULT_HTTP_OPTS}
      />,
    );

    return waitFor(() => {
      expect(screen.getByText('Hello')).toBeTruthy();
      expect(fetchMock).toHaveBeenCalledWith(DEFAULT_HTTP_OPTS.uri, expect.any(Object));
      expect(fetchMock.mock.calls[0][1]?.method).toEqual('GET');
    });
  });

  it('should use JSON resolver', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ test: 'Custom Response' }));

    render(
      <HttpRequestDataLoader
        dataLoaderProps={{ OnceLoadedComponent: JSONOnceLoadedTestComponent }}
        httpOpts={{
          uri: '/test',
          payloadOpts: {
            isJson: true,
            payload: { test: 'Custom Test String' },
          },
          method: 'POST',
        }}
        responseResolver={jsonResolver}
      />,
    );

    return waitFor(() => {
      expect(screen.getByText('Custom Response')).toBeTruthy();
    });
  });

  describe('when encountering errors', () => {
    beforeEach(() => {
      global.console = {
        ...console,
        error: jest.fn(),
      };
    });

    it('should show connection refused error', () => {
      fetchMock.mockReject(new TypeError('Failed to Fetch'));

      render(
        <HttpRequestDataLoader
          dataLoaderProps={DEFAULT_DATA_LOADER_PROPS}
          responseResolver={justResolveResolver}
          httpOpts={DEFAULT_HTTP_OPTS}
        />,
      );

      return waitFor(() => {
        expect(screen.getByText('Request failed', { exact: false })).toBeTruthy();
        expect(screen.queryAllByText('This action failed due to an unexpected error', { exact: false })).toBeTruthy();
      });
    });

    it('should show unauthorized error', () => {
      fetchMock.mockResponse('hello', {
        status: 401,
      });

      render(
        <HttpRequestDataLoader
          dataLoaderProps={DEFAULT_DATA_LOADER_PROPS}
          responseResolver={justResolveResolver}
          httpOpts={DEFAULT_HTTP_OPTS}
        />,
      );

      return waitFor(() => {
        expect(screen.getByText('Request failed', { exact: false })).toBeTruthy();
        expect(screen.queryAllByText('You are not logged in', { exact: false })).toBeTruthy();
      });
    });
  });
});
