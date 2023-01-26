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
  try {
    await testEnv.clearFirestore();
    await testEnv.cleanup();
  } catch (error) {
    console.warn(error);
  }
};
