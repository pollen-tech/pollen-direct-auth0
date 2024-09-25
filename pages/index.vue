<template>
  <div>
    <AppLanding />
    <NotificationStatus />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "~/composables/auth0";
import { useUserStore } from "~/stores/user";
import { useCommonStore } from "~/stores/common";

definePageMeta({
  middleware: "auth",
});

const auth = useAuth();
const route = useRoute();
const router = useRouter();

const user_Store = useUserStore();
const { get_user_profile_channel } = user_Store;

const common_store = useCommonStore();

onMounted(async () => {
  console.log(route);
  if (route.query.user_id && route.query.user_id != "null") {
    try {
      const req = await get_user_profile_channel(route.query);
      if (req.status_code == "OK") {
        await auth.handleAuth0Response(route.query);
        await auth.set_user_id(req.data.user_id);
        await nextTick();
        router.push("/onboarding");
      } else {
        common_store.setShowNotification({
          display: true,
          status: "error",
          msg: req.desc,
        });
        setTimeout(() => {
          router.push("/");
        }, 400);
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  } else {
    if (route.query.user_id == "null") {
      const currentUrl = new URL(window.location.href);
      currentUrl.search = "";
      window.history.replaceState({}, document.title, currentUrl.toString());
    }
  }
});
</script>

<style lang="scss" scoped></style>
