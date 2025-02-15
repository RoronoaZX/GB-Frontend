<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="scale" />
        Premix
      </div>
    </q-card-section>
    <q-card-section class="q-gutter-y-md">
      <div>
        <RequestPremix />
      </div>
      <div>
        <PremixTable />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import PremixTable from "./components/PremixTable.vue";
import RequestPremix from "./components/RequestPremix.vue";
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #ff31c5, #471b3b);
}
</style>
