import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../../src/config';

export const kv2Spec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-kv-2-secrets',
    name: 'Fetch KV v2 Secrets',
    entities: [
      {
        resourceName: 'KV2 Secret',
        _type: 'hashicorp_vault_kv2_secret',
        _class: ['Secret'],
      },
    ],
    relationships: [
      {
        _type: 'hashicorp_vault_kv2_engine_has_secret',
        sourceType: 'hashicorp_vault_kv2_engine',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_kv2_secret',
      },
    ],
    dependsOn: ['fetch-secret-engines'],
    implemented: true,
  },
];
