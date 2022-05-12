/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import 'source-map-support/register';
import serverlessExpress from '@vendia/serverless-express';
import app from '../server';

let serverlessExpressInstance;

function setup(event, context) {
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

export function lambdaHandler(event, context) {
  console.log(`Into the handler!`);
  console.log(event);
  console.log('context');
  console.log(context);

  if (serverlessExpressInstance) {
    console.log('Using existing setup!');
    return serverlessExpressInstance(event, context);
  } else {
    console.log('Calling setup!');
    return setup(event, context);
  }
}

export const handler = lambdaHandler;
