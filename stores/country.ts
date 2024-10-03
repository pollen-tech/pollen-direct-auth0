import { defineStore } from "pinia";
import { onboardingApi } from "~/services/api";
import countries_list from "~/utils/country.json";
export interface Country {
  country_id: number;
  country_name: string;
}
export interface City {
  city_id: number;
  country_id: number;
  city_name: string;
}
export const useCountryStore = defineStore("country", {
  state: () => ({
    countries: [] as Country[],
  }),

  actions: {
    async get_countries() {
      if (this.countries.length === 0) {
        const country_typed: Country[] = countries_list.map((country) => ({
          id: country.id,
          name: country.name,
        })) as unknown as Country[];

        this.countries = country_typed;
      }
    },
    setCountries(param: Country[]) {
      this.countries = param;
    },
    async get_cities(param: any) {
      const { data } = await onboardingApi(`/country/${param}/city`);
      return data;
    },
  },
});
