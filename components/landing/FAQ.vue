<template>
  <div>
    <v-container>
      <div class="my-8 text-center">
        <h2>Frequently Asked Questions</h2>
      </div>
      <div class="d-flex justify-center my-4">
        <v-expansion-panels
          v-model="panel"
          multiple
          variant="accordion"
          class="w-75"
        >
          <v-expansion-panel
            v-for="i in items"
            :key="i.title"
            elevation="0"
            :value="i.value"
            expand
          >
            <v-expansion-panel-title class="font-weight-medium faq-title">
              {{ i.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-grey-darken-1 py-4"
              >{{ i.desc }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div />
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      panel: [1, 2, 3, 4],
      items: [
        {
          value: 1,
          title:
            'How do I know that the products are authentic and catalogs are legitimate?',
          desc: 'All available liquidation items are listed by brands themselves, and shipped from manufacturers warehouses.',
        },
        {
          value: 2,
          title: 'What is Pollen Pass?',
          desc: 'Pollen Pass is Pollen’s membership program for buyers. Signing up for Pollen Pass on Pollen Direct allows buyers to view catalogs and make offers on Pollen Direct listings.',
        },
        {
          value: 3,
          title: 'How much does Pollen Pass cost?',
          desc: 'Pollen Pass is free.',
        },
        {
          value: 4,
          title: 'What if the products I’m looking for aren’t on the catalogs?',
          desc: 'Pollen would be happy to assist you in sourcing your desired inventory. Please contact contact@pollen.tech',
        },
      ],
    };
  },
});
</script>

<style scoped>
.faq-title {
  line-height: 1.4em;
}
</style>
