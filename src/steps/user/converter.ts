import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { HashiCorpVaultUser } from '../../types';

export function createUserEntity(
  username: string,
  userpassPath: string,
  userData: HashiCorpVaultUser,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: { username, ...userData },
      assign: {
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        _key: `hashicorp_vault_user:${userpassPath}:${username}`,
        name: username,
        active: true,
        policies:
          userData.data && userData.data.policies
            ? userData.data.policies
            : undefined,
      },
    },
  });
}
