<template>
  <div>
    <div
      class="d-flex flex-column align-center mx-16"
      :style="{
        'margin-top': $vuetify.display.mobile ? '20px' : '10%',
      }"
    >
      <div class="text-caption justify-center mb-12 mx-10 d-flex">
        <img src="~/assets/image/pollen-direct-1.svg" class="mx-4" >
        <div>
          <p class="font-weight-bold mb-1">
            {{ notification.title }}
          </p>
          <p>
            {{ notification.desc }}
          </p>
        </div>
      </div>

      <div class="mt-10 mb-5 text-center ga-2 d-flex flex-column">
        <h3 class="font-weight-bold">{{ title.title }}</h3>
        <label class="font-weight-normal mt-1">{{ title.desc }} </label>
      </div>

      <v-card
        :width="$vuetify.display.mobile ? 300 : 450"
        elevation="0"
        class="align-center my-4"
      >
        <v-form ref="formRef">
          <div class="my-4 text-start flex-1-0">
            <label class="font-weight-medium"
              >Enter your Pollen Pass registered email
            </label>

            <v-text-field
              v-model="email"
              variant="outlined"
              placeholder="Enter valid email address"
              :rules="required_email"
            />
          </div>
          <v-btn
            :disabled="!email"
            class="my-4 me-auto text-capitalize rounded-lg"
            color="#8431E7"
            block
            :loading="is_loading"
            @click="submit"
            >Sign in</v-btn
          >
          <p class="text-center" style="font-size: 14px">
            Don't have Pollen Pass?
            <a href="#" style="color: #8431e7" @click="on_signup"> Sign Up</a>
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSellerStore } from '~/stores/seller';

const emit = defineEmits(['submit', 'notRegister']);

const seller_store = useSellerStore();
const runtimeConfig = useRuntimeConfig();
const title = ref({
  title: 'Enter your information',
  desc: 'Login to Pollen Direct with Pollen Pass',
});
const notification = ref({
  title:
    'Get exclusive access to the latest Pollen Direct liquidation inventory catalogs with Pollen Pass',
  desc: 'Pollen Pass is Pollen’s free buyer membership program. By signing up as a Pollen Pass member on Pollen Save. Pollen Save delivers excess or discontinued products from global brands direct to your doorstep. Whether you\'re looking for shampoo, conditioner, face wash, make up, toys, shoes, or more - there\'s something for everyone at unbeatable prices on Pollen Save!',
});
const email = ref('');
const required_email = [
  (v) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ||
    'E-mail must be valid',
];
const is_loading = ref(false);
const show_dialog = ref(false);
const formRef = ref(null);

const submit = async () => {
  is_loading.value = true;
  const { valid } = await formRef.value.validate();
  if (valid) {
    const validate_user_exist = await seller_store.validate_user_exist(
      email.value
    );
    if (validate_user_exist?.status_code === 'OK') {
      emit('submit', email.value);
      setTimeout(() => {
        is_loading.value = false;
      }, 1500);
    } else {
      is_loading.value = false;
      emit('notRegister', {
        title: 'Email Not Registered',
        msg: 'It looks like the email address you entered is not registered in our system. Please check the email address and try again. If you are new here, you can sign up to create a new Pollen Pass  account. For assistance please send us a message at <a href="mailto:cs@pollen.tech">cs@pollen.tech.</a>',
      });
    }
  }
};

const on_signup = async () => {
  navigateToPollenPass('signup');
};

const navigateToPollenPass = (param) => {
  const url = new URL(runtimeConfig.public.pollenPassUrl);
  url.searchParams.append('channel', 'CH_DIRECT');
  url.searchParams.append('action', param);
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
