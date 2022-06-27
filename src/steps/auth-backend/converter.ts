import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { HashiCorpVaultAuth } from '../../types';

export function createAuthMethodEntity(
  authName: string,
  auth: HashiCorpVaultAuth,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {
        ...auth,
        name: authName,
      },
      assign: {
        _type: Entities.AUTH_BACKEND._type,
        _class: Entities.AUTH_BACKEND._class,
        _key: `hashicorp_vault_auth_backend:${auth.uuid}`,
        name: authName,
        displayName: authName,
        category: ['software'],
        function: ['authentication'],
      },
    },
  });
}
