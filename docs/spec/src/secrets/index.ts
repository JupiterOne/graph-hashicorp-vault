import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../../src/config';

export const secretSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/{engineName}
     * PATTERN: Fetch Entities
     */
    id: 'fetch-secrets',
    name: 'Fetch Secrets',
    entities: [
      {
        resourceName: 'Secret',
        _type: 'hashicorp_vault_secret',
        _class: ['Secret'],
      },
    ],
    relationships: [
      {
        _type: 'hashicorp_vault_engine_has_secret',
        sourceType: 'hashicorp_vault_engine',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_secret',
      },
    ],
    dependsOn: ['fetch-secret-engines'],
    implemented: true,
  },
];
