<template>
  <div>
    <AppEmpty v-if="is_visible" />
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "~/composables/auth0";

definePageMeta({
  layout: false,
});

const auth = useAuth();
const route = useRoute();
const router = useRouter();
const is_visible = ref(false);

onMounted(() => {
  setTimeout(async () => {
    if (route.query.user_id) {
      try {
        await auth.handleAuth0Response(route.query);
        await nextTick();
        router.push("/onboarding");
      } catch (error) {
        is_visible.value = true;
        console.error("Navigation error:", error);
      }
    } else {
      is_visible.value = true;
    }
  }, 800);
});
</script>

<style lang="scss" scoped></style>
