<script lang="ts">
  import {
    PopoverOverlay,
    Popover,
    PopoverButton,
    PopoverPanel,
    TransitionRoot,
    TransitionChild
  } from "@rgossiaux/svelte-headlessui";
  import MobileNavIcon from "./MobileNavIcon.svelte";
  import MobileNavLink from "./MobileNavLink.svelte";

  let open: boolean;
</script>

<Popover>
  <PopoverButton
    class="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
    aria-label="Toggle Navigation"
  >
    <MobileNavIcon {open} />
  </PopoverButton>
  <TransitionRoot>
    <TransitionChild
      as="div"
      enter="duration-150 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-150 ease-in"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <PopoverOverlay class="fixed inset-0 bg-slate-300/50" />
    </TransitionChild>
    <TransitionChild
      as="div"
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <PopoverPanel
        as="div"
        class="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
      >
        <MobileNavLink href="#features">Features</MobileNavLink>
        <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
        <MobileNavLink href="#pricing">Pricing</MobileNavLink>
        <hr class="m-2 border-slate-300/40" />
        <MobileNavLink href="/login">Sign in</MobileNavLink>
      </PopoverPanel>
    </TransitionChild>
  </TransitionRoot>
</Popover>
