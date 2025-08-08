import { Router } from 'express';
import { validateRequest } from '../../../middleware/validateRequest';
import { userBaseZodSchema } from '../shared/userBase/userBase.validate';
import { AdminUserController } from './admin.controller';
import { Role } from '../shared/userBase/userBase.types';
import { checkAuth } from '../../../middleware/checkAuth';
import { manageAgentZodSchema, updateWalletStatusZodSchema } from './admin.validate';

const router = Router();

// create admin
router.post('/register', validateRequest(userBaseZodSchema), checkAuth(Role.ADMIN), AdminUserController.createAdminUser);

// view data
router.get('/get-users', checkAuth(Role.ADMIN), AdminUserController.viewUsers);
router.get('/get-wallets', checkAuth(Role.ADMIN), AdminUserController.viewWallets);
router.get('/get-transactions', checkAuth(Role.ADMIN), AdminUserController.viewTransactions);

//update route
router.patch('/manage-agent', validateRequest(manageAgentZodSchema), checkAuth(Role.ADMIN), AdminUserController.manageAgent);
router.patch('/update-wallet', validateRequest(updateWalletStatusZodSchema), checkAuth(Role.ADMIN), AdminUserController.updateWalletStatus);

export const AdminRouter = router;
