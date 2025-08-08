import { Router } from 'express';
import { PersonalRouter } from '../../personal/personal.routes';
import { AgentRouter } from '../../agent/personal.routes';
import { AdminRouter } from '../../admin/admin.routes';

const router = Router();

const moduleRoutes = [
	{
		path: '/admin',
		route: AdminRouter,
	},
	{
		path: '/agent',
		route: AgentRouter,
	},
	{
		path: '/personal',
		route: PersonalRouter,
	},
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export const UserRouter = router;
