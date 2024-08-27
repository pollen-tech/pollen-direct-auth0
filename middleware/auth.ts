import { useAuth } from "~/composables/auth0";
import { useSellerStore } from "~/stores/seller";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const seller_store = useSellerStore();

  const { get_user_id, is_token_expired } = useAuth();
  const user_id = get_user_id();

  if (is_token_expired()) {
    if (typeof window !== "undefined") {
      localStorage.clear();
      if (to.name === "onboarding") {
        return navigateTo("/");
      }
    }
  } else {
    const { data } = await seller_store.get_company_profile(user_id);
    if (data?.id) {
      const interest = await seller_store.get_company_interest(data?.id);
      if (to.name === "onboarding") {
        if (interest?.data?.import_markets.length >= 1) {
          window.location.href = "/";
        }
      } else {
        window.location.href = "/"; // Redirect to home if not authenticated
      }
    } else if (to.name == "index") {
      window.location.href = "/onboarding";
    }
  }
});
