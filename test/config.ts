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

const DEFAULT_TOKEN =
  'hvs.12345BpXxKlk5cMizBmKXlxFFjCxBzQoTMRKd3nocSpA-WwnGh4KHGh2cy5hQm9oTUd0bEdnbnd6VXppQUE2NE12345';
const DEFAULT_HOSTNAME = 'http://dummy.host.name/';
const DEFAULT_USERNAME = 'foo_bar';
const DEFAULT_PASSWORD = 'foobar123!';

export const integrationConfig: IntegrationConfig = {
  hostname: process.env.HOSTNAME || DEFAULT_HOSTNAME,
  token: process.env.TOKEN || DEFAULT_TOKEN,
  namespace: process.env.NAMESPACE || '',
  username: process.env.USERNAME || DEFAULT_USERNAME,
  password: process.env.PASSWORD || DEFAULT_PASSWORD,
  isCloud: process.env.IS_CLOUD === 'true' || false,
};

export function buildStepTestConfigForStep(stepId: string): StepTestConfig {
  return {
    stepId,
    instanceConfig: integrationConfig,
    invocationConfig: invocationConfig as IntegrationInvocationConfig,
  };
}
