<script lang="ts">
  import clsx from "$lib/clsx.mjs";

  import PricingCheckIcon from "./PricingCheckIcon.svelte";
  import Button from "../Button.svelte";

  export let name: string;
  export let price: string;
  export let description: string;
  export let href: string;
  export let features: Array<string>;
  export let featured = false;
</script>

<section
  class={clsx(
    "flex flex-col rounded-3xl px-6 sm:px-8",
    featured ? "order-first bg-blue-600 py-8 lg:order-none" : "lg:py-8"
  )}
>
  <h3 class="mt-5 font-display text-lg text-white">{name}</h3>
  <p class={clsx("mt-2 text-base", featured ? "text-white" : "text-slate-400")}>
    {description}
  </p>
  <p
    class="order-first font-display text-5xl font-light tracking-tight text-white"
  >
    {price}
  </p>
  <ul
    class={clsx(
      "order-last mt-10 flex flex-col gap-y-3 text-sm",
      featured ? "text-white" : "text-slate-200"
    )}
  >
    {#each features as feature}
      <li class="flex">
        <PricingCheckIcon
          classNames={featured ? "text-white" : "text-slate-400"}
        />
        <span class="ml-4">{feature}</span>
      </li>
    {/each}
  </ul>
  <Button
    {href}
    variant={featured ? "solid" : "outline"}
    color="white"
    classNames="mt-8"
    props={{ "aria-label": `Get started with the ${name} plan for ${price}` }}
  >
    Get started
  </Button>
</section>
