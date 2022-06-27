import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../../src/config';

export const kv1Spec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-kv-1-secrets',
    name: 'Fetch KV v1 Secrets',
    entities: [
      {
        resourceName: 'KV1 Secret',
        _type: 'hashicorp_vault_kv1_secret',
        _class: ['Secret'],
      },
    ],
    relationships: [
      {
        _type: 'hashicorp_vault_kv1_engine_has_secret',
        sourceType: 'hashicorp_vault_kv1_engine',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_kv1_secret',
      },
    ],
    dependsOn: ['fetch-secret-engines'],
    implemented: true,
  },
];
