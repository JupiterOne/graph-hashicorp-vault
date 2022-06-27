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
import { createKv2SecretEntity } from './converter';

export async function fetchKv2Secrets({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    {
      _type: Entities.KV_2_ENGINE._type,
    },
    async (kv2EngineEntity) => {
      const kv2Engine = getRawData<HashiCorpVaultEngine>(kv2EngineEntity);
      if (!kv2Engine) {
        logger.warn(
          { _key: kv2EngineEntity._key },
          'Could not get raw data for kv2 engine entity',
        );
        return;
      }

      if (!kv2Engine.name) {
        return;
      }

      const kvSecrets = await apiClient.getKv2Secrets(kv2Engine.name);
      if (kvSecrets.data) {
        for (const kvPath of kvSecrets.data.keys) {
          const kv2SecretEntity = await jobState.addEntity(
            createKv2SecretEntity(kvPath),
          );

          await jobState.addRelationship(
            createDirectRelationship({
              from: kv2EngineEntity,
              to: kv2SecretEntity,
              _class: RelationshipClass.HAS,
            }),
          );
        }
      }
    },
  );
}

export const kv2Steps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.KV_2_SECRETS,
    name: 'Fetch KV v2 Secrets',
    entities: [Entities.KV_2_SECRET],
    relationships: [Relationships.KV_2_ENGINE_HAS_KV_2_SECRET],
    dependsOn: [Steps.SECRET_ENGINES],
    executionHandler: fetchKv2Secrets,
  },
];
