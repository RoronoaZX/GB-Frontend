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
    <q-table
      v-else
      class="table-container elegant-container sticky-header"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      :columns="recipeColumns"
      :rows="filteredRows"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 400px"
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
            @update:model-value="(val) => updateRecipeName(props.row, val)"
            v-model="props.row.name"
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
          <q-badge :color="getBadgeCategoryColor(props.row.category)">
            {{ props.row.category }}
          </q-badge>
        </q-td>
      </template>
      <!-- <template v-slot:body-cell-bread_groups="props">
        <q-td :props="props">
          <q-tooltip
            :offset="[0, 10]"
            :delay="600"
            class="bg-info text-dark text-subtitle1"
          >
            <div
              class="q-pb-sm text-center text-h6 text-weight-bold text-subtitle2"
            >
              Breads List
            </div>
            <q-separator class="q-mb-md" color="yellow" />
            <div v-for="bread in props.row.bread_groups" :key="bread">
              {{ bread }}
            </div>
          </q-tooltip>
          <q-chip square outline color="red-6" class="text-white">
            {{ props.row.bread_groups.length }} breads
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-ingredient_groups="props">
        <q-td :props="props">
          <q-tooltip
            :delay="600"
            class="bg-info text-dark text-subtitle1"
            style="width: 300px"
          >
            <div
              class="q-pb-sm text-center text-h6 text-weight-bold text-subtitle2"
            >
              Ingredients List
            </div>
            <q-separator class="q-mb-md" color="yellow" />
            <div
              class="row justify-between"
              v-for="ingredient in props.row.ingredient_groups"
              :key="ingredient.ingredient_name"
            >
              <div>
                {{ ingredient.ingredient_name }}
              </div>
              <div>{{ ingredient.quantity }} {{ ingredient.unit }}</div>
            </div>
          </q-tooltip>
          <q-chip square outline color="purple-6" class="text-white">
            {{ props.row.ingredient_groups.length }} ingredients
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-target="props">
        <q-td auto-width class="cursor-pointer text-center">
          <span
            >{{ props.row.target ? props.row.target : "Set Target" }}

            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]"
              >Edit Target</q-tooltip
            >
          </span>
          <q-popup-edit
            @update:model-value="(val) => updateRecipe(props.row, val)"
            v-model="props.row.target"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              mask="###"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge outline :color="getBadgeStatusColor(props.row.status)">
            {{ capitalizeFirstLetter(props.row.status) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]"
              >Change Status</q-tooltip
            >
          </q-badge>
          <q-popup-edit
            @update:model-value="(val) => updateRecipeStatus(props.row, val)"
            v-model="props.row.status"
            auto-save
            v-slot="scope"
          >
            <span> {{ props.row.name }}</span>
            <q-select
              v-model="scope.value"
              dense
              label="status"
              autofocus
              :options="status"
              counter
              mask="###"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template> -->
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
import RecipeEdit from "./RecipeEdit.vue";
import RecipeDelete from "./RecipeDelete.vue";
import { useRecipeStore } from "src/stores/recipe";
// import { update_recipe_target } from "src/services/recipe";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

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

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// async function updateRecipe(data, val) {
//   try {
//     const response = await api.put("/api/update-target/" + data.id, {
//       target: parseInt(val),
//     });

//     console.log("response", response);
//     if (response.status == 200) {
//       const i = recipes.value.findIndex((item) => item.id == data.id);
//       recipes.value[i] = val;
//     }

//     Notify.create({
//       type: "positive",
//       message: "Recipe target edited successfully",
//       // position: "top",
//     });
//   } catch (error) {
//     console.error("Error updating recipe target:", error);
//     Notify.create({
//       type: "negative",
//       message: "Failed to edit recipe target",
//       // position: "top",
//     });
//   }
// }

// async function updateRecipeName(data, val) {
//   try {
//     const response = await api.put("/api/update-name/" + data.id, {
//       name: val,
//     });
//     if (response.status == 200) {
//       const i = recipes.value.findIndex((item) => item.id == data.id);
//       recipes.value[i] = val;
//     }

//     Notify.create({
//       type: "positive",
//       message: "Recipe name edited successfully",
//       // position: "top",
//     });
//   } catch (error) {
//     console.error("Error updating recipe name:", error);
//     Notify.create({
//       type: "negative",
//       message: "Failed to edit recipe name",
//       // position: "top",
//     });
//   }
// }
// async function updateRecipeStatus(data, val) {
//   try {
//     const response = await api.put("/api/update-status/" + data.id, {
//       status: val,
//     });
//     if (response.status == 200) {
//       const i = recipes.value.findIndex((item) => item.id == data.id);
//       recipes.value[i] = val;
//     }

//     Notify.create({
//       type: "positive",
//       message: "Recipe status change successfully",
//       // position: "top",
//     });
//   } catch (error) {
//     console.error("Error updating recipe status:", error);
//     Notify.create({
//       type: "negative",
//       message: "Failed to change recipe status",
//       // position: "top",
//     });
//   }
// }

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
  // {
  //   name: "target",
  //   label: "Target Pcs",
  //   align: "left",
  //   field: "target",
  //   sortable: true,
  // },
  {
    name: "category",
    align: "left",
    label: "Category",
    field: "category",
    sortable: true,
  },
  // {
  //   name: "bread_groups",
  //   label: "List of Bread",
  //   align: "center",
  //   field: "bread_groups",
  //   sortable: true,
  // },
  // {
  //   name: "ingredient_groups",
  //   label: "List of Ingredients",
  //   align: "center",
  //   field: "ingredient_groups",
  //   sortable: true,
  // },
  // {
  //   name: "status",
  //   label: "Status",
  //   align: "center",
  //   field: "status",
  //   sortable: true,
  // },
  {
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
  },
];

const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "Filling":
      return "teal";
    case "Dough":
      return "brown-6";
    default:
      return "grey";
  }
};

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "Inactive":
      return "grey";
    case "Active":
      return "green";
    default:
      return "grey";
  }
};
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
  max-height: 400px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}

.dynamic-width {
  width: 100%; /* default width */
  max-width: 1500px;
  min-width: 300px; /* set a minimum width */
}

@media (max-width: 1200px) {
  .dynamic-width {
    max-width: 800px; /* smaller width for medium-sized screens */
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
