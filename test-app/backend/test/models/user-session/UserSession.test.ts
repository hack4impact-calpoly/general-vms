import { Request, Response } from 'express';
import { ValidateReqAppendUser } from '../../../src/models/user-session/UserSession';
import { IUser } from '../../../src/models/user/User';

const TEST_USER = {
  its: 'just nonsense',
} as unknown as IUser;

const mockRequest = () => {
  return {} as Request;
};

// taken from https://codewithhugo.com/express-request-response-mocking/
const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const nextFnMock = jest.fn();

class ValidateReqAppendUserImpl extends ValidateReqAppendUser {
  getUserFromRequest = jest.fn().mockReturnValue(Promise.resolve<IUser>(TEST_USER))
}

describe('ValidateReqAppendUser', () => {
  let req: Request;
  let res: Response;
  let validator: ValidateReqAppendUserImpl;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    validator = new ValidateReqAppendUserImpl();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should set locals user object on request when successful', async () => {
    await validator.validateRequestAndAppendUserMiddleware(req, res, nextFnMock);

    expect(validator.getUserFromRequest).toHaveBeenCalled();
    expect(req.locals?.user).toBe(TEST_USER);
    expect(nextFnMock).toHaveBeenCalled();
  });

  it('should give error response when validation fails', async () => {
    validator.getUserFromRequest.mockImplementation(() => {
      throw new Error();
    });

    try {
      await validator.validateRequestAndAppendUserMiddleware(req, res, nextFnMock);
    } catch (e) {
      fail();
    }

    expect(validator.getUserFromRequest).toHaveBeenCalled();
    expect(req.locals?.user).toBeFalsy();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
    expect(nextFnMock).not.toHaveBeenCalled();
  });
});
