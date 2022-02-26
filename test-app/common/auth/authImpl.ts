import crypto from "crypto";
import type {BeginAuthRequest, BeginAuthResponse, LoginRequest, LoginResponse } from './authApi';
import type { AuthService } from './authService';
import type { IConfig } from "../config";
import type { AuthSession } from "./types";
import { SmallerMetadata } from "../metadata";
import type { DB } from "../../backend/src/db/db";

export interface Context {
        db: DB
        metadata: Partial<SmallerMetadata>
        userId?: string
}

type Constructor<T> = {
    new (): T;
    from <T, D>(this: Constructor<T>, data?: Partial<D>): T;
}

class Base {
    static from <T, D>(this: Constructor<T>, data?: Partial<D>): T {
        const c = new this();
        if(data) { Object.assign(c, data); }
        return c;
    }

        login(
                _:  Context,
                __: LoginRequest,
        ): Promise<LoginResponse> {
                return new Promise((resolve) => { resolve({}) });
        }

        async beginAuth(_: Context, __: BeginAuthRequest): Promise<BeginAuthResponse> {
                return new Promise((resolve) => { resolve({ authId: ""})});
        }
    
}


export class Container<T extends Base> {
	generateToken: string = ""

	constructor(MyClass: Constructor<T>) {
		this.MyClass = MyClass;
	}

	MyClass: Constructor<T>;

        copy() {
		return this.MyClass.from({ generateToken: crypto.randomBytes(32).toString("hex") });
	}
}

export class AuthServiceImpl extends Base implements AuthService<Context> {  
};
