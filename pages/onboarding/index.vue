<template>
  <div class="h-100">
    <OnboardingHeader />
    <v-container>
      <v-row
        no-gutters
        class="h-100 rounded-lg mt-6"
        style="border: #e5e7eb solid 1px"
      >
        <v-col
          v-if="!$vuetify.display.mobile"
          cols="12"
          md="5"
          class="side-container"
        >
          <OnboardingSideBar />
        </v-col>
        <v-col cols="12" md="7" class="d-flex justify-center">
          <div v-if="user_id" class="w-75 d-flex flex-column h-100 py-8 mt-10">
            <OnboardingStepper :step="step" :name="profile?.first_name" />
            <OnboardingCompanyInformation
              v-if="step == 1"
              :user-id="user_id"
              :company-types="company_type"
              :countries="countries"
              :company-profile="company_profile"
              @submit="next_step"
              @skip="goto_home_page"
              @error="show_error"
              @send-notifcation="notify_admin_by_email"
            />
            <OnboardingCompanyInterest
              v-else
              :category="category"
              :order-unit="order_unit"
              :countries="countries"
              :profile="profile"
              @previous-page="previous_step"
              @submit="save_company_information"
              @error="show_error"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <NotificationStatus />
  </div>
</template>

<script setup>
import { ref, onBeforeMount, nextTick } from "vue";
import { DIRECT_ONBOARD_COMPANY } from "~/utils/constant.js";
import { directApi } from "@/services/api";

import { useAuth } from "~/composables/auth0";
import { useSellerStore } from "~/stores/seller";
import { useCountryStore } from "~/stores/country";
import { useCommonStore } from "~/stores/common";

definePageMeta({
  middleware: "auth",
});

const { get_user_id } = useAuth();

const commonStore = useCommonStore();

const countryStore = useCountryStore();
const { countries } = storeToRefs(countryStore);

const seller_store = useSellerStore();
const { get_user_profile, get_company_profile } = seller_store;
const company_type = computed(() => seller_store.seller_company_types);
const category = computed(() => seller_store.category);
const order_unit = computed(() => seller_store.order_unit);
const company_profile = ref();

const user_id = get_user_id();

const step = ref(1);
const profile = ref({});
const company_body = ref();

const get_profile = async () => {
  const req = await get_user_profile(user_id);
  if (req) {
    profile.value = req.data ? req.data : req;
  }
};

onBeforeMount(async () => {
  if (user_id) {
    const companyProfile = await get_company_profile(user_id);
    if (!companyProfile?.data) {
      await get_profile();
      await seller_store.get_company_types();
      await seller_store.get_category();
      await seller_store.get_order_unit();
      await countryStore.get_countries();
    } else {
      await get_profile();
      await seller_store.get_company_types();
      await countryStore.get_countries();
      await seller_store.get_category();
      company_profile.value = companyProfile?.data;
    }
  }
});

const goto_home_page = () => {
  window.location.href = "/";
};

const next_step = async (param) => {
  step.value = 2;
  company_body.value = param;
  await nextTick();
};

const save_company_information = async (paramBody) => {
  try {
    const req = await directApi(
      `${DIRECT_ONBOARD_COMPANY}`,
      "POST",
      company_body.value
    );
    if (req.status_code == "CREATED") {
      await save_company_interest(req?.data, paramBody);
    } else {
      show_error(req);
    }
  } catch (err) {
    show_error(err);
  }
};

const save_company_interest = async (param, paramBody) => {
  try {
    paramBody.company_id = param.id;
    const req = await directApi(
      `${DIRECT_ONBOARD_COMPANY}/${param.id}/interest`,
      "POST",
      paramBody
    );
    if (!req.statusCode) {
      const send_admin_email = await notify_admin_by_email(req.company_id);
      if (send_admin_email) {
        commonStore.setShowNotification({
          display: true,
          status: "success",
          msg: "Company Successfully Registered",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else {
      show_error(err);
      return;
    }
  } catch (err) {
    show_error(err);
  }
};

const notify_admin_by_email = async (companyId) => {
  try {
    const body = {
      first_name: profile.value.first_name,
      last_name: profile.value.last_name,
      email: profile.value.email,
      country_code: profile.value.country_code,
      phone_no: profile.value.phone_no,
      pollen_pass_id: profile.value.pollen_pass_id,
    };
    if (!companyId) {
      companyId = company_profile.value.id;
    }
    const req = await directApi(
      `${DIRECT_ONBOARD_COMPANY}/${companyId}/notify-admin-by-email`,
      "POST",
      body
    );
    if (req.status_code != "OK") {
      show_error(req);
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const previous_step = async () => {
  step.value = 1;
  get_company();
  await nextTick();
};

const get_company = async () => {
  const companyProfile = await get_company_profile(user_id);
  company_profile.value = companyProfile?.data;
};

const show_error = (req) => {
  let errorMsg = req.message;
  if (typeof req.message !== "string") {
    const formattedMessages = req.message.map((message) => {
      const words = message.split(" ");
      words[0] = "• " + words[0];
      return words.join(" ");
    });

    errorMsg = formattedMessages.join(",<br/>");
  }

  commonStore.setShowNotification({
    display: true,
    status: "error",
    msg: errorMsg,
  });
};
</script>

<style lang="scss" scoped></style>
