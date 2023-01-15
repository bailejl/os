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
    console.log("dashboard page");
    firebaseInstance = firebaseFactory.getFirebaseIntegration();
    auth = firebaseInstance.auth;
    db = firebaseInstance.database;
  }

  function signOut() {
    firebaseInstance.auth.signOut();
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
    { name: "Sign out", action: signOut, dataTestId: "sign-out-button" }
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

<div>
  <TransitionRoot show={isSidebarOpen}>
    <Dialog
      as="div"
      class="relative z-40 md:hidden"
      on:close={() => (isSidebarOpen = false)}
    >
      <TransitionChild
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div
            class="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4"
          >
            <TransitionChild
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  on:click={() => (isSidebarOpen = false)}
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex flex-shrink-0 items-center px-4">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                alt="Your Company"
              />
            </div>
            <div class="mt-5 h-0 flex-1 overflow-y-auto">
              <nav class="space-y-1 px-2">
                {#each navigation as item (item.name)}
                  <a
                    href={item.href}
                    class={classNames(
                      item.current
                        ? "bg-indigo-800 text-white"
                        : "text-indigo-100 hover:bg-indigo-600",
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    )}
                  >
                    <svelte:component
                      this={item.icon}
                      class="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                {/each}
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="w-14 flex-shrink-0" aria-hidden="true">
          <!-- {/* Dummy element to force sidebar to shrink to fit close icon */} -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- {/* Static sidebar for desktop */} -->
  <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
    <!-- {/* Sidebar component, swap this element with another sidebar if you like */} -->
    <div class="flex flex-grow flex-col overflow-y-auto bg-indigo-700 pt-5">
      <div class="flex flex-shrink-0 items-center px-4">
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
          alt="Your Company"
        />
      </div>
      <div class="mt-5 flex flex-1 flex-col">
        <nav class="flex-1 space-y-1 px-2 pb-4">
          <FirebaseApp {auth} firestore={db}>
            <User let:user>
              Hello {user.uid}

              <div slot="signedOut">You are signed out</div>
            </User>
          </FirebaseApp>

          {#each navigation as item (item.name)}
            <a
              href={item.href}
              class={classNames(
                item.current
                  ? "bg-indigo-800 text-white"
                  : "text-indigo-100 hover:bg-indigo-600",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
            >
              <svelte:component
                this={item.icon}
                class="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
                aria-hidden="true"
              />
              {item.name}
            </a>
          {/each}
        </nav>
      </div>
    </div>
  </div>
  <div class="flex flex-1 flex-col md:pl-64">
    <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <button
        type="button"
        class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        on:click={() => (isSidebarOpen = true)}
      >
        <span class="sr-only">Open sidebar</span>
        <ChevronDoubleRightIcon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex flex-1 justify-between px-4">
        <div class="flex flex-1">
          <form class="flex w-full md:ml-0" action="#" method="GET">
            <label for="search-field" class="sr-only"> Search </label>
            <div
              class="relative w-full text-gray-400 focus-within:text-gray-600"
            >
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center"
              >
                <SearchIcon class="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
        <div class="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <FirebaseApp {auth} firestore={db}>
            <User let:user>
              Hello {user.uid}

              <div slot="signedOut">You are signed out</div>
            </User>
          </FirebaseApp>
          <!-- {/* Profile dropdown */} -->
          <Menu class="relative ml-3" let:open>
            <div>
              <MenuButton
                class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  data-testid="avatar-button"
                />
              </MenuButton>
            </div>
            {#if open}
              <div transition:fade>
                <MenuItems
                  static
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  {#each userNavigation as item (item.name)}
                    <MenuItem let:active as="div">
                      {#if item.action}
                        <button
                          on:click|preventDefault={() => {
                            if (item.action) {
                              item.action();
                            }
                          }}
                          data-testid={item.dataTestId}
                          class={classNames(
                            active ? "bg-gray-100" : "",
                            "w-full block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </button>
                      {:else}
                        <a
                          href={item.href}
                          class={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </a>
                      {/if}
                    </MenuItem>
                  {/each}
                </MenuItems>
              </div>
            {/if}
          </Menu>
        </div>
      </div>
    </div>

    <main>
      <div class="py-6">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 class="text-2xl font-semibold text-gray-900">Dashboard2</h1>
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <slot />
        </div>
      </div>
    </main>
  </div>
</div>
