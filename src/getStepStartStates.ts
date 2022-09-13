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

  const hasUserPassAuthBackend = Object.values(mounts.data.auth).find(
    (auth) => auth.type === 'userpass',
  );

  const stepStartStates: StepStartStates = {
    [Steps.ACCOUNT]: { disabled: false },
    [Steps.USERS]: { disabled: false },
    [Steps.SECRET_ENGINES]: { disabled: false },
    [Steps.AUTH_BACKENDS]: { disabled: !hasUserPassAuthBackend },
    [Steps.SECRETS]: { disabled: false },
  };

  return Promise.resolve(stepStartStates);
}
