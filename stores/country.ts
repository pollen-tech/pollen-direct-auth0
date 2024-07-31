import { defineStore } from "pinia";
import { onboardingApi } from "~/services/api";

export const useCountryStore = defineStore("country", {
  state: () => {
    return {
      countries: [],
    };
  },
  actions: {
    async get_countries() {
      const { data } = await onboardingApi(`/country`);
      this.countries = data;
    },
    setCountries(param: never[]) {
      this.countries = param;
    },
    async get_cities(param: any) {
      const { data } = await onboardingApi(`/country/${param}/city`);
      return data;
    },
  },
});
