import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { HashiCorpVaultEngine, HashiCorpVaultPaths } from '../../types';
import { Entities, Steps, Relationships } from '../constants';
import { createSecretEntity } from './converter';

export async function fetchSecrets({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    {
      _type: Entities.SECRET_ENGINE._type,
    },
    async (secretEngineEntity) => {
      const secretEngine = getRawData<HashiCorpVaultEngine>(secretEngineEntity);
      if (!secretEngine) {
        logger.warn(
          { _key: secretEngineEntity._key },
          'Could not get raw data for kv1 engine entity',
        );
        return;
      }

      if (!secretEngine.name) {
        return;
      }

      let secrets: HashiCorpVaultPaths | undefined;

      if (secretEngine.type === 'kv' && secretEngine.options?.version === '1') {
        secrets = await apiClient.getKv1Secrets(secretEngine.name);
      } else if (
        secretEngine.type === 'kv' &&
        secretEngine.options?.version === '2'
      ) {
        secrets = await apiClient.getKv2Secrets(secretEngine.name);
      } else if (
        secretEngine.type === 'ns_cubbyhole' ||
        secretEngine.type === 'cubbyhole'
      ) {
        secrets = await apiClient.getCubbyholeSecrets(secretEngine.name);
      }

      if (secrets && secrets.data) {
        for (const path of secrets.data.keys) {
          const secretEntity = await jobState.addEntity(
            createSecretEntity(path, secretEngine),
          );

          await jobState.addRelationship(
            createDirectRelationship({
              from: secretEngineEntity,
              to: secretEntity,
              _class: RelationshipClass.HAS,
            }),
          );
        }
      }
    },
  );
}

export const secretSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.SECRETS,
    name: 'Fetch Secrets',
    entities: [Entities.SECRET],
    relationships: [Relationships.SECRET_ENGINE_HAS_SECRET],
    dependsOn: [Steps.SECRET_ENGINES],
    executionHandler: fetchSecrets,
  },
];
