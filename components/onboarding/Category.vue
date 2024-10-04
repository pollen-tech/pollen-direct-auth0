<template>
  <div>
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="category"
          item-value="category_id"
          item-title="category_name"
          :items="categories"
          :return-object="true"
          placeholder="Main Category, Multi-Select (Mandatory)"
          variant="outlined"
          clearable
          @update:model-value="fetch_sub_category"
          @focus="fetch_category"
        />
      </v-col>
      <v-col>
        <v-autocomplete
          v-model="sub_category"
          item-value="sub_category_id"
          item-title="sub_category_name"
          :items="sub_category_list"
          :return-object="true"
          placeholder="Sub Category"
          variant="outlined"
          multiple
          persistent-hint
          :loading="is_sub_category_loading"
          @update:model-value="select_sub_category"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import _debounce from "lodash/debounce";
import { useSellerStore } from "~/stores/seller";

// Props
const props = defineProps({
  preselect: {
    type: Array,
    default: () => [],
    required: false,
  },
});

// Emit
const emit = defineEmits(["applyOption"]);

// Store
const seller_store = useSellerStore();
const categories = computed(() => seller_store.category);

// Reactive data
const sub_category_list = ref([]);
const res_category = ref([]);
const category = ref(null);
const sub_category = ref([]);
const is_category_loading = ref(false);
const is_sub_category_loading = ref(false);

// Watcher
watch(
  () => props.preselect,
  (newVal) => {
    res_category.value = Object.values(newVal);
  },
  { immediate: true },
);

// Lifecycle hook
onMounted(() => {
  res_category.value = props.preselect;
});

const fetch_category = async () => {
  is_category_loading.value = true;
  if (seller_store.category.length == 0) {
    await seller_store.get_category();
    is_category_loading.value = false;
  } else {
    is_category_loading.value = false;
  }
};

const fetch_sub_category = async (val) => {
  if (val?.category_id) {
    is_sub_category_loading.value = true;
    const req_sub_category = await seller_store.get_sub_category(
      val.category_id,
    );
    sub_category_list.value = req_sub_category;
    sub_category.value = [];
    // Update res_category to include new cities
    const categoryIndex = res_category.value.findIndex(
      (cat) => cat.category_id === val.category_id,
    );
    if (categoryIndex === -1) {
      res_category.value.push({
        category: val,
        sub_category: [],
      });
    } else {
      res_category.value[categoryIndex].category = val;
      res_category.value[categoryIndex].sub_category = [];
    }
    is_sub_category_loading.value = false;

    commmit_category(sync_category());
  }
};

const select_sub_category = (selected_category) => {
  if (category.value?.category_id) {
    const categoryIndex = res_category.value.findIndex(
      (cat) => cat.category?.category_id === category.value.category_id,
    );

    if (categoryIndex !== -1) {
      res_category.value[categoryIndex].sub_category = selected_category;

      commmit_category(sync_category());
    }
  }
};

const sync_category = () => {
  const combinedCategory = {};

  res_category.value.forEach((item) => {
    if (item.category) {
      const { category_id, category_name } = item.category;

      if (combinedCategory[category_id]) {
        // Combine cities if the country already exists
        const existingCategories = combinedCategory[category_id].sub_category;
        const newCategory = item.sub_category.filter(
          (new_sub) =>
            !existingCategories.some(
              (existingCategory) =>
                existingCategory.sub_category_id === new_sub.sub_category_id,
            ),
        );

        combinedCategory[category_id].sub_category = [
          ...existingCategories,
          ...newCategory,
        ];
      } else {
        // Add new country
        combinedCategory[category_id] = {
          category: { category_id, category_name },
          sub_category: [...item.sub_category],
        };
      }
    }
  });
  return Object.values(combinedCategory);
};

const commmit_category = _debounce((value) => {
  emit("applyOption", value);
}, 500);
</script>

<style scoped></style>
