const { setup, teardown } = require('./helpers');
const { assertFails } = require('@firebase/rules-unit-testing');
const { getDoc, setDoc } = require('firebase/firestore');

describe('RBAC Database Rules', () => {
  let testEnv;

  beforeAll(async () => {
    testEnv = await setup();
  });
  afterAll(async () => {
    await teardown();
  });
  test('logged in non-admin cannot access admin rbac record', async () => {
    const alice = testEnv
      .authenticatedContext('alice', { claim: { role: 'viewer', tenantId: 'test-6789' } })
      .firestore();
    await assertFails(getDoc(alice.collection('core-rbac').doc('6wRb0bJci4y1PWtQI2SQ')), {});
  });
});
