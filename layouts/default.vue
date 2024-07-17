<template>
  <v-layout class="rounded rounded-md d-flex flex-column">
    <v-app-bar class="px-8 py-2 bg-white">
      <v-list-item class="pl-1">
        <v-list-item-title class="d-flex align-center">
          <a href="/"
            ><img src="~/assets/image/pollen_direct_logo_1x.webp"
          /></a>
        </v-list-item-title>
      </v-list-item>

      <v-spacer />
      <v-skeleton-loader :loading="loading" type="list-item-two-line">
        <!-- v-if="!isAuthenticated" -->

        <v-menu v-if="$vuetify.display.mobile && !isAuthenticated">
          <template #activator="{ props }">
            <div>
              <v-btn icon="mdi-dots-vertical" v-bind="props"> </v-btn>
            </div>
          </template>

          <v-card class="rounded pa-1">
            <v-card-text class="pa-0">
              <v-list density="compact">
                <v-list-item>
                  <NuxtLink
                    class="text-grey-darken-1 text-body-2 cursor-pointer text-decoration-none"
                    @click="onSignUp()"
                  >
                    Sign Up with Pollen Pass
                  </NuxtLink>
                </v-list-item>
                <v-list-item>
                  <NuxtLink
                    class="text-grey-darken-1 text-body-2 cursor-pointer text-decoration-none"
                    @click="onLogin()"
                  >
                    Login
                  </NuxtLink>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-menu>

        <div v-else class="my-10">
          <v-btn
            v-if="!isAuthenticated"
            class="my-4 mx-2 me-auto text-capitalize bg-purple-darken-3"
            @click="onSignUp()"
            >Sign Up with Pollen Pass</v-btn
          >
          <v-btn
            v-if="!isAuthenticated"
            variant="outlined"
            class="my-4 mx-2 me-auto text-capitalize"
            color="purple-darken-3"
            @click="onLogin()"
            >Login</v-btn
          >
        </div>
        <v-menu v-if="isAuthenticated">
          <template #activator="{ props }">
            <div>
              <v-btn
                icon="mdi-account-outline"
                variant="tonal"
                color="primary"
                rounded="lg"
                v-bind="props"
              />
            </div>
          </template>

          <v-card class="rounded pa-1">
            <v-card-text class="pa-0">
              <v-list density="compact">
                <v-list-item>
                  <NuxtLink
                    to="/profile"
                    class="text-grey-darken-1 text-body-2 cursor-pointer text-decoration-none"
                  >
                    <v-icon>mdi-account-details-outline</v-icon> Profile
                  </NuxtLink>
                </v-list-item>
                <v-list-item>
                  <NuxtLink
                    class="text-grey-darken-1 text-body-2 cursor-pointer text-decoration-none"
                    @click="displayLogoutDialog = true"
                  >
                    <v-icon>mdi-logout</v-icon> Logout
                  </NuxtLink>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-menu>
        <div
          v-if="isAuthenticated && !$vuetify.display.mobile"
          class="d-flex flex-column ma-2"
        >
          <h5>
            {{
              userProfile.firstName
                ? userProfile.firstName + " " + userProfile.lastName
                : userProfile.name
            }}
          </h5>
          <h6 class="font-weight-regular">
            Member ID:
            {{
              userProfile.id ? userProfile.id : userProfile.sub.split("-")[0]
            }}
          </h6>
        </div>
      </v-skeleton-loader>
    </v-app-bar>

    <v-main
      class="d-flex align-center justify-center w-100 mt-2"
      style="min-height: 100vh"
    >
      <slot />
    </v-main>
    <v-dialog v-model="displayLogoutDialog">
      <v-card
        class="mx-auto pa-2"
        :width="$vuetify.display.mobile ? 'auto' : '500'"
      >
        <v-card-item>
          <div class="text-overline my-2 d-flex justify-space-between">
            <div class="bg-purple-lighten-5 rounded-circle">
              <v-icon size="large" color="purple-darken-2" class="ma-2"
                >mdi-lightbulb-on-20</v-icon
              >
            </div>

            <v-icon
              size="large"
              @click="displayLogoutDialog = false"
              style="color: #6b7280"
              >mdi-close</v-icon
            >
          </div>
          <div class="pt-4">
            <h4 style="color: #111827; font-size: 18px">
              Are you sure you want to log out?
            </h4>
            <p class="py-2" style="color: #6b7280; font-size: 14px">
              Logging out means you are about to leave this page, are you sure
              you want to logout?
            </p>
          </div>
        </v-card-item>
        <v-card-text>
          <div class="d-flex justify-end mt-2">
            <v-btn
              variant="outlined"
              class="ma-2 text-capitalize"
              @click="displayLogoutDialog = false"
              style="color: #374151; font-size: 16px; letter-spacing: 0"
              >Back</v-btn
            >
            <v-btn
              variant="outlined"
              class="ma-2 text-capitalize"
              @click="onLogout()"
              style="
                background-color: #8431e7;
                border: none;
                color: #fff;
                font-size: 16px;
                letter-spacing: 0;
              "
              >Logout</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <AppFooter />
  </v-layout>
</template>

<script setup>
import { ref } from "vue";

const displayLogoutDialog = ref(false);
const isAuthenticated = ref(false);
const loading = ref(false);
const userProfile = ref({});

const onLogin = async () => {};
const onSignUp = async () => {};
</script>

<style scoped></style>
