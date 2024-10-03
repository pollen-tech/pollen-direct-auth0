<template>
  <div>
    <div
      class="d-flex flex-column align-center mx-12"
      :style="{
        'margin-top': $vuetify.display.mobile ? '75px' : '10%',
      }"
    >
      <div class="mb-6">
        <img
          src="~/assets/image/pollen-direct-1.svg"
          class="mx-4"
          style="width: 55px"
        />
      </div>
      <div
        :class="[
          'text-center ga-2 d-flex flex-column  mt-5',
          xs ? 'mb-2' : ' mb-5',
        ]"
      >
        <h3 style="color: #111827; font-size: 20px">{{ title.title }}</h3>
        <p style="color: #111827; font-size: 14x">{{ title.desc }}</p>
      </div>

      <v-card
        :width="$vuetify.display.mobile ? 300 : 450"
        elevation="0"
        class="align-center my-4"
      >
        <v-form ref="formRef">
          <div class="my-4 text-start flex-1-0">
            <label class="font-weight-medium" style="font-size: 14px"
              >Enter your Pollen Pass registered email
              <span class="red--text">*</span>
            </label>

            <v-text-field
              v-model="email"
              variant="outlined"
              placeholder="Enter Email"
              :rules="required_email"
              class="custom-text-field"
              autocomplete="email"
              clearable
              @input="validateEmail"
            />
          </div>
          <v-btn
            class="custom-button my-4 me-auto text-capitalize rounded-lg"
            color="#8431E7"
            block
            :loading="is_loading"
            :disabled="!isEmailValid"
            @click="submit()"
            >Sign in</v-btn
          >
          <p class="text-center" style="color: #111827; font-size: 14px">
            Want to access Pollen Direct? <br v-if="xs" />
            <a href="#" class="link" @click="on_signup()"
              >Sign Up with Pollen Pass</a
            >
          </p>
        </v-form>
      </v-card>

      <v-dialog
        v-model="show_dialog"
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
      <CommonSmallDialog ref="confirm" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { useUserStore } from "@/stores/user";

const emit = defineEmits(["submit", "notRegister"]);

const { xs } = useDisplay();

const user_Store = useUserStore();
const { validate_user_allowed_login } = user_Store;

const confirm = ref(null);
const runtimeConfig = useRuntimeConfig();
const title = ref({
  title: "Login",
  desc: "Login to Pollen Direct with Pollen Pass",
});

const email = ref("");
const required_email = [
  (v) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ||
    "E-mail must be valid",
];
const is_loading = ref(false);
const show_dialog = ref(false);
const formRef = ref(null);
const isEmailValid = ref(false);

const validateEmail = () => {
  isEmailValid.value = /^[\w+.-]+@[\w.-]+\.\w{2,}$/.test(email.value);
};

const showDialog = async () => {
  const options = {
    title: "Email Not Registered",
    message:
      "It looks like the email address you entered is not registered in our system. Please check the email address and try again. If you are new here, you can sign up to create a new Pollen Pass account. For assistance please send us a message at cs@pollen.tech.",
    icon: "",
    color: "purple darken-2",
    actionText1: "Login",
    actionText2: "Contact CS",
    actionIcon2: "",
    rejection: false,
  };
  if (await confirm.value.open(options)) {
    window.location.href = "mailto:contact@pollen.tech";
  } else {
    navigateTo("/auth/login");
  }
};

const show_phone_verification_dialog = async () => {
  const options = {
    title: "Phone Registration Incomplete",
    message:
      " It appears that your phone number registration is not complete. Please finish the verification process and return to log in. For assistance please send us a message at cs@pollen.tech.",
    icon: "",
    color: "purple darken-2",
    actionText1: "Cancel",
    actionText2: "Go To Pollen Pass",
    actionIcon2: "",
    rejection: false,
  };
  if (await confirm.value.open(options)) {
    const url = new URL(runtimeConfig.public.pollenPassUrl);
    url.searchParams.append("channel", "CH_DIRECT");
    url.searchParams.append("action", "signin");
    navigateTo(url.toString(), { external: true });
  }
};

const is_allowed_login = async () => {
  try {
    const req = await validate_user_allowed_login(email.value);

    if (req.data?.is_email_exist) {
      if (!req.data?.is_pollen_pass_phone_verified) {
        show_phone_verification_dialog();
        return false;
      } else {
        return true;
      }
    } else {
      showDialog();
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const submit = async () => {
  is_loading.value = true;
  const { valid } = await formRef.value.validate();
  if (valid) {
    const user_allowed = await is_allowed_login();
    if (user_allowed) {
      emit("submit", email.value);
      setTimeout(() => {
        is_loading.value = false;
      }, 1500);
    } else {
      is_loading.value = false;
    }
  }
};

const on_signup = async () => {
  navigateToPollenPass("signup");
};

const navigateToPollenPass = (param) => {
  const url = new URL(runtimeConfig.public.pollenPassUrl);
  url.searchParams.append("channel", "CH_DIRECT");
  url.searchParams.append("action", param);
  console.log(url);
  navigateTo(url.toString(), { external: true });
};

onMounted(async () => {});
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
