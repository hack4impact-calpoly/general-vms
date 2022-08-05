import * as dotenv from 'dotenv';
import express from 'express';
import UserAuthMiddleware from './models/user-session/middleware';
import { IGetUserAuthInfoRequest } from './models/user-session/types';
import shiftRouter from './shift/shift-api';
import formsRouter from './forms/form-api';

// Initialize stuff
dotenv.config();

const app = express();

console.log('Frontend origin:');
console.log(process.env.FRONTEND_ORIGIN);

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/test-auth', UserAuthMiddleware.checkUserAuthenticated, (req: IGetUserAuthInfoRequest, res) => {
  console.log(req?.locals);
  res.send('authenticated!');
});

// Add other routers
app.use('/api', shiftRouter, formsRouter);

app.get('/api/custom-test', (_req, res) => {
  console.log('Frontend origin:');
  console.log(process.env.FRONTEND_ORIGIN);
  res.send('Custom test GET!');
});

app.get('/test', (_req, res) => {
  res.send('Hi there!');
});

// Catch all route for 404s
app.all('*', (req, res) => {
  console.log('Request:');
  console.log(req.path);
  res.status(404).send('Page not found');
});

export default app;
