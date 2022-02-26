import type { Pool } from "pg";

export interface migration {
	up: (arg0: Pool) => Promise<any>
	down: (arg0: Pool) => Promise<any>
}

const migrations: migration[] = [];

export default migrations;
