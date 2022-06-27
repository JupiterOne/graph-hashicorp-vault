import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  hostname: {
    type: 'string',
  },
  token: {
    type: 'string',
    mask: true,
  },
  namespace: {
    type: 'string',
  },
};

export interface IntegrationConfig extends IntegrationInstanceConfig {
  /**
   * The provider hostname used on requests.
   */
  hostname: string;

  /**
   * The provider token used to authenticate requests.
   */
  token: string;

  /**
   * The provider namespace used to authenticate requests for cloud deployments.
   */
  namespace?: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.hostname || !config.token) {
    throw new IntegrationValidationError(
      'Config requires all of {hostname, token}',
    );
  }

  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}
