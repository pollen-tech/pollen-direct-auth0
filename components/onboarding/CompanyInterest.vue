<template>
  <div>
    <div class="d-flex flex-column align-center">
      <h3>Complete your company interest</h3>

      <v-card
        :width="$vuetify.display.mobile ? 300 : 450"
        elevation="0"
        class="align-center my-4"
      >
        <v-form ref="form">
          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium"
                >Categories of Interest <span class="red--text">*</span>
              </label>
            </div>

            <v-combobox
              v-model="item.category"
              :items="sellerStore.category"
              :return-object="false"
              placeholder="Main Category, Multi-Select (Mandatory)"
              variant="outlined"
              :rules="required"
            ></v-combobox>

            <v-combobox
              v-model="item.subCategory"
              :items="sellerStore.subCategory"
              :return-object="false"
              placeholder="Sub Category (Optional)"
              variant="outlined"
              :rules="required"
            ></v-combobox>
          </div>

          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium"
                >Market You Buy from <span class="red--text">*</span>
              </label>
            </div>

            <v-combobox
              v-model="item.marketYouBuyFrom"
              :items="[]"
              :return-object="false"
              placeholder="Choose one or more"
              variant="outlined"
              :rules="required"
            ></v-combobox>
          </div>

          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium">
                Target Resale Market <span class="red--text">*</span>
              </label>
            </div>

            <v-combobox
              v-model="item.targetResaleMarket"
              :items="[]"
              :return-object="false"
              placeholder="Choose one or more"
              variant="outlined"
              :rules="required"
            ></v-combobox>
          </div>
          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium">
                Monthly Order Volume<span class="red--text">*</span>
              </label>
            </div>

            <v-combobox
              v-model="item.monthlyOrderVolume"
              :items="[]"
              :return-object="false"
              placeholder="Choose one or more"
              variant="outlined"
              :rules="required"
            ></v-combobox>
          </div>

          <v-btn
            class="my-4 me-auto text-capitalize rounded-lg"
            color="#8431E7"
            block
            :loading="isLoading"
            @click="submit"
            >Continue</v-btn
          >
        </v-form>
      </v-card>

      <v-dialog
        v-model="showDialog"
        persistent
        class="mx-auto pa-2"
        :width="$vuetify.display.mobile ? 'auto' : '550'"
      >
        <v-card :title="dialogTitle">
          <v-card-text>
            <p>
              Acknowledgment that the user has successfully filled out the
              onboarding form, indicating readiness to proceed with the next
              steps in the user journey.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              class="ma-2 text-capitalize"
              href="/profile"
              >Go to Profile</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSellerStore } from "@/stores/seller";

const emit = defineEmits(["submit"]);
const sellerStore = useSellerStore();
const companyType = ref([
  {
    id: 1,
    name: "Type A",
    title: "Type A",
    description: "Description for Type A",
  },
  {
    id: 2,
    name: "Type B",
    title: "Type B",
    description: "Description for Type B",
  },
  {
    id: 3,
    name: "Type C",
    title: "Type C",
    description: "Description for Type C",
  },
]);

const items = ref(["Programming", "Design", "Vue", "Vuetify"]);
const item = ref({ items: [] });
const cities = ref([]);
const required = [(v) => !!v || "Field is required"];
const isLoading = ref(false);
const showDialog = ref(false);
const validateCompanyName = ref(0);
const selectedItem = ref(null);
const checkAcceptTerms = ref(false);

const fetchCity = () => {};
const submit = () => {
  emit("submit");
};
const onValidateCompanyName = () => {
  console.log(item.value);
  validateCompanyName.value = 2;
};
const checkTerms = () => {};
</script>
<style>
.custom-icon > .v-overlay__content {
  background: #6b7280 !important; /* Change this to your desired background color */
  color: #fff; /* Change this to your desired text color */
  border-radius: 8px !important;
  padding: 8px !important;
  font-size: 12px !important;
}

/* Optional: Customize the tooltip arrow */
.custom-icon .v-overlay__content::after {
  content: "◀"; /* Unicode arrow left character */
  font-family: "Material Icons"; /* Material Icons font family */
  color: #6b7280; /* Match this with your tooltip background color */
  position: absolute;
  top: 55%;
  left: -12px; /* Position arrow on the right side */
  transform: translateY(-50%);
  font-size: 16px; /* Adjust the size of the arrow icon */
}
</style>
