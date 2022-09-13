import {
  createDirectRelationship,
  Entity,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { HashiCorpVaultAuth } from '../../types';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Steps, Relationships } from '../constants';
import { createUserEntity } from './converter';

export async function fetchUsers({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await jobState.iterateEntities(
    {
      _type: Entities.AUTH_BACKEND._type,
    },
    async (authBackendEntity) => {
      const authBackend = getRawData<HashiCorpVaultAuth>(authBackendEntity);
      if (!authBackend) {
        logger.warn(
          { _key: authBackendEntity._key },
          'Could not get raw data for auth backend entity',
        );
        return;
      }

      if (!authBackend.name) {
        return;
      }

      await apiClient.iterateUsers(authBackend.name, async (username) => {
        const userDetails = await apiClient.getUser(
          authBackend.name!,
          username,
        );

        const userEntity = await jobState.addEntity(
          createUserEntity(username, authBackend.name!, userDetails),
        );

        await jobState.addRelationships([
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: authBackendEntity,
            to: userEntity,
          }),
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: accountEntity,
            to: userEntity,
          }),
        ]);
      });
    },
  );
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.USERS,
    name: 'Fetch Users',
    entities: [Entities.USER],
    relationships: [
      Relationships.AUTH_BACKEND_HAS_USER,
      Relationships.ACCOUNT_HAS_USER,
    ],
    dependsOn: [Steps.AUTH_BACKENDS],
    executionHandler: fetchUsers,
  },
];
