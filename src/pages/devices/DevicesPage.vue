<template>
  <q-page>
    <q-card class="elegant-container" flat>
      <q-card-section>
        <!-- class="row justify-between" -->
        <!-- <div class="text-h6 text-dark">📱 Device</div> -->
        <div align="right">
          <AddDevice />
        </div>
      </q-card-section>
      <q-card-section>
        <DeviceTable />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import AddDevice from "./section/AddDevice.vue";
import DeviceTable from "./section/DeviceTable.vue";
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
