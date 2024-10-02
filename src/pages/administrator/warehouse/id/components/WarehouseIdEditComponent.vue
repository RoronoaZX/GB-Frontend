<template>
  <q-btn
    @click="open_edit_bread_dialog"
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
  <q-dialog v-model="editBreadDialogVisible">
    <q-card class="my-card" style="width: 400px">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Edit Transaction</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>

      <!-- <q-separator /> -->
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn class="glossy" color="teal" label="Save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";

const editBreadDialogVisible = ref(false);

const open_edit_bread_dialog = () => {
  editBreadDialogVisible.value = true;
};
const editBreadForm = reactive({
  breadName: "",
  price: "",
});
</script>
