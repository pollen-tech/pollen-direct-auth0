<template>
  <div class="d-flex flex-column my-4 mx-2">
    <v-breadcrumbs
      class="text-caption text-capitalize"
      color="deep-purple-accent-4"
      :items="['Home']"
    >
      <template #prepend>
        <v-icon size="small" color="#782CD1">mdi-home</v-icon>
      </template>
    </v-breadcrumbs>
  </div>

  <v-row
    style="background-color: #faf5ff"
    class="rounded-lg align-center pa-2 mb-8 mx-2 rounded-lg"
  >
    <v-col cols="1" class="text-center">
      <v-icon color="#782CD1">mdi-lightbulb-on-10</v-icon>
    </v-col>
    <v-col>
      <p class="font-weight-bold text-body-2 mb-1" style="color: #5b219e">
        Congratulations! You are now a member of Pollen Pass with access to
        Pollen Direct Catalogs.
      </p>
      <p class="text-body-2">
        A member of our sales team will be contacting you within 1 working day
        with eligible catalogs you can purchase from.
      </p>
    </v-col>
  </v-row>
</template>

<script setup></script>

<style lang="scss" scoped></style>
