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
  import EmailRibbon from "$lib/pages/home/EmailRibbon.svelte";
</script>

<svelte:head>
  <title>Our Ways of Working</title>
  <meta
    name="description"
    content="We help teams and organizations perform better by tapping into people's potential."
  />
</svelte:head>

<Header />
<main>
  <Hero />
  <EmailRibbon />
  <PrimaryFeatures />
  <EmailRibbon />
  <SecondaryFeatures />
  <EmailRibbon />
  <CallToAction />
  <EmailRibbon />
  <Testimonials />
  <EmailRibbon />
  <Pricing />
  <EmailRibbon />
  <Faqs />
  <EmailRibbon />
</main>
<Footer />
