import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const userSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'hashicorp_vault_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'hashicorp_vault_auth_backend_has_user',
        sourceType: 'hashicorp_vault_auth_backend',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_user',
      },
      {
        _type: 'hashicorp_vault_account_has_user',
        sourceType: 'hashicorp_vault_account',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_user',
      },
    ],
    dependsOn: ['fetch-auth-backends'],
    implemented: true,
  },
];
