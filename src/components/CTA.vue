<script setup>
const props = defineProps({
  isLink: Boolean,
  danger: Boolean,
  fill: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <a :class="['cta', { fill: fill }, { danger: danger }]" v-if="isLink">
    <slot />
  </a>
  <button :class="['cta', { fill: fill }, { danger: danger }]" v-else>
    <slot />
  </button>
</template>

<style>
.cta {
  @apply px-4 py-2 rounded-md shadow outline outline-2 outline-slate-200;
}

.cta:hover {
  @apply bg-slate-200;
}

.cta:active {
  translate: 0 4px;
}

.fill {
  @apply bg-slate-200;
}

.fill:hover {
  @apply bg-slate-300;
}

.danger {
  @apply bg-transparent outline outline-2 outline-red-200;
}

.danger:hover {
  @apply bg-red-200;
}
</style>
