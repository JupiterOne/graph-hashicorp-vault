import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';
import { StepTestConfig } from '@jupiterone/integration-sdk-testing';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { invocationConfig } from '../src';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}

const DEFAULT_TOKEN = 'abcd';
const DEFAULT_HOSTNAME =
  'https://vault-cluster-public-vault-edc6aa8d.0ce171e9.z1.hashicorp.cloud:8200/';

export const integrationConfig: IntegrationConfig = {
  hostname: process.env.HOSTNAME || DEFAULT_HOSTNAME,
  token: process.env.TOKEN || DEFAULT_TOKEN,
  namespace: process.env.NAMESPACE || '',
};

export function buildStepTestConfigForStep(stepId: string): StepTestConfig {
  return {
    stepId,
    instanceConfig: integrationConfig,
    invocationConfig: invocationConfig as IntegrationInvocationConfig,
  };
}
