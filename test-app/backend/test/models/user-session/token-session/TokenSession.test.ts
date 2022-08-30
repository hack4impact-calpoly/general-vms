import { Request } from "express";
import {
  ITokenPayload,
  TokenSessionParser,
  TokenSessionParserError,
} from "../../../../src/models/user-session/token-session/TokenSession";
import { IUser } from "../../../../src/models/user/User";

const TOKEN = "MY-TOKEN";
const TOKEN_PAYLOAD: ITokenPayload = {
  id: "some-id",
  payload: { p: "test-payload" },
};
const TEST_USER = {
  its: "just nonsense",
} as unknown as IUser;

const mockRequest = (token?: string) => {
  return {
    headers: {
      authorization: `Bearer ${token || TOKEN}`,
    },
  } as Request;
};

class TokenSessionParserImpl extends TokenSessionParser {
  verifyAndRetrieveTokenPayload = jest.fn().mockReturnValue(TOKEN_PAYLOAD);
  getUserFromTokenPayload = jest.fn().mockReturnValue(Promise.resolve<IUser>(TEST_USER));
}

describe("TokenSessionParser", () => {
  let req: Request;
  let tokenParser: TokenSessionParserImpl;

  beforeEach(() => {
    req = mockRequest();
    tokenParser = new TokenSessionParserImpl();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should throw an error when an authorization header is missing", async () => {
    req.headers.authorization = "";

    try {
      await tokenParser.getUserFromRequest(req);
      fail();
    } catch (e) {
      expect(e).toStrictEqual(new TokenSessionParserError(TokenSessionParserError.NO_AUTH_HEADER));
    }

    expect(tokenParser.verifyAndRetrieveTokenPayload).not.toHaveBeenCalled();
    expect(tokenParser.getUserFromTokenPayload).not.toHaveBeenCalled();
  });

  it("should throw an error when an authorization header is incorrectly formatted", async () => {
    req.headers.authorization = "just-one-split";

    try {
      await tokenParser.getUserFromRequest(req);
      fail();
    } catch (e) {
      expect(e).toStrictEqual(
        new TokenSessionParserError(TokenSessionParserError.BAD_BEARER_TOKEN),
      );
    }

    expect(tokenParser.verifyAndRetrieveTokenPayload).not.toHaveBeenCalled();
    expect(tokenParser.getUserFromTokenPayload).not.toHaveBeenCalled();
  });

  it("should throw an error when an authorization header is not verified", async () => {
    tokenParser.verifyAndRetrieveTokenPayload.mockImplementationOnce(() => {
      throw new TokenSessionParserError(TokenSessionParserError.TOKEN_INVALID);
    });

    try {
      await tokenParser.getUserFromRequest(req);
      fail();
    } catch (e) {
      expect(e).toStrictEqual(new TokenSessionParserError(TokenSessionParserError.TOKEN_INVALID));
    }

    expect(tokenParser.verifyAndRetrieveTokenPayload).toHaveBeenCalled();
    expect(tokenParser.getUserFromTokenPayload).not.toHaveBeenCalled();
  });

  it("should throw an error when token retrieval fails", async () => {
    tokenParser.verifyAndRetrieveTokenPayload.mockReturnValueOnce(undefined);

    try {
      await tokenParser.getUserFromRequest(req);
      fail();
    } catch (e) {
      expect(e).toStrictEqual(
        new TokenSessionParserError(TokenSessionParserError.RETRIEVAL_FAILED),
      );
    }

    expect(tokenParser.getUserFromTokenPayload).not.toHaveBeenCalled();
  });

  it("should successfully retrieve token from payload", async () => {
    try {
      await tokenParser.getUserFromRequest(req);
    } catch (e) {
      fail();
    }

    expect(tokenParser.verifyAndRetrieveTokenPayload).toHaveBeenCalled();
    expect(tokenParser.getUserFromTokenPayload).toHaveBeenCalled();
  });
});
