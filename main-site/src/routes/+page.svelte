<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import PrimaryFeatures from "$lib/components/features/PrimaryFeatures.svelte";
  import SecondaryFeatures from "$lib/components/features/SecondaryFeatures.svelte";
  import CallToAction from "$lib/components/CallToAction.svelte";
  import Testimonials from "$lib/components/testimonials/Testimonials.svelte";
  import Pricing from "$lib/components/pricing/Pricing.svelte";
  import Faqs from "$lib/components/Faqs.svelte";
  import Header from "../lib/components/header/Header.svelte";
  import Footer from "../lib/components/Footer.svelte";
</script>

<svelte:head>
  <title>TaxPal - Accounting made simple for small businesses</title>
  <meta
    name="description"
    content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
  />
</svelte:head>

<Header />
<main>
  <Hero />
  <PrimaryFeatures />
  <SecondaryFeatures />
  <CallToAction />
  <Testimonials />
  <Pricing />
  <Faqs />
</main>
<Footer />
