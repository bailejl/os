<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  class="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
>
  <slot />
</a>
