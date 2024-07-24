<template>
  <div>
    <div class="mx-4" v-if="is_authenticated">
      <LandingLoginBanner />
    </div>
    <div>
      <LandingCampaignBanner1 />
      <div class="mx-10">
        <LandingCampaignBanner2 />
        <LandingFAQ />
        <LandingTestimonialBanner />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/auth0";
const { is_user_authenticated } = useAuth();
const is_authenticated = computed(() => {
  return is_user_authenticated();
});
</script>

<style lang="scss" scoped></style>
