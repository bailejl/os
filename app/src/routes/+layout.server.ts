import { env } from "$env/dynamic/private";

let enableFirebaseAppCheckDebugTokenSetup: boolean;
let firebaseAppCheckDebugToken: string | undefined;

enableFirebaseAppCheckDebugTokenSetup =
  env.ENABLE_FB_APP_CHECK_DEBUG_TOKEN_SETUP ? true : false;
firebaseAppCheckDebugToken = env.FB_APP_CHECK_DEBUG_TOKEN;

export const load = async () => {
  return {
    firebaseAppCheckDebugToken: firebaseAppCheckDebugToken,
    enableFirebaseAppCheckDebugTokenSetup: enableFirebaseAppCheckDebugTokenSetup
  };
};
