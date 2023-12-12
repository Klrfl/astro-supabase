<script setup>
import GuestbookItem from "./GuestbookItem.vue";
import { createUsualClient } from "../lib/supabase";
import { onMounted, ref } from "vue";

const supabase = createUsualClient();

const isLoading = ref(false);

const guestbookArray = ref([]);
async function getGuestbookData() {
  try {
    isLoading.value = true;
    const { data, error } = await supabase
      .from("guestbook")
      .select("message, created_at, updated_at, profiles(name)");
    if (error) throw error;

    return data;
  } catch (err) {
    console.error(err.message);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  guestbookArray.value = await getGuestbookData();
});

async function updateGuestbookData(payload) {
  console.log(payload);
  try {
    guestbookArray.value = await getGuestbookData();
  } catch (err) {
    console.error(err.message);
  }
}

supabase
  .channel("guestbook-changes")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "guestbook" },
    updateGuestbookData,
  )
  .subscribe();
</script>

<template>
  <ul class="max-w-5xl mx-auto grid grid-cols-auto gap-4">
    <li class="message" v-if="isLoading">Loading messages...</li>
    <li class="message" v-else-if="!guestbookArray.length">
      No messages yet. Be the first to write one!
    </li>
    <GuestbookItem
      v-else
      v-for="guestbookData in guestbookArray"
      :key="`${guestbookData.id}-${guestbookData.created_at}`"
      :guestbook-data="guestbookData"
    />
  </ul>
</template>
