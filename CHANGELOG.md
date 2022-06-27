# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Ingest new entities

  - `hashicorp_vault_account`
  - `hashicorp_vault_auth_backend`
  - `hashicorp_vault_cubbyhole_engine`
  - `hashicorp_vault_cubbyhole_secret`
  - `hashicorp_vault_kv1_engine`
  - `hashicorp_vault_kv1_secret`
  - `hashicorp_vault_kv2_engine`
  - `hashicorp_vault_kv2_secret`
  - `hashicorp_vault_user`

- Build new relationships
  - `hashicorp_vault_account_has_auth_backend`
  - `hashicorp_vault_account_has_cubbyhole_engine`
  - `hashicorp_vault_account_has_kv1_engine`
  - `hashicorp_vault_account_has_kv2_engine`
  - `hashicorp_vault_auth_backend_has_user`
  - `hashicorp_vault_cubbyhole_engine_has_secret`
  - `hashicorp_vault_kv1_engine_has_secret`
  - `hashicorp_vault_kv2_engine_has_secret`
