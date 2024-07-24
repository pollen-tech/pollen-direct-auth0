<template>
  <div></div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "~/composables/auth0";

definePageMeta({
  layout: false,
});

const auth = useAuth();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  setTimeout(async () => {
    if (route.query.user_id) {
      try {
        await auth.handleAuth0Response(route.query);
        await nextTick();
        router.push("/onboarding");
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }
  }, 800);
});
</script>

<style lang="scss" scoped></style>
