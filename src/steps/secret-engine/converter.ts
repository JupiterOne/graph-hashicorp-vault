import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { HashiCorpVaultEngine } from '../../types';

function getAssignmentDataBasedOnEngine(engine: HashiCorpVaultEngine) {
  switch (engine.type) {
    case 'kv':
      if (engine.options?.version === '1') {
        return {
          _type: Entities.KV_1_ENGINE._type,
          _class: Entities.KV_1_ENGINE._class,
          _key: `hashicorp_vault_kv1_engine:${engine.uuid}`,
        };
      } else if (engine.options?.version === '2') {
        return {
          _type: Entities.KV_2_ENGINE._type,
          _class: Entities.KV_2_ENGINE._class,
          _key: `hashicorp_vault_kv2_engine:${engine.uuid}`,
        };
      }
      return;
    case 'cubbyhole':
    case 'ns_cubbyhole':
      return {
        _type: Entities.CUBBYHOLE_ENGINE._type,
        _class: Entities.CUBBYHOLE_ENGINE._class,
        _key: `hashicorp_vault_cubbyhole_engine:${engine.uuid}`,
      };
  }
}

export function createSecretEngineEntity(
  engineName: string,
  engine: HashiCorpVaultEngine,
): Entity | undefined {
  const assignmentData = getAssignmentDataBasedOnEngine(engine);
  if (!assignmentData) {
    return;
  }

  return createIntegrationEntity({
    entityData: {
      source: {
        ...engine,
        name: engineName,
      },
      assign: {
        ...assignmentData,
        name: engineName,
        displayName: engineName,
        category: ['software'],
        function: ['encryption', 'key-management', 'password-management'],
      },
    },
  });
}

// export function createSecretEngineEntity(
//   engineName: string,
//   engine: HashiCorpVaultEngine,
// ): Entity {
//   return createIntegrationEntity({
//     entityData: {
//       source: { engineName, ...engine },
//       assign: {
//         _type: Entities.ENGINE._type,
//         _class: Entities.ENGINE._class,
//         _key: `hashicorp_vault_engine:${engineName}`,
//         name: engineName,
//       },
//     },
//   });
// }
