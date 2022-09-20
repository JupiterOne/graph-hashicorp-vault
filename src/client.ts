import { Response } from 'node-fetch';
import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';
import { retry } from '@lifeomic/attempt';
import { fetchOrThrow } from './utils/helpers';
import {
  HashiCorpVaultAccount,
  HashiCorpVaultEngineResponse,
  HashiCorpVaultPaths,
  HashiCorpVaultUser,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}
  private baseUri = this.config.hostname;
  private withBaseUri = (path: string) => `${this.baseUri}v1/${path}`;
  private namespace = this.config.namespace;

  private async request(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<Response> {
    const token = this.config.token;

    try {
      const options = {
        method,
        headers: {
          'X-Vault-Token': token,
          ...(this.namespace && { 'x-vault-namespace': this.namespace }),
        },
      };

      // Handle rate-limiting
      const response = await retry(
        async () => {
          return fetchOrThrow(uri, options);
        },
        {
          delay: 12000,
          factor: 1.5,
          maxAttempts: 5,
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 502, 503].includes(err.statusCode) &&
                context.attemptNum > 1)
            )
              context.abort();
          },
        },
      );

      return response.json();
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async verifyAuthentication(): Promise<void> {
    const uri = this.withBaseUri('auth/token/lookup-self');
    try {
      await this.request(uri);
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async getMounts(): Promise<HashiCorpVaultEngineResponse> {
    const uri = this.withBaseUri('sys/internal/ui/mounts');
    return this.request(uri);
  }

  public async getKv1Secrets(
    kvEngineName: string,
  ): Promise<HashiCorpVaultPaths> {
    const uri = this.withBaseUri(`${kvEngineName.slice(0, -1)}?list=true`);
    return this.request(uri);
  }

  public async getKv2Secrets(
    kvEngineName: string,
  ): Promise<HashiCorpVaultPaths> {
    const uri = this.withBaseUri(
      `${kvEngineName.slice(0, -1)}/metadata?list=true`,
    );
    return this.request(uri);
  }

  public async getCubbyholeSecrets(
    cubbyholeEngineName: string,
  ): Promise<HashiCorpVaultPaths> {
    const uri = this.withBaseUri(
      `${cubbyholeEngineName.slice(0, -1)}?list=true`,
    );
    return this.request(uri);
  }

  /**
   * Gets the token details in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async getAccount(): Promise<HashiCorpVaultAccount> {
    const uri = this.withBaseUri('auth/token/lookup-self');
    return this.request(uri, 'GET');
  }

  /**
   * Iterates each user resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateUsers(
    path: string,
    iteratee: ResourceIteratee<any>,
  ): Promise<void> {
    const uri = this.withBaseUri(`auth/${path.slice(0, -1)}/users?list=true`);

    const users = await this.request(uri);
    if (users && users.data && users.data.keys) {
      for (const user of users.data.keys) {
        await iteratee(user);
      }
    }
  }

  /**
   * Iterates each user resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async getUser(
    path: string,
    userId: string,
  ): Promise<HashiCorpVaultUser> {
    const uri = this.withBaseUri(`auth/${path.slice(0, -1)}/users/${userId}`);
    return this.request(uri);
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
