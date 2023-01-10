<script lang="ts">
  import clsx from "$lib/clsx.mjs";

  export let open: boolean;
</script>

<svg
  aria-hidden="true"
  class="h-3.5 w-3.5 overflow-visible stroke-slate-700"
  fill="none"
  stroke-width="2"
  stroke-linecap="round"
>
  <path
    d="M0 1H14M0 7H14M0 13H14"
    class={clsx("origin-center transition", open && "scale-90 opacity-0")}
  />
  <path
    d="M2 2L12 12M12 2L2 12"
    class={clsx("origin-center transition", !open && "scale-90 opacity-0")}
  />
</svg>
