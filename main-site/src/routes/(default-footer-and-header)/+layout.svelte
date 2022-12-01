<script lang="ts">
  import "../app.postcss";

  import Header from "../../lib/components/header/Header.svelte";
  import Footer from "../../lib/components/Footer.svelte";
</script>

<Header />
<slot />
<Footer />
