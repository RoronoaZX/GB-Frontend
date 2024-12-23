<template>
  <div>
    <q-input
      rounded
      outlined
      dense
      debounce="300"
      v-model="filter"
      placeholder="Search"
      style="width: 500px; max-width: 1500px; min-width: 100px"
    >
      <template v-slot:append>
        <q-icon v-if="!loadingSearchIcon" name="search" />
        <q-icon v-else :thickness="2" color="teal" size="1em" />
      </template>
    </q-input>
  </div>
  <div>
    <q-table
      :filter="filter"
      flat
      :columns="rawMaterialsColumns"
      :rows="warehouseRawMaterialsRows"
      row-key="name"
      virtual-scroll
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

watch(filter, () => {
  loadingSearchIcon.value = true;
  setTimeout(() => {
    loadingSearchIcon.value = false;
  });
});

onMounted(async () => {
  console.log("props.warehouseId in onMounted:", warehouseId);
  if (warehouseId) {
    await reloadTableData(warehouseId);
  }
});

const reloadTableData = async (warehouseId) => {
  console.log("Fetching raw materials for warehouse ID:", warehouseId);
  try {
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
  const unit = row.raw_materials.unit || "grams"; // Default to "grams" if no unit is provided

  // Determine the display unit
  let displayUnit = "grams"; // Default unit
  let stockValue = totalQuantity; // Default stock value

  if (totalQuantity >= 1000) {
    const totalQuantityKilo = totalQuantity / 1000;

    if (totalQuantityKilo >= 25) {
      // If totalQuantityKilo is 25 or more, treat as sacks
      displayUnit = "sacks";
      stockValue = totalQuantityKilo / 25; // Convert to sacks
    } else {
      // Otherwise, treat as kilos
      displayUnit = "kilos";
      stockValue = totalQuantityKilo; // Keep in kilos
    }
  }

  // Badge color logic based on the display unit
  if (displayUnit === "grams") {
    return totalQuantity < 1000 ? "bg-red" : "bg-warning";
  } else if (displayUnit === "kilos") {
    if (stockValue < 5) {
      return stockValue <= 2 ? "bg-red" : "bg-warning";
    }
    return "bg-positive";
  } else if (displayUnit === "sacks") {
    if (stockValue <= 2) {
      return "bg-grey-10"; // Low stock for sacks
    } else if (stockValue < 5) {
      return "bg-warning"; // Medium stock for sacks
    }
    return "bg-grey-10"; // High stock for sacks
  }

  // Fallback (just in case)
  return "bg-neutral";
};

const formatTotalQuantity = (row) => {
  const totalQuantity = row.total_quantity;
  const unit = row.unit || "units"; // Assuming `row.unit` contains the original unit (defaulting to 'units' if not present)

  console.log("totalQuantity:", totalQuantity);
  console.log("unit:", unit);

  const formatNumber = (value) =>
    Number.isInteger(value) ? value : parseFloat(value.toFixed(2));

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
  } else if (totalQuantity > 1) {
    return `${formatNumber(totalQuantity)} ${unit}`;
  } else {
    return `${formatNumber(totalQuantity)} ${unit}`;
  }
};
const rawMaterialsColumns = [
  {
    name: "name",
    label: "Ingredients Name",
    align: "center",
    field: (row) => row.raw_materials.name,
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
