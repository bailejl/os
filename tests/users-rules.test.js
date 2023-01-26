const { setup, teardown } = require('./helpers');
const { assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const { getDoc, setDoc, updateDoc } = require('firebase/firestore');
const { getData } = require('./data-helpers');

describe('RBAC Database Rules', () => {
  let testEnv;
  const rbacDataSet = getData();

  beforeAll(async () => {
    testEnv = await setup(rbacDataSet.data);
  });
  afterAll(async () => {
    await teardown();
  });

  test('logged out user cannot access record', async () => {
    const alice = testEnv.unauthenticatedContext().firestore();
    await assertFails(
      getDoc(alice.collection('users').doc(rbacDataSet.docIds.tenant1234AdminUID)),
      {}
    );
  });

  test('logged out user cannot write record', async () => {
    const alice = testEnv.unauthenticatedContext().firestore();
    await assertFails(setDoc(alice.collection('users').doc('0000'), { tenantId: '00000' }), {});
  });

  test('logged in non-admin cannot access other tenant record', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789CreatorUID).firestore();
    await assertFails(
      getDoc(alice.collection('users').doc(rbacDataSet.docIds.tenant1234AdminUID)),
      {}
    );
  });

  test('logged in non-admin can access record in the same tenant', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789CreatorUID).firestore();
    await assertSucceeds(
      getDoc(alice.collection('users').doc(rbacDataSet.docIds.tenant6789AdminUID)),
      {}
    );
  });

  test('logged in non-admin can write in their own record', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789CreatorUID).firestore();
    await assertSucceeds(
      setDoc(alice.collection('users').doc(rbacDataSet.docIds.tenant6789CreatorUID), {
        new: true
      }),
      {}
    );
  });

  test('logged in tenant non-admin cannot overwite the tenant ID in their own record', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789CreatorUID).firestore();
    await assertFails(
      setDoc(alice.collection('users').doc(rbacDataSet.docIds.tenant6789CreatorUID), {
        tenantId: 'jsakdf'
      }),
      {}
    );
  });

  test('logged in owow admin cannot overwite the tenant ID in their own record', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.owowAdminUID).firestore();
    await assertFails(
      setDoc(alice.collection('users').doc(rbacDataSet.docIds.owowAdminUID), {
        tenantId: 'jsakdf'
      }),
      {}
    );
  });

  test('logged in owow admin cannot overwite the tenant ID in anothers record', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.owowAdminUID).firestore();
    await assertFails(
      setDoc(alice.collection('users').doc(rbacDataSet.docIds.tenant6789AdminUID), {
        tenantId: 'jsakdf'
      }),
      {}
    );
  });
});
