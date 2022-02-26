import Koa from 'koa';
import logger from 'koa-logger';
import Router from 'koa-router';
import websockify from 'koa-websocket';
import cors from '@koa/cors';
import chalk from 'chalk';
import { newServiceManager } from './routes/adapter';
import { DB } from './db/db';
import { metadata } from './routes/methodMetadata';
import { errorHandlerMiddleware } from "./util/errorHandler";
import { mainMiddleware } from "./middleware/main";
import  { authMiddleware }  from "./middleware/auth";
import { Container, AuthService, AuthServiceImpl, AuthServiceDefinition } from "common";
import { getConfig } from "./db/migrate";
import router from './shift/shift-api';
import * as dotenv from 'dotenv';

// eslint-ignore
export async function runServer() {
  dotenv.config();

  const config = getConfig();
  const app = websockify(new Koa());

  const use = (middleware: Koa.Middleware) => {
    app.use(middleware);
    app.ws.use(middleware);
  };

  use(logger());
  use(errorHandlerMiddleware());

  const db = await DB.create(config);

  use(mainMiddleware(db, metadata));
  use(authMiddleware);

  const auth = new Container(AuthServiceImpl);

  const unaryRouter = new Router();
  const streamRouter = new Router();

  const svcManager: any = newServiceManager(unaryRouter, streamRouter);

  svcManager(AuthServiceDefinition, auth);

  app.use(unaryRouter.routes());
  app.ws.use(streamRouter.routes() as any);
  
//  app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//    next();
//  });

//  app.use('/api', router);

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(chalk.magentaBright`
 ██████╗ ██╗   ██╗███╗   ███╗███████╗
██╔════╝ ██║   ██║████╗ ████║██╔════╝
██║  ███╗██║   ██║██╔████╔██║███████╗
██║   ██║╚██╗ ██╔╝██║╚██╔╝██║╚════██║
╚██████╔╝ ╚████╔╝ ██║ ╚═╝ ██║███████║
 ╚═════╝   ╚═══╝  ╚═╝     ╚═╝╚══════╝
                `);
    // eslint-disable-next-line no-console
    console.log(`${chalk.grey('Listening on')} ${chalk.blueBright(config.port)}`);
  });
}
