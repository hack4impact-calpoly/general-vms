export interface UserAccount {
	id: string
	email: string
	password_hash: Buffer
	created: Date
}

export interface AuthSession {
	auth_id: string
}

export interface Session {
	userId: UserAccount["id"]
	startTime: Date
}
