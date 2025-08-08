import { Router } from 'express';
import { UserRouter } from '../modules/users/shared/userBase/userBase.routes';
import { AuthRouter } from '../modules/auth/auth.routes';
import { TransactionRouter } from '../modules/transaction/transaction.routes';

export const router = Router();

const moduleRoutes = [
	{
		path: '/user',
		route: UserRouter,
	},
	{
		path: '/auth',
		route: AuthRouter,
	},
	{
		path: '/transaction',
		route: TransactionRouter,
	},
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
