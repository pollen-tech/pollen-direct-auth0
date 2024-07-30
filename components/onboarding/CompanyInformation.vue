<template>
  <div>
    <div class="d-flex flex-column align-center">
      <h3>
        Complete your Company Information
        <span class="text-caption text-grey">(NOT AVAILABLE)</span>
      </h3>

      <v-card
        :width="$vuetify.display.mobile ? 300 : 450"
        elevation="0"
        class="align-center my-4"
      >
        <v-form ref="formRef">
          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium"
                >Company Name <span class="red--text">*</span>
                <v-icon
                  icon="mdi-information-outline"
                  size="x-small"
                  color="grey"
                  class="custom-icon"
                />
                <v-tooltip activator="parent" class="custom-icon">
                  Legal name of the company
                </v-tooltip>
              </label>
              <v-spacer />
              <v-chip
                v-if="validateCompanyName == 1"
                variant="tonal"
                color="#15803D"
                density="comfortable"
                size="x-small"
                text="Available"
              />
              <v-chip
                v-if="validateCompanyName == 2"
                variant="tonal"
                color="#B45309"
                density="comfortable"
                size="x-small"
                text="Already Exist"
              />
            </div>

            <v-text-field
              v-model="company.name"
              variant="outlined"
              placeholder="Enter Company Name"
              :rules="required"
              @blur="onValidateCompanyName"
            ></v-text-field>
          </div>
          <div class="my-2 text-start flex-1-0">
            <label class="font-weight-medium"
              >Company Type <span class="red--text">*</span>
            </label>
            <v-combobox
              v-model="company.types"
              :items="companyTypes"
              item-value="id"
              item-title="name"
              :return-object="false"
              placeholder="Select Company Type"
              variant="outlined"
              :rules="required"
            >
              <template v-slot:item="data">
                <v-list-item
                  :key="data.item.id"
                  @click="
                    () => {
                      console.log(data);
                      data.props.onClick(data.item);
                    }
                  "
                  v-bind="data.attrs"
                >
                  <template v-slot:prepend> </template>

                  <v-list-item-content>
                    <v-list-item-title>
                      {{ data.item.title }}

                      <v-tooltip class="custom-icon">
                        <div
                          class="multiline-text d-flex flex-column"
                          style="width: 250px"
                        >
                          <b>{{ data.item.title }}</b>
                          <span>{{ data.item.raw.description }}</span>
                        </div>
                        <template v-slot:activator="{ props }">
                          <v-icon
                            v-bind="props"
                            size="x-small"
                            color="grey"
                            icon="mdi-information-outline"
                          ></v-icon>
                        </template>
                      </v-tooltip>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>
          </div>

          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium"
                >Country of Operation <span class="red--text">*</span>
                <v-icon
                  icon="mdi-information-outline"
                  size="x-small"
                  color="grey"
                  class="custom-icon"
                />
                <v-tooltip activator="parent" class="custom-icon">
                  where your company is registered
                </v-tooltip>
              </label>
            </div>

            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="company.country"
                  item-value="id"
                  item-title="name"
                  :items="countries"
                  :return-object="true"
                  placeholder="Choose One"
                  variant="outlined"
                  :rules="required"
                  clearable
              /></v-col>
            </v-row>
          </div>
          <v-checkbox
            v-model="checkAcceptTerms"
            hide-details
            @change="checkTerms()"
          >
            <template v-slot:label>
              <div>
                Accept Pollen
                <a
                  href="https://www.pollen.tech/privacy"
                  target="_blank"
                  style="color: #6a27b9"
                  v-bind="props"
                  @click.stop
                >
                  Terms and Conditions
                </a>
              </div>
            </template>
          </v-checkbox>
          <v-btn
            :disabled="!checkAcceptTerms"
            class="my-4 me-auto text-capitalize rounded-lg"
            color="#8431E7"
            block
            :loading="isLoading"
            @click="submit"
            >Continue</v-btn
          >
          <v-btn
            variant="outlined"
            class="me-auto text-capitalize rounded-lg"
            block
            :loading="isLoading"
            style="z-index: 999"
            @click="$emit('skip')"
            >Skip Onboarding</v-btn
          >
        </v-form>
      </v-card>
      <!-- <v-card elevation="0" class="align-center px-8 w-100">
        <v-btn
          variant="outlined"
          class="me-auto text-capitalize rounded-lg"
          block
          :loading="isLoading"
          @click="$emit('skip')"
          >Skip Onboarding</v-btn
        >
      </v-card> -->

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
import { directApi } from "@/services/api";

const emit = defineEmits(["submit", "skip", "error"]);
const props = defineProps({
  userId: { type: String, default: "" },
  companyTypes: { type: Array, default: [] },
  countries: { type: Array, default: [] },
});

const sellerStore = useSellerStore();

const company = ref({});

const required = [(v) => !!v || "Field is required"];
const isLoading = ref(false);
const showDialog = ref(false);
const validateCompanyName = ref(0);
const checkAcceptTerms = ref(false);
const formRef = ref(null);

// const fetchCity = async (val) => {
//   if (val?.country_id) {
//     const city = await countryStore.get_cities(val?.country_id);
//     console.log(city);
//   }
// };
const submit = async () => {
  try {
    const { valid } = await formRef.value.validate();
    if (valid && validateCompanyName == 1) {
      const body = {
        user_id: props.userId,
        name: company.value.name,
        company_type_id: company.value.types,
        operation_country_id: company.value.country.country_id,
        operation_country_name: company.value.country.name,
      };
      console.log(body);
      const req = await directApi("/onboard-company", "POST", body);
      if (req.status_code == "CREATED") {
        emit("submit", req?.data);
      } else {
        emit("error", req);
        console.log(req);
      }
    }
  } catch (err) {}
};

const onValidateCompanyName = async () => {
  try {
    const req = await sellerStore.validate_company_exist(company.value.name);

    if (req?.id) {
      validateCompanyName.value = 2;
    } else {
      validateCompanyName.value = 1;
    }
  } catch (err) {
    console.log(err);
  }
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
