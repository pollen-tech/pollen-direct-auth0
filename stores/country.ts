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
      const data = await onboardingApi(`/countries`);
      this.countries = data;
    },
    setCountries(param: never[]) {
      this.countries = param;
    },
    async get_cities(param: any) {
      // const data = await onboardingApi(`/countries/${param}/cities`);
      // return data;
      const city = [
        {
          city_id: 1,
          city_name: "Singapore",
        },
        {
          city_id: 2,
          city_name: "Kampong Serangoon Kechil",
        },
        {
          city_id: 3,
          city_name: "Matilda Estate",
        },
        {
          city_id: 4,
          city_name: "Chia Keng",
        },
        {
          city_id: 5,
          city_name: "Orchard",
        },
      ];
      return city;
    },
  },
});
