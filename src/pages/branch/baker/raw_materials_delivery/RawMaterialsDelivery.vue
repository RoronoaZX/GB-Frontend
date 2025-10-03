<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="local_shipping" />
        Raw Materials Delivery
      </div>
    </q-card-section>
    <q-card-section class="q-gutter-y-md">
      <div>
        <RawMaterialsDeliveryTable />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import RawMaterialsDeliveryTable from "./components/RawMaterialsDeliveryTable.vue";
</script>
