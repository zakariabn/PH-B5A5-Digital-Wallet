import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { credentialLoginZodSchema } from './auth.validator';

const router = Router();

router.post('/login', validateRequest(credentialLoginZodSchema), AuthControllers.credentialLogin);

export const AuthRouter = router;
