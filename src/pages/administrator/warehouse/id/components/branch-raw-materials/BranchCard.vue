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
    <div v-else class="q-pa-lg row q-col-gutter-lg">
      <div
        v-for="branchReport in branchReports"
        :key="branchReport.branch_id"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="branch-card cursor-pointer" @click="handleBranchDialog(branchReport)">
          <q-card-section class="text-center q-pa-xl bg-grey-1 relative-position">
            <div class="card-accent bg-primary"></div>
            <q-avatar
              size="100px"
              font-size="42px"
              color="white"
              text-color="primary"
              class="shadow-5 branch-avatar"
            >
              {{ branchReport.branch_name.charAt(0).toUpperCase() }}
            </q-avatar>
          </q-card-section>
          
          <q-separator />

          <q-card-section class="text-center q-pa-md">
            <div class="text-h6 text-weight-bolder text-grey-9 text-capitalize">
              {{ branchReport.branch_name }}
            </div>
            <div class="row items-center justify-center q-gutter-x-sm q-mt-xs">
              <q-badge rounded color="blue-1" text-color="blue-8" class="text-weight-bold">
                {{ branchReport.reports.length }} Materials
              </q-badge>
              <q-badge rounded color="green-1" text-color="green-8" label="Active" class="text-weight-bold" />
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
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter } = typographyFormat();

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
      getRawMaterialBadgeColorForStocks,
      getBadgeCategoryColor,
      formatTotalQuantity,
    },
  });
};
const getRawMaterialBadgeColorForStocks = (row) => {
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
.branch-card {
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12) !important;
    
    .branch-avatar {
      transform: scale(1.1);
    }
  }
}

.branch-avatar {
  transition: transform 0.3s ease;
  border: 4px solid #fff;
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.data-error {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #64748b;
}

.skeleton-card {
  border-radius: 20px;
}
</style>
