const { initializeTestEnvironment } = require('@firebase/rules-unit-testing');
const fs = require('fs');

let testEnv;

module.exports.setup = async (data) => {
  const projectId = `rules-spec-${Date.now()}`;
  testEnv = await initializeTestEnvironment({
    projectId: projectId,
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8'),
      host: '127.0.0.1',
      port: '8080'
    }
  });

  await testEnv.withSecurityRulesDisabled(async (noRulesContext) => {
    const db = await noRulesContext.firestore();
    // const dbCollection = collection(db, collectionName);
    // docId = await (await addDoc(dbCollection, testData)).id;
    if (data) {
      for (const key in data) {
        const ref = db.doc(key);
        await ref.set(data[key]);
      }
    }
  });

  return testEnv;
};

module.exports.teardown = async () => {
  await testEnv.clearFirestore();
  await testEnv.cleanup();
};

expect.extend({
  async toAllow(x) {
    let pass = false;
    try {
      await firebase.assertSucceeds(x);
      pass = true;
    } catch (err) {}

    return {
      pass,
      message: () => 'Expected Firebase operation to be allowed, but it failed'
    };
  }
});

expect.extend({
  async toDeny(x) {
    let pass = false;
    try {
      await firebase.assertFails(x);
      pass = true;
    } catch (err) {}
    return {
      pass,
      message: () => 'Expected Firebase operation to be denied, but it was allowed'
    };
  }
});
