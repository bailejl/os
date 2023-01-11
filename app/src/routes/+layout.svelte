<script lang="ts">
  import "../app.css";
  import "/node_modules/focus-visible/dist/focus-visible.min.js";
  import firebaseFactory, {
    FirebaseIntegration
  } from "$lib/integrations/baas/firebase/firebase-integration";
  import { browser } from "$app/environment";

  let firebaseInstance: FirebaseIntegration;

  if (browser) {
    console.log("browser setup");
    let enableFirebaseAppCheckDebugTokenSetup =
      "{{ENABLE_FIREBASE_APP_CHECK_DEBUG_TOKEN_SETUP}}";
    let firebaseAppCheckDebugToken = "{{FIREBASE_APP_CHECK_DEBUG_TOKEN}}";
    // https://firebase.google.com/docs/app-check/web/debug-provider?hl=en&authuser=0
    if (enableFirebaseAppCheckDebugTokenSetup === "true") {
      window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    } else if (location.hostname === "localhost") {
      window.FIREBASE_APPCHECK_DEBUG_TOKEN = firebaseAppCheckDebugToken;
    }

    firebaseInstance = firebaseFactory.getFirebaseIntegration();
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&amp;family=Lexend:wght@400;500&amp;display=swap"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Alexandria"
  />
</svelte:head>
<slot />
