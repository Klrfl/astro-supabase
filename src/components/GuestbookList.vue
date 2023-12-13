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
      .select("*, profiles(name)");
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
  switch (payload.eventType) {
    case "INSERT":
      try {
        const { data, error } = await supabase
          .from("guestbook")
          .select("*, profiles(name)")
          .eq("id", payload.new.id)
          .single();
        if (error) throw error;
        guestbookArray.value.push(data);
      } catch (err) {
        console.error(err.message);
      }
      break;

    case "DELETE":
      const oldItem = guestbookArray.value.indexOf(payload.old);
      guestbookArray.value.splice(oldItem, 1);
      break;

    case "UPDATE":
      try {
        const { data, error } = await supabase
          .from("guestbook")
          .select("*, profiles(name)")
          .eq("id", payload.new.id)
          .single();
        if (error) throw error;
        const oldItem = guestbookArray.value.indexOf(payload.old);
        guestbookArray.value.splice(oldItem, 1, data);
      } catch (err) {
        console.error(err.message);
      }
      break;

    default:
      try {
        guestbookArray.value = await getGuestbookData();
      } catch (err) {
        console.error(err.message);
      }
      break;
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
      :key="guestbookData.id"
      :guestbook-data="guestbookData"
    />
  </ul>
</template>
