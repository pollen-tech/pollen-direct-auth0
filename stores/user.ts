import { defineStore } from "pinia";
import { directApi, onboardingApi } from "~/services/api";

interface User {
  user_id: string;
  email: string;
  firstName: string;
  lastName: string;
  channelCode: string;
  phoneNumber: string;
  phone: string;
  countryCode: string;
}

export const useUserStore = defineStore("user", {
  state: (): { user: User | null } => {
    return {
      user: null,
      user_profile: null,
    };
  },
  actions: {
    getUser(): User | null {
      return this.user;
    },
    cleanupUser() {
      localStorage.removeItem("user_signup");
    },
    async get_user_profile_channel(param: any) {
      const req = await directApi(
        `/users?email=${param.email}&channel=${param.channel}`,
      );
      this.user_profile = req.data || req;
      return req;
    },
    async validate_passwordless_otp(param_body: any) {
      const data = await onboardingApi(
        "/auth0/login/password-less-email-otp-validate",
        "POST",
        param_body,
      );
      return data;
    },
    async validate_user_allowed_login(param: any) {
      const data = await onboardingApi(`/users/is-login-allowed/${param}`);
      return data;
    },
    async validate_passwordless_email_login(param: any) {
      const data = await onboardingApi(
        `/auth0/password-less-email-login/${param}`,
        "POST",
      );
      return data;
    },
  },
});
