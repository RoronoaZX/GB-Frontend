<template>
  <div>
    <q-btn
      class="q-pa-sm"
      color="red"
      dense
      elevated
      icon-right="task_alt"
      label="Check Report"
      @click="openDialog"
    />
  </div>
  <div>
    <q-dialog v-model="dialog">
      <q-card>
        <h1>this is Selecta report dialog</h1>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
</script>

<style lang="scss" scoped></style>
