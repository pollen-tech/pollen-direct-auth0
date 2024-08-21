<template>
  <div>
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="country"
          item-value="country_id"
          item-title="name"
          :items="countries"
          :return-object="true"
          placeholder="Country"
          variant="outlined"
          clearable
          @update:model-value="fetchCity"
        />
      </v-col>
      <v-col>
        <v-autocomplete
          v-model="city"
          item-value="city_id"
          item-title="name"
          :items="cityList"
          :return-object="true"
          placeholder="City"
          variant="outlined"
          multiple
          persistent-hint
          @update:model-value="selectLocation"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import _debounce from "lodash/debounce";
import { useCountryStore } from "~/stores/country";

// Props
const props = defineProps({
  preselect: {
    type: Array,
    default: () => [],
    required: false,
  },
  countries: {
    type: Array,
    default: [],
  },
});

// Emit
const emit = defineEmits(["applyOption"]);

// Store
const country_store = useCountryStore();

// Reactive data
const selectedOption = ref([]);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);
const location = ref([]);
const cityList = ref([]);
const city = ref([]);
const country = ref(null);

// Watcher
watch(
  () => props.preselect,
  (newVal) => {
    location.value = Object.values(newVal);
  },
  { immediate: true },
);

// Lifecycle hook
onMounted(() => {
  location.value = props.preselect;
});

// Methods
const addLocation = () => {
  location.value.push({
    country: null,
    city: [],
  });
};

const fetchCity = async (selectedCountry) => {
  if (selectedCountry?.country_id) {
    const cities = await country_store.get_cities(selectedCountry.country_id);
    cityList.value = cities;
    city.value = [];

    // Update location to include new cities
    const countryIndex = location.value.findIndex(
      (loc) => loc.country?.country_id === selectedCountry.country_id,
    );
    if (countryIndex === -1) {
      location.value.push({
        country: selectedCountry,
        city: [],
      });
    } else {
      location.value[countryIndex].country = selectedCountry;
      location.value[countryIndex].city = [];
    }

    commitLocation(syncLocation());
  }
};

const selectLocation = (selectedCities) => {
  if (country.value?.country_id) {
    const countryIndex = location.value.findIndex(
      (loc) => loc.country?.country_id === country.value.country_id,
    );

    if (countryIndex !== -1) {
      location.value[countryIndex].city = selectedCities;
      commitLocation(syncLocation());
    }
  }
};

const syncLocation = () => {
  const combinedCountries = {};

  location.value.forEach((item) => {
    if (item.country) {
      const { country_id, name } = item.country;

      if (combinedCountries[country_id]) {
        // Combine cities if the country already exists
        const existingCities = combinedCountries[country_id].city;
        const newCities = item.city.filter(
          (newCity) =>
            !existingCities.some(
              (existingCity) => existingCity.city_id === newCity.city_id,
            ),
        );

        combinedCountries[country_id].city = [...existingCities, ...newCities];
      } else {
        // Add new country
        combinedCountries[country_id] = {
          country: { country_id, name },
          city: [...item.city],
        };
      }
    }
  });

  return Object.values(combinedCountries);
};

const commitLocation = _debounce((value) => {
  emit("applyOption", value);
}, 500);
</script>

<style scoped></style>
