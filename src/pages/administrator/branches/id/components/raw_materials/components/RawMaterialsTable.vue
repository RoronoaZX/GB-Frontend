<template>
  <div class="row justify-between">
    <div>
      <q-input
        class="q-pb-lg q-pl-md"
        v-model="filter"
        outlined
        placeholder="Search"
        debounce="1000"
        style="width: 450px; max-width: 5000px; min-width: 100px"
        flat
        dense
        rounded
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="row q-my-sm q-gutter-x-md">
      <RawMaterialsCreate />
      <RawMaterialsAddAll />
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
      flat
      :columns="ingredientsColumns"
      :rows="filteredRows"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 450px"
    >
      <template v-slot:body-cell-total_quantity="props">
        <q-td :props="props">
          <q-badge
            square
            class="text-white cursor-pointer"
            :class="getRawMaterialBadgeColor(props.row)"
          >
            {{ formatTotalQuantity(props.row) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              <div class="text-white">Edit Available Stocks</div>
            </q-tooltip>

            <q-popup-edit
              @update:model-value="(val) => updatedStocks(props.row, val)"
              v-model="props.row.total_quantity"
              auto-save
              buttons
              label-set="Save"
              label-cancel="Close"
              v-slot="scope"
            >
              <q-input
                v-model="scope.value"
                dense
                :suffix="props.row.ingredients.unit"
                mask="########"
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-depletion="props">
        <q-td :props="props" style="min-width: 140px">
          <!-- Case 1: has a usage-based prediction -->
          <div v-if="getPrediction(props.row)" class="depletion-cell q-py-xs">
            <q-badge
              rounded
              padding="xs sm"
              :color="getPredictionBadgeColor(getPrediction(props.row).status)"
              class="text-weight-bold q-mb-xs"
            >
              <q-icon
                :name="getPredictionIcon(getPrediction(props.row).status)"
                size="10px"
                class="q-mr-xs"
              />
              {{ getPredictionLabel(getPrediction(props.row)) }}
            </q-badge>
            <q-linear-progress
              rounded
              size="6px"
              :value="Math.min(getPrediction(props.row).days_remaining / 14, 1)"
              :color="getPredictionBadgeColor(getPrediction(props.row).status)"
              track-color="grey-3"
            />
          </div>
          <!-- Case 2: no history, but stock is critically low -->
          <div v-else-if="isAbsoluteLowStock(props.row)" class="row items-center q-gutter-x-xs">
            <q-badge rounded padding="xs sm" color="negative" class="text-weight-bold">
              <q-icon name="warning" size="10px" class="q-mr-xs" />
              Low Stock
            </q-badge>
          </div>
          <!-- Case 3: no history, moderate stock -->
          <div v-else-if="isAbsoluteWarnStock(props.row)" class="row items-center q-gutter-x-xs">
            <q-badge rounded padding="xs sm" color="warning" class="text-weight-bold">
              <q-icon name="schedule" size="10px" class="q-mr-xs" />
              Monitor
            </q-badge>
          </div>
          <!-- Case 4: genuinely healthy and no history -->
          <div v-else class="row items-center q-gutter-x-xs">
            <q-icon name="check_circle" color="positive" size="16px" />
            <span class="text-caption text-positive text-weight-medium">Healthy</span>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-consumption="props">
        <q-td :props="props">
          <div v-if="getPrediction(props.row)" class="row items-center justify-center">
            <span class="text-weight-bold text-dark">
              {{ formatConsumptionRate(getPrediction(props.row).daily_usage, props.row.ingredients?.unit) }}
            </span>
          </div>
          <div v-else class="text-grey-5 text-caption text-center italic">
            No history
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <!-- <RawMaterialsTableEdit /> -->
            <RawMaterialsTableDelete :delete="props" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import RawMaterialsCreate from "./RawMaterialsCreate.vue";
import RawMaterialsAddAll from "./RawMaterialsAddAll.vue";
// import RawMaterialsAdd from "./RawMaterialsAdd.vue";
// import RawMaterialsTableEdit from "./RawMaterialsTableEdit.vue";
import RawMaterialsTableDelete from "./RawMaterialsTableDelete.vue";
import { useRoute } from "vue-router";
import { useBranchRawMaterialsStore } from "src/stores/branch-rawMaterials";
import { useDashboardStore } from "src/stores/dashboard";
import { api } from "src/boot/axios";
import { Notify } from "quasar";
import { useUsersStore } from "src/stores/user";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const route = useRoute();
const userStore = useUsersStore();
const userData = computed(() => userStore.userData);
// console.log("producttable user data", userData.value);
const userId = userData.value?.data?.id || "0";
// console.log("user_id branch product table", userId);
const branchId = route.params.branch_id;
const branchRawMaterialsStore = useBranchRawMaterialsStore();
const dashboardStore = useDashboardStore();
const filter = ref("");
const loading = ref(true);
const branchRawMaterials = ref([]);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});
const branchRawMaterialsRows = computed(
  () => branchRawMaterialsStore.branchRawMaterials
);

const filteredRows = computed(() => {
  if (!filter.value) {
    return branchRawMaterialsRows.value;
  }
  return branchRawMaterialsRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  if (branchId) {
    await reloadTableData(branchId);
    await dashboardStore.fetchPredictiveStocking({ branch_id: branchId });
  }
});

const reloadTableData = async (branchId) => {
  // console.log("Fetching products for branch ID:", branchId);
  try {
    loading.value = true;
    const response = await branchRawMaterialsStore.fetchBranchRawMaterials(
      branchId
    );
    branchRawMaterialsRows.value = response;
    if (!branchRawMaterialsRows.value.length) {
      showNoDataMessage.value = true;
    }
    // console.log("Branch Raw Materials", branchRawMaterialsRows.value);
  } catch (error) {
    console.log("Error fetching branch product:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

async function updatedStocks(data, val) {
  // console.log("data branch raw materials", data);
  const report_id = data.id;
  const name = data?.ingredients?.name || "undefined";
  const originalData = ` ${data.total_quantity.toString()} grams`; // Convert to string
  const updatedData = `${parseInt(val).toString()} grams`; // Convert to string after parsing
  const updated_field = "Available Stocks";
  const designation = branchId;
  const designation_type = "branch";
  const action = "updated";
  const type_of_report = "Branch Raw Materials Table";
  const user_id = userId;

  const payload = {
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
  };

  console.log("payload raw materials", payload);

  try {
    const response = await api.put(
      "/api/update-branch-rawMaterials/" + data.id,
      {
        total_quantity: parseInt(val),

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
      }
    );
    if (response.status === 200) {
      const i = branchRawMaterials.value.findIndex(
        (item) => item.id == data.id
      );
      branchRawMaterials.value[i] = parseInt(val);

      Notify.create({
        type: "positive",
        message: response.data.message,
        timout: 1000,
        position: "top",
      });
    }
  } catch (error) {
    console.error("Error updating price:", error);
  }
}

watch(filter, async (newFilter) => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
  showNoDataMessage.value = filteredRows.value.length === 0;
});

const getRawMaterialBadgeColor = (row) => {
  const totalQuantity = row.total_quantity;
  const unit = row.ingredients?.unit || "Grams"; // Default to "Grams" or other fallback

  if (unit === "Grams" && totalQuantity < 1000) {
    return "bg-red";
  }

  let stockValue;
  if (totalQuantity >= 1000) {
    stockValue = totalQuantity / 1000;
  } else {
    stockValue = totalQuantity;
  }

  if (stockValue < 5) {
    if (stockValue <= 2) {
      return "bg-red";
    } else {
      return "bg-warning";
    }
  } else {
    return "bg-positive";
  }
};

const formatTotalQuantity = (row) => {
  const totalQuantity = row.total_quantity;
  const unit = row.ingredients?.unit || "units"; // fallback if undefined

  if (totalQuantity > 1000) {
    const totalQuantityKilo = (totalQuantity / 1000).toFixed(2);
    if (totalQuantityKilo.endsWith(".00")) {
      return `${Math.round(totalQuantity / 1000)} kilos`;
    } else {
      return `${totalQuantityKilo} kilos`;
    }
  } else {
    return `${totalQuantity} ${unit}`;
  }
};

const formatConsumptionRate = (rate, unit) => {
  if (unit === 'Grams' && rate >= 1000) {
    return `${(rate / 1000).toFixed(2)} kg/day`;
  }
  return `${rate} ${unit || 'g'}/day`;
};

const ingredientsColumns = [
  {
    name: "code",
    label: "Raw Materials Code",
    align: "center",
    field: (row) => row?.ingredients?.code ?? "No Code",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "total_quantity",
    label: "Available Stocks",
    align: "center",
    field: "total_quantity",
    sortable: true,
  },
  {
    name: "consumption",
    label: "Daily Consumption",
    align: "center",
    field: "consumption",
    sortable: false,
  },
  {
    name: "depletion",
    label: "Depletion Forecast",
    align: "center",
    field: "depletion",
    sortable: false,
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
  },
];

// ── Predictive Stocking Helpers ──────────────────────────────────────────────
const getPredictionBadgeColor = (status) => {
  if (status === 'critical') return 'negative';
  if (status === 'warning') return 'warning';
  return 'positive';
};

const getPredictionIcon = (status) => {
  if (status === 'critical') return 'warning';
  if (status === 'warning') return 'schedule';
  return 'check_circle';
};

const getPredictionLabel = (prediction) => {
  if (prediction.status === 'healthy') return 'Healthy';
  return `${prediction.days_remaining}d left`;
};

// Map each table row to its prediction entry.
// Branch rows use `row.ingredients_id` as the FK and `row.ingredients?.id` as the PK.
const getPrediction = (row) => {
  const rmId = row?.ingredients_id ?? row?.ingredients?.id ?? null;
  if (!rmId) return null;
  return dashboardStore.predictiveStocking.find(
    (p) => Number(p.id) === Number(rmId)
  ) || null;
};

// Convert stored quantity to kg for threshold comparison.
const getAbsoluteStockKg = (row) => {
  const qty = Number(row?.total_quantity) || 0;
  const unit = row?.ingredients?.unit || '';
  return unit === 'Grams' ? qty / 1000 : qty;
};

// < 2 kg / 2 pcs → critical (no history path)
const isAbsoluteLowStock = (row) => getAbsoluteStockKg(row) < 2;

// 2–5 kg → monitor (no history path)
const isAbsoluteWarnStock = (row) => {
  const kg = getAbsoluteStockKg(row);
  return kg >= 2 && kg < 5;
};
</script>

<style scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
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
  max-height: 450px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}
</style>
