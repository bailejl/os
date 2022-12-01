<script lang="ts">
  import "../app.postcss";
  import Header from "../lib/components/header/Header.svelte";
</script>

<div class="pr-3 pl-3">
  <Header />
</div>

<div class="pr-3 pl-3">
  <slot />
</div>
