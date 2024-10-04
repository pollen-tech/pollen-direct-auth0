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

                <v-col cols="7" sm="11" md="7" class="d-flex flex-row">
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
                />
              </v-row>
            </div>
            <div
              :class="{
                'px-10 py-4': !xs,
                'px-4 py-4': xs,
              }"
            >
              <div class="d-flex flex-column mb-2">
                <v-breadcrumbs
                  class="text-caption text-capitalize text-truncate"
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
                        />
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
                          :disabled="true"
                        />
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
                          :return-object="true"
                          placeholder="Select Company Type"
                          variant="outlined"
                          :rules="required"
                          :disabled="form_disabled"
                          hide-details
                        />
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
                        <div>
                          <template v-if="interest_categories.length >= 0">
                            <span
                              v-for="(cat, i) in interest_categories"
                              :key="i"
                            >
                              <v-chip
                                v-if="cat?.category?.category_name"
                                :key="cat.category.category_id"
                                class="my-2 text-truncate multiline-text"
                              >
                                {{ cat?.category?.category_name }} ,
                                <template
                                  v-for="(sub_cat, c) in cat.sub_category"
                                  :key="c"
                                >
                                  <span
                                    v-if="c < 1"
                                    class="text-truncate"
                                    style="max-width: 90px"
                                  >
                                    {{ sub_cat.sub_category_name }}
                                  </span>
                                  <span v-if="c === 1">
                                    ( +{{ cat.sub_category.length - 1 }} others
                                    )&nbsp;
                                    <v-tooltip
                                      activator="parent"
                                      location="end"
                                    >
                                      <div
                                        v-for="(
                                          additional_sub_cat, index
                                        ) in cat.sub_category.slice(1)"
                                        :key="index"
                                      >
                                        {{
                                          additional_sub_cat.sub_category_name
                                        }}
                                      </div>
                                    </v-tooltip>
                                  </span>
                                </template>
                              </v-chip>
                            </span>
                          </template>
                        </div>
                        <!-- v-model="company.category" -->

                        <onboarding-category
                          :preselect="interest_categories"
                          @apply-option="applyOptionCategory"
                        />
                      </div>
                      <div class="my-2">
                        <label class="font-weight-medium text-body-2"
                          >Market You Buy from
                          <span class="red--text">*</span></label
                        >
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
                              :key="i"
                            >
                              <v-chip
                                v-if="target?.country?.name"
                                :key="target.country.id"
                                class="my-2 text-truncate multiline-text"
                                @click:close="remove_item(target)"
                              >
                                <template
                                  v-for="(city, c) in target.city"
                                  :key="c"
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
                        <onboarding-country-city
                          :preselect="target_resale_market"
                          :countries="countries"
                          @apply-option="applyOption"
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
                          :return-object="true"
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
                        :disabled="form_disabled"
                        :loading="is_form_loading"
                        @click="save_company_settings"
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
import { useDisplay } from "vuetify";
import "vue-tel-input/vue-tel-input.css";
import { useSellerStore } from "~/stores/seller";
import { useCountryStore } from "~/stores/country";
import { useCommonStore } from "~/stores/common";

const props = defineProps({
  dialogValue: { type: Boolean, default: false },
  userId: { type: String, default: "" },
});
const emit = defineEmits(["close"]);

const { xs } = useDisplay();
const seller_store = useSellerStore();
const {
  get_company_profile,
  get_company_interest,
  update_company_settings,
  update_company_interest_settings,
} = seller_store;
const countryStore = useCountryStore();
const { countries } = storeToRefs(countryStore);

const common_store = useCommonStore();

const dialogVisible = ref(false);
const is_available = ref(false);
const form_disabled = ref(false);
const company = ref({
  account_id: "",
  name: "",
  company_type_id: "",
  country: "",
});
const required = [(v) => !!v || "Field is required"];
const target_resale_market = ref([]);
const interest_categories = ref([]);
const is_form_loading = ref(false);

onUpdated(async () => {
  if (props.dialogValue && !company.value.id) {
    seller_store.get_company_types();
    seller_store.get_order_unit();
    seller_store.get_category();
    countryStore.get_countries();
    await get_company();
  }
});

const save_company_settings = async () => {
  try {
    is_form_loading.value = true;
    const body = {
      user_id: props.userId,
      name: company.value.name,
      company_type_id: extract_company_type(),
      operation_country_id: extract_country("id"),
      operation_country_name: extract_country("name"),
    };

    const body_interest = {
      order_volume_id: extract_order_volume("id"),
      order_volume_name: extract_order_volume("name"),
      interest_categories: extract_categories() || [],
      import_markets: extract_import_market(),
      target_markets: extract_target_market(),
    };
    const req = await update_company_settings(company.value.id, body);

    if (req.data.id) {
      const interest = await update_company_interest_settings(
        company.value.id,
        body_interest
      );
      if (!interest.status_code) {
        common_store.setShowNotification({
          display: true,
          status: "success",
          msg: "Successfully Update Company Settings! ",
        });
        is_form_loading.value = false;
      } else {
        common_store.setShowNotification({
          display: true,
          status: "error",
          msg: "Failed to save company interest! Please contact CS. ",
        });
        is_form_loading.value = false;
      }
    } else {
      get_error_msg(req);
      is_form_loading.value = false;
    }
  } catch (err) {
    console.log(err);
    is_form_loading.value = false;
  }
};

const get_error_msg = (req) => {
  let errorMsg = req.message;
  if (typeof req.message !== "string") {
    const formattedMessages = req.message.map((message) => {
      const words = message.split(" ");
      words[0] = "• " + words[0];
      return words.join(" ");
    });

    errorMsg = formattedMessages.join(",<br/>");
  }

  common_store.setShowNotification({
    display: true,
    status: "error",
    msg: errorMsg,
  });
};

const extract_target_market = () => {
  const res = target_resale_market.value.map((item) => ({
    country_id: item.country.id,
    country_name: item.country.name,
    cities: item.city.map((city) => ({
      city_id: city.city_id,
      city_name: city.name,
    })),
  }));
  return res;
};

const extract_import_market = () => {
  const res = {
    country_id: company.value.import_markets.id,
    country_name: company.value.import_markets.name,
  };

  return [res];
};

const extract_categories = () => {
  const transformedData = interest_categories.value.map((item) => ({
    category_id: item.category.category_id,
    category_name: item.category.category_name,
    sub_category: item.sub_category.map((sub) => ({
      category_id: sub.category_id,
      sub_category_id: sub.sub_category_id,
      sub_category_name: sub.sub_category_name,
    })),
  }));
  return transformedData;
};

const extract_order_volume = (param) => {
  if (company.value.order_volume_id.id == undefined) {
    if (param == "id") {
      return company.value.order_volume_id;
    }
    return company.value.order_volume_name;
  }
  if (param == "id") {
    return company.value.order_volume_id.id;
  }
  return company.value.order_volume_id.name;
};

const extract_company_type = () => {
  if (typeof company.value.company_type_id != "number") {
    return company.value.company_type_id.id;
  }
  return company.value.company_type_id;
};

const extract_country = (param) => {
  if (company.value.country.id == undefined) {
    if (param == "id") {
      return company.value.operation_country_id;
    }
    return company.value.operation_country_name;
  }
  if (param == "id") {
    return company.value.country.id;
  }
  return company.value.country.name;
};

const get_company = async () => {
  const req = await get_company_profile(props.userId);
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
    interest_categories.value = extract_data_interest_categories(
      req.data.interest_categories
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
const extract_data_interest_categories = (param) => {
  const formattedArray = param.map((item) => ({
    category: {
      category_id: item.category_id,
      category_name: item.category_name,
    },
    sub_category: item.sub_category.map((subItem) => ({
      sub_category_id: subItem.sub_category_id,
      sub_category_name: subItem.sub_category_name,
    })),
  }));
  return formattedArray;
};

const extract_data_target_resale = (param) => {
  const formattedArray = param.map((entry) => {
    const res = {};
    res.country = {
      id: entry.country_id,
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

const applyOptionCategory = (param) => {
  interest_categories.value = param;
  company.value.interest_categories = format_category(param);
};

const format_category = (param) => {
  const formattedArray = param.map((category) => {
    category.sub_category = category.sub_category.map(
      ({ sub_category_description, ...rest }) => rest
    );

    return category;
  });
  return formattedArray;
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
      country_id: entry.country.id,
      city_id: city.id,
      city_name: city.name,
    }))
  );

  return formattedArray;
};
const format_location_country = (param) => {
  const formattedArray = param.map((entry) => ({
    country_id: entry.country.id,
    name: entry.country.name,
  }));

  return formattedArray;
};

const closeDialog = () => {
  dialogVisible.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped></style>
