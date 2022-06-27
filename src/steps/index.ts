import { secretEnginesSteps } from './secret-engine';
import { accountSteps } from './account';
import { cubbyholeSteps } from './cubbyhole';
import { kv1Steps } from './kv1';
import { kv2Steps } from './kv2';
import { userSteps } from './user';
import { authMethodsSteps } from './auth-backend';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...secretEnginesSteps,
  ...authMethodsSteps,
  ...kv1Steps,
  ...kv2Steps,
  ...cubbyholeSteps,
];

export { integrationSteps };
