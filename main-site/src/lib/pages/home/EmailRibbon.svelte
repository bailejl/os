<script lang="ts">
  import Container from "../../components/Container.svelte";
  import { MailIcon } from "@rgossiaux/svelte-heroicons/solid";
  import { writable } from "svelte/store";
  import { onDestroy } from "svelte";
  import { canSubmitEmail } from "./canSubmitEmailStore";

  let emailEl: HTMLInputElement;

  export let addEmailFunc: (email: string) => Promise<void>;

  async function submitEmail(event: SubmitEvent) {
    await addEmailFunc(emailEl.value);
    canSubmitEmail.update((n) => !n);
  }

  function showEmailForm(): undefined {
    canSubmitEmail.update((n) => !n);
    return undefined;
  }

  onDestroy(() => {
    canSubmitEmail.update((n) => true);
  });
</script>

{#if $canSubmitEmail}
  <Container classNames="pt-16 pb-16 text-center ">
    <div class="mt-10 grow flex-wrap justify-center gap-x-16 text-xl">
      Interested in signing up for notifications?
      <div class="flex grow justify-center">
        <form class="group mt-5 flex" on:submit|preventDefault={submitEmail}>
          <div class="relative mt-1 flex flex-row rounded-md shadow-sm">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <MailIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              required
              bind:this={emailEl}
              type="email"
              name="emailInput"
              id="emailInput"
              class=" mr-3 flex rounded-md border-gray-300 pl-10 required:border-indigo-500   invalid:text-pink-600 
      focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200
      disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm"
              placeholder="you@example.com"
            />
            <button
              type="submit"
              class="relative flex w-full shrink justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group-invalid:pointer-events-none group-invalid:bg-gray-300"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  </Container>
{:else}
  <Container classNames="pt-16 pb-16 text-center ">
    <div class="mt-10 flex flex-col">
      <p class="text-xl">Thanks for signing up for notifications!</p>
      <p>Want to submit another email?</p>
      <div class="mt-6 flex justify-center">
        <button
          on:click|preventDefault={showEmailForm}
          class="group relative flex h-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Another Email
        </button>
      </div>
    </div>
  </Container>
{/if}
