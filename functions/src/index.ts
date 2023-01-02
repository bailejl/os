import * as functions from 'firebase-functions';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export function analysisFunction(request: functions.Request, response: functions.Response): void {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
}
