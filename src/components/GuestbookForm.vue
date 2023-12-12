<script setup>
import CTA from "./CTA.vue";
import { ref, onMounted, computed } from "vue";
import { createUsualClient } from "../lib/supabase";

const supabase = createUsualClient();
const message = ref("");
const messageLength = computed(() => {
  return message.value.length;
});

const maxMessageLength = ref(420);

const userGuestbookCount = ref(0);
async function getUserGuestbookCount() {
  try {
    const { count, error } = await supabase
      .from("guestbook")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return count;
  } catch (err) {
    console.error(err.message);
  }
}

async function signGuestbook() {
  if (!confirm("you sure you want to sign my guestbook with this message?"))
    return;
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    await supabase
      .from("guestbook")
      .insert({ id: data.user.id, message: message.value });

    alert("message sucessfully added!");
    message.value = "";
  } catch (err) {
    alert("something went wrong! We're sorry. this is not your fault!");
    console.error(err.message);
  }
}

onMounted(async () => {
  userGuestbookCount.value = await getUserGuestbookCount();
});

supabase
  .channel("guestbook-list-changes")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "guestbook" },
    async () => {
      userGuestbookCount.value = await getUserGuestbookCount();
    },
  )
  .subscribe();
</script>

<template>
  <form @submit.prevent="signGuestbook">
    <label for="message">Guestbook Message</label>
    <input
      type="text"
      name="message"
      id="message"
      v-model="message"
      :maxlength="maxMessageLength"
      placeholder="Wha-???? How did you make this???"
      required
    />
    <span class="text-sm block my-2">
      {{ messageLength }} / {{ maxMessageLength }}
    </span>

    <CTA
      class="my-4"
      :disabled="messageLength > maxMessageLength || userGuestbookCount >= 3"
      >Submit guestbook ({{ userGuestbookCount }} / 3)</CTA
    >
  </form>
</template>
