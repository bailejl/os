<script lang="ts">
  import clsx from "$lib/clsx.mjs";

  export let feature: {
    name: string;
    summary: string;
    description: string;
    image: any;
    icon: () => any;
  };
  export let isActive: boolean;
  export let classNames: string;
  export let props = {};
</script>

<div
  class={clsx(classNames, !isActive && "opacity-75 hover:opacity-100")}
  {...props}
>
  <div
    class={clsx("w-9 rounded-lg", isActive ? "bg-blue-600" : "bg-slate-500")}
  >
    <svg aria-hidden="true" class="h-9 w-9" fill="none">
      {@html feature.icon()}
    </svg>
  </div>
  <h3
    class={clsx(
      "mt-6 text-sm font-medium",
      isActive ? "text-blue-600" : "text-slate-600"
    )}
  >
    <slot />
  </h3>
  <p class="mt-2 font-display text-xl text-slate-900">
    {feature.summary}
  </p>
  <p class="mt-4 text-sm text-slate-600">{feature.description}</p>
</div>
