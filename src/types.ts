export type HashiCorpVaultAccount = {
  request_id: string;
  lease_id: string;
  renewable: boolean;
  lease_duration: number;
  data: {
    accessor: string;
    creation_time: number;
    creation_ttl: number;
    display_name: string;
    entity_id: string;
    expire_time: string;
    explicit_max_ttl: number;
    id: string;
    issue_time: string;
    meta?: { username: string };
    num_uses: number;
    orphan: boolean;
    path: string;
    policies: string[];
    renewable: boolean;
    ttl: number;
    type: string;
  };
};

export type HashiCorpVaultUser = {
  request_id: string;
  lease_id: string;
  renewable: boolean;
  lease_duration: number;
  data: {
    policies: string[];
    token_bound_cidrs: string[];
    token_explicit_max_ttl: number;
    token_max_ttl: number;
    token_no_default_policy: boolean;
    token_num_uses: number;
    token_period: number;
    token_policies: string[];
    token_ttl: number;
    token_type: string;
  };
};

export type HashiCorpVaultEngineResponse = {
  request_id: string;
  lease_id: string;
  renewable: boolean;
  lease_duration: number;
  data: {
    auth: {
      [key: string]: HashiCorpVaultAuth;
    };
    secret: {
      [key: string]: HashiCorpVaultEngine;
    };
  };
};

export type HashiCorpVaultAuth = {
  name?: string;
  accessor: string;
  config: {
    default_lease_ttl: number;
    force_no_cache: boolean;
    max_lease_ttl: number;
    token_type: string;
  };
  description: string;
  external_entropy_access: boolean;
  local: boolean;
  seal_wrap: boolean;
  options?: any;
  type: string;
  uuid: string;
};

export type HashiCorpVaultEngine = {
  name?: string;
  accessor: string;
  config: {
    default_lease_ttl: number;
    force_no_cache: boolean;
    max_lease_ttl: number;
  };
  description: string;
  external_entropy_access: boolean;
  options?: {
    version: string;
  };
  local: boolean;
  seal_wrap: boolean;
  type: string;
  uuid: string;
};

export type HashiCorpVaultPaths = {
  request_id: string;
  lease_id: string;
  renewable: boolean;
  lease_duration: number;
  data: { keys: string[] };
};

export type HashiCorpVaultSecret = {
  [key: string]: string;
};
