const { setup, teardown } = require('./helpers');
const { assertFails } = require('@firebase/rules-unit-testing');
const { getDoc, setDoc } = require('firebase/firestore');

describe('Database Rules', () => {
  let testEnv;

  beforeAll(async () => {
    testEnv = await setup();
  });
  afterAll(async () => {
    await teardown();
  });
  test('fail when reading/writing to an unauthorized collection', async () => {
    const alice = testEnv.authenticatedContext('alice', {}).firestore();
    await assertFails(getDoc(alice.collection('some-nonexistent-collection').doc('alice')), {});
    await assertFails(
      setDoc(alice.collection('some-nonexistent-collection').doc('alice'), {
        foo: 'bar'
      }),
      {}
    );
  });
});
