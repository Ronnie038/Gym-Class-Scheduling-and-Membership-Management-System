import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFount';

const app: Application = express();
// @ts-ignore
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
	// Promise.reject();
	res.status(200).send('hello from behind');
});

app.use(globalErrorHandler);

// Not found
// app.use(notFound);
export default app;
