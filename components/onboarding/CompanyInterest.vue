<template>
  <div>
    <div class="d-flex flex-column align-center">
      <h3>Complete your company interest</h3>

      <v-card
        :width="$vuetify.display.mobile ? 300 : 450"
        elevation="0"
        class="align-center my-4"
      >
        <v-form ref="formRef">
          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium"
                >Categories of Interest <span class="red--text">*</span>
              </label>
            </div>
            <v-combobox
              v-model="company.categories"
              :items="category"
              item-value="name"
              item-title="name"
              :return-object="false"
              placeholder="Main Category, Multi-Select (Mandatory)"
              variant="outlined"
              :rules="required"
              multiple
            ></v-combobox>

            <v-combobox
              v-model="company.subCategory"
              :items="subCategory"
              item-value="id"
              item-title="name"
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
            <v-autocomplete
              v-model="company.import_markets"
              item-value="id"
              item-title="name"
              :items="countries"
              :return-object="true"
              placeholder="Choose one or more"
              variant="outlined"
              :rules="required"
              clearable
            />
          </div>

          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium">
                Target Resale Market <span class="red--text">*</span>
              </label>
            </div>

            <p
              v-if="target_resale_market.length < 1"
              class="red--text text-caption"
            >
              Field is required
            </p>
            <div>
              <template v-if="target_resale_market.length >= 0">
                <span
                  v-for="(target, i) in target_resale_market"
                  v-bind:key="i"
                >
                  <v-chip
                    v-if="target?.country?.name"
                    :key="target.country.country_id"
                    class="ma-2 text-truncate multiline-text"
                    closable
                    @click:close="remove_item(target)"
                  >
                    <template v-for="(city, c) in target.city" v-bind:key="c">
                      <span v-if="c < 1"> {{ city.city_name }} , </span>
                      <span v-if="c === 1">
                        &nbsp; ( +{{ target.city.length - 1 }} others ), &nbsp;
                        <v-tooltip activator="parent" location="end">
                          <div
                            v-for="(additionalCity, index) in target.city.slice(
                              1
                            )"
                            :key="index"
                          >
                            {{ additionalCity.city_name }}
                          </div>
                        </v-tooltip>
                      </span>
                    </template>

                    {{ target?.country?.name }}
                  </v-chip>
                </span>
              </template>
            </div>
            <onboarding-country-city
              :preselect="target_resale_market"
              :countries="countries"
              @apply-option="applyOption"
            />
          </div>
          <div class="my-2 text-start flex-1-0">
            <div class="d-flex">
              <label class="d-flex font-weight-medium">
                Monthly Order Volume<span class="red--text">*</span>
              </label>
            </div>

            <v-combobox
              v-model="company.order_volume_id"
              item-value="id"
              item-title="name"
              :items="orderUnit"
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
          <v-btn
            variant="outlined"
            class="my-4 me-auto text-capitalize rounded-lg"
            block
            :loading="isLoading"
            @click="$emit('previousPage')"
            >Return to Previous Step</v-btn
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
import { directApi } from "@/services/api";

const emit = defineEmits(["submit", "previousPage", "error"]);

const props = defineProps({
  userId: { type: String, default: "" },
  category: { type: Array, default: [] },
  subCategory: { type: Array, default: [] },
  countries: { type: Array, default: [] },
  orderUnit: { type: Array, default: [] },
  companyId: { type: String, default: "" },
});

const isLoading = ref(false);
const showDialog = ref(false);
const target_resale_market = ref([]);
const required = [(v) => !!v || "Field is required"];
const formRef = ref(null);
const company = ref({});

const submit = async () => {
  try {
    const { valid } = await formRef.value.validate();
    if (valid) {
      const body = {
        company_id: props.companyId,
        order_volume_id: company.value.order_volume_id,
        interest_categories: [], // company.value.categories,
        import_markets: extract_import_market(),
        target_markets: extract_target_market(),
      };
      console.log(body);
      const req = await directApi(
        `/onboard-company/${props.companyId}/interest`,
        "POST",
        body
      );
      if (!req.statusCode) {
        emit("submit");
      } else {
        emit("error", req);
        return;
      }
    }
  } catch (err) {}
};

const remove_item = (param) => {
  const city_ids = [];
  console.log(param);
  if (item.value.targetResaleMarketCountry[0].country_id) {
    const extractCn = item.value.targetResaleMarketCountry.filter(
      (item) => item.id !== param.country.id
    );
    item.value.targetResaleMarketCountry = extractCn;
  }
};

const applyOption = (param) => {
  target_resale_market.value = param;
  company.value.target_markets_city = format_location_city(param);
  company.value.target_markets_country = format_location_country(param);
};

const format_location_city = (param) => {
  const formattedArray = param.flatMap((entry) =>
    entry.city.map((city) => ({
      country_name: entry.country.name,
      country_id: entry.country.country_id,
      city_id: city.id,
      city_name: city.name,
    }))
  );

  return formattedArray;
};
const format_location_country = (param) => {
  const formattedArray = param.map((entry) => ({
    country_id: entry.country.country_id,
    name: entry.country.name,
  }));

  return formattedArray;
};

const extract_target_market = () => {
  const res = target_resale_market.value.map((item) => ({
    country_id: item.country.country_id,
    country_name: item.country.name,
    cities: item.city.map((city) => ({
      city_id: city.city_id,
      city_name: city.city_name,
    })),
  }));
  return res;
};

const extract_import_market = () => {
  const res = {
    country_id: company.value.import_markets.country_id,
    country_name: company.value.import_markets.name,
  };

  return [res];
};
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
