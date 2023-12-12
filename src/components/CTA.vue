<script setup>
const props = defineProps({
  isLink: Boolean,
});
</script>

<template>
  <a class="cta" v-if="isLink">
    <slot />
  </a>
  <button class="cta" v-else>
    <slot />
  </button>
</template>

<style>
.cta {
  @apply bg-slate-200 px-4 py-2 rounded-md shadow;
}

.cta:hover {
  @apply bg-slate-300;
}

.cta:active {
  translate: 0 4px;
}

cta:focus-visible {
  @apply ring;
}
</style>
