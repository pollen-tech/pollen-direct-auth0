import { defineStore } from "pinia";
import countries_list from "~/utils/country.json";
import cities_list from "~/utils/city.json";
export interface Country {
  country_id: number;
  country_name: string;
}
export interface City {
  city_id: number;
  country_id: number;
  city_name: string;
}
const cities_list_typed: City[] = cities_list as City[];

export const useCountryStore = defineStore("country", {
  state: () => {
    return {
      countries: [] as Country[],
    };
  },
  actions: {
    async get_countries() {
      const country_typed: Country[] = countries_list as Country[];
      // const { data } = await onboardingApi('/country');
      this.countries = country_typed;
    },
    setCountries(param: never[]) {
      this.countries = param;
    },
    async get_cities(param: any) {
      return cities_list_typed.filter(
        (city: { country_id: any }) => city.country_id === param,
      ) as City[];
      // const { data } = await onboardingApi(`/country/${param}/city`);
      // return data;
    },
  },
});
