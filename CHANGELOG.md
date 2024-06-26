# v2.0.1 (Thu Apr 25 2024)

#### 🐛 Bug Fix

- update dockerfile [#18](https://github.com/JupiterOne/graph-hashicorp-vault/pull/18) ([@zemberdotnet](https://github.com/zemberdotnet))

#### ⚠️ Pushed to `main`

- Apply remove-codeql with multi-gitter [ci skip] ([@electricgull](https://github.com/electricgull))

#### Authors: 2

- Cameron Griffin ([@electricgull](https://github.com/electricgull))
- Matthew Zember ([@zemberdotnet](https://github.com/zemberdotnet))

---

# v2.0.1 (Thu Aug 24 2023)

#### 🐛 Bug Fix

- Update package.json for Auto
  [#17](https://github.com/JupiterOne/graph-hashicorp-vault/pull/17)
  ([@zemberdotnet](https://github.com/zemberdotnet))

#### Authors: 1

- Matthew Zember ([@zemberdotnet](https://github.com/zemberdotnet))

---

# v2.0.0 (Wed Aug 23 2023)

#### 💥 Breaking Change

- containerize integration
  [#15](https://github.com/JupiterOne/graph-hashicorp-vault/pull/15)
  ([@zemberdotnet](https://github.com/zemberdotnet))

#### 🐛 Bug Fix

- add npmrc to gitignore
  [#16](https://github.com/JupiterOne/graph-hashicorp-vault/pull/16)
  ([@zemberdotnet](https://github.com/zemberdotnet))

#### Authors: 1

- Matthew Zember ([@zemberdotnet](https://github.com/zemberdotnet))

---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 1.0.1 - 2022-09-21

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
