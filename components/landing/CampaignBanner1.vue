<template>
  <div>
    <v-card
      class="d-flex justify-center"
      height="450"
      image="~/assets/image/cargo_container.webp"
      theme="dark"
    >
      <v-card
        elevation="0"
        :class="[
          'd-flex flex-column justify-space-between text-center pa-12',
          xs ? 'w-100' : 'w-75',
        ]"
        color="#FFFFFF00"
      >
        <div class="my-4 text-uppercase">{{ title }}</div>
        <h1 class="my-2 landing-title text-wrap">
          {{ contentTitle }}
        </h1>
        <p v-if="!$vuetify.display.mobile" class="my-2">
          {{ contentDescription }}
        </p>
        <v-sheet color="#FFFFFF00">
          <!-- <v-btn class="my-4 me-auto text-capitalize" color="purple-darken-3"
            >Get Started</v-btn
          > -->
        </v-sheet>
      </v-card>
    </v-card>

    <v-card
      :class="
        'd-flex justify-center py-8 ' + $vuetify.display.mobile
          ? 'mt-8 mx-2 px-4'
          : 'mx-10'
      "
      :height="xs ? 'auto' : '450'"
      theme="dark"
      color="#F9FAFB"
      elevation="0"
      ><v-container>
        <v-row>
          <v-col
            cols="12"
            md="8"
            class="d-flex flex-column justify-space-between"
          >
            <div :class="$vuetify.display.mobile ? 'w-100' : 'w-75 '">
              <h2>Bulk buy liquidation inventory from global brands today</h2>
              <p class="py-6">
                Pollen Direct provides buyers with access to overstock or
                near-expiry inventory direct from global manufacturers. Sign up
                as a Pollen Pass member on Pollen Direct to receive exclusive
                catalogs curated just for you.
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-sheet color="#FFFFFF" theme="light" class="text-center pa-6">
              <h5 class="my-4">Pollen Direct Benefits</h5>
              <v-divider />

              <p v-for="b in benefits" :key="b" class="text-start my-2">
                <v-icon color="purple-darken-2" class="ma-2">mdi-check</v-icon>
                {{ b }}
              </p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDisplay } from "vuetify";

export default defineComponent({
  setup() {
    return {};
  },

  data() {
    return {
      title: "Pollen Direct",
      contentTitle: "Excess Inventory Direct from Global Manufacturers",
      contentDescription:
        "Authentic & verified liquidation inventory direct from manufacturers, exclusively for Pollen Pass members",
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
      ],
      benefits: [
        "Pollen Pass Exclusive",
        "100% Authentic",
        "Known & Loved Brands",
        "Direct from Global Manufacturers",
        "Regularly Refreshed",
      ],
      xs: useDisplay().xs,
    };
  },
});
</script>

<style scoped>
.landing-title {
  line-height: 1.2em;
  font-size: 52px;
  word-wrap: break-word;
}

@media (max-width: 722px) {
  .landing-title {
    line-height: 1.5em;
    font-size: 24px;
  }
}
</style>
