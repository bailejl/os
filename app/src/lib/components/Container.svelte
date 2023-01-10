<script lang="ts">
  import clsx from "$lib/clsx.mjs";

  export let classNames = "";
</script>

<div class={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", classNames)}>
  <slot />
</div>
