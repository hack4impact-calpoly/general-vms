import type { Emitter } from "mitt";
import mitt from "mitt";
import type pg from "pg";
import type * as types from "./types";

export type AuthMsg = {
	$case: "session"
	authId: string
	userId: string
	session: string
}

export class AuthRespository {
	emitter: Emitter<Record<string, AuthMsg>>;

	private constructor(private pool: pg.Pool) {
		this.emitter = mitt();
	}

	static async create(pool: pg.Pool) {
		const inst = new AuthRespository(pool);
		return inst;
	}

	async saveUser(email: string, username: string, password_hash: Uint8Array): Promise<types.UserAccount> {
		const res = await this.pool.query(
			"INSERT INTO users (id, username, email, password_hash) VALUES (generate_id(), $1, $2, $3) returning *",
			[username, email, password_hash],
		);

		return res.rows[0];
	}

	async getUserById(id: string): Promise<types.UserAccount | null> {
		const res = await this.pool.query<types.UserAccount>(
			"SELECT id, username, created FROM users WHERE id = $1",
			[id],
		);
		return res.rows[0];
	}

	async getUserForLogin(email: string): Promise<types.UserAccount | null> {
		const res = await this.pool.query<types.UserAccount>(
			"SELECT id, password_hash FROM users WHERE email = $1",
			[email],
		);
		return res.rows[0];
	}

        async saveAuthSession(session: types.AuthSession) {
		const obj: any = {};
		obj[session.auth_id] = JSON.stringify(session);
	}
}

