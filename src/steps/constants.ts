import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  USERS: 'fetch-users',
  SECRET_ENGINES: 'fetch-secret-engines',
  AUTH_BACKENDS: 'fetch-auth-backends',
  KV_1_SECRETS: 'fetch-kv-1-secrets',
  KV_2_SECRETS: 'fetch-kv-2-secrets',
  CUBBYHOLE_SECRETS: 'fetch-cubbyhole-secrets',
};

export const Entities: Record<
  | 'ACCOUNT'
  | 'USER'
  | 'AUTH_BACKEND'
  | 'CUBBYHOLE_ENGINE'
  | 'KV_1_ENGINE'
  | 'KV_2_ENGINE'
  | 'CUBBYHOLE_SECRET'
  | 'KV_1_SECRET'
  | 'KV_2_SECRET',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'hashicorp_vault_account',
    _class: ['Account'],
  },
  AUTH_BACKEND: {
    resourceName: 'Authentication Backend',
    _type: 'hashicorp_vault_auth_backend',
    _class: ['Service'],
  },
  USER: {
    resourceName: 'User',
    _type: 'hashicorp_vault_user',
    _class: ['User'],
  },
  CUBBYHOLE_ENGINE: {
    resourceName: 'Cubbyhole Engine',
    _type: 'hashicorp_vault_cubbyhole_engine',
    _class: ['Service'],
  },
  CUBBYHOLE_SECRET: {
    resourceName: 'Cubbyhole Secret',
    _type: 'hashicorp_vault_cubbyhole_secret',
    _class: ['Secret'],
  },
  KV_1_ENGINE: {
    resourceName: 'KV1 Engine',
    _type: 'hashicorp_vault_kv1_engine',
    _class: ['Service'],
  },
  KV_1_SECRET: {
    resourceName: 'KV1 Secret',
    _type: 'hashicorp_vault_kv1_secret',
    _class: ['Secret'],
  },
  KV_2_ENGINE: {
    resourceName: 'KV2 Engine',
    _type: 'hashicorp_vault_kv2_engine',
    _class: ['Service'],
  },
  KV_2_SECRET: {
    resourceName: 'KV2 Secret',
    _type: 'hashicorp_vault_kv2_secret',
    _class: ['Secret'],
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_AUTH_BACKEND'
  | 'AUTH_BACKEND_HAS_USER'
  | 'ACCOUNT_HAS_CUBBYHOLE_ENGINE'
  | 'ACCOUNT_HAS_KV_1_ENGINE'
  | 'ACCOUNT_HAS_KV_2_ENGINE'
  | 'KV_1_ENGINE_HAS_KV_1_SECRET'
  | 'KV_2_ENGINE_HAS_KV_2_SECRET'
  | 'CUBBYHOLE_ENGINE_HAS_CUBBYHOLE_SECRET',
  StepRelationshipMetadata
> = {
  AUTH_BACKEND_HAS_USER: {
    _type: 'hashicorp_vault_auth_backend_has_user',
    sourceType: Entities.AUTH_BACKEND._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ACCOUNT_HAS_AUTH_BACKEND: {
    _type: 'hashicorp_vault_account_has_auth_backend',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.AUTH_BACKEND._type,
  },
  ACCOUNT_HAS_CUBBYHOLE_ENGINE: {
    _type: 'hashicorp_vault_account_has_cubbyhole_engine',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.CUBBYHOLE_ENGINE._type,
  },
  ACCOUNT_HAS_KV_1_ENGINE: {
    _type: 'hashicorp_vault_account_has_kv1_engine',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.KV_1_ENGINE._type,
  },
  ACCOUNT_HAS_KV_2_ENGINE: {
    _type: 'hashicorp_vault_account_has_kv2_engine',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.KV_2_ENGINE._type,
  },
  KV_1_ENGINE_HAS_KV_1_SECRET: {
    _type: 'hashicorp_vault_kv1_engine_has_secret',
    sourceType: Entities.KV_1_ENGINE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.KV_1_SECRET._type,
  },
  KV_2_ENGINE_HAS_KV_2_SECRET: {
    _type: 'hashicorp_vault_kv2_engine_has_secret',
    sourceType: Entities.KV_2_ENGINE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.KV_2_SECRET._type,
  },
  CUBBYHOLE_ENGINE_HAS_CUBBYHOLE_SECRET: {
    _type: 'hashicorp_vault_cubbyhole_engine_has_secret',
    sourceType: Entities.CUBBYHOLE_ENGINE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.CUBBYHOLE_SECRET._type,
  },
};
