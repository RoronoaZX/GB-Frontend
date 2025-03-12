<template>
  <div>
    <q-btn
      outline
      icon="add_circle"
      label="Add Device"
      @click="openAddDeviceDialog"
      style="background-color: #ef4444"
    />
    <q-dialog
      v-model="addDeviceDialog"
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
        <q-card-section class="row items-center q-px-md q-py-sm bg-gradient text-white">
          <div class="text-h5 q-mr-md">📱 Add Device</div>
          <q-space />
          <q-btn icon="close" flat dense round v-close-popup />
        </q-card-section>

        <q-card-section class="q-px-xl q-pt-none q-pb-lg">
          <div class="q-mt-lg">
            <div>UUID</div>
            <q-input
              v-model="deviceForm.uuid"
              outlined
              dense
              :rules="[(val) => (val && val.length > 0) || 'Device UUID is required']"
            />
          </div>
          <div class="q-mt-md">
            <div>Name</div>
            <q-input
              class="text-capitalize"
              v-model="deviceForm.name"
              outlined
              dense
              :rules="[(val) => (val && val.length > 0) || 'Device Name is required']"
            />
          </div>
          <div class="q-mt-md">
            <div>Model</div>
            <q-input
              v-model="deviceForm.model"
              outlined
              dense
              :rules="[(val) => (val && val.length > 0) || 'Device Model is required']"
            />
          </div>
          <div class="q-mt-md">
            <div>OS Version</div>
            <q-input
              v-model="deviceForm.os_version"
              outlined
              dense
              :rules="[
                (val) => (val && val.length > 0) || 'Device OS Version is required',
              ]"
            />
          </div>

          <div class="q-gutter-x-lg">
            <q-checkbox
              keep-color
              v-model="selectedOption"
              label="Branch"
              color="red"
              :true-value="'branch'"
              :false-value="null"
            />
            <q-checkbox
              keep-color
              v-model="selectedOption"
              label="Warehouse"
              color="blue-grey-10"
              :true-value="'warehouse'"
              :false-value="null"
            />
          </div>

          <div v-if="selectedOption === 'branch'" class="q-mt-md">
            <div>Designation Branch</div>
            <q-input
              v-model="searchBranchKeyword"
              @update:model-value="searchBranch"
              outlined
              dense
              debounce="500"
              @focus="showDropdown = true"
            >
              <template v-slot:append>
                <q-icon v-if="!searchLoading" name="search" />
                <q-spinner v-else color="grey" size="sm" />
              </template>
              <div v-if="showDropdown && searchBranchKeyword" class="custom-list z-top">
                <q-card>
                  <q-list separator>
                    <q-item v-if="!branches?.length">No Branch Record</q-item>
                    <q-item
                      v-for="branch in branches"
                      :key="branch.id"
                      clickable
                      @click="autoFillBranch(branch)"
                    >
                      <q-item-section>{{ branch.name }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </q-input>
          </div>

          <div v-if="selectedOption === 'warehouse'" class="q-mt-md">
            <div>Warehouse</div>
            <q-input
              v-model="searchWarehouseKeyword"
              @update:model-value="searchWarehouse"
              outlined
              dense
              debounce="500"
              @focus="showDropdown = true"
            >
              <template v-slot:append>
                <q-icon v-if="!searchLoading" name="search" />
                <q-spinner v-else color="grey" size="sm" />
              </template>
              <div
                v-if="showDropdown && searchWarehouseKeyword"
                class="custom-list z-top"
              >
                <q-card>
                  <q-list separator>
                    <q-item v-if="!warehouses?.length">No Warehouse Record</q-item>
                    <q-item
                      v-for="warehouse in warehouses"
                      :key="warehouse.id"
                      @click="autoFillWarehouse(warehouse)"
                      clickable
                    >
                      <q-item-section>{{ warehouse.name }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
          <q-btn
            class="btn-cancel glossy"
            color="negative"
            label="Dismiss"
            v-close-popup
          />
          <q-btn
            class="btn-create glossy"
            color="positive"
            label="Create"
            @click="createDevice"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useDeviceStore } from "src/stores/device";
import { useBranchesStore } from "src/stores/branch";
import { useWarehousesStore } from "src/stores/warehouse";

const deviceStore = useDeviceStore();
const branchStore = useBranchesStore();
const warehouseStore = useWarehousesStore();

const branches = computed(() => branchStore.branch);
const warehouses = computed(() => warehouseStore.warehouse);

const addDeviceDialog = ref(false);
const loading = ref(false);
const searchBranchKeyword = ref("");
const searchWarehouseKeyword = ref("");
const showDropdown = ref(false);
const searchLoading = ref(false);
const selectedOption = ref(null);

const deviceForm = reactive({
  uuid: "",
  name: "",
  model: "",
  os_version: "",
  reference_id: "",
  designation: "",
});

// Ensure designation updates properly
watch(selectedOption, (newValue) => {
  deviceForm.designation = newValue;
});

const openAddDeviceDialog = () => {
  addDeviceDialog.value = true;
};

const searchBranch = async () => {
  if (searchBranchKeyword.value.trim()) {
    await branchStore.search(searchBranchKeyword.value);
  }
};

const autoFillBranch = (branch) => {
  deviceForm.reference_id = branch.id;
  searchBranchKeyword.value = branch.name;
  showDropdown.value = false;
};

const searchWarehouse = async () => {
  if (searchWarehouseKeyword.value.trim()) {
    await warehouseStore.search(searchWarehouseKeyword.value);
  }
};

const autoFillWarehouse = (warehouse) => {
  deviceForm.reference_id = warehouse.id;
  searchWarehouseKeyword.value = warehouse.name;
  showDropdown.value = false;
};

const createDevice = async () => {
  console.log("deviceForm", deviceForm);
  try {
    loading.value = true;
    const response = await deviceStore.createDevices(deviceForm);
    console.log("reponse", response);
    addDeviceDialog.value = false;
    // resetDeviceForm();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const resetDeviceForm = () => {
  Object.assign(deviceForm, {
    uuid: "",
    name: "",
    model: "",
    os_version: "",
    reference_id: "",
    designation: "",
  });
};
</script>

<style lang="scss" scoped>
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
  background: linear-gradient(135deg, #f70bff, #aa039f);
}

.separator-gradient {
  background: linear-gradient(90deg, #aa039f, #f70bff);
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
