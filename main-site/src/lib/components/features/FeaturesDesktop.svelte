<script lang="ts">
  import clsx from "$lib/clsx.mjs";

  import {
    Tab,
    TabGroup,
    TabList,
    TabPanels,
    TabPanel
  } from "@rgossiaux/svelte-headlessui";

  import Feature from "./Feature.svelte";

  export let features: Array<{
    name: string;
    summary: string;
    description: string;
    image: any;
    icon: () => any;
  }>;
</script>

<TabGroup as="div" class="hidden lg:mt-20 lg:block" let:selectedIndex>
  <TabList class="grid grid-cols-3 gap-x-8">
    {#each features as feature, featureIndex}
      <Feature
        feature={{
          ...feature
        }}
        isActive={featureIndex === selectedIndex}
        classNames="relative"
      >
        <Tab class="[&:not(:focus-visible)]:focus:outline-none">
          <span class="absolute inset-0" />
          {feature.name}
        </Tab>
      </Feature>
    {/each}
  </TabList>
  <TabPanels
    class="relative mt-20 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16"
  >
    <div class="-mx-5 flex">
      {#each features as feature, featureIndex}
        <TabPanel
          class={clsx(
            "px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none",
            featureIndex !== selectedIndex && "opacity-60"
          )}
          style={`{ transform: translateX(-${
            (selectedIndex === null ? 0 : selectedIndex) * 100
          }%) }`}
          aria-hidden={featureIndex !== selectedIndex}
        >
          <div
            class="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10"
          >
            <img class="w-full" src={feature.image} alt="" sizes="52.75rem" />
          </div>
        </TabPanel>
      {/each}
    </div>
    <div
      class="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10"
    />
  </TabPanels>
</TabGroup>
