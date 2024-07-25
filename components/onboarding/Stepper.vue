<template>
  <div>
    <div>
      <p class="font-weight-bold">Welcome {{ name }}!</p>
      <p>
        Complete the form below to view catalogs featuring millions of
        liquidation stock, and make your bulk purchase offers direct to global
        manufacturers.
      </p>
    </div>
    <div class="my-4">Step {{ step }} of 2</div>
    <v-row class="ga-2 py-0 mb-6" style="height: 20px; flex: none">
      <v-col class="py-0" style="height: 15px; background-color: #8431e7">
      </v-col>
      <v-col
        class="py-0"
        :style="{
          height: '15px',
          backgroundColor: step !== '2' ? '#e5e7eb' : '#8431e7',
        }"
      >
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const props = defineProps({
  step: { type: String, default: 1, required: false },
  name: { type: String, default: "" },
});
</script>

<style lang="scss" scoped></style>
