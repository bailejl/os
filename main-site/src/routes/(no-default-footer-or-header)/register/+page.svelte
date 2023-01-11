<script lang="ts">
  import AuthLayout from "$lib/components/AuthLayout.svelte";
  import Button from "$lib/components/Button.svelte";
  import SelectField from "$lib/components/fields/SelectField.svelte";
  import TextField from "$lib/components/fields/TextField.svelte";
  // import Logo from "$lib/components/Logo.svelte";
</script>

<svelte:head>
  <title>Sign Up - TaxPal</title>
</svelte:head>
<AuthLayout>
  <div class="flex flex-col">
    <a href="/" aria-label="Home">
      <!-- <Logo classNames="h-10 w-auto" /> -->
    </a>
    <div class="mt-20">
      <h2 class="text-lg font-semibold text-gray-900">Get started for free</h2>
      <p class="mt-2 text-sm text-gray-700">
        Already registered?{" "}
        <a href="/login" class="font-medium text-blue-600 hover:underline">
          Sign in
        </a>{" "}
        to your account.
      </p>
    </div>
  </div>
  <form
    action="#"
    class="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
  >
    <TextField
      label="First name"
      id="first_name"
      props={{
        name: "first_name",
        autoComplete: "given-name",
        required: "true"
      }}
      type="text"
    />
    <TextField
      label="Last name"
      id="last_name"
      props={{
        name: "last_name",
        autoComplete: "family-name",
        required: "true"
      }}
      type="text"
    />
    <TextField
      classNames="col-span-full"
      label="Email address"
      id="email"
      props={{ name: "email", autoComplete: "email", required: "true" }}
      type="email"
    />
    <TextField
      classNames="col-span-full"
      label="Password"
      id="password"
      props={{ name: "password", autoComplete: "password", required: "true" }}
      type="password"
    />
    <SelectField
      classNames="col-span-full"
      label="How did you hear about us?"
      id="referral_source"
      props={{ name: "referral_source" }}
    >
      <option>AltaVista search</option>
      <option>Super Bowl commercial</option>
      <option>Our route 34 city bus ad</option>
      <option>The “Never Use This” podcast</option>
    </SelectField>
    <div class="col-span-full">
      <Button
        props={{ type: "submit" }}
        variant="solid"
        color="blue"
        classNames="w-full"
      >
        <span>
          Sign up <span aria-hidden="true">&rarr;</span>
        </span>
      </Button>
    </div>
  </form>
</AuthLayout>
