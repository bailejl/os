<script lang="ts">
  import clsx from "clsx";

  import FieldLabel from "./FieldLabel.svelte";

  const formClasses =
    "block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm";

  export let id: string;
  export let label: string;
  export let type = "text";
  export let classNames = "";
  export let props = {};
</script>

<div class={classNames}>
  {#if label}
    <FieldLabel {id}>{label}</FieldLabel>
  {/if}
  <input {id} {type} {...props} class={formClasses} />
</div>
