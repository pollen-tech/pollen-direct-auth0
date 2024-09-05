<template>
  <div>
    <v-sheet
      class="w-75 text-start d-flex align-start flex-column bg-white"
      style="background-color: transparent"
    >
      <div class="pa-12">
        <p class="text-h5 font-weight-bold">
          Overstock inventory direct from manufacturers
        </p>
        <p style="color: #782cd1" class="text-body-2 font-weight-medium">
          Pollen Direct
        </p>
        <ul class="mt-8" style="font-size: 18px">
          <li
            v-for="i in columnContext"
            :key="i"
            class="pb-4 text-body-2 mb-2"
            style="line-height: 22px"
          >
            <p class="text-body-1 font-weight-bold mb-1">{{ i.title }}</p>
            {{ i.description }}
          </li>
        </ul>
        <p class="text-start font-weight-medium mt-4">
          - Powered by
          <a
            class="text-decoration-underline font-weight-bold"
            style="color: #782cd1"
            >Pollen.tech</a
          >
        </p>
      </div>
      <img
        src="../../assets/image/onboarding-side-bar-bg.svg"
        alt="Pollen image"
        class="w-100"
      />
    </v-sheet>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: "OnboardingSideBar",
  data() {
    return {
      columnTitle: "PollenOS",
      columnContext: [
        {
          title: "Global Brands",
          description: "",
        },
        {
          title: "Regular Refreshed Catalogs",
          description: "",
        },
        {
          title:
            "Multiple Categories: personal care, house hold items, food and more",
          description: "",
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped></style>
