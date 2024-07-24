<template>
  <div>
    <AppLoading v-if="show_login" :loading="true" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useAuth } from "~/composables/auth0";
definePageMeta({
  layout: false,
});

const auth = useAuth();
const route = useRoute();
const show_login = ref(true);

onMounted(() => {
  show_login.value = false;
  if (route.query.user_id) {
    auth.handleAuth0Response(route.query);
    navigateTo("/onboarding");
  }
});
</script>

<style lang="scss" scoped></style>
