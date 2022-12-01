<script lang="ts">
  let backgroundImage = "images/background-auth.jpg";
</script>

<div class="relative flex min-h-full justify-center md:px-12 lg:px-0">
  <div
    class="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28"
  >
    <div class="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
      <slot />
    </div>
  </div>
  <div class="hidden sm:contents lg:relative lg:block lg:flex-1">
    <img
      class="absolute inset-0 h-full w-full object-cover"
      src={backgroundImage}
      alt=""
    />
  </div>
</div>
