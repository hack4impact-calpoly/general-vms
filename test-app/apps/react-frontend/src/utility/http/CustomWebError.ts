export class CustomWebError extends Error {
  static ERR_UNKNOWN = -1;
  static PARSE_ERROR = -2;
  static CONNECTION_REFUSED = -3;

  static OK = 200;
  static OK_CREATED = 201;
  static BAD_FORMAT = 400;
  static UNAUTHORIZED = 401;
  static FORBIDDEN = 403;
  static NOT_FOUND = 404;

  responseCode: number;
  responseError: string;

  static getAppropriateErrorMsg(statCode: number) {
    switch (statCode) {
      case this.OK:
      case this.OK_CREATED:
        return "No known error occurred";
      case this.ERR_UNKNOWN:
        return "Unknown error occurred relating to fetch";
      case this.PARSE_ERROR:
        return "Error occurred when parsing data";
      case this.CONNECTION_REFUSED:
        return "Connection was refused... bad uri?";
      case this.UNAUTHORIZED:
        return "User unauthorized";
      case this.FORBIDDEN:
        return "User forbidden";
      case this.NOT_FOUND:
        return "Resource not found";
      case this.BAD_FORMAT:
        return "Bad formatting on request";
      default:
        return "Unknown error (most likely server error) occurred";
    }
  }

  constructor(statCode: number, message?: string) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    this.name = "CustomWebError";
    this.responseCode = statCode;
    this.responseError = CustomWebError.getAppropriateErrorMsg(statCode);
  }
}
