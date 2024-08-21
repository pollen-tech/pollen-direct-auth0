<template>
  <v-sheet
    class="ma-2 pa-2 w-75 text-start d-flex align-start flex-column text--white"
    style="background-color: transparent"
  >
    <img
      src="~/assets/image/pollen-direct-white.svg"
      alt="Pollen image"
      width="70px"
    >
    <p class="font-weight-bold mt-8 mb-8 text-white" style="font-size: 24px">
      {{ title }}
    </p>
    <ul class="pl-4 pt-4" style="font-size: 18px; color: white">
      <li v-for="text in context" :key="text" class="pb-4">
        {{ text }}
      </li>
    </ul>
    <p class="text-start text-white font-weight-medium mt-4">
      - Powered by
      <a
        class="text-decoration-underline font-weight-bold"
        style="color: #fde68a"
        >Pollen.tech</a
      >
    </p>
  </v-sheet>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const _props = defineProps({
  title: {
    type: String,
    required: false,
    default: 'Bulk buy liquidation inventory from global brands today',
  },
  context: {
    type: Array,
    required: false,
    default: () => [
      'Pollen Pass Exclusive',
      '100% Authentic',
      'Known & Loved Brands',
      'Direct from Global Manufacturers',
      'Regularly Refreshed',
    ],
  },
  type: { type: String, required: false, default: 'pollenpass' },
});
</script>
