<template>
  <div>
    <v-card elevation="0"
      ><v-container class="text-center my-10">
        <h6 class="text-purple-darken-3">Pollen Pass on Pollen Direct</h6>
        <div class="d-flex justify-center my-4">
          <h2 class="w-75">
            Get exclusive access to the latest liquidation inventory catalogs
            with Pollen Pass
          </h2>
        </div>
        <v-img
          src="~/assets/image/men_safety_equipment.webp"
          max-height="250"
          cover
          class="bg-grey-lighten-2 my-6"
        ></v-img>
        <div>
          Pollen Pass is Pollen’s free buyer membership program. By signing up
          as a Pollen Pass member on Pollen Direct, buyers gain access to
          hundreds of catalogs across categories, and can make offers on
          overstock or near-expiry goods directly to global manufacturers.
        </div>

        <!-- <div class="my-10">
          <v-btn
            class="my-4 mx-2 me-auto text-capitalize"
            color="purple-darken-3"
            >Sign Up with Pollen Pass</v-btn
          >
          <v-btn
            variant="outlined"
            class="my-4 mx-2 me-auto text-capitalize"
            color="purple-darken-3"
            >Login</v-btn
          >
        </div> -->
      </v-container>
    </v-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
  data() {},
});
</script>
<style scoped></style>
