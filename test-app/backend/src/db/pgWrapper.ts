import { Pool } from "pg";
import type { QueryConfig, QueryResult, QueryResultRow } from "pg";

export class WrappedPool extends Pool {
	async query<R extends QueryResultRow = any, I extends any[] = any>(
		q: string | QueryConfig<I>,
		args?: I,
	): Promise<QueryResult<R>> {
		const stack = new Error("failed to exec").stack;
		try {
			return await super.query<R>(q, args);
		}
		catch (err) {
			err.stack = stack;
			throw err;
		}
	}
}
