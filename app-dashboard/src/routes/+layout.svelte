<script lang="ts">
  import firebaseFactory from "$lib/integrations/baas/firebase/firebase-integration";
  import { onMount } from "svelte";
  import "../app.css";
  import "/node_modules/focus-visible/dist/focus-visible.min.js";
  import { appCheckConfig } from "../app-check-config";

  export const ssr = false;

  onMount(() => {
    // https://firebase.google.com/docs/app-check/web/debug-provider?hl=en&authuser=0
    if (appCheckConfig.enableFirebaseAppCheckDebugTokenSetup === true) {
      window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    } else if (location.hostname === "localhost") {
      window.FIREBASE_APPCHECK_DEBUG_TOKEN =
        appCheckConfig.firebaseAppCheckDebugToken;
    }
    firebaseFactory.getFirebaseIntegration();
  });
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
