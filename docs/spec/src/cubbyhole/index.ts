import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../../src/config';

export const cubbyholeSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-cubbyhole-secrets',
    name: 'Fetch Cubbyhole Secrets',
    entities: [
      {
        resourceName: 'Cubbyhole Secret',
        _type: 'hashicorp_vault_cubbyhole_secret',
        _class: ['Secret'],
      },
    ],
    relationships: [
      {
        _type: 'hashicorp_vault_cubbyhole_engine_has_secret',
        sourceType: 'hashicorp_vault_cubbyhole_engine',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_cubbyhole_secret',
      },
    ],
    dependsOn: ['fetch-secret-engines'],
    implemented: true,
  },
];
