import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

export function createKv2SecretEntity(pathname: string): Entity {
  return createIntegrationEntity({
    entityData: {
      source: { pathname },
      assign: {
        _type: Entities.KV_2_SECRET._type,
        _class: Entities.KV_2_SECRET._class,
        _key: `hashicorp_vault_kv2_secret:${pathname}`,
        name: pathname,
      },
    },
  });
}
