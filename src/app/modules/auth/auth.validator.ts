import z from 'zod';
import { Role } from '../users/shared/userBase/userBase.types';

export const credentialLoginZodSchema = z.object({
  phone: z.string().regex(/^(?:\+880|880|0)1[3-9][0-9]{8}$/, {
    message: 'Invalid Bangladeshi phone number',
  }),
  password: z.string().regex(/^.{8,}$/, 'Password must be at least 8 characters long'),
  role: z.enum(Object.values(Role)),
});
