import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { HashiCorpVaultEngine } from '../../types';

function getEngineName(engine: HashiCorpVaultEngine) {
  switch (engine.type) {
    case 'kv':
      if (engine.options?.version === '1') {
        return 'kv1';
      } else if (engine.options?.version === '2') {
        return 'kv2';
      }
      return engine.type;
    case 'cubbyhole':
    case 'ns_cubbyhole':
      return 'cubbyhole';
  }
}

function getEngineKey(engine: HashiCorpVaultEngine) {
  switch (engine.type) {
    case 'kv':
      if (engine.options?.version === '1') {
        return `hashicorp_vault_engine:kv1:${engine.uuid}`;
      } else if (engine.options?.version === '2') {
        return `hashicorp_vault_engine:kv2:${engine.uuid}`;
      }
      return engine.type;
    case 'cubbyhole':
    case 'ns_cubbyhole':
      return `hashicorp_vault_engine:cubbyhole:${engine.uuid}`;
    default:
      return `hashicorp_vault_engine:${engine.uuid}`;
  }
}

export function createSecretEngineEntity(
  engineName: string,
  engine: HashiCorpVaultEngine,
): Entity | undefined {
  return createIntegrationEntity({
    entityData: {
      source: {
        ...engine,
        name: engineName,
      },
      assign: {
        _type: Entities.SECRET_ENGINE._type,
        _class: Entities.SECRET_ENGINE._class,
        _key: getEngineKey(engine),
        name: getEngineName(engine),
        displayName: engineName,
        category: ['software'],
        function: ['encryption', 'key-management', 'password-management'],
      },
    },
  });
}
