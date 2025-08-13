import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from './app/router';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { env } from './app/config/env';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: env.FRONTEND_URL,
		credentials: true,
	})
);

// routes
app.use('/api/v1', router);

// root route
app.get('/', (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'Welcome To Digital Wallet API' });
});

// global error handler
app.use(globalErrorHandler);

// 404/Not-found route
app.use(notFound);

export default app;
