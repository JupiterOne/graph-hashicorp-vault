import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Steps, Relationships } from '../constants';
import { createAuthMethodEntity } from './converter';

export async function fetchAuthMethods({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;
  const authMethods = (await apiClient.getMounts()).data.auth;

  for (const [key, value] of Object.entries(authMethods)) {
    if (!['userpass'].includes(value.type)) {
      // We're only ingesting users from userpass type of authentication for now
      continue;
    }

    const authMethodEntity = createAuthMethodEntity(key, value);
    if (authMethodEntity) {
      await jobState.addEntity(authMethodEntity);
      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: accountEntity,
          to: authMethodEntity,
        }),
      );
    }
  }
}

export const authMethodsSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.AUTH_BACKENDS,
    name: 'Fetch Auth Backends',
    entities: [Entities.AUTH_BACKEND],
    relationships: [Relationships.ACCOUNT_HAS_AUTH_BACKEND],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchAuthMethods,
  },
];
