<template>
  <div>
    <div class="d-flex flex-column align-center">
      <h3>Complete your Company Information</h3>

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
              :disabled="is_company_registered"
              @blur="onValidateCompanyName"
            />
          </div>
          <div class="my-2 text-start flex-1-0">
            <label class="font-weight-medium"
              >Company Type <span class="red--text">*</span>
            </label>
            <v-combobox
              v-model="company.types"
              :items="company_type"
              item-value="id"
              item-title="name"
              :return-object="false"
              placeholder="Select Company Type"
              variant="outlined"
              :rules="required"
              :loading="is_company_type_loading"
              :disabled="is_company_registered"
              @focus="fetchSellerCompanyTypes"
            />
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
                  :disabled="is_company_registered"
              /></v-col>
            </v-row>
          </div>
          <v-checkbox
            v-model="checkAcceptTerms"
            hide-details
            :disabled="is_company_registered"
            @change="checkTerms()"
          >
            <template #label>
              <div>
                Accept
                <a
                  :href="config.public.privacyPolicy"
                  target="_blank"
                  style="color: #6a27b9"
                  v-bind="props"
                  @click.stop
                >
                  Privacy Policy </a
                >&<a
                  :href="config.public.termCondition"
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
            v-if="!companyProfile.order_volume_id"
            :disabled="!checkAcceptTerms"
            class="my-4 me-auto text-capitalize rounded-lg"
            color="#8431E7"
            block
            :loading="isLoading"
            @click="submit"
            >Continue</v-btn
          >
          <v-btn
            v-else
            class="my-4 me-auto text-capitalize rounded-lg"
            color="#8431E7"
            block
            :disabled="is_complete_onboarding_disabled"
            @click="complete_onboarding"
            >Complete Onboarding</v-btn
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
            <v-spacer />
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

const emit = defineEmits(["submit", "skip", "error", "sendNotification"]);
const props = defineProps({
  userId: { type: String, default: "" },
  countries: { type: Array, default: () => [] },
  companyProfile: { type: Object, default: () => ({}) },
});

const config = useRuntimeConfig();
const sellerStore = useSellerStore();

const company_type = computed(() => sellerStore.seller_company_types);

const company = ref({});

const required = [(v) => !!v || "Field is required"];
const isLoading = ref(false);
const showDialog = ref(false);
const validateCompanyName = ref(0);
const checkAcceptTerms = ref(false);
const formRef = ref(null);
const is_company_registered = ref(false);
const is_complete_onboarding_disabled = ref(false);
const is_company_type_loading = ref(false);

const submit = async () => {
  try {
    const { valid } = await formRef.value.validate();
    if (valid && validateCompanyName.value == 1) {
      const body = {
        user_id: props.userId,
        name: company.value.name,
        company_type_id: company.value.types,
        operation_country_id: company.value.country.id,
        operation_country_name: company.value.country.name,
      };
      emit("submit", body);
    }
  } catch (err) {
    emit("error", err);
  }
};

const fetchSellerCompanyTypes = async () => {
  is_company_type_loading.value = true;
  if (sellerStore.seller_company_types.length == 0) {
    await sellerStore.get_company_types();
    is_company_type_loading.value = false;
  } else {
    is_company_type_loading.value = false;
  }
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

const complete_onboarding = () => {
  is_complete_onboarding_disabled.value = true;
  emit("sendNotifcation");
  setTimeout(() => {
    is_complete_onboarding_disabled.value = false;
    window.location.reload();
  }, 4500);
};

onUpdated(() => {
  if (props.companyProfile?.id) {
    const res = props.companyProfile;
    company.value.name = res.name;
    company.value.types = res.company_type_description;
    company.value.country = res.operation_country_name;
    checkAcceptTerms.value = true;
    is_company_registered.value = true;
    validateCompanyName.value = 1;
  }
});
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
