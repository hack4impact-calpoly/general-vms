import {
        BeginAuthRequest, 
        BeginAuthResponse,
        LoginRequest,
        LoginResponse
} from './authApi'

export interface AuthService<C> {
		beginAuth(ctx: C, request: BeginAuthRequest): Promise<BeginAuthResponse>
		login(ctx: C, request: LoginRequest): Promise<LoginResponse>
}
