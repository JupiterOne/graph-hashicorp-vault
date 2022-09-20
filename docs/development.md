# Development

This integration focuses on [HashiCorp Vault](https://www.vaultproject.io/) and
is using [HashiCorp Vault API](https://www.vaultproject.io/docs/) for
interacting with the HashiCorp Vault resources.

## Provider account setup

This integration can be used for both standalone (on-premise) Hashicorp Vault
and Hashicorp Vault Cloud offerings.

### In HashiCorp Vault

1. Provide the token to be used for the integration. If you're using Vault
   Enterprise, take note of the provided API
   [namespace](https://www.vaultproject.io/docs/enterprise/namespaces). The
   namespace is optional ENV field and is necessary for using Cloud offering.
2. Add the [policies](https://www.vaultproject.io/docs/concepts/policies)
   appropriate for the secret engines you're using.

## On Policies

### About token/account

The integration will attempt to fetch token details to build the root
entity/node. To allow for this to happen, the following role is needed:

```
path "auth/token/lookup-self" {
    capabilities = ["read"]
}
```

### About secret engines

In order for integration to be able to iterate through KV1, KV2 and Cubbyhole
engines, the `list` capability is necessary for the paths you wish to enable.

For example, if you've got KV1 enabled on path `my_kv1_path`, the following
policy rule should be defined for the token you'll use:

```
path "my_kv1_path/*" {
    capabilities = ["list"]
}
```

### About users

The integration can fetch all the users that exist in `userpass` authentication
method. If you'd like this, you need to make sure that `userpass` method of your
choosing (if you've got multiple) is defined in the policy assigned to the
token.

For example, if you've got `userpass` defined on path `my-userpass-1/` and
another `userpass` method defined on path `my-userpass-2/` and you'd like
integration to fetch all of their users, the following 2 rules would be
necessary:

```
# allows integration to detect this auth method
path "my-userpass-1/*" {
    capabilities = ["list"]
}

# allows integration to detect this auth method
path "my-userpass-2/*" {
    capabilities = ["list"]
}

# allows integration to access and read its users
path "auth/my-userpass-1/*" {
    capabilities = ["read", "list"]
}

# allows integration to access and read its users
path "auth/my-userpass-2/*" {
    capabilities = ["read", "list"]
}
```

## Authentication

Provide the `TOKEN`, `HOSTNAME` (format is: "http://localhost:8200/"), and
`NAMESPACE` (if applicable) to the `.env`. You can use
[`.env.example`](../.env.example) as a reference.

The credentials will be used to get the token for request Authorization.
