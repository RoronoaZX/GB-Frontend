<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 500px">
      <h2>Reportssssss</h2>
      {{ reports }}
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports"]);

console.log("products report", props);
</script>
