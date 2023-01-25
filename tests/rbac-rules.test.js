const { setup, teardown } = require('./helpers');
const { assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const { getDoc, setDoc, deleteDoc } = require('firebase/firestore');
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

  test('logged in non-admin cannot access admin rbac record', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789CreatorUID).firestore();
    await assertFails(getDoc(alice.collection('core-rbac').doc('tenant6789Admin')), {});
  });

  test('logged in tenant admin cannot access admin rbac record for another tenant', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789AdminUID).firestore();
    await assertFails(getDoc(alice.collection('core-rbac').doc('tenant1234Admin')), {});
  });

  test('logged in tenant admin can access admin rbac record for their tenant', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789AdminUID).firestore();
    await assertSucceeds(getDoc(alice.collection('core-rbac').doc('tenant6789Admin')), {});
  });

  test('logged in OWOW admin can access rbac records for all tenants', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.owowAdminUID).firestore();
    await assertSucceeds(getDoc(alice.collection('core-rbac').doc('tenant6789Admin')), {});
  });

  test('logged in OWOW admin can create new rbac records for all tenants', async () => {
    const docId = `doc-id-${Date.now()}`;
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.owowAdminUID).firestore();
    await assertSucceeds(
      setDoc(alice.collection('core-rbac').doc(docId), { tenantId: '1234' }),
      {}
    );
  });

  test('logged in tenant admin updates rbac record for their tenant only', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789AdminUID).firestore();
    await assertSucceeds(
      setDoc(alice.collection('core-rbac').doc('tenant6789Admin'), { role: 'admins' }),
      {}
    );
  });

  test('logged in tenant admin fails to update rbac records for other tenant', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789AdminUID).firestore();
    await assertFails(
      setDoc(alice.collection('core-rbac').doc('tenant1234Admin'), { tenantId: '7777' }),
      {}
    );
  });

  test('logged in tenant admin fails to create new rbac records for another tenant', async () => {
    const docId = `doc-id-${Date.now()}`;
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789AdminUID).firestore();
    await assertFails(setDoc(alice.collection('core-rbac').doc(docId), { tenantId: '1234' }), {});
  });

  // TODO: The issue with deleteDoc failing
  test.skip('logged in tenant admin fails to delete rbac records for another tenant', async () => {
    const docId = `doc-id-${Date.now()}`;
    const testEnv = await setup({ [`/core-rbac/${docId}`]: { tenantId: '1234' } });
    const tenantAdmin = testEnv.authenticatedContext('alice').firestore();
    await assertFails(deleteDoc(tenantAdmin.collection('core-rbac').doc(docId)));
  });

  test('logged in tenant admin fails to change tenant ID for rbac record', async () => {
    const alice = testEnv.authenticatedContext(rbacDataSet.docIds.tenant6789AdminUID).firestore();
    await assertFails(
      setDoc(alice.collection('core-rbac').doc('tenant6789Admin'), { tenantId: '1234' }),
      {}
    );
  });
});
