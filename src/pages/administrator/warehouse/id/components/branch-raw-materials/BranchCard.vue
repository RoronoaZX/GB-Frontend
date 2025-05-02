<template>
  <div class="q-pa-md elegant-container">
    <!-- Skeleton loading -->
    <div v-if="loading" class="skeleton-wrapper row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="n in 8" :key="n">
        <q-card class="user-card skeleton-card">
          <q-skeleton height="200px" class="q-mb-md" />
          <q-card-section class="text-center">
            <q-skeleton type="text" width="60%" class="q-mt-lg" />
            <q-skeleton type="text" width="40%" class="q-mt-sm" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- No data message -->
    <div v-else-if="showNoDataMessage" class="data-error">
      <q-icon name="error" size="50px" color="negative" />
      <div>No data available</div>
    </div>

    <!-- Branch cards -->
    <div v-else class="q-pa-md row q-col-gutter-md">
      <div
        v-for="branchReport in branchReports"
        :key="branchReport.branch_id"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="user-card" @click="handleBranchDialog(branchReport)">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-card-section class="text-center">
            <div class="q-mt-lg">
              <div
                class="text-h6 text-weight-medium elegant-name text-capitalize"
              >
                {{ capitalizeFirstLetter(branchReport.branch_name) }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useQuasar } from "quasar";
import { useWarehousesStore } from "src/stores/warehouse";
import { useRoute } from "vue-router";
import DialogPage from "./components/DialogPage.vue";

const route = useRoute();
const warehouseStore = useWarehousesStore();
const $q = useQuasar();

const branchReports = computed(() => warehouseStore.warehouseBranchReports);
const loading = ref(false);
const warehouseID = computed(() => route.params.warehouse_id || null);
const showNoDataMessage = ref(false);

const props = defineProps(["branchRawMaterialsReport"]);

const handleBranchDialog = (branchReport) => {
  $q.dialog({
    component: DialogPage,
    componentProps: {
      branchReport: branchReport,
      // dialogOpen: dialogOpen,
      // selectedBranch: branchReport,
      // tableColumns: tableColumns,
      getRawMaterialBadgeColor,
      getBadgeCategoryColor,
      formatTotalQuantity,
      capitalizeFirstLetter,
    },
  });
};
const getRawMaterialBadgeColor = (row) => {
  const totalQuantity = row.quantity;
  const unit = row.raw_material.unit;
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

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "Ingredients":
      return "teal";
    case "Packaging Materials":
      return "brown-6";
    default:
      return "grey";
  }
};
const formatTotalQuantity = (row) => {
  const totalQuantity = row.quantity;
  const unit = row.raw_material.unit;

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

// Fetch branch reports
watch(
  warehouseID,
  async (id) => {
    if (id) {
      try {
        loading.value = true;
        await warehouseStore.fetchWarehouseByBranchID(id);
        showNoDataMessage.value = branchReports.value.length === 0;
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
        showNoDataMessage.value = true;
      } finally {
        loading.value = false;
      }
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.user-card {
  height: 300px; /* Fixed height for all cards */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.elegant-name {
  font-size: clamp(14px, 2vw, 20px); /* Adjust based on card width */
  line-height: 1.2;
  word-break: break-word;
  overflow-wrap: break-word;
  padding: 0 8px;
}

.user-card img {
  height: 180px;
  object-fit: cover;
}
</style>
