import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

export function createCubbyholeSecretEntity(pathname: string): Entity {
  return createIntegrationEntity({
    entityData: {
      source: { pathname },
      assign: {
        _type: Entities.CUBBYHOLE_SECRET._type,
        _class: Entities.CUBBYHOLE_SECRET._class,
        _key: `hashicorp_vault_cubbyhole_secret:${pathname}`,
        name: pathname,
      },
    },
  });
}
