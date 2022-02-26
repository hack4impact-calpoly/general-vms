import type { Next } from "koa";
import type { KoaContext } from "../util/context";

export const authMiddleware = async(ctx: KoaContext, next: Next) => {
	const { db, metadata } = ctx.state;
	if (metadata.auth) {
		const user = await db.auth.getUserForLogin("baderbb@gmail.com")
		ctx.state.userId = user.id;
	}

	await next();
};
