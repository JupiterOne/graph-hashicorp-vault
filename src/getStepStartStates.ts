import {
  IntegrationExecutionContext,
  StepStartStates,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from './client';
import { IntegrationConfig } from './config';
import { Steps } from './steps/constants';

export default async function getStepStartStates(
  context: IntegrationExecutionContext<IntegrationConfig>,
): Promise<StepStartStates> {
  const apiClient = createAPIClient(context.instance.config);
  const mounts = await apiClient.getMounts();

  const hasKV1 = Object.values(mounts.data.secret).find(
    (engine) =>
      engine.type === 'kv' && engine.options && engine.options.version === '1',
  );
  const hasKV2 = Object.values(mounts.data.secret).find(
    (engine) =>
      engine.type === 'kv' && engine.options && engine.options.version === '2',
  );
  const hasCubbyhole = Object.values(mounts.data.secret).find(
    (engine) => engine.type === 'cubbyhole' || engine.type === 'ns_cubbyhole',
  );

  const hasUserPassAuthBackend = Object.values(mounts.data.auth).find(
    (auth) => auth.type === 'userpass',
  );

  const stepStartStates: StepStartStates = {
    [Steps.ACCOUNT]: { disabled: false },
    [Steps.USERS]: { disabled: false },
    [Steps.SECRET_ENGINES]: { disabled: false },
    [Steps.AUTH_BACKENDS]: { disabled: !hasUserPassAuthBackend },
    [Steps.KV_1_SECRETS]: { disabled: !hasKV1 },
    [Steps.KV_2_SECRETS]: { disabled: !hasKV2 },
    [Steps.CUBBYHOLE_SECRETS]: { disabled: !hasCubbyhole },
  };

  return Promise.resolve(stepStartStates);
}
