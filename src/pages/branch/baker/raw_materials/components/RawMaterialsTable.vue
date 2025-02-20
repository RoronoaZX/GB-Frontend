<template>
  <div class="q-gutter-md">
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
          <q-spinner v-else />
        </template>
      </q-input>
    </div>

    <div class="table-container">
      <q-table
        class="sticky-header"
        :filter="filter"
        :virtual-scroll-sticky-size-start="48"
        flat
        style="height: 350px"
        :columns="rawMaterialsStatusColumns"
        :rows="filteredRows"
        row-key="name"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        hide-bottom
      >
        <template v-slot:body-cell-total_quantity="props">
          <q-td :props="props">
            <q-chip
              square
              class="text-white"
              :class="getRawMaterialBadgeColor(props.row)"
            >
              {{ formatTotalQuantity(props.row) }}
            </q-chip>
          </q-td>
        </template>
      </q-table>
      <div
        v-if="loading"
        class="loading-overlay row justify-center items-center"
      >
        <q-spinner size="50px" />
      </div>
      <div
        v-if="showNoDataMessage"
        class="q-pa-md q-gutter-md row justify-center"
      >
        <q-banner class="bg-grey-1" dense> No data available </q-banner>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBakerReportsStore } from "src/stores/baker-report";
import { computed, onMounted, ref, watch } from "vue";

const pagination = ref({
  rowsPerPage: 0,
});
const filter = ref("");
const loadingSearchIcon = ref(false);
const loading = ref(true);
const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
console.log("userData in RawMaterialsTable:", userData.value);
const branchId = userData.value?.device?.reference_id || "";
console.log("branchId in RawMaterialsTable:", branchId);
const rawMaterialsRow = computed(() => bakerReportStore.rawmaterials);
const showNoDataMessage = ref(false);

watch(filter, async (newFilter) => {
  loadingSearchIcon.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loadingSearchIcon.value = false;
  showNoDataMessage.value = !loading.value && filteredRows.value.length === 0;
  console.log("Filtered Rows:", filteredRows.value);
});

onMounted(async () => {
  console.log("props.branchId in onMounted:", branchId);
  if (branchId) {
    await reloadTableData(branchId);
  }
});

const reloadTableData = async (branchId) => {
  console.log("Fetching products for branch ID:", branchId);
  try {
    loading.value = true;
    const response = await bakerReportStore.fetchBranchRawMaterials(branchId);
    rawMaterialsRow.value = response;
    if (!rawMaterialsRow.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("Branch Raw Materials", rawMaterialsRow.value);
  } catch (error) {
    console.log("Error fetching branch product:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

const filteredRows = computed(() => {
  if (!filter.value) {
    return rawMaterialsRow.value;
  }
  const filterText = filter.value.toLowerCase();
  return rawMaterialsRow.value.filter((row) =>
    row.ingredients.code.toLowerCase().includes(filterText)
  );
});

const rawMaterialsStatusColumns = [
  {
    name: "code",
    label: "Code",
    align: "center",
    field: (row) => row?.ingredients?.code ?? "No Code",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "total_quantity",
    align: "center",
    label: "Available Stocks",
    field: "total_quantity",
    sortable: true,
  },
];

const getRawMaterialBadgeColor = (row) => {
  const totalQuantity = row.total_quantity;
  const unit = row.ingredients.unit;
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
  const totalQuantity = row.total_quantity;
  const unit = row.ingredients.unit;

  if (totalQuantity > 1000) {
    const totalQuantityKilo = (totalQuantity / 1000).toFixed(2);
    if (totalQuantityKilo.endsWith(".00")) {
      return `${Math.round(totalQuantity / 1000)} kilos`;
    } else {
      return `${totalQuantityKilo} kilos`;
    }
  } else if (totalQuantity > 1) {
    return `${totalQuantity} ${unit}`;
  } else {
    return `${totalQuantity} ${unit}`;
  }
};
</script>

<style scoped>
.table-container {
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
}
</style>
