<script setup>
const props = defineProps({
  guestbookData: Object,
});

const guestbookName = props.guestbookData.profiles.name;
</script>

<template>
  <li class="p-4 outline outline-solid outline-gray-200 rounded shadow-md">
    <article>
      <header class="p-0">
        <h3 class="text-bold text-2xl">
          {{ guestbookName }}
        </h3>
      </header>
      <p class="text-sm my-2 text-gray-700">
        {{ new Date(guestbookData.created_at).toDateString() }}
      </p>
      <p class="my-1">
        {{ guestbookData.message }}
      </p>
    </article>
  </li>
</template>
