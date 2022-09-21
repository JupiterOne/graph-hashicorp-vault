# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Added better handling for environment field `HOSTNAME`. When trailing slash
  ('/') isn't present it'll automatically be inserted to prevent integration
  from not working properly.

## 1.0.0 - 2022-09-20

### Added

- Ingest new entities

  - `hashicorp_vault_account`
  - `hashicorp_vault_auth_backend`
  - `hashicorp_vault_secret`
  - `hashicorp_vault_engine`
  - `hashicorp_vault_user`

- Build new relationships
  - `hashicorp_vault_account_has_auth_backend`
  - `hashicorp_vault_account_has_engine`
  - `hashicorp_vault_account_has_user`
  - `hashicorp_vault_auth_backend_has_user`
  - `hashicorp_vault_engine_has_secret`
