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
import { createSecretEngineEntity } from './converter';

export async function fetchSecretEngines({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;
  const secretEngines = (await apiClient.getMounts()).data.secret;

  for (const [key, value] of Object.entries(secretEngines)) {
    if (!['kv', 'cubbyhole', 'ns_cubbyhole'].includes(value.type)) {
      // We're only supporting KV and Cubbyhole for now
      continue;
    }

    const secretEngineEntity = createSecretEngineEntity(key, value);
    if (secretEngineEntity) {
      await jobState.addEntity(secretEngineEntity);
      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: accountEntity,
          to: secretEngineEntity,
        }),
      );
    }
  }
}

export const secretEnginesSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.SECRET_ENGINES,
    name: 'Fetch Secret Engines',
    entities: [Entities.SECRET_ENGINE],
    relationships: [Relationships.ACCOUNT_HAS_SECRET_ENGINE],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchSecretEngines,
  },
];
