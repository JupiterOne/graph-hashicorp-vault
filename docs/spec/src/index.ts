import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { userSpec } from './user';
import { accountSpec } from './account';
import { secretEngineSpec } from './secret-engine';
import { secretSpec } from './secrets';
import { authBackendSpec } from './auth-backend';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...authBackendSpec,
    ...userSpec,
    ...secretEngineSpec,
    ...secretSpec,
  ],
};
