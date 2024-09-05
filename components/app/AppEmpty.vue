<template>
  <div class="pb-6">
    <div class="d-flex justify-center">
      <img class="pa-4" height="700" src="~/assets/image/under-con.svg" />
    </div>
    <div class="text-center text-body-2">
      <p class="pb-4">
        This page is under construction, We are still wrapping the gift nicely
        as of this moment, you’ll get notified once it’s ready.
      </p>
      <p>
        Need Help?
        <a
          class="text-purple-darken-3"
          :href="`https://wa.me/${salesTeamNumber}?text=Hello+Pollen,+I+need+your+assistance+in+signing-up.`"
          target="_blank"
          rel="noopener noreferrer"
          >Contact Sales Team</a
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      phoneLocal: "",
      salesTeamNumber: "",
      config: null,
    };
  },
  mounted() {
    const config = useRuntimeConfig();
    this.phoneLocal = "";
    this.salesTeamNumber = config.public.salesTeamNumber;
  },
});
</script>

<style scoped></style>
