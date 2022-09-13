import { secretEnginesSteps } from './secret-engine';
import { accountSteps } from './account';
import { secretSteps } from './secrets';
import { userSteps } from './user';
import { authMethodsSteps } from './auth-backend';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...secretEnginesSteps,
  ...authMethodsSteps,
  ...secretSteps,
];

export { integrationSteps };
