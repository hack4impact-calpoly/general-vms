import rawBody from "raw-body";
import type Router from "koa-router";
import type * as ws from "ws";
import type { Context }  from "common";

type UnaryHandler<I, O, C> = (ctx: C, request: I) => Promise<O>;
type StreamHandler<I, O, C> = (ctx: C, request: AsyncIterable<I>) => AsyncIterable<O>;

interface Message<T> {
	toJSON(msg: T): unknown
	fromJSON(data: unknown): T
}

interface IMethod<I, O, T> {
	name: string
	requestType: Message<I>
	responseType: Message<O>
	options: T
}

interface IService {
	name: string
	methods: Record<string, IMethod<any, any, any>>
}

export const newServiceManager = (
	unaryRouter: Router,
	streamRouter: Router,

) => <S extends IService>(service: S, impl: Record<
keyof S["methods"],
UnaryHandler<any, any, Context> | StreamHandler<any, any, Context>
>) => {

  for (const [fnName, method] of Object.entries(service.methods)) {

  const handler = impl[fnName];
  const handlerPath = `/${method.name}`;

  streamRouter.all(handlerPath, async(ctx) => {
     const websocket = (ctx as any).websocket as ws;
     console.log("made it here")
     const requestIterator = {
					[Symbol.asyncIterator]() {
						return {
							async next() {							
								 unaryRouter.post(handlerPath, async(ctx) => {
									const data = await rawBody(ctx.req);
									const msg = method.requestType.fromJSON(JSON.parse(data.toString("utf-8")))
									const result = await handler.bind(impl)(ctx.state, msg)
									ctx.body =  method.responseType.toJSON(result)
									ctx.set("Content-Type", "application/json")
								})
							}
						};
					},
				};

   
  
  const responseIterator = handler.bind(impl)(ctx.state, requestIterator) as AsyncIterable<Uint8Array>;

  for await (const response of responseIterator) {
				        	const json = method.responseType.toJSON(response as any);
						console.log(json);
						websocket.send(`1${JSON.stringify(json)}`);
					}

		  })
}
}
