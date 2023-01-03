<script lang="ts">
  import { PopoverButton } from "@rgossiaux/svelte-headlessui";

  export let href: string;
</script>

<PopoverButton as="a" {href} class="block w-full p-2">
  <slot />
</PopoverButton>
