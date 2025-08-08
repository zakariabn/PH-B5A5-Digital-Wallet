import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { TransactionController } from './transaction.controllers';
import { cashInZodSchema, cashOutZodSchema, sendMonyZodSchema, topUpZodSchema } from './transaction.validate';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '../users/shared/userBase/userBase.types';

const router = Router();

router.post('/send', validateRequest(sendMonyZodSchema), checkAuth(Role.AGENT, Role.PERSONAL), TransactionController.handleSendMoney);
router.post('/cash-in', validateRequest(cashInZodSchema), checkAuth(Role.AGENT), TransactionController.handleCashIn);
router.post('/cash-out', validateRequest(cashOutZodSchema), checkAuth(Role.PERSONAL), TransactionController.handleCashOut);
router.post('/top-up', validateRequest(topUpZodSchema), checkAuth(Role.PERSONAL, Role.AGENT), TransactionController.handleTopUp);

export const TransactionRouter = router;

// route > controller > services -> (user) -> controller -> user_details,access_token,refresh_token
