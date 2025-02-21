<template>
  <div class="q-mb-sm">
    <q-input
      rounded
      outlined
      dense
      debounce="300"
      v-model="filter"
      placeholder="Searchsss"
      style="width: 500px; max-width: 1500px; min-width: 100px"
    >
      <template v-slot:append>
        <q-icon v-if="!loadingSearchIcon" name="search" />
        <q-icon v-else :thickness="2" color="teal" size="1em" />
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
      class="table-container sticky-header"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      :columns="rawMaterialsColumns"
      :rows="filteredRows"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 340px"
    >
      <template v-slot:body-cell-availableStocks="props">
        <q-td :props="props">
          <q-chip
            square
            class="text-white"
            :class="getRawMaterialBadgeColor(props.row)"
          >
            <!-- :class="getRawMaterialBadgeColor(props.row.total_quantity)" -->
            {{ formatTotalQuantity(props.row) }}
            <!-- formatTotalQuantity -->
          </q-chip>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import { computed, onMounted, ref, watch } from "vue";

const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();
const userData = computed(() => warehouseRawMaterialsStore.user);
const warehouseId = userData.value?.employee?.warehouse_id || "";
const warehouseRawMaterialsRows = computed(
  () => warehouseRawMaterialsStore.warehouseRawMaterials
);

const loading = ref(true);

console.log("warehouse id", warehouseId);
const filter = ref("");
const loadingSearchIcon = ref(false);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});

const filteredRows = computed(() => {
  if (!filter.value) {
    return warehouseRawMaterialsRows.value;
  }
  return warehouseRawMaterialsRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

watch(filter, async (newFilter) => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
  showNoDataMessage.value = filteredRows.value.length === 0;
});

// watch(filter, () => {
//   loadingSearchIcon.value = true;
//   setTimeout(() => {
//     loadingSearchIcon.value = false;
//   });
// });

onMounted(async () => {
  console.log("props.warehouseId in onMounted:", warehouseId);
  if (warehouseId) {
    await reloadTableData(warehouseId);
  }
});

const reloadTableData = async (warehouseId) => {
  console.log("Fetching raw materials for warehouse ID:", warehouseId);
  try {
    loading.value = true;
    const response =
      await warehouseRawMaterialsStore.fetchWarehouseRawMaterials(warehouseId);
    warehouseRawMaterialsRows.value = response;
    if (!warehouseRawMaterialsRows.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("Warehouse Raw Materialsss", warehouseRawMaterialsRows.value);
  } catch (error) {
    console.log("Error fetching warehouse product:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

const getRawMaterialBadgeColor = (row) => {
  const totalQuantity = row.total_quantity;
  const unit = row.raw_materials.unit;
  console.log("unit test", unit);
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
    } else if (stockValue <= 3) {
      return "bg-warning";
    } else {
      return "bg-warning";
    }
  } else {
    return "bg-positive";
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

// const formatTotalQuantity = (row) => {
//   const totalQuantity = row?.total_quantity || 0;
//   const unit = row?.unit || "units"; // Assuming `row.unit` contains the original unit (defaulting to 'units' if not present)

//   console.log("totalQuantity:", totalQuantity);
//   console.log("unit:", unit);

//   const formatNumber = (value) =>
//     Number.isInteger(value) ? value : parseFloat(value.toFixed(2));

//   // Convert to kilos if total quantity exceeds 1000
//   if (totalQuantity > 1000) {
//     const totalQuantityKilo = totalQuantity / 1000;

//     // If kilos are 25 or above, change unit to sacks
//     if (totalQuantityKilo >= 25) {
//       const sacks = totalQuantityKilo / 25;
//       return `${formatNumber(sacks)} sacks`;
//     }

//     // Return in kilos otherwise
//     return `${formatNumber(totalQuantityKilo)} kilos`;
//   } else if (totalQuantity > 1) {
//     return `${formatNumber(totalQuantity)} ${unit}`;
//   } else {
//     return `${formatNumber(totalQuantity)} ${unit}`;
//   }
// };
const rawMaterialsColumns = [
  {
    name: "name",
    label: "Ingredients Name",
    align: "center",
    field: (row) => row?.raw_materials?.name || "N/A",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "availableStocks",
    align: "center",
    label: "Available Stocks",
    field: "total_quantity",
    sortable: true,
  },
];
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
  max-height: 400px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}
</style>
