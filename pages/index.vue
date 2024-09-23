<template>
  <div>
    <AppLanding />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
definePageMeta({
  middleware: "auth",
});

const route = useRoute();

onMounted(() => {
  console.log(route);
});
</script>

<style lang="scss" scoped></style>
