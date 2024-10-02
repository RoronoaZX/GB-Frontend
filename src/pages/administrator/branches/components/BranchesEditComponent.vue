<template>
  <q-btn
    @click="openEditForm"
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
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
        <div class="text-h5 q-mr-md">🏪 Edit Branch</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-separator class="separator-gradient" />
      <q-card-section class="q-px-xl q-pt-none q-pb-lg">
        <div class="q-mt-lg q-animated q-animate-bounce">
          <div>Name of Branch</div>
          <q-input v-model="editBranchesForm.name" outlined dense />
        </div>
        <div class="q-mt-lg q-animated q-animate-bounce">
          <div>Location</div>
          <q-input v-model="editBranchesForm.location" outlined dense />
        </div>
        <div class="q-mt-lg q-animated q-animate-bounce">
          <div>Person In-charge</div>
          <q-input v-model="editBranchesForm.person_incharge" outlined dense />
        </div>
        <div class="q-mt-lg q-animated q-animate-bounce">
          <div>Under Warehouse</div>
          <q-select
            v-model="editBranchesForm.warehouse_id"
            use-input
            input-debounce="0"
            :options="warehouses"
            stack-label
            outlined
            dense
            emit-value
            map-options
            option-label="name"
            option-value="id"
          />
        </div>
        <div class="row q-gutter-x-sm justify-between q-mt-sm">
          <div class="col-6 q-animated q-animate-bounce">
            <div>Phone Number</div>
            <q-input
              v-model="editBranchesForm.phone"
              outlined
              dense
              mask="(+63) ### - ### - ####"
              placeholder="(+63) ### - ### - ####"
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="col-5 q-animated q-animate-bounce">
            <div>Status</div>
            <q-select
              v-model="editBranchesForm.status"
              outlined
              dense
              :options="statusOptions"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Save"
          @click="saveEditedBranches"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { reactive, ref, onMounted, computed } from "vue";
import { useWarehousesStore } from "src/stores/warehouse";
import { useBranchesStore } from "src/stores/branch";

const branchesStore = useBranchesStore();
const warehousesStore = useWarehousesStore();
const warehouses = computed(() => warehousesStore.warehouses);
const props = defineProps(["edit"]);
const dialog = ref(false);
const warehouseOptions = ref([]);
let editRow = props.edit.row;
const statusOptions = ["Open", "Open soon", "Close"];

const editBranchesForm = reactive({
  name: "",
  location: "",
  person_incharge: "",
  warehouse_id: null,
  phone: "",
  status: null,
});

const openEditForm = () => {
  console.log("Edit Row Data:", editRow);
  editBranchesForm.name = editRow.name;
  editBranchesForm.location = editRow.location;
  editBranchesForm.person_incharge = editRow.person_incharge;
  editBranchesForm.warehouse_id = editRow?.warehouse_id
    ? editRow.warehouse_id
    : editRow?.warehouse?.id
    ? editRow?.warehouse?.id
    : "";
  editBranchesForm.phone = editRow.phone;
  editBranchesForm.status = editRow.status;
  dialog.value = true;
  console.log("Edit Data:", editBranchesForm);
};

const saveEditedBranches = async () => {
  try {
    await branchesStore.updateBranches(editRow.id, editBranchesForm);

    dialog.value = false;
  } catch (error) {
    console.error("Error updating branch:", error);
  }
};
</script>

<style scoped>
.my-card {
  background: #ffffff;
  animation: fadeIn 0.3s ease;
}

.btn-add {
  background: linear-gradient(45deg, #000000, #000000);
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
