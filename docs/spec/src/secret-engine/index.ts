import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const secretEngineSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-secret-engines',
    name: 'Fetch Secret Engines',
    entities: [
      {
        resourceName: 'KV1 Engine',
        _type: 'hashicorp_vault_kv1_engine',
        _class: ['Service'],
      },
      {
        resourceName: 'KV2 Engine',
        _type: 'hashicorp_vault_kv2_engine',
        _class: ['Service'],
      },
      {
        resourceName: 'Cubbyhole Engine',
        _type: 'hashicorp_vault_cubbyhole_engine',
        _class: ['Service'],
      },
    ],
    relationships: [
      {
        _type: 'hashicorp_vault_account_has_cubbyhole_engine',
        sourceType: 'hashicorp_vault_account',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_cubbyhole_engine',
      },
      {
        _type: 'hashicorp_vault_account_has_kv1_engine',
        sourceType: 'hashicorp_vault_account',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_kv1_engine',
      },
      {
        _type: 'hashicorp_vault_account_has_kv2_engine',
        sourceType: 'hashicorp_vault_account',
        _class: RelationshipClass.HAS,
        targetType: 'hashicorp_vault_kv2_engine',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
