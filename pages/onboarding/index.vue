<template>
  <div class="h-100">
    <OnboardingHeader />
    <v-container>
      <div class="d-flex justify-space-between my-6">
        <NuxtLink
          to="/onboarding"
          variant="plain"
          class="text-grey-darken-1 cursor-pointer text-decoration-none text-capitalize text-body-2"
          external
        >
          <v-icon>mdi-chevron-left</v-icon> Previous</NuxtLink
        >
      </div>
      <v-row
        no-gutters
        class="h-100 rounded-lg"
        style="border: #e5e7eb solid 1px"
      >
        <v-col
          v-if="!$vuetify.display.mobile"
          cols="12"
          md="5"
          class="side-container"
        >
          <OnboardingSideBar />
        </v-col>
        <v-col cols="12" md="7" class="d-flex justify-center">
          <div class="w-75 d-flex flex-column h-100 py-8 mt-10">
            <OnboardingStepper :step="step" :name="profile?.first_name" />
            <OnboardingCompanyInformation
              v-if="step == '1'"
              @submit="next_step"
              @skip="goto_home_page"
            />
            <OnboardingCompanyInterest
              v-if="step == '2'"
              @previous-page="step = '1'"
              @submit="goto_home_page"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useSellerStore } from "~/stores/seller";

const { get_user_id } = useAuth();

const seller_store = useSellerStore();
const { get_user_profile } = seller_store;

const user_id = get_user_id();

const step = ref("1");
const profile = ref({});

onBeforeMount(async () => {
  if (user_id) {
    await get_profile();
  }
});

const get_profile = async () => {
  const req = await get_user_profile(user_id);
  if (req) {
    if (JSON.stringify(profile.value) !== JSON.stringify(req)) {
      profile.value = req.data ? req.data : req;
    }
  }
};

const goto_home_page = () => {
  window.location.href = "/";
};
const next_step = () => {
  step.value = 2;
};
</script>

<style lang="scss" scoped></style>
