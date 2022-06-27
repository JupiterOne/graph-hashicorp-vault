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
import { createCubbyholeSecretEntity } from './converter';

export async function fetchCubbyholeSecrets({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    {
      _type: Entities.CUBBYHOLE_ENGINE._type,
    },
    async (cubbyholeEngineEntity) => {
      const cubbyholeEngine = getRawData<HashiCorpVaultEngine>(
        cubbyholeEngineEntity,
      );
      if (!cubbyholeEngine) {
        logger.warn(
          { _key: cubbyholeEngineEntity._key },
          'Could not get raw data for cubbyhole engine entity',
        );
        return;
      }

      if (!cubbyholeEngine.name) {
        return;
      }

      const cubbyholeSecrets = await apiClient.getCubbyholeSecrets(
        cubbyholeEngine.name,
      );

      if (cubbyholeSecrets.data) {
        for (const kvPath of cubbyholeSecrets.data.keys) {
          const cubbyholeSecretEntity = await jobState.addEntity(
            createCubbyholeSecretEntity(kvPath),
          );

          await jobState.addRelationship(
            createDirectRelationship({
              from: cubbyholeEngineEntity,
              to: cubbyholeSecretEntity,
              _class: RelationshipClass.HAS,
            }),
          );
        }
      }
    },
  );
}

export const cubbyholeSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.CUBBYHOLE_SECRETS,
    name: 'Fetch Cubbyhole Secrets',
    entities: [Entities.CUBBYHOLE_SECRET],
    relationships: [Relationships.CUBBYHOLE_ENGINE_HAS_CUBBYHOLE_SECRET],
    dependsOn: [Steps.SECRET_ENGINES],
    executionHandler: fetchCubbyholeSecrets,
  },
];
