<script lang="ts">
  import { browser } from "$app/environment";
  import firebaseFactory, {
    FirebaseIntegration
  } from "$lib/integrations/baas/firebase/firebase-integration";
  import {
    Dialog,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    TransitionChild,
    TransitionRoot
  } from "@rgossiaux/svelte-headlessui";
  import {
    // Bars3BottomLeftIcon,
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XIcon,
    ChevronDoubleRightIcon
  } from "@rgossiaux/svelte-heroicons/solid";
  import { SearchIcon } from "@rgossiaux/svelte-heroicons/solid";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import { fade } from "svelte/transition";
  import { FirebaseApp, User } from "sveltefire";

  let firebaseInstance: FirebaseIntegration;
  let auth: Auth;
  let db: Firestore;

  if (browser) {
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
    auth = firebaseInstance.auth;
    db = firebaseInstance.database;
  }

  const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Team", href: "#", icon: UsersIcon, current: false },
    { name: "Projects", href: "#", icon: FolderIcon, current: false },
    { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
    { name: "Documents", href: "#", icon: InboxIcon, current: false },
    { name: "Reports", href: "#", icon: ChartBarIcon, current: false }
  ];
  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" }
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  let isSidebarOpen = true;
</script>

<!-- <svelte:head>
  <title>Our Ways of Working</title>
  <meta
    name="description"
    content="We help teams and organizations perform better by tapping into people's potential."
  />
</svelte:head> -->
