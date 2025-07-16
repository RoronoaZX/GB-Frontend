<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section
        class="q-pa-md q-rounded q-elevate-2 bg-white text-grey-9"
      >
        <div class="text-h5 q-mb-xs">Confirm Deletion</div>
        <p class="text-body2 q-mb-none">
          Are you sure you want to delete holiday
          <span class="text-weight-bold">{{ holiday.name }}</span
          >? This action cannot be undone.
        </p>
      </q-card-section>
      <q-separator class="q-mb-md" />
      <q-card-section align="right" class="q-pt-none">
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
          @click="confirmDelete"
          class="q-btn-rounded q-px-lg"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Loading, Notify } from "quasar";
import { useHolidaysStore } from "src/stores/holidays";
import { ref } from "vue";

const holidaysStore = useHolidaysStore();

const emit = defineEmits(["refreshHolidays"]);

const dialog = ref(false);
const holiday = ref(null);

const openDialog = (data) => {
  holiday.value = data;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = true;
};

const confirmDelete = async () => {
  console.log("delete....");
  const id = holiday.value.id;
  Loading.show();

  try {
    await holidaysStore.deleteHoliday(id);
    emit("refreshHolidays");
    closeDialog();

    Notify.create({
      type: "positive",
      message: `${holiday.value.name} holiday deleted successfully!`,
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.log("delete holiday error: ", error);
  } finally {
    Loading.hide();
  }
};

defineExpose({ openDialog, closeDialog });
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
  color: #667;
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
