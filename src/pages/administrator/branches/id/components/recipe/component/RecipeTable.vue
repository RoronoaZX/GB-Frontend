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
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 450px"
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
            >{{ formatTarget(props.row.target) }}

            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]"
              >Edit Target</q-tooltip
            >
          </span>
          <q-popup-edit
            @update:model-value="(val) => updateRecipe(props.row, val)"
            v-model="props.row.target"
            auto-save
            buttons
            label-set="Save"
            label-cancel="Close"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              suffix="pcs"
              autofocus
              counter
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
            buttons
            label-set="Save"
            label-cancel="Close"
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
          <q-btn
            no-caps
            @click="handleRecipeBreadGroupsDialog(props.row)"
            :label="`${props.row.bread_groups.length} ${
              props.row.bread_groups.length === 1 ? 'bread' : 'breads'
            }`"
            rounded
            color="brown"
          >
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-ingredient_groups="props">
        <q-td :props="props">
          <q-btn
            no-caps
            @click="handleRecipeIngredientGroupsDialog(props.row)"
            :label="`${props.row.ingredient_groups.length} ${
              props.row.ingredient_groups.length === 1
                ? 'ingredient'
                : 'ingredients'
            } `"
            rounded
            color="purple"
          >
          </q-btn>
        </q-td>
      </template>
      <!-- <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <RecipeDelete :delete="props" />
          </div>
        </q-td>
      </template> -->
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import RecipeCreate from "./RecipeCreate.vue";
import { useRoute } from "vue-router";
import { useBranchRecipeStore } from "src/stores/branch-recipe";
import RecipeDelete from "./RecipeDelete.vue";
import RecipeBreadGroups from "./RecipeBreadGroups.vue";
import RecipeIngredientGroups from "./RecipeIngredientGroups.vue";
import { api } from "src/boot/axios";
import { Notify, useQuasar } from "quasar";
import { useUsersStore } from "src/stores/user";

const route = useRoute();

const userStore = useUsersStore();
const userData = computed(() => userStore.userData);
console.log("producttable user data", userData.value);
const userId = userData.value?.data?.id || "0";
console.log("user_id branch product table", userId);
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

const formatTarget = (target) => {
  // Ensure the target is a number and default to 0 if undefined or null
  const numericTarget = Number(target) || 0;

  // Use parseFloat to remove trailing zeros if the value is decimal
  return parseFloat(numericTarget.toFixed(3)).toString();
};
const formatNumber = (value) => {
  if (!value && value !== 0) return "Set Target"; // Handle empty or null values
  if (typeof value === "number" || !isNaN(value)) {
    value = parseFloat(value); // Ensure the value is parsed as a number
    return value % 1 === 0 ? value : parseFloat(value.toFixed(1)); // Use .1 precision for non-integers
  }
  return value; // Return as is for non-numeric input
};

// watch(filter, async (newFilter) => {
//   loading.value = true
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   loading.value = false
//   showNoDataMessage.value = filteredRows.value.length === 0
// })

async function updateRecipe(data, val) {
  console.log("branch recipe taable", data);
  const formatNumber = (num) => {
    const parsed = parseFloat(num);
    // If it's a whole number, return as string without decimals
    return parsed % 1 === 0 ? parsed.toFixed(0) : parsed.toFixed(1);
  };

  const report_id = data.id;
  const name = `${data?.name || "undefined"} recipe`;

  // These will always be strings like "25 pcs" or "1.5 pcs"
  const originalData = `${formatNumber(data.target)} pcs`;
  const updatedData = `${formatNumber(val)} pcs`;

  const updated_field = "target";
  const designation = branchId;
  const designation_type = "branch";
  const action = "updated";
  const type_of_report = "Branch Recipe Table";
  const user_id = userId;

  // const payload = {
  //   report_id,
  //   name,
  //   originalData,
  //   updatedData,
  //   updated_field,
  //   designation,
  //   designation_type,
  //   action,
  //   type_of_report,
  //   user_id,
  // };
  // console.log("payload recipe", payload);

  try {
    const response = await api.put("/api/update-target/" + data.id, {
      target: parseFloat(val),

      // Extra data for history logging (now strings)
      report_id,
      name,
      original_data: originalData,
      updated_data: updatedData,
      updated_field,
      designation,
      designation_type,
      action,
      type_of_report,
      user_id,
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
  const report_id = data.id;
  const name = `${data?.name || "undefined"} recipe`;
  // These will always be strings like "25 pcs" or "1.5 pcs"
  const originalData = `${data.status}`;
  const updatedData = `${val}`;

  const updated_field = "status";
  const designation = branchId;
  const designation_type = "branch";
  const action = "updated";
  const type_of_report = "Branch Recipe Table";
  const user_id = userId;

  try {
    const response = await api.put("/api/branch-update-status/" + data.id, {
      status: val,

      // Extra data for history logging (now strings)
      report_id,
      name,
      original_data: originalData,
      updated_data: updatedData,
      updated_field,
      designation,
      designation_type,
      action,
      type_of_report,
      user_id,
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
    field: (row) => formatNumber(row.target),
  },
  {
    name: "price_per_kilo",
    label: "Price per Kilo",
    align: "center",
    field: (row) => {
      if (!row.ingredient_groups || row.ingredient_groups.length === 0)
        return "₱0.00";
      // Calculate total = sum of (quantity * price_per_gram)
      const total = row.ingredient_groups.reduce((sum, ing) => {
        const quantity = parseFloat(ing.quantity) || 0;
        const pricePerGram = parseFloat(ing.price_per_gram) || 0;
        return sum + quantity * pricePerGram;
      }, 0);
      return `₱${total.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
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
  // {
  //   name: "action",
  //   label: "Action",
  //   align: "center",
  //   sortable: true,
  // },
];

const $q = useQuasar();

const handleRecipeBreadGroupsDialog = (breadGroups) => {
  console.log("Bread Groups:", breadGroups);
  $q.dialog({
    component: RecipeBreadGroups,
    componentProps: {
      breadGroups: breadGroups,
    },
  });
};
const handleRecipeIngredientGroupsDialog = (ingredientGroups) => {
  console.log("Ingredients Groups:", ingredientGroups);
  $q.dialog({
    component: RecipeIngredientGroups,
    componentProps: {
      ingredientGroups: ingredientGroups,
    },
  });
};

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
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-container {
  max-height: 450px; /* Adjust as needed */
  overflow: hidden;
}
</style>
