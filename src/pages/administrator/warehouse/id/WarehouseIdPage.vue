<template>
  <q-page padding>
    <div class="elegant-container q-gutter-md">
      <div class="text-h6 row justify-between">
        <div>
          <q-btn
            outline
            flat
            icon="arrow_back"
            to="/admin/warehouse"
            @click="navigateBack"
          />
          <q-space />
        </div>
        <div>
          <q-icon name="factory" />
          {{ capitalizeFirstLetter(warehouseName) }}
        </div>
      </div>
      <div class="q-gutter-sm">
        <div class="tab-container">
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-2 text-grey-7 tabs-as-cards"
            active-color="red-6"
            indicator-color="transparent"
            align="justify"
          >
            <q-tab
              name="warehouseRawMaterials"
              label="Warehouse Raw Materials"
            />
            <q-tab name="branchRawMaterials" label="Branch Raw Materials" />
            <!-- <q-tab name="transactions" label="Transactions" /> -->
          </q-tabs>
        </div>
        <q-card class="q-mt-sm">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="warehouseRawMaterials">
              <WarehouseRawMaterialsPage />
            </q-tab-panel>
            <q-tab-panel name="branchRawMaterials">
              <BranchCard />
            </q-tab-panel>

            <!-- <q-tab-panel name="transactions">
              <TransactionWarehouse />
            </q-tab-panel> -->

            <!-- <q-tab-panel name="recipe">
              <RecipePage />
            </q-tab-panel>

            <q-tab-panel name="production">
              <ProductionPage />
            </q-tab-panel> -->
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import WarehouseRawMaterialsPage from "./components/warehouse-raw-materials/WarehouseRawMaterialsPage.vue";
import BranchCard from "./components/branch-raw-materials/BranchCard.vue";
import { useRoute, useRouter } from "vue-router";
import { useWarehousesStore } from "src/stores/warehouse";
import { api } from "src/boot/axios";
import TransactionWarehouse from "./components/transaction-raw-materials/TransactionsWarehouse.vue";

const route = useRoute();
const router = useRouter();
const warehouseStore = useWarehousesStore();
const warehouseName = ref("");
const warehouse = computed(() => warehouseStore.warehouse);
// const warehouseName = warehouse.value.name;
const warehouseId = computed(
  () => route.params.warehouse_id || "Unknown Warehouse"
);

const tab = ref("warehouseRawMaterials");

// watch(
//   warehouseId,
//   async (id) => {
//     if (id) {
//       await warehouseStore.fetchCertainWarehouse(id);
//     }
//   },
//   {
//     immediate: true,
//   }
// );

const getWarehouseById = async (warehouseId) => {
  const res = await api.get(`/api/warehouse/${warehouseId}`);
  return res.data;
};

const fetchWarehouse = async () => {
  try {
    const warehouse = await getWarehouseById(warehouseId.value);
    if (warehouse && warehouse.name) {
      warehouseName.value = warehouse.name;
    } else {
      console.error("Warehouse name data is missing", warehouse);
    }
  } catch (error) {
    console.error("Error fetching warehouse data:", error);
  }
};
onMounted(() => {
  fetchWarehouse();
});

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
const navigateBack = () => {
  Loading.show();
  router.push("/admin/warehouse").finally(() => {
    Loading.hide();
  });
};
</script>

<style scoped>
.q-tabs--not-scrollable .q-tabs__content,
body.mobile .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__content {
  overflow: visible;
}
.tabs-as-cards {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
}

.tabs-as-cards .q-tab {
  background-color: white;
  color: #333;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin: 0 8px;
  padding: 10px 20px;
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.tabs-as-cards .q-tab:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.tabs-as-cards .q-tab--active {
  background-color: #e0e0e0;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.tab-content {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
