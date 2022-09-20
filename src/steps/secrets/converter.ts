import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { HashiCorpVaultEngine } from '../../types';

import { Entities } from '../constants';

function getEngineType(engine: HashiCorpVaultEngine) {
  switch (engine.type) {
    case 'kv':
      if (engine.options?.version === '1') {
        return 'kv1';
      } else {
        return 'kv2';
      }
    case 'cubbyhole':
    case 'ns_cubbyhole':
      return 'cubbyhole';
    default:
      return engine.type;
  }
}

export function createSecretEntity(
  pathname: string,
  engine: HashiCorpVaultEngine,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: { pathname },
      assign: {
        _type: Entities.SECRET._type,
        _class: Entities.SECRET._class,
        _key: `hashicorp_vault_secret:${pathname}`,
        name: pathname,
        source: getEngineType(engine),
      },
    },
  });
}
