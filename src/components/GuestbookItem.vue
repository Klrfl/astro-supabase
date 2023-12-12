<script setup>
import CTA from "./CTA.vue";
const props = defineProps({
  guestbookData: Object,
});

const guestbookName = props.guestbookData.profiles.name;
</script>

<template>
  <li class="outline outline-solid outline-gray-200 relative">
    <CTA class="absolute top-4 right-4">Edit your message</CTA>
    <article class="p-4 rounded shadow">
      <h3 class="text-bold text-2xl">
        {{ guestbookName }}
      </h3>
      <p class="text-sm my-2">
        {{ new Date(guestbookData.created_at).toDateString() }} -
        {{ new Date(guestbookData.updated_at).toDateString() }}
      </p>
      <p class="my-1">
        {{ guestbookData.message }}
      </p>
    </article>
  </li>
</template>
