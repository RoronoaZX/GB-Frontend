<template>
  <q-btn
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
    @click="openDialog"
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section> this is an Edit Card </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
</script>

<style lang="scss" scoped></style>
