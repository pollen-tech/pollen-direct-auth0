<template>
  <div class="h-screen">
    <CommonLoading v-if="isLoading" :loading="true" />
    <v-row v-if="showLogin" no-gutters>
      <v-col
        v-if="!$vuetify.display.mobile"
        cols="12"
        md="4"
        lg="4"
        class="pa-12 side-container-login h-screen"
      >
        <AuthSideBar />
      </v-col>
      <v-col cols="12" md="8">
        <div
          :class="{
            'my-8': xs,
            'ma-8': !xs,
          }"
        >
          <AuthLogin
            v-if="!isEmailSent"
            @submit="send_otp"
            @not-register="not_register"
          />
          <AuthVerification
            v-else
            :email="email"
            @previous-page="go_to_login"
            @verify-otp-event="verify_otp"
            @send-otp-event="send_otp"
          />
        </div>
      </v-col>
    </v-row>
    <NotificationStatus />
    <AuthUserExist />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import { onboardingApi } from "~/services/api";
import { useAuth } from "~/composables/auth0";
import { useCommonStore } from "~/stores/common";
import { useUserStore } from "~/stores/user";

definePageMeta({
  layout: false,
  middleware: "auth",
});

const { xs } = useDisplay();
const router = useRouter();
const auth = useAuth();
const commonStore = useCommonStore();

const user_Store = useUserStore();
const { validate_passwordless_otp } = user_Store;

const isEmailSent = ref(false);
const email = ref("");
const otp = ref("");
const isOtpValid = ref(false);
const isLoading = ref(false);
const showLogin = ref(false);
const is_authenticated = computed(() => auth.is_user_authenticated());

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    showLogin.value = !is_authenticated.value;
    if (is_authenticated.value) {
      router.push("/");
    }
  }, 800);
});

const verify_otp = async (param) => {
  try {
    otp.value = param;
    isOtpValid.value = true;

    const body = {
      email: email.value,
      code: otp.value,
      channel_code: "CH_DIRECT",
    };

    const req = await validate_passwordless_otp(body);
    if (req.status_code) {
      req.message = req.message ? req.message : "OTP is not valid";
      getErrorMessage(req);
      console.log(req);
    } else {
      auth.handleAuth0Response(req);
      isEmailSent.value = true;
      go_to_redirect();
    }
  } catch (err) {
    console.log(err);
  }
};

const go_to_login = () => {
  isEmailSent.value = false;
};

const send_otp = async (param) => {
  try {
    email.value = param;
    isOtpValid.value = true;
    const req = await onboardingApi(
      `/auth0/password-less-email-login/${email.value}`,
      "POST",
    );
    if (req) {
      isEmailSent.value = true;
    }
  } catch (err) {
    console.log(err);
  }
};

const getErrorMessage = (req) => {
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

const not_register = (param) => {
  commonStore.setShowNotification({
    display: true,
    status: "error",
    msg: param.msg,
    title: param.title,
  });
};

const go_to_redirect = () => {
  navigateTo("/onboarding");
};
</script>

<style lang="scss" scoped></style>
