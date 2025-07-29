import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.get('/user/:id', UserControllers.getSingleUser);

export const UserRouter = router;
