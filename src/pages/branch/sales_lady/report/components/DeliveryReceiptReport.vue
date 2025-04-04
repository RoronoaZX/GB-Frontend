<template>
  <div>
    <q-btn
      class="bg-gradient text-white"
      outlined
      label="Delivery Receipt Report"
      @click="openDialog"
    />
  </div>
  <q-dialog v-model="dialog">
    <q-card style="width: 700px">
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Delivery Receipt</div>
          <div>
            <q-btn flat round dense icon="close" @click="closeBtn" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <WithReceiptExpenses />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import WithReceiptExpenses from "./expenses-report/WithReceiptExpenses.vue";

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const closeBtn = () => {
  dialog.value = false;
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  // background: linear-gradient(to right, #222, #ccc);
  // background: linear-gradient(to bottom, #555, #aaa);
  // background: linear-gradient(to right, #3a3a3a, #8a8a8a);
  // background: linear-gradient(to right, #3a3a3a, #8a8a8a);
  // background: linear-gradient(to bottom, #888, #ddd);
  background: linear-gradient(135deg, #1f1f1f, #6e6e6e);
  // background: linear-gradient(to bottom, #494949, #c2c2c2);
  // background: linear-gradient(90deg, #7a7a7a, #e0e0e0);
  // background: linear-gradient(to right, #1a1a1a, #9e9e9e);
}
</style>
