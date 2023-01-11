<script lang="ts">
  import AuthLayout from "$lib/components/AuthLayout.svelte";
  import Button from "$lib/components/Button.svelte";
  import TextField from "$lib/components/fields/TextField.svelte";
  // import Logo from "$lib/components/Logo.svelte";
</script>

<svelte:head>
  <title>Sign In - TaxPal</title>
</svelte:head>
<AuthLayout>
  <div class="flex flex-col">
    <a href="/" aria-label="Home">
      <!-- <Logo classNames="h-10 w-auto" /> -->
    </a>
    <div class="mt-20">
      <h2 class="text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-sm text-gray-700">
        Don’t have an account?{" "}
        <a href="/register" class="font-medium text-blue-600 hover:underline">
          Sign up
        </a>{" "}
        for a free trial.
      </p>
    </div>
  </div>
  <form action="#" class="mt-10 grid grid-cols-1 gap-y-8">
    <TextField
      label="Email address"
      id="email"
      props={{ name: "email", autoComplete: "email", required: "true" }}
      type="email"
    />
    <TextField
      label="Password"
      id="password"
      props={{
        name: "password",
        autoComplete: "current-password",
        required: "true"
      }}
      type="password"
    />
    <div>
      <Button
        props={{ type: "submit" }}
        variant="solid"
        color="blue"
        classNames="w-full"
      >
        <span>
          Sign in <span aria-hidden="true">&rarr;</span>
        </span>
      </Button>
    </div>
  </form>
</AuthLayout>
