<template>
  <q-btn
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
    @click="openEditForm"
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
  <q-dialog
    v-model="dialog"
    persistent
    transition-show="jump-up"
    transition-hide="jump-down"
  >
    <q-card
      class="my-card q-pa-none"
      style="
        width: 420px;
        border-radius: 16px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
      "
    >
      <q-card-section
        class="row items-center q-px-md q-py-sm bg-gradient text-white"
      >
        <div class="text-h5 q-mr-md">🏭 Edit Warehouse</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-separator class="separator-gradient" />
      <q-card-section class="q-px-xl q-pt-none q-pb-lg">
        <div class="q-mt-lg q-animated q-animate-bounce">
          <div>Name of Warehouse</div>
          <q-input v-model="editWarehouseForm.name" outlined dense />
        </div>
        <div class="q-mt-md q-animated q-animate-bounce">
          <div>Location</div>
          <q-input v-model="editWarehouseForm.location" outlined dense />
        </div>
        <div class="q-mt-md q-animated q-animate-bounce">
          <div>Person In-charge</div>
          <q-input v-model="editWarehouseForm.person_incharge" outlined dense />
        </div>
        <div class="row q-gutter-x-sm q-mt-md">
          <div class="col-6 q-animated q-animate-bounce">
            <div>Phone Number</div>
            <q-input
              v-model="editWarehouseForm.phone"
              outlined
              dense
              mask="(+63) ### - ### - ####"
              placeholder="(+63)### - ### - ####"
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="col-5 q-animated q-animate-bounce">
            <div>Status</div>
            <q-select
              v-model="editWarehouseForm.status"
              outlined
              dense
              :options="statusOptions"
              behavior="menu"
            />
          </div>
        </div>
      </q-card-section>
      <!-- <q-separator /> -->
      <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Save"
          @click="saveEditedWarehouse"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { useWarehousesStore } from "src/stores/warehouse";
import { ref, reactive } from "vue";

const warehouseStore = useWarehousesStore();
const dialog = ref(false);

const statusOptions = ["Open", "Closed"];
const props = defineProps(["edit"]);

const editWarehouseForm = reactive({
  name: "",
  location: "",
  person_incharge: "",
  phone: "",
  status: null,
});

const openEditForm = () => {
  Object.assign(editWarehouseForm, props.edit.row);
  dialog.value = true;
};

const saveEditedWarehouse = async () => {
  try {
    const updatedWarehouse = { ...props.edit.row, ...editWarehouseForm };
    await warehouseStore.updateWarehouses(props.edit.row.id, updatedWarehouse);
    dialog.value = false;
  } catch (error) {
    console.error("Failed to update ingredients:", error);
  }
};
</script>

<style scoped>
.my-card {
  background: #ffffff;
  animation: fadeIn 0.3s ease;
}

.btn-add {
  background: linear-gradient(45deg, #42a5f5, #478ed1);
  color: #fff;
  font-weight: bold;
}

.bg-gradient {
  background: linear-gradient(135deg, #00bfa5, #00796b);
}

.separator-gradient {
  background: linear-gradient(90deg, #00bfa5, #00796b);
}

.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-cancel {
  background: linear-gradient(45deg, #ef5350, #e53935);
  color: #fff;
  font-weight: bold;
}

.btn-create {
  background: linear-gradient(45deg, #66bb6a, #43a047);
  color: #fff;
  font-weight: bold;
}

.q-animate-bounce {
  animation: bounceIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
