<template>
  <v-dialog
    v-model="dialogVisible"
    fullscreen
    absolute
    persistent
    scrollable
    :width="$vuetify.display.mobile ? '100%' : '80%'"
    height="100%"
    content-class="dialog-right"
    class="h-100"
  >
    <v-btn
      v-if="$vuetify.display.mobile"
      variant="plain"
      icon="mdi-close"
      class="mt-5 mx-2 floating-close-btn"
      @click="closeDialog()"
    />
    <v-card
      outlined
      color="transparent"
      :class="
        'w-screen' + !$vuetify.display.mobile ? 'float-right' : 'text-center'
      "
    >
      <v-row no-gutters class="h-100">
        <v-col
          v-if="!$vuetify.display.mobile"
          cols="2"
          class="d-flex justify-end"
        >
          <v-btn
            stacked
            variant="tonal"
            class="notification__close rounded-0 rounded-s-lg"
            @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col
          :cols="$vuetify.display.mobile ? 12 : 10"
          style="background: #f9fafb"
        >
          <v-sheet class="rounded-lg h-100" style="background: #f9fafb">
            <div class="py-6 px-4 bg-white">
              <v-row>
                <v-col sm="2" md="1" class="d-flex justify-start mx-2">
                  <v-avatar rounded="0" color="#FAF5FF" size="55">
                    <v-icon color="#782CD1">mdi-cog</v-icon>
                  </v-avatar>
                </v-col>

                <v-col sm="11" md="7" class="d-flex flex-row">
                  <div>
                    <b style="letter-spacing: 0.03em">Company Settings</b>
                    <p class="text-caption text-grey">
                      Here you can update and view your Pollen Pass credentials
                    </p>
                  </div>
                </v-col>
                <v-col
                  sm="12"
                  md="3"
                  :class="
                    !$vuetify.display.mobile ? 'justify-end' : 'justify-start'
                  "
                  class="d-flex"
                >
                </v-col>
              </v-row>
            </div>
            <div class="px-10 py-4">
              <div class="d-flex flex-column mb-2">
                <v-breadcrumbs
                  class="text-caption text-capitalize"
                  color="deep-purple-accent-4"
                  :items="[company.name, 'Company Information']"
                >
                  <template #prepend>
                    <v-icon size="small" color="#782CD1">mdi-home</v-icon>
                  </template>
                </v-breadcrumbs>
              </div>
              <v-container fluid>
                <p class="font-weight-bold text-body-1 mb-6 mx-2">
                  Pollen Direct Company Information
                  <span class="text-caption text-grey">(NOT AVAILABLE)</span>
                </p>
                <v-row>
                  <v-col class="ma-2">
                    <v-sheet class="bg-white pa-6">
                      <p class="font-weight-bold text-body-1 mb-6">
                        Basic Information
                      </p>
                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Account ID <span class="red--text">*</span></label
                        >

                        <v-text-field
                          v-model="company.account_id"
                          variant="outlined"
                          placeholder="Enter First Name"
                          :rules="required"
                          :disabled="!is_available"
                        ></v-text-field>
                      </div>
                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Company Name <span class="red--text">*</span></label
                        >

                        <v-text-field
                          v-model="company.name"
                          variant="outlined"
                          placeholder="Enter Last Name"
                          :rules="required"
                          :disabled="!isAvailable"
                        ></v-text-field>
                      </div>

                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Country of Operations
                          <span class="red--text">*</span></label
                        >
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
                          :disabled="form_disabled"
                        />
                      </div>

                      <div class="my-2 text-start flex-1-0">
                        <label class="font-weight-medium"
                          >Company Type <span class="red--text">*</span>
                        </label>
                        <v-combobox
                          v-model="company.company_type_id"
                          :items="seller_store.seller_company_types"
                          item-value="id"
                          item-title="name"
                          :return-object="false"
                          placeholder="Select Company Type"
                          variant="outlined"
                          :rules="required"
                          :disabled="form_disabled"
                          hide-details
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
                                      <span>{{
                                        data.item.raw.description
                                      }}</span>
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
                    </v-sheet>
                  </v-col>
                  <v-col>
                    <v-sheet class="ma-2 pa-6 bg-white">
                      <p class="font-weight-bold text-body-1 mb-6">
                        Other Information
                      </p>

                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Categories of Interest
                          <span class="red--text">*</span></label
                        >
                        <v-autocomplete
                          v-model="company.category"
                          item-value="id"
                          item-title="name"
                          :items="seller_store.category"
                          :return-object="true"
                          placeholder="Choose Multiple"
                          variant="outlined"
                          :rules="required"
                          clearable
                          :disabled="form_disabled"
                        />
                      </div>
                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Market You Buy from*
                          <span class="red--text">*</span></label
                        >
                        <v-autocomplete
                          v-model="company.import_markets"
                          item-value="id"
                          item-title="name"
                          :items="seller_store.countries"
                          :return-object="true"
                          placeholder="Choose one or more"
                          variant="outlined"
                          :rules="required"
                          clearable
                          :disabled="form_disabled"
                        />
                      </div>
                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Target Resale Market
                          <span class="red--text">*</span></label
                        >
                        <div>
                          <template v-if="target_resale_market.length >= 0">
                            <span
                              v-for="(target, i) in target_resale_market"
                              v-bind:key="i"
                            >
                              <v-chip
                                v-if="target?.country?.name"
                                :key="target.country.country_id"
                                class="my-2 text-truncate multiline-text"
                                @click:close="remove_item(target)"
                              >
                                <template
                                  v-for="(city, c) in target.city"
                                  v-bind:key="c"
                                >
                                  <span
                                    v-if="c < 1"
                                    class="text-truncate"
                                    style="max-width: 90px"
                                  >
                                    {{ city.name }} ,
                                  </span>
                                  <span v-if="c === 1">
                                    ( +{{ target.city.length - 1 }} others
                                    ),&nbsp;
                                    <v-tooltip
                                      activator="parent"
                                      location="end"
                                    >
                                      <div
                                        v-for="(
                                          additionalCity, index
                                        ) in target.city.slice(1)"
                                        :key="index"
                                      >
                                        {{ additionalCity.name }}
                                      </div>
                                    </v-tooltip>
                                  </span>
                                </template>

                                {{ target?.country?.name }}
                              </v-chip>
                            </span>
                          </template>
                        </div>
                        <v-autocomplete
                          v-model="company.target_markets"
                          item-value="id"
                          item-title="name"
                          :items="countries"
                          :return-object="true"
                          placeholder="Choose one or more"
                          variant="outlined"
                          :rules="required"
                          clearable
                          :disabled="form_disabled"
                        />
                      </div>
                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Monthly Order Volume
                          <span class="red--text">*</span></label
                        >
                        <v-autocomplete
                          v-model="company.order_volume_id"
                          item-value="id"
                          item-title="name"
                          :items="seller_store.order_unit"
                          :return-object="false"
                          placeholder="Select"
                          variant="outlined"
                          :rules="required"
                          clearable
                          :disabled="form_disabled"
                          hide-details
                        />
                      </div>
                    </v-sheet>
                    <v-sheet class="mt-4 ma-2 pa-4 bg-white">
                      <v-btn
                        block
                        text="Save Changes"
                        color="#8431e7"
                        class="ma-1 me-auto w-50 text-capitalize rounded-lg"
                        :disabled="!isAvailable"
                      />
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import "vue-tel-input/vue-tel-input.css";
import { useSellerStore } from "~/stores/seller";
import { useCountryStore } from "~/stores/country";

const props = defineProps({
  dialog_value: { type: Boolean, default: false },
  user_id: { type: String, default: "" },
});
const emit = defineEmits(["close"]);

const runtimeConfig = useRuntimeConfig();

const seller_store = useSellerStore();
const { get_company_profile, get_company_interest } = seller_store;
const countryStore = useCountryStore();
const { countries } = storeToRefs(countryStore);

const dialogVisible = ref(false);
const is_available = ref(false);
const form_disabled = ref(true);
const company = ref({
  account_id: "",
  name: "",
  company_type_id: "",
  country: "",
});
const required = [(v) => !!v || "Field is required"];
const target_resale_market = ref([]);

onUpdated(async () => {
  if (props.dialog_value && !company.value.id) {
    seller_store.get_company_types();
    seller_store.get_order_unit();
    seller_store.get_category();
    countryStore.get_countries();
    await get_company();
  }
});

const get_company = async () => {
  const req = await get_company_profile(props.user_id);
  if (req?.data) {
    if (JSON.stringify(company.value) !== JSON.stringify(req)) {
      company.value = req.data;
      get_interest();
    }
  }
};

const get_interest = async () => {
  const req = await get_company_interest(company.value.id);
  if (req?.data) {
    company.value.category = extract_data_interest_category(
      req.data.interest_categories
    );
    company.value.import_markets = extract_data_market_resale(
      req.data.import_markets
    );
    target_resale_market.value = extract_data_target_resale(
      req.data.target_markets
    );
    company.value.country = req.data.operation_country_name;
  }
};

const extract_data_market_resale = (param) => {
  const formattedArray = param.map((entry) => {
    const res = {};
    res.id = entry.country_id;
    res.name = entry.country_name;
    return res;
  });

  return formattedArray;
};

const extract_data_interest_category = (param) => {
  const formattedArray = param.map((entry) => {
    const res = {};
    res.id = entry.category_id;
    res.name = entry.category_name;
    return res;
  });

  return formattedArray;
};

const extract_data_target_resale = (param) => {
  const formattedArray = param.map((entry) => {
    const res = {};
    res.country = {
      country_id: entry.country_id,
      name: entry.country_name,
    };
    res.city = entry.cities.map((ct) => {
      ct.name = ct.city_name;
      delete ct.city_name;
      return ct;
    });

    return res;
  });

  return formattedArray;
};
const closeDialog = () => {
  dialogVisible.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped></style>
