function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}


export interface Token {
  data: Uint8Array;
}

export interface Session {
  userId: string;
  sessionToken: string;
  guestToken?: string | undefined;
}

export interface BeginAuthRequest {
  forGuestToken?: string | undefined;
}

export interface BeginAuthResponse {
  authId: string;
}

export interface LoginRequest {
  authToken?: Token;
}

export interface LoginResponse {
  session?: Session;
}

export const Session = {
  fromJSON(object: any): Session {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "0",
      sessionToken: isSet(object.sessionToken)
        ? String(object.sessionToken)
        : "",
      guestToken: isSet(object.guestToken)
        ? String(object.guestToken)
        : undefined,
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.sessionToken !== undefined &&
      (obj.sessionToken = message.sessionToken);
    message.guestToken !== undefined && (obj.guestToken = message.guestToken);
    return obj;
  },
}


export const Token = {
  fromJSON(object: any): Token {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },
  toJSON(message: Token): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  }
};

export const BeginAuthRequest = {
  fromJSON(object: any): BeginAuthRequest {
    return {
      forGuestToken: isSet(object.forGuestToken)
        ? String(object.forGuestToken)
        : undefined,
    };
  },
  toJSON(message: BeginAuthRequest): unknown {
    const obj: any = {};
    message.forGuestToken !== undefined &&
      (obj.forGuestToken = message.forGuestToken);
    return obj;
  }
}

export const BeginAuthResponse = {
  fromJSON(object: any): BeginAuthResponse {
    return {
      authId: isSet(object.authId) ? String(object.authId) : "",
    };
  },

  toJSON(message: BeginAuthResponse): unknown {
    const obj: any = {};
    message.authId !== undefined && (obj.authId = message.authId);
    return obj;
  }
}

export const LoginRequest = {
  fromJSON(object: any): LoginRequest {
    return {
      authToken: isSet(object.authToken)
        ? Token.fromJSON(object.authToken)
        : undefined
    };
  },
  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    message.authToken !== undefined &&
      (obj.authToken = message.authToken
        ? Token.toJSON(message.authToken)
        : undefined);
    return obj;
  }
}

export const LoginResponse = {
  fromJSON(object: any): LoginResponse {
    return {
      session: isSet(object.session)
        ? Session.fromJSON(object.session)
        : undefined,
    };
  },

  toJSON(message: LoginResponse): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? Session.toJSON(message.session)
        : undefined);
    return obj;
  }
}


export const AuthServiceDefinition = {
	name: "auth",
	methods: {
		login: {
			name: "Login",
			requestType: LoginRequest,
			responseType: LoginResponse,
			options: {}
		 },
		beginAuth: {
			name: "BeginAuth",
			requestType: BeginAuthRequest,
			responseType: BeginAuthResponse,
			options: {},
		}
	}
} as const;

