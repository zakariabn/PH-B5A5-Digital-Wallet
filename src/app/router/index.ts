import { Router } from 'express';
import { UserRouter } from '../modules/user/user.router';

export const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
