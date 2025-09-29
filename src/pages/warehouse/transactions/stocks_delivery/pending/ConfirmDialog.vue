<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-pa-md q-rounded q-elevate-2 bg-white text-grey-9">
      <q-card-section class="q-pt-none q-pb-sm">
        <div class="text-h5 q-mb-xs">Confirm Report</div>
        <p>Are you sure you want to confirm this report?</p>
      </q-card-section>
      <q-separator class="q-mb-md" />
      <q-card-section>
        <q-card-actions align="right" class="q-pt-none">
          <q-btn
            flat
            dense
            label="No"
            color="primary"
            v-close-popup
            class="q-mr-sm"
          />
          <q-btn
            dense
            label="Yes! Confirm"
            color="positive"
            class="q-btn-rounded q-px-lg"
            @click="confirmSave"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const confirmSave = () => {
  onDialogOK(); // ✅ tells parent "Yes"
};
</script>

<style scoped>
.q-card {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.q-card-section {
  padding: 24px 32px;
}

.q-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.q-btn-rounded {
  border-radius: 50px;
}

.q-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.q-btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.text-h5 {
  font-weight: 600;
}

.text-body2 {
  color: #666;
}

.q-elevate-2 {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.bg-white {
  background-color: #fff;
}

.text-grey-9 {
  color: #333;
}

.q-separator {
  border-color: #eee;
}
</style>
