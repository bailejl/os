<script lang="ts">
  import "../app.css";
  import "/node_modules/focus-visible/dist/focus-visible.min.js";
  import firebaseFactory, {
    FirebaseIntegration
  } from "$lib/integrations/baas/firebase/firebase-integration";
  import { browser } from "$app/environment";

  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  let firebaseInstance: FirebaseIntegration;

  if (browser) {
    // https://firebase.google.com/docs/app-check/web/debug-provider?hl=en&authuser=0
    if (data.enableFirebaseAppCheckDebugTokenSetup) {
      window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    } else if (
      location.hostname === "localhost" &&
      data.firebaseAppCheckDebugToken
    ) {
      window.FIREBASE_APPCHECK_DEBUG_TOKEN = data.firebaseAppCheckDebugToken;
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
