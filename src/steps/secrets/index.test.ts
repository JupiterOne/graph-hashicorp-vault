import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

jest.setTimeout(500000000);

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-secrets', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-secrets',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.SECRETS);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
