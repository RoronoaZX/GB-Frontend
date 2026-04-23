<template>
  <div class="q-pa-md">
    <div class="row justify-between items-center q-mb-md">
      <div>
        <q-input
          v-model="filter"
          class="search-input"
          outlined
          dense
          placeholder="Search"
          rounded
          bg-color="white"
          debounce="1000"
        >
          <template v-slot:append>
            <q-icon name="search" size="sm" color="grey-7" />
          </template>
        </q-input>
      </div>
      <div class="row q-gutter-x-sm">
        <RawMaterialsCreate />
        <RawMaterialsCreateAll />
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
      bordered
      :columns="rawMaterialsColumns"
      :rows="filteredRows"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[10, 20, 50, 0]"
      style="height: 450px"
    >
      <template v-slot:header="props">
        <q-tr :props="props" class="gradient-header text-white">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-weight-bold text-subtitle2"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-total_quantity="props">
        <q-td :props="props">
          <q-badge
            rounded
            padding="xs md"
            class="text-weight-bold cursor-pointer"
            :color="getRawMaterialBadgeColorName(props.row)"
          >
            {{ formatTotalQuantity(props.row) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Click to Edit Stocks
            </q-tooltip>

            <q-popup-edit
              @update:model-value="(val) => updatedStocks(props.row, val)"
              v-model="props.row.total_quantity"
              auto-save
              v-slot="scope"
            >
              <q-input
                v-model="scope.value"
                dense
                outlined
                :suffix="props.row.raw_materials.unit"
                mask="########"
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-sm">
            <RawMaterialsTableDelete :delete="props" />
          </div>
        </q-td>
      </template>
    </q-table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import RawMaterialsCreate from "./RawMaterialsCreate.vue";
import RawMaterialsTableDelete from "./RawMaterialsTableDelete.vue";
import { useRoute } from "vue-router";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import { api } from "src/boot/axios";
import { Notify } from "quasar";
import RawMaterialsCreateAll from "./RawMaterialsCreateAll.vue";

const route = useRoute();
const warehouseId = route.params.warehouse_id;
const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();
const filter = ref("");
const loading = ref(true);
const warehouseRawMaterials = ref([]);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});
const warehouseRawMaterialsRows = computed(
  () => warehouseRawMaterialsStore.warehouseRawMaterials
);

const filteredRows = computed(() => {
  if (!filter.value) {
    return warehouseRawMaterialsRows.value;
  }
  return warehouseRawMaterialsRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  console.log("props.warehouseId in onMounted:", warehouseId);
  if (warehouseId) {
    await reloadTableData(warehouseId);
  }
});

const reloadTableData = async (warehouseId) => {
  // console.log("Fetching products for branch ID:", warehouseId);
  try {
    loading.value = true;
    const response =
      await warehouseRawMaterialsStore.fetchWarehouseRawMaterials(warehouseId);
    warehouseRawMaterialsRows.value = response;
    if (!warehouseRawMaterialsRows.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("Warehouse Raw Materials", warehouseRawMaterialsRows.value);
  } catch (error) {
    console.log("Error fetching branch product:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

async function updatedStocks(data, val) {
  try {
    const response = await api.put(
      "/api/update-warehouse-rawMaterials/" + data.id,
      {
        total_quantity: parseInt(val),
      }
    );
    if (response.status === 200) {
      const i = warehouseRawMaterials.value.findIndex(
        (item) => item.id == data.id
      );
      warehouseRawMaterials.value[i] = parseInt(val);

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

const getRawMaterialBadgeColorName = (row) => {
  const totalQuantity = row.total_quantity;
  const unit = row.raw_materials.unit;

  if (unit === "Grams" && totalQuantity < 1000) {
    return "red";
  }

  let stockValue;
  if (totalQuantity >= 1000) {
    stockValue = totalQuantity / 1000;
  } else {
    stockValue = totalQuantity;
  }

  if (stockValue < 5) {
    if (stockValue <= 2) {
      return "red";
    } else if (stockValue <= 3) {
      return "warning";
    } else {
      return "warning";
    }
  } else {
    return "positive";
  }
};

const formatTotalQuantity = (row) => {
  const totalQuantity = Number(row?.total_quantity) || 0; // Ensure it's a valid number
  const unit = row?.raw_materials?.unit || "units"; // Default unit

  console.log("totalQuantity:", totalQuantity);
  console.log("unit:", unit);

  const formatNumber = (value) => {
    const num = Number(value); // Ensure conversion
    return Number.isInteger(num) ? num : num.toFixed(2);
  };

  // Convert to kilos if total quantity exceeds 1000
  if (totalQuantity > 1000) {
    const totalQuantityKilo = totalQuantity / 1000;

    // If kilos are 25 or above, change unit to sacks
    if (totalQuantityKilo >= 25) {
      const sacks = totalQuantityKilo / 25;
      return `${formatNumber(sacks)} sacks`;
    }

    // Return in kilos otherwise
    return `${formatNumber(totalQuantityKilo)} kilos`;
  }

  // Return with unit
  return `${formatNumber(totalQuantity)} ${unit}`;
};

const rawMaterialsColumns = [
  {
    name: "code",
    label: "Raw Materials Code",
    align: "center",
    field: (row) => row?.raw_materials?.code ?? "No Code",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    label: "Raw Materials Name",
    align: "center",
    field: (row) => row?.raw_materials?.name ?? "No Code",
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
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
  },
];
</script>

<style scoped>
.search-input {
  width: 100%;
  max-width: 500px;
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 28px;
  background: white;
}

:deep(.q-field--outlined .q-field__control:before) {
  border: 1px solid #333 !important;
  opacity: 1 !important;
}

.gradient-header {
  background: linear-gradient(135deg, #155e75, #1e293b);
  color: white;
}

:deep(.q-table tbody tr:hover) {
  background-color: #f8fafc !important;
  transition: background-color 0.3s ease;
}

.table-container {
  max-height: 450px;
  overflow: hidden;
}

.spinner-wrapper {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
