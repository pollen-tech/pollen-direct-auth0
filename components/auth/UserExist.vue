<template>
  <v-dialog
    v-model="showDialog"
    persistent
    class="mx-auto"
    :width="$vuetify.display.mobile ? 'auto' : '550'"
  >
    <v-card class="pa-3">
      <v-card-title
        class="d-flex justify-space-between align-center"
        style="padding: 16px 24px 24px"
      >
        <span class="text-h5">{{ titleNotification }}</span>
        <v-icon class="close-icon" @click="hideDialog">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="text-body-2">{{ textNotification }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          variant="outlined"
          color="#374151"
          style="border-color: #d1d5db"
          @click="onSignUp()"
          >Sign Up</v-btn
        >
        <v-btn variant="flat" color="primary" @click="contactCS"
          >Contact CS</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCommonStore } from "~/stores/common";

const config = useRuntimeConfig();
const commonStore = useCommonStore();
const { showDialog, titleNotification, textNotification } =
  storeToRefs(commonStore);

const onSignUp = () => {
  navigateToPollenPass("signup");
};

const navigateToPollenPass = (param) => {
  const url = new URL(config.public.pollenPassUrl);
  url.searchParams.append("channel", "CH_DIRECT");
  url.searchParams.append("action", param);
  navigateTo(url.toString(), { external: true });
};

const contactCS = () => {
  console.log("Contact CS button clicked");
  commonStore.hideNotification();
  window.location.href = "mailto:cs@pollen.tech";
};

const hideDialog = () => {
  commonStore.hideDialog();
};
</script>

<style scoped>
.justify-end {
  justify-content: flex-end;
}
.dialog-title {
  color: var(--Neutral-900, #111827);
  font-feature-settings: "salt" on;

  /* Paragraph/Large/Medium */
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 155.556% */
}
.dialog-description {
  color: var(--Neutral-500, #6b7280);
  font-feature-settings: "salt" on;

  /* Paragraph/Small/Regular */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.dialog-description a {
  color: #782cd1;
}
</style>
