<template>
  <div class="row justify-between">
    <div>
      <q-input
        class="q-pb-lg q-pl-md"
        v-model="filter"
        outlined
        placeholder="Search"
        debounce="1000"
        style="width: 450px; max-width: 1500px; min-width: 100px"
        flat
        dense
        rounded
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="q-my-sm">
      <RecipeCreate />
    </div>
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
      class="table-container sticky-header"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      :columns="branchRecipeColumns"
      :rows="filteredRows"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 350px"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <span>
            {{ capitalizeFirstLetter(props.row.name) }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-category="props">
        <q-td :props="props">
          <span>
            {{ capitalizeFirstLetter(props.row.category) }}
          </span>
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
              suffix="pcs"
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
      </template>
      <template v-slot:body-cell-bread_groups="props">
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
import { computed, onMounted, ref, watch } from "vue";
import RecipeCreate from "./RecipeCreate.vue";
import { useRoute } from "vue-router";
import { useBranchRecipeStore } from "src/stores/branch-recipe";
import RecipeDelete from "./RecipeDelete.vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";
const route = useRoute();

const branchId = route.params.branch_id;
const branchRecipeStore = useBranchRecipeStore();
const filter = ref("");
const loading = ref(true);
const branchRecipes = ref([]);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});
const status = ["inactive", "active"];
const branchRecipeRows = computed(() => branchRecipeStore.branchRecipes);
console.log("branch recipe", branchRecipeRows.value);

const filteredRows = computed(() => {
  if (!filter.value) {
    return branchRecipeRows.value;
  }
  return branchRecipeRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  if (branchId) {
    await reloadTableData(branchId);
  }
});

const reloadTableData = async (branchId) => {
  try {
    loading.value = true;
    const response = await branchRecipeStore.fetchBranchRecipes(branchId);
    branchRecipeRows.value = response;
    console.log("branchRecipeRows", branchRecipeRows.value);
    if (!branchRecipeRows.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("Branch recipe", branchRecipeRows.value);
  } catch (error) {
    console.log("Error fetching recipe", error);
  } finally {
    loading.value = false;
  }
};

// watch(filter, async (newFilter) => {
//   loading.value = true
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   loading.value = false
//   showNoDataMessage.value = filteredRows.value.length === 0
// })

async function updateRecipe(data, val) {
  try {
    const response = await api.put("/api/update-target/" + data.id, {
      target: parseInt(val),
    });

    console.log("response", response);
    if (response.status == 200) {
      const i = branchRecipes.value.findIndex((item) => item.id == data.id);
      branchRecipes.value[i] = val;
    }

    Notify.create({
      type: "positive",
      message: "Recipe target edited successfully",
      // position: "top",
    });
  } catch (error) {
    console.error("Error updating recipe target:", error);
    Notify.create({
      type: "negative",
      message: "Failed to edit recipe target",
      // position: "top",
    });
  }
}
async function updateRecipeStatus(data, val) {
  try {
    const response = await api.put("/api/branch-update-status/" + data.id, {
      status: val,
    });
    if (response.status == 200) {
      const i = branchRecipes.value.findIndex((item) => item.id == data.id);
      branchRecipes.value[i] = val;
    }

    Notify.create({
      type: "positive",
      message: "Recipe status change successfully",
      // position: "top",
    });
  } catch (error) {
    console.error("Error updating recipe status:", error);
    Notify.create({
      type: "negative",
      message: "Failed to change recipe status",
      // position: "top",
    });
  }
}

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const branchRecipeColumns = [
  {
    name: "name",
    label: "Recipe name",
    align: "center",
    field: (row) => row.name,
  },
  {
    name: "category",
    label: "Category",
    align: "center",
    field: (row) => row.recipe,
  },
  {
    name: "target",
    label: "Target",
    align: "center",
    field: "target",
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
  },
  {
    name: "bread_groups",
    label: "List of Bread",
    align: "center",
    field: "bread_groups",
  },
  {
    name: "ingredient_groups",
    label: "List of Ingredients",
    align: "center",
    field: "ingredient_groups",
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
  },
];

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "inactive":
      return "grey";
    case "active":
      return "green";
    default:
      return "grey";
  }
};
</script>

<style lang="scss" scoped>
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
