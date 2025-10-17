<template>
  <q-page class="q-pa-md bg-grey-2">
    <div>
      <q-tabs
        v-model="tab"
        dense
        outline
        flat
        no-caps
        inline-label
        class="user-tab justify-center q-ma-md"
        align="justify"
        active-color="teal"
        indicator-color="teal"
      >
        <q-tab class="text-grey-7" name="delivery">
          <div class="q-pa-md q-gutter-sm flex flex-column items-center">
            <q-icon />
            <div class="text-weight-bold">Create Delivery</div>
          </div>
        </q-tab>
        <q-tab
          class="text-grey-7"
          name="supplier_history"
          label="Supplier History"
        />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="delivery">
          <CreateDeliveryTab />
        </q-tab-panel>
        <q-tab-panel name="supplier_history">
          <SupplierHistoryTab />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CreateDeliveryTab from "./CreateDeliveryTab.vue";
import SupplierHistoryTab from "./SupplierHistoryTab.vue";

const tab = ref("supplier_history");
</script>

<style scoped>
.user-tab {
  height: 100%;
  border-radius: none;
  background: #fff;
  color: #333;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
