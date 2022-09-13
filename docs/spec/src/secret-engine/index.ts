import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const secretEngineSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/sys/internal/ui/mounts
     * PATTERN: Fetch Entities
     */
    id: 'fetch-secret-engines',
    name: 'Fetch Secret Engines',
    entities: [
      {
        resourceName: 'Secret Engine',
        _type: 'hashicorp_vault_engine',
        _class: ['Service'],
      },
    ],
    relationships: [
      {
        _type: 'hashicorp_vault_account_has_engine',
        sourceType: 'hashicorp_vault_account',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_engine',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
