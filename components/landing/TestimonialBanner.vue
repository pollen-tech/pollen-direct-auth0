<template>
  <div>
    <v-container class="my-8">
      <div class="text-center my-4">
        <h2>Testimonial</h2>
        <div class="d-flex justify-center my-8">
          <p
            :class="['font-italic', xs ? 'w-100' : 'w-75']"
            style="line-height: 1.8em"
          >
            “As frequent buyers of excess inventory off Pollen’s marketplace,
            we’ve consistently found the quality and quantity to be according to
            our requirements. Not only that, the team at Pollen has always gone
            the extra mile to secure the inventory requirements for us, they in
            collaboration with the brands also ensured appropriate
            documentations and extended logistics support. We’re excited for the
            additional features that Pollen continues to roll out, and
            wholeheartedly support their relentless commitment for making
            liquidated goods accessible and affordable for all.”
          </p>
        </div>

        <div>
          <p>JC Chen</p>
          <p class="text-caption">CEO, Showcase</p>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { xs } = useDisplay();
</script>

<style scoped></style>
