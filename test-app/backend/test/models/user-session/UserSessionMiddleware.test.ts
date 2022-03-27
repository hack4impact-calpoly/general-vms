/* eslint-disable @typescript-eslint/unbound-method */
import { Response } from 'express';
import UserAuthMiddleware from '../../../src/models/user-session/middleware';
import { IGetUserAuthInfoRequest } from '../../../src/models/user-session/types';
import { IUser, Roles } from '../../../src/models/user/User';

const mockRequest = (user?: Partial<IUser>) => {
  return {
    locals: {
      user,
    },
  } as IGetUserAuthInfoRequest;
};

// taken from https://codewithhugo.com/express-IGetUserAuthInfoRequest-response-mocking/
const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const nextFnMock = jest.fn();

describe('User session middleware', () => {
  let req: IGetUserAuthInfoRequest;
  let res: Response;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    nextFnMock.mockReset();
  });

  it('should find user as authenticated', async () => {
    await UserAuthMiddleware.isUserAuthenticated(req, res, nextFnMock);
    expect(nextFnMock).toHaveBeenCalled();
  });

  it('should find user to be an admin', async () => {
    req = mockRequest({
      role: Roles.ADMIN,
      name: 'jeff!',
      approved: true,
      decisionMade: true,
    });

    await UserAuthMiddleware.isUserAdmin(req, res, nextFnMock);

    expect(nextFnMock).toHaveBeenCalled();
  });

  it('should NOT find user to be an admin because they lack the role', async () => {
    req = mockRequest({
      role: Roles.VOLUNTEER,
      name: 'jeff!',
      approved: true,
      decisionMade: true,
    });

    await UserAuthMiddleware.isUserAdmin(req, res, nextFnMock);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(nextFnMock).not.toHaveBeenCalled();
  });

  it('should find user as an approved user', async () => {
    req = mockRequest({
      role: Roles.VOLUNTEER,
      name: 'jeff!',
      approved: true,
      decisionMade: true,
    });

    await UserAuthMiddleware.isUserApproved(req, res, nextFnMock);

    expect(nextFnMock).toHaveBeenCalled();
  });

  it('should NOT find user as an approved user when no role exists', async () => {
    req = mockRequest({
      role: undefined,
      name: 'jeff!',
      approved: true,
      decisionMade: true,
    });

    await UserAuthMiddleware.isUserApproved(req, res, nextFnMock);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(nextFnMock).not.toHaveBeenCalled();
  });

  it('should NOT find user as an approved user when user has been rejected', async () => {
    req = mockRequest({
      role: Roles.VOLUNTEER,
      name: 'jeff!',
      approved: false,
      decisionMade: true,
    });

    await UserAuthMiddleware.isUserApproved(req, res, nextFnMock);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(nextFnMock).not.toHaveBeenCalled();
  });

  it('should NOT find user as an approved user when user has not had decision made', async () => {
    req = mockRequest({
      role: Roles.VOLUNTEER,
      name: 'jeff!',
      approved: true,
      decisionMade: false,
    });

    await UserAuthMiddleware.isUserApproved(req, res, nextFnMock);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(nextFnMock).not.toHaveBeenCalled();
  });
});
