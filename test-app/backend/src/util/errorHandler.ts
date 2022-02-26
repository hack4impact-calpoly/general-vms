import type { KoaContext } from "./context";

export const errorHandler = (debug = true) => (e: unknown) => {
	if (debug && e instanceof Error) {
		console.error("error:", e.message);
	}
};

export const errorHandlerMiddleware = (debug = true) => {
	const handler = errorHandler(debug);
	return async(ctx: KoaContext, next: () => Promise<any>) => {
		try {
			await next();
		}
		catch (e) {
			console.log("either error or nothing to do on this route");
		}
	};
};
