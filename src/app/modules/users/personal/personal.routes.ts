import { Router } from 'express';
import { PersonalUserController } from './personal.controller';
import { validateRequest } from '../../../middleware/validateRequest';
import { userBaseZodSchema } from '../shared/userBase/userBase.validate';
import { checkAuth } from '../../../middleware/checkAuth';
import { Role } from '../shared/userBase/userBase.types';

const router = Router();

router.post('/register', validateRequest(userBaseZodSchema), PersonalUserController.createPersonalUser);
router.get('/transactions', checkAuth(Role.AGENT, Role.PERSONAL), PersonalUserController.viewTransaction);
router.get('/balance', checkAuth(Role.AGENT, Role.PERSONAL), PersonalUserController.checkBalance);

export const PersonalRouter = router;
