import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../../src/config';

export const authBackendSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/sys/internal/ui/mounts
     * PATTERN: Fetch Entities
     */
    id: 'fetch-auth-backends',
    name: 'Fetch Auth Backends',
    entities: [
      {
        resourceName: 'Authentication Backend',
        _type: 'hashicorp_vault_auth_backend',
        _class: ['Service'],
      },
    ],
    relationships: [
      {
        _type: 'hashicorp_vault_account_has_auth_backend',
        sourceType: 'hashicorp_vault_account',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_auth_backend',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
