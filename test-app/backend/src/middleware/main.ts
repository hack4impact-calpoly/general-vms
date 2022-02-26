import type { Next, ParameterizedContext } from "koa";
import type { DB } from "../db/db";
import type { Context } from "common";
import type { SmallerMetadata } from "common";

export const mainMiddleware = (db: DB, metadata: Record<string, Partial<SmallerMetadata>>) => (ctx: ParameterizedContext<Context>, next: Next) => {
	ctx.state.db = db;
	ctx.state.metadata = metadata[ctx.path]
	return next();
};
