<script lang="ts">
  import Feature from "./Feature.svelte";

  export let features: Array<{
    name: string;
    summary: string;
    description: string;
    image: string;
    icon: () => string;
  }>;
</script>

<div
  class="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden"
>
  {#each features as feature}
    <div>
      <Feature {feature} classNames="mx-auto max-w-2xl" isActive
        >feature.name</Feature
      >
      <div class="relative mt-10 pb-10">
        <div
          class="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6"
        />
        <div
          class="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10"
        >
          <img class="w-full" src={feature.image} alt="" sizes="52.75rem" />
        </div>
      </div>
    </div>
  {/each}
</div>
