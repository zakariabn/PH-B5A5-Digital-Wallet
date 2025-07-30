import { Role } from '../modules/user/user.types';
import { TransactionDirection, transactionRules } from './transactionRules';

export function isTransactionAllowed(from: Role, to: Role, direction: TransactionDirection): boolean {
  const rule = transactionRules.find(r => r.from === from && r.to === to && r.direction === direction);
  return rule ? rule.allowed : false;
}
