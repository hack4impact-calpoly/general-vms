import { generateFetchArgs } from "./helpers";
import { IHttpQueryOptions } from "./types";

const DEFAULT_OPTIONS: IHttpQueryOptions = {
  uri: "/test/uri",
  method: "TEST_METHOD",
};

const compareFetchArgs = (actual: RequestInit, expected: RequestInit): void => {
  const actualHeader = actual.headers as Headers;
  const expectedHeader = expected.headers as Headers;
  delete actual.headers;
  delete expected.headers;

  expect(actual).toStrictEqual(expected);

  if (actualHeader) {
    expect(expectedHeader).toBeTruthy();
  } else {
    expect(expectedHeader).toBeFalsy();
    return;
  }

  expect([...actualHeader.entries()]).toEqual([...expectedHeader.entries()]);
};

describe("generateFetchArgs", () => {
  it("should give back valid fetch args", () => {
    compareFetchArgs(generateFetchArgs(DEFAULT_OPTIONS), {
      method: "TEST_METHOD",
      redirect: "follow",
      headers: new Headers(),
    });
  });

  it("should add a JSON content-type header and stringify JSON", () => {
    compareFetchArgs(
      generateFetchArgs({
        ...DEFAULT_OPTIONS,
        payloadOpts: {
          isJson: true,
          payload: { test: "one" },
        },
      }),
      {
        method: "TEST_METHOD",
        redirect: "follow",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          test: "one",
        }),
      },
    );
  });
});
