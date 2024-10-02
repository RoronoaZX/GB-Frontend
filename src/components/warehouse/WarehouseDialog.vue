<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent="">
    <q-card class="my-card" style="width: 400px">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Add New Warehouse</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div>
          <div>Name of Warehouse</div>
          <q-input
            v-model="addForm.name"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div>Location</div>
          <q-input
            v-model="addForm.location"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div>Person In-charge</div>
          <q-input
            v-model="addForm.person_incharge"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div class="row q-gutter-x-sm">
          <div class="col-6">
            <div>Phone Number</div>
            <q-input
              v-model="addForm.phone"
              outlined
              dense
              mask="(+63) ### - ### - ####"
              placeholder="(+63)### - ### - ####"
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="col-5">
            <div>Status</div>
            <q-select
              v-model="addForm.status"
              outlined
              dense
              :options="warehouseStatus"
              hide-dropdown-icon
              behavior="menu"
            />
          </div>
        </div>
      </q-card-section>
      <!-- <q-separator /> -->
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Cancel" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Create"
          @click="addWarehouse"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { useWarehousesStore } from "src/stores/warehouse";
import { reactive } from "vue";
defineEmits([...useDialogPluginComponent.emits]);
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const warehouseStore = useWarehousesStore();
const warehouseStatus = ["Open", "Close"];
const addForm = reactive({
  name: "",
  location: "",
  person_incharge: "",
  phone: "",
  status: null,
});

const addWarehouse = async () => {
  const res = await warehouseStore.createWarehouses(addForm);
  if (res) {
    onDialogOK();
  }
};
</script>
