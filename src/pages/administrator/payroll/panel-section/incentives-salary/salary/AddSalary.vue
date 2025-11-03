<template>
  <q-btn
    label="Add Salary Type"
    rounded
    class="gradient-btn q-px-lg q-py-sm text-capitalize text-white"
    @click="openDialog"
  />
  <q-dialog v-model="dialog">
    <q-card class="dialog-card q-pa-md">
      <q-card-section class="row items-center q-pb-md">
        <div class="text-h6 text-weight-bold text-primary">
          Salary Type and Equivalent
        </div>
        <q-space />
        <q-btn icon="close" flat round v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <q-select />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const salaryOptions = [""];
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(135deg, #c68900, #926400);
  // box-shadow: 0 2px 8px rgba(19, 141, 163, 0.711);
  transition: all 0.3s ease;
}

.dialog-card {
  width: 450px;
  max-width: 90vw;
  border-radius: 12px;
  background-color: #f7f8fc;
}

.q-card-section.row.items-center {
  border-bottom: 1px solid #e0e0e0;
}
</style>
