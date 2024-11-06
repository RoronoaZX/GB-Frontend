<template>
  <q-btn
    @click="deleteDialog"
    color="negative"
    icon="delete"
    size="sm"
    flat
    round
    dense
    aria-label="Delete"
  >
    <q-tooltip class="bg-negative" :delay="200">Delete</q-tooltip>
  </q-btn>

  <q-dialog v-model="dialogVisible" persistent>
    <q-card class="q-pa-md q-rounded q-elevate-2 bg-white text-grey-9">
      <q-card-section class="q-pt-none q-pb-sm">
        <div class="text-h5 q-mb-xs">Confirm Deletion</div>
        <p class="text-body2 q-mb-none">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
      </q-card-section>

      <q-separator class="q-mb-md" />

      <q-card-actions align="right" class="q-pt-none">
        <q-btn
          flat
          dense
          label="Cancel"
          color="primary"
          v-close-popup
          class="q-mr-sm"
        />
        <q-btn
          dense
          label="Delete"
          color="negative"
          @click="onDelete"
          class="q-btn-rounded q-px-lg"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRawMaterialsStore } from "src/stores/raw-material";
import { Notify } from "quasar";

const materialsStore = useRawMaterialsStore();
const dialogVisible = ref(false);

const deleteDialog = () => {
  dialogVisible.value = true;
};

const props = defineProps(["delete"]);
const originalData = props.delete.row;

const onDelete = async () => {
  try {
    await materialsStore.deleteRawMaterials(originalData.id);
    // Notify.create({
    //   message: "Item deleted successfully.",
    //   type: "positive",
    //   // position: "top-right",
    // });
  } catch (error) {
    Notify.create({
      message: `Failed to delete item: ${error.message}`,
      type: "negative",
      // position: "top-right",
    });
  }
  dialogVisible.value = false;
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
