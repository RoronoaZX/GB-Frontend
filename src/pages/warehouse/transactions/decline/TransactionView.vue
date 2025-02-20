<template>
  <div>
    <q-btn
      color="accent"
      icon="visibility"
      size="md"
      flat
      round
      dense
      @click="openDialog"
    />
    <q-dialog v-model="dialog">
      <h1>Confirmed transaction</h1>
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
