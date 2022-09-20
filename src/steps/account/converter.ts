import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { HashiCorpVaultAccount } from '../../types';
import { Entities } from '../constants';

export function createAccountEntity(account: HashiCorpVaultAccount): Entity {
  return createIntegrationEntity({
    entityData: {
      source: account,
      assign: {
        _key: 'hashicorp_vault_account',
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        requestId: account.request_id,
        leaseId: account.lease_id,
        renewable: account.renewable,
        leaseDuration: account.lease_duration,
        accessor: account.data.accessor,
        creationTime: account.data.creation_time,
        creationTtl: account.data.creation_ttl,
        displayName: account.data.display_name,
        entityId: account.data.entity_id,
        expireTime: account.data.expire_time,
        explicitMaxTtl: account.data.explicit_max_ttl,
        id: account.data.id,
        issueTime: account.data.issue_time,
        username: account.data.meta?.username || account.data.display_name,
        name: account.data.meta?.username || account.data.display_name,
        numUses: account.data.num_uses,
        orphan: account.data.orphan,
        path: account.data.path,
        policies: account.data.policies,
        ttl: account.data.ttl,
        type: account.data.type,
      },
    },
  });
}
