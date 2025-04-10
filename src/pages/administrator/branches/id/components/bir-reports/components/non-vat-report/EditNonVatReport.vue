<template>
  <div class="row justify-center q-gutter-x-md">
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
  </div>
  <q-dialog v-model="dialog">
    <q-card>
      {{ edit }}
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["edit"]);
console.log("EditNonVatReport", props.edit);

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
</script>

<style lang="scss" scoped></style>
