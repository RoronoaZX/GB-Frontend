<template>
  <q-btn
    class="bg-gradient text-white"
    outlined
    label="Added Bread"
    @click="openDialog"
  />

  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Added Bread Reports</div>
          <div>
            <q-btn icon="close" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-card-section> This is a bread </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";

const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
const branchId = userData?.device?.reference_id || "";
console.log("branch id", branchId);
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const maximizedToggle = ref(true);
</script>

<style lang="scss" scoped>
.bg-gradient {
  // background: linear-gradient(135deg, #6a11cb, #2575fc);
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  // background: linear-gradient(135deg, #8e44ad, #3498db);
}
</style>
