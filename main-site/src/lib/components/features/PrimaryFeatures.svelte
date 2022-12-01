<script lang="ts">
  import {
    Tab,
    TabGroup,
    TabList,
    TabPanels,
    TabPanel
  } from "@rgossiaux/svelte-headlessui";
  import clsx from "clsx";
  import { writable } from "svelte/store";

  import Container from "../Container.svelte";
  import { onDestroy, onMount } from "svelte";

  let backgroundImage = "images/background-features.jpg";
  let screenshotExpenses = "images/screenshots/expenses.png";
  let screenshotPayroll = "images/screenshots/payroll.png";
  let screenshotReporting = "images/screenshots/reporting.png";
  let screenshotVatReturns = "images/screenshots/vat-returns.png";

  const features = [
    {
      title: "Payroll",
      description:
        "Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.",
      image: screenshotPayroll
    },
    {
      title: "Claim expenses",
      description:
        "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
      image: screenshotExpenses
    },
    {
      title: "VAT handling",
      description:
        "We only sell our software to companies who don't deal with VAT at all, so technically we do all the VAT stuff they need.",
      image: screenshotVatReturns
    },
    {
      title: "Reporting",
      description:
        "Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.",
      image: screenshotReporting
    }
  ];

  let lgMediaQuery: MediaQueryList;

  const isVerticalWritableStore = writable();

  function onMediaQueryChange(event: MediaQueryListEvent): void {
    isVerticalWritableStore.set(event.matches ? "vertical" : "horizontal");
  }

  onMount(() => {
    lgMediaQuery = window.matchMedia("(min-width: 1024px)");
    lgMediaQuery.addEventListener("change", onMediaQueryChange);
  });

  onDestroy(() => {
    lgMediaQuery?.removeEventListener("change", onMediaQueryChange);
  });
</script>

<section
  id="features"
  aria-label="Features for running your books"
  class="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32"
>
  <img
    class="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
    src={backgroundImage}
    alt=""
    width={2245}
    height={1636}
  />
  <Container classNames="relative">
    <div class="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
      <h2
        class="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl"
      >
        Everything you need to run your books.
      </h2>
      <p class="mt-6 text-lg tracking-tight text-blue-100">
        Well everything you need if you aren’t that picky about minor details
        like tax compliance.
      </p>
    </div>
    <TabGroup
      as="div"
      class="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
      vertical={$isVerticalWritableStore === "vertical"}
    >
      <div
        class="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5"
      >
        <TabList
          class="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal"
          let:selectedIndex
        >
          {#each features as feature, featureIndex}
            <div
              class={clsx(
                "group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6",
                selectedIndex === featureIndex
                  ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                  : "hover:bg-white/10 lg:hover:bg-white/5"
              )}
            >
              <h3>
                <Tab
                  class={clsx(
                    "font-display text-lg [&:not(:focus-visible)]:focus:outline-none",
                    selectedIndex === featureIndex
                      ? "text-blue-600 lg:text-white"
                      : "text-blue-100 hover:text-white lg:text-white"
                  )}
                >
                  <span
                    class="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl"
                  />
                  {feature.title}
                </Tab>
              </h3>
              <p
                class={clsx(
                  "mt-2 hidden text-sm lg:block",
                  selectedIndex === featureIndex
                    ? "text-white"
                    : "text-blue-100 group-hover:text-white"
                )}
              >
                {feature.description}
              </p>
            </div>
          {/each}
        </TabList>
      </div>
      <TabPanels class="lg:col-span-7">
        {#each features as feature}
          <TabPanel>
            <div class="relative sm:px-6 lg:hidden">
              <div
                class="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"
              />
              <p
                class="relative mx-auto max-w-2xl text-base text-white sm:text-center"
              >
                {feature.description}
              </p>
            </div>
            <div
              class="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]"
            >
              <img
                class="w-full"
                src={feature.image}
                alt=""
                sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
              />
            </div>
          </TabPanel>
        {/each}
      </TabPanels>
    </TabGroup>
  </Container>
</section>
