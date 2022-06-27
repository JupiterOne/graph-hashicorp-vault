import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-kv-2-secrets', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-kv-2-secrets',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.KV_2_SECRETS);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
