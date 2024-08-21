<template>
  <div>
    <v-container fluid>
      <p class="font-weight-bold text-body-1 mb-6 ml-2">
        Password Settings & Connected Social Accounts
      </p>
      <v-row>
        <v-col>
          <v-sheet class="bg-white pa-6">
            <p class="font-weight-bold text-body-1 mb-6">Change Password</p>
            <div class="my-2">
              <label class="font-weight-medium text-body-2"
                >Current Password
              </label>

              <v-text-field
                v-model="account.current_password"
                variant="outlined"
                :rules="required"
                type="password"
                :disabled="!isAvailable"
              />
            </div>
            <div class="my-2">
              <label class="font-weight-medium text-body-2"
                >Enter New Password
              </label>

              <v-text-field
                v-model="account.new_password"
                variant="outlined"
                :rules="required"
              />
            </div>
            <div class="mt-2">
              <label class="font-weight-medium text-body-2"
                >Re-enter New Password
              </label>

              <v-text-field
                v-model="account.confirm_password"
                variant="outlined"
                :rules="required"
              />
            </div>
          </v-sheet>

          <v-sheet class="mt-4 pa-6 pb-4 bg-white">
            <v-btn
              text="Save Changes"
              color="#8431e7"
              class="mb-2 mx-2 me-auto w-50 text-capitalize"
              block
              :disabled="!isAvailable"
            />
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="bg-white pa-6"
            ><p class="font-weight-bold text-body-1 mb-6">Connect</p>

            <v-btn
              variant="outlined"
              class="pa-5 rounded-lg pa-5 my-5 text-center"
              block
              disabled
            >
              <img
                src="~/assets/image/google.svg"
                style="
                  object-position: center;
                  width: auto;
                  height: auto;
                  margin-right: 10px;
                "
              />
              <span class="text-capitalize"> Registered with Google</span>
            </v-btn>
            <v-btn variant="outlined" class="pa-5 rounded-lg pa-5 my-5" block>
              <img
                src="~/assets/image/microsoft.svg"
                style="
                  object-position: center;
                  width: auto;
                  height: auto;
                  margin-right: 10px;
                "
              />
              <span class="text-capitalize"> Registered with Microsoft </span>
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isAvailable = ref(false);
const account = ref({});
</script>

<style lang="scss" scoped></style>
