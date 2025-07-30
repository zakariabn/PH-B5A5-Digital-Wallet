import { Role } from '../modules/user/user.types';

export type TransactionDirection = 'cash-in' | 'cash-out';

export interface TransactionRule {
  from: Role;
  to: Role;
  direction: TransactionDirection;
  allowed: boolean;
}

export const transactionRules: TransactionRule[] = [
  // Agent ↔ User
  { from: Role.agent, to: Role.user, direction: 'cash-in', allowed: true },
  { from: Role.agent, to: Role.agent, direction: 'cash-in', allowed: true },
  { from: Role.user, to: Role.agent, direction: 'cash-out', allowed: true },
  { from: Role.agent, to: Role.user, direction: 'cash-out', allowed: false },
  { from: Role.agent, to: Role.agent, direction: 'cash-out', allowed: false },

  // Admin ↔ Agent
  { from: Role.admin, to: Role.agent, direction: 'cash-in', allowed: true },
  { from: Role.agent, to: Role.admin, direction: 'cash-in', allowed: false },
  { from: Role.agent, to: Role.admin, direction: 'cash-out', allowed: true },
];
