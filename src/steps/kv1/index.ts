import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { HashiCorpVaultEngine } from '../../types';
import { Entities, Steps, Relationships } from '../constants';
import { createKv1SecretEntity } from './converter';

export async function fetchKv1Secrets({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    {
      _type: Entities.KV_1_ENGINE._type,
    },
    async (kv1EngineEntity) => {
      const kv1Engine = getRawData<HashiCorpVaultEngine>(kv1EngineEntity);
      if (!kv1Engine) {
        logger.warn(
          { _key: kv1EngineEntity._key },
          'Could not get raw data for kv1 engine entity',
        );
        return;
      }

      if (!kv1Engine.name) {
        return;
      }

      const kvSecrets = await apiClient.getKv1Secrets(kv1Engine.name);
      if (kvSecrets.data) {
        for (const kvPath of kvSecrets.data.keys) {
          const kv1SecretEntity = await jobState.addEntity(
            createKv1SecretEntity(kvPath),
          );

          await jobState.addRelationship(
            createDirectRelationship({
              from: kv1EngineEntity,
              to: kv1SecretEntity,
              _class: RelationshipClass.HAS,
            }),
          );
        }
      }
    },
  );
}

export const kv1Steps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.KV_1_SECRETS,
    name: 'Fetch KV v1 Secrets',
    entities: [Entities.KV_1_SECRET],
    relationships: [Relationships.KV_1_ENGINE_HAS_KV_1_SECRET],
    dependsOn: [Steps.SECRET_ENGINES],
    executionHandler: fetchKv1Secrets,
  },
];
