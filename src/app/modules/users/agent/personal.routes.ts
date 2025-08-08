import { Router } from 'express';
import { validateRequest } from '../../../middleware/validateRequest';
import { userBaseZodSchema } from '../shared/userBase/userBase.validate';
import { AgentUserController } from './agent.controller';
import { checkAuth } from '../../../middleware/checkAuth';
import { Role } from '../shared/userBase/userBase.types';

const router = Router();

router.post('/register', validateRequest(userBaseZodSchema), AgentUserController.createAgentUser);
router.get('/commissions', checkAuth(Role.AGENT), AgentUserController.viewCommission);

export const AgentRouter = router;
