import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  USERS: 'fetch-users',
  SECRET_ENGINES: 'fetch-secret-engines',
  SECRETS: 'fetch-secrets',
  AUTH_BACKENDS: 'fetch-auth-backends',
};

export const Entities: Record<
  'ACCOUNT' | 'USER' | 'AUTH_BACKEND' | 'SECRET_ENGINE' | 'SECRET',
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
  SECRET_ENGINE: {
    resourceName: 'Secret Engine',
    _type: 'hashicorp_vault_engine',
    _class: ['Service'],
  },
  SECRET: {
    resourceName: 'Secret',
    _type: 'hashicorp_vault_secret',
    _class: ['Secret'],
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_AUTH_BACKEND'
  | 'ACCOUNT_HAS_USER'
  | 'AUTH_BACKEND_HAS_USER'
  | 'SECRET_ENGINE_HAS_SECRET'
  | 'ACCOUNT_HAS_SECRET_ENGINE',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_USER: {
    _type: 'hashicorp_vault_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
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
  ACCOUNT_HAS_SECRET_ENGINE: {
    _type: 'hashicorp_vault_account_has_engine',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.SECRET_ENGINE._type,
  },
  SECRET_ENGINE_HAS_SECRET: {
    _type: 'hashicorp_vault_engine_has_secret',
    sourceType: Entities.SECRET_ENGINE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.SECRET._type,
  },
};
