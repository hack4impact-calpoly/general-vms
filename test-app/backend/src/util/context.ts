import type Koa from "koa";
import type { DB } from "../db/db";
import type { SmallerMetadata } from "common";

export type KoaContext = Koa.ParameterizedContext<Context>;
