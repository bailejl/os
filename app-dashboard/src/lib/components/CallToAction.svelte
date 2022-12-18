<script lang="ts">
  import Button from "./Button.svelte";
  import Container from "./Container.svelte";

  let backgroundImage = "images/background-call-to-action.jpg";
</script>

<section
  id="get-started-today"
  class="relative overflow-hidden bg-blue-600 py-32"
>
  <img
    class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
    src={backgroundImage}
    alt=""
    width={2347}
    height={1244}
  />
  <Container classNames="relative">
    <div class="mx-auto max-w-lg text-center">
      <h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl">
        Get started today
      </h2>
      <p class="mt-4 text-lg tracking-tight text-white">
        It’s time to take control of your books. Buy our software so you can
        feel like you’re doing something productive.
      </p>
      <Button href="/register" color="white" classNames="mt-10">
        Get 6 months free
      </Button>
    </div>
  </Container>
</section>
