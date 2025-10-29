<template>
  <div align="left">
    <q-input
      class="q-pb-lg q-pl-sm dynamic-width"
      v-model="filter"
      outlined
      placeholder="Search"
      debounce="1000"
      flat
      dense
      rounded
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>

  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>

  <div v-else>
    <div v-if="filteredRows.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <!-- virtual-scroll -->
    <q-table
      v-else
      class="table-container elegant-container sticky-header"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      :columns="recipeColumns"
      :rows="filteredRows"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 500px"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props" class="cursor-pointer">
          <span
            >{{ capitalizeFirstLetter(props.row.name) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]"
              >Edit Recipe Name</q-tooltip
            >
          </span>
          <q-popup-edit
            :model-value="props.row.name"
            @update:model-value="(val) => updateRecipeName(props.row, val)"
            auto-save
            v-slot="scope"
          >
            <q-input
              class="text-capitalize"
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-category="props">
        <q-td key="name" :props="props">
          <q-badge :color="getRecipeBadgeCategoryColor(props.row.category)">
            {{ props.row.category }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <RecipeDelete :delete="props" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from "vue";
import RecipeDelete from "./RecipeDelete.vue";
import { useRecipeStore } from "src/stores/recipe";
import { Notify } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter } = typographyFormat();
const { getRecipeBadgeCategoryColor } = badgeColor();

const recipeStore = useRecipeStore();
const filter = ref("");
const loading = ref(true);
const recipes = ref([]);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});
const status = ["Inactive", "Active"];

const recipeRows = computed(() => recipeStore.recipes);

// Computed property for filtered rows
const filteredRows = computed(() => {
  if (!filter.value) {
    return recipeRows.value;
  }
  return recipeRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

async function updateRecipeName(data, val) {
  try {
    await recipeStore.updateRecipeName(data, val);
  } catch (error) {
    console.error("Error updating recipe name:", error);
    Notify.create({
      type: "negative",
      message: "Failed to edit recipe name",
      // position: "top",
    });
  }
}

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    loading.value = true;
    recipeRows.value = await recipeStore.fetchRecipes();
    if (!recipeRows.value.length) {
      showNoDataMessage.value = true;
    }

    console.log("Recipe", recipeRows.value);
  } catch (error) {
    console.log("error fetching recipe: ", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

watch(filter, async (newFilter) => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
  showNoDataMessage.value = filteredRows.value.length === 0;
});

const recipeColumns = [
  {
    name: "name",
    label: "Recipe Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "category",
    align: "left",
    label: "Category",
    field: "category",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
  },
];
</script>
<style scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 1rem;
  border-radius: 8px;
}
.absolute-full {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-container {
  max-height: 500px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}

.dynamic-width {
  width: 100%; /* default width */
  max-width: 500px;
  min-width: 300px; /* set a minimum width */
}

@media (max-width: 1500px) {
  .dynamic-width {
    max-width: 500px; /* smaller width for medium-sized screens */
  }
}

@media (max-width: 768px) {
  .dynamic-width {
    max-width: 500px; /* smaller width for tablets */
  }
}

@media (max-width: 480px) {
  .dynamic-width {
    max-width: 200px; /* smaller width for mobile screens */
  }
}
</style>
