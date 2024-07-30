import { useAuth } from "~/composables/auth0";
import { useSellerStore } from "~/stores/seller";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const seller_store = useSellerStore();

  const { get_user_id, is_token_expired } = useAuth();
  const user_id = get_user_id();

  if (is_token_expired()) {
    if (typeof window !== "undefined") {
      localStorage.clear();
      if (to.name === "onboarding") {
        return navigateTo("/");
      }

      // const companyProfile = await seller_store.get_company_profile(user_id);
      // if (!companyProfile?.data) {  }
    }
  } else {
    const { data } = await seller_store.get_company_profile(user_id);
    if (data?.id) {
      window.location.href = "/"; // Redirect to home if not authenticated
    }
  }
});
