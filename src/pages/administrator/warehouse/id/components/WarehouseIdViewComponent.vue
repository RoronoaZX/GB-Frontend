<template>
  <q-btn
    @click="open_dialog"
    color="indigo"
    icon="visibility"
    size="sm"
    flat
    round
    dense
  >
    <q-tooltip class="bg-indigo" :delay="200">View</q-tooltip>
  </q-btn>
  <q-dialog v-model="dialog">
    <q-card>
      <h5>This is View dialog!</h5>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const open_dialog = () => {
  dialog.value = true;
};
</script>
