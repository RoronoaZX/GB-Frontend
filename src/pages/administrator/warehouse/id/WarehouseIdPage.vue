<template>
  <q-page class="q-pa-lg bg-grey-2">
    <div class="row items-center q-mb-lg">
      <q-btn
        flat
        round
        dense
        icon="arrow_back"
        color="primary"
        to="/admin/warehouse"
        class="q-mr-md"
      />
      <div>
        <div class="text-h4 text-weight-bolder text-grey-9">
          {{ capitalizeFirstLetter(warehouseName) }}
        </div>
        <div class="row items-center text-grey-6">
          <q-icon name="factory" size="xs" class="q-mr-xs" />
          <span>Warehouse ID: {{ warehouseId }}</span>
        </div>
      </div>
    </div>

    <!-- Warehouse Status & Info Bar -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12">
        <q-card flat bordered class="bg-white rounded-borders-lg shadow-1">
          <q-card-section class="row items-center q-gutter-xl">
            <div class="row items-center">
              <q-icon name="place" color="red-5" size="md" class="q-mr-sm" />
              <div>
                <div class="text-caption text-grey-7">Location</div>
                <div class="text-subtitle2">{{ warehouse?.location || 'Processing...' }}</div>
              </div>
            </div>
            <div class="row items-center">
              <q-icon name="account_circle" color="blue-5" size="md" class="q-mr-sm" />
              <div>
                <div class="text-caption text-grey-7">Manager / In-charge</div>
                <div class="text-subtitle2">
                  {{ warehouse?.employees ? (warehouse.employees.firstname + ' ' + warehouse.employees.lastname) : 'N/A' }}
                </div>
              </div>
            </div>
            <div class="row items-center">
              <q-icon name="phone" color="green-5" size="md" class="q-mr-sm" />
              <div>
                <div class="text-caption text-grey-7">Contact Number</div>
                <div class="text-subtitle2">{{ warehouse?.phone || 'N/A' }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="q-gutter-y-md">
      <q-tabs
        v-model="tab"
        dense
        no-caps
        inline-label
        class="text-grey-7 bg-transparent"
        active-color="primary"
        indicator-color="primary"
        align="left"
      >
        <q-tab name="warehouseRawMaterials" icon="inventory" label="Warehouse Inventory" />
        <q-tab name="branchRawMaterials" icon="storefront" label="Branch Distribution" />
        <q-tab name="transactions" icon="history_edu" label="Transaction History" />
      </q-tabs>

      <q-card flat bordered class="shadow-2 rounded-borders-lg">
        <q-tab-panels v-model="tab" animated class="bg-transparent">
          <q-tab-panel name="warehouseRawMaterials" class="q-pa-none">
            <WarehouseRawMaterialsPage />
          </q-tab-panel>
          <q-tab-panel name="branchRawMaterials" class="q-pa-none">
            <BranchCard />
          </q-tab-panel>
          <q-tab-panel name="transactions" class="q-pa-none">
            <TransactionWarehouse />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import WarehouseRawMaterialsPage from "./components/warehouse-raw-materials/WarehouseRawMaterialsPage.vue";
import BranchCard from "./components/branch-raw-materials/BranchCard.vue";
import { useRoute } from "vue-router";
import { useWarehousesStore } from "src/stores/warehouse";
import { api } from "src/boot/axios";
import TransactionWarehouse from "./components/transaction-raw-materials/TransactionsWarehouse.vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter } = typographyFormat();

const route = useRoute();
const warehouseStore = useWarehousesStore();
const warehouseName = ref("");
const warehouse = computed(() => warehouseStore.warehouse);
const warehouseId = computed(() => route.params.warehouse_id || "Unknown");

const tab = ref("warehouseRawMaterials");

const fetchWarehouseData = async () => {
  try {
    const res = await api.get(`/api/warehouse/${warehouseId.value}`);
    if (res.data) {
      warehouseName.value = res.data.name;
      warehouseStore.warehouse = res.data; // Sync with store
    }
  } catch (error) {
    console.error("Error fetching warehouse data:", error);
  }
};

onMounted(() => {
  fetchWarehouseData();
});
</script>

<style scoped>
.rounded-borders-lg {
  border-radius: 16px;
}

:deep(.q-tab-panel) {
  background-color: transparent !important;
}

.bg-grey-2 {
  background-color: #f4f7f6 !important;
}
</style>
