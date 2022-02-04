import { Request } from 'express';
import { IUser } from '../../user/User';

export interface ITokenPayload {
  id: string;
  payload: object;
}

export class TokenSessionParserError extends Error {
  static NO_AUTH_HEADER = 'Auth header is undefined';
  static BAD_BEARER_TOKEN = 'Bearer token could not be parsed';
  static TOKEN_INVALID = 'Token given could not be verified';
  static RETRIEVAL_FAILED = 'Token could not be extracted after verified correctly';
}

export abstract class TokenSessionParser {
  // Parse authHeader to retrieve token
  private getBearerToken(authHeader: string) {
    // Format: "Bearer <token>"
    const splitHeader = authHeader.split(' ');
    if (splitHeader.length < 2) {
      return null;
    }

    return splitHeader[1];
  }

  protected abstract verifyAndRetrieveTokenPayload(token: string): Promise<ITokenPayload>;
  protected abstract getUserFromTokenPayload(tokenPayload: ITokenPayload): Promise<IUser>;

  private async getTokenPayloadFromRequest(req: Request): Promise<ITokenPayload | undefined> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new TokenSessionParserError(TokenSessionParserError.NO_AUTH_HEADER);
    }

    const token = this.getBearerToken(authHeader);
    if (!token) {
      throw new TokenSessionParserError(TokenSessionParserError.BAD_BEARER_TOKEN);
    }

    const tokenPayload = await this.verifyAndRetrieveTokenPayload(token);

    return tokenPayload;
  }

  public async getUserFromRequest(req: Request): Promise<IUser> {
    const tokenPayload = await this.getTokenPayloadFromRequest(req).catch((e: Error) => {
      throw e;
    });

    if (!tokenPayload) {
      throw new TokenSessionParserError(TokenSessionParserError.RETRIEVAL_FAILED);
    }

    return this.getUserFromTokenPayload(tokenPayload);
  }
}
