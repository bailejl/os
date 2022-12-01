<script lang="ts">
  import Button from "../Button.svelte";
  import Container from "../Container.svelte";
  import Logo from "../Logo.svelte";
  import NavLink from "../NavLink.svelte";

  import MobileNavigation from "./MobileNavigation.svelte";
</script>

<header class="py-10">
  <Container>
    <nav class="relative z-50 flex justify-between">
      <div class="flex items-center md:gap-x-12">
        <a href="/" aria-label="Home">
          <Logo classNames="h-10 w-auto" />
        </a>
        <div class="hidden md:flex md:gap-x-6">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
        </div>
      </div>
      <div class="flex items-center gap-x-5 md:gap-x-8">
        <div class="hidden md:block">
          <NavLink href="/login">Sign in</NavLink>
        </div>
        <Button href="/register" color="blue">
          <span>
            Get started <span class="hidden lg:inline">today</span>
          </span>
        </Button>
        <div class="-mr-1 md:hidden">
          <MobileNavigation />
        </div>
      </div>
    </nav>
  </Container>
</header>
