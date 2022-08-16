export abstract class RequestError extends Error {
  public abstract getStatus(): number;
}

// Client errors

export class BadRequestError extends RequestError {
  static STATUS = 400;

  public getStatus(): number {
    return BadRequestError.STATUS;
  }
}

export class AuthError extends RequestError {
  static STATUS = 401;

  public getStatus(): number {
    return AuthError.STATUS;
  }
}

export class ForbiddenError extends RequestError {
  static STATUS = 403;

  public getStatus(): number {
    return ForbiddenError.STATUS;
  }
}

export class NotFoundError extends RequestError {
  static STATUS = 404;

  public getStatus(): number {
    return NotFoundError.STATUS;
  }
}

export class ConflictError extends RequestError {
  static STATUS = 409;

  public getStatus(): number {
    return ConflictError.STATUS;
  }
}

export class GoneError extends RequestError {
  static STATUS = 410;

  public getStatus(): number {
    return GoneError.STATUS;
  }
}

// Server errors

export class UnexpectedServerError extends RequestError {
  static STATUS = 550;

  public getStatus(): number {
    return UnexpectedServerError.STATUS;
  }
}

export class DatabaseError extends RequestError {
  static STATUS = 504;

  public getStatus(): number {
    return DatabaseError.STATUS;
  }
}
