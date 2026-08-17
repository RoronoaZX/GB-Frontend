<template>
  <q-page class="elegant-container" flat>
    <!-- Header with Tabs -->
    <q-card-section class="row justify-between items-center q-pb-none">
      <div class="row items-center q-gutter-sm">
        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey-7 bg-white shadow-1 rounded-borders"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="catalog" icon="inventory_2" label="Master Products Catalog" />
          <q-tab name="resale" icon="point_of_sale" label="Resale Pricing & Margins" />
        </q-tabs>
      </div>

      <div v-if="activeTab === 'catalog'">
        <ProductCreate />
      </div>
    </q-card-section>

    <!-- Tab Panels -->
    <q-tab-panels v-model="activeTab" animated class="bg-transparent q-mt-md">
      <!-- Master Catalog Tab -->
      <q-tab-panel name="catalog" class="q-pa-none">
        <q-card flat class="q-pa-md bg-white shadow-1 rounded-borders">
          <div class="row justify-between items-center q-mb-md">
            <div class="text-subtitle1 text-weight-bold text-grey-9">
              Global Products Master List
            </div>
            <div class="q-gutter-x-xs">
              <q-badge label="Bread" class="text-white" color="brown-13" />
              <q-badge label="Selecta" class="text-white" color="red-6" />
              <q-badge label="Softdrinks" class="text-white" color="accent" />
              <q-badge label="Nestle" class="text-white" color="brown-7" />
              <q-badge label="Other" class="text-white" color="blue-grey-7" />
            </div>
          </div>
          <ProductTable />
        </q-card>
      </q-tab-panel>

      <!-- Resale Pricing & Profit Margin Analysis Tab -->
      <q-tab-panel name="resale" class="q-pa-none">
        <ResalePricingPanel @open-ledger="handleOpenLedger" />
      </q-tab-panel>
    </q-tab-panels>

    <!-- Product Movement & 3-Stage Audit Ledger Dialog (Task 4.4) -->
    <ProductMovementLedger
      v-if="selectedProductForLedger"
      v-model="ledgerDialogVisible"
      :branch-id="selectedProductForLedger.branch_id"
      :product-id="selectedProductForLedger.product_id"
      :product-name="selectedProductForLedger.product_name"
      :category="selectedProductForLedger.category"
    />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ProductCreate from "./components/ProductCreate.vue";
import ProductTable from "./components/ProductTable.vue";
import ResalePricingPanel from "./components/ResalePricingPanel.vue";
import ProductMovementLedger from "./components/ProductMovementLedger.vue";

const activeTab = ref("catalog");
const ledgerDialogVisible = ref(false);
const selectedProductForLedger = ref(null);

const handleOpenLedger = (productRow) => {
  selectedProductForLedger.value = productRow;
  ledgerDialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 1.5rem;
  border-radius: 8px;
}

.rounded-borders {
  border-radius: 12px;
}
</style>
