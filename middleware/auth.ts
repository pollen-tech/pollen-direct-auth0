import { useAuth } from "~/composables/auth0";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { is_token_expired } = useAuth();

  if (!is_token_expired()) {
    return navigateTo("/"); // Redirect to home if not authenticated
  } else {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  }
});
