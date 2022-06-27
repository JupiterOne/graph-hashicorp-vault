import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { userSpec } from './user';
import { accountSpec } from './account';
import { secretEngineSpec } from './secret-engine';
import { kv1Spec } from './kv1';
import { kv2Spec } from './kv2';
import { cubbyholeSpec } from './cubbyhole';
import { authBackendSpec } from './auth-backend';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...authBackendSpec,
    ...userSpec,
    ...secretEngineSpec,
    ...kv1Spec,
    ...kv2Spec,
    ...cubbyholeSpec,
  ],
};
