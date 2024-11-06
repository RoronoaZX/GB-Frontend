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
        <q-card-section
          class="row items-center q-px-md q-py-sm bg-gradient text-white"
        >
          <div class="text-h5 q-mr-md">📱 Add Device</div>
          <q-space />
          <q-btn icon="close" flat dense round v-close-popup />
        </q-card-section>
        <!-- <q-separator class="separator-gradient" /> -->
        <q-card-section class="q-px-xl q-pt-none q-pb-lg">
          <div class="q-mt-lg q-animated q-animate-bounce">
            <div>UUID</div>
            <q-input
              v-model="deviceForm.uuid"
              outlined
              dense
              :rules="[
                (val) => (val && val.length > 0) || 'Device UUID is required',
              ]"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <div>Name</div>
            <q-input
              class="text-capitalize"
              v-model="deviceForm.name"
              outlined
              dense
              :rules="[
                (val) => (val && val.length > 0) || 'Device Name is required',
              ]"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <div>Model</div>
            <q-input
              v-model="deviceForm.model"
              outlined
              dense
              :rules="[
                (val) => (val && val.length > 0) || 'Device Model is required',
              ]"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <div>OS Version</div>
            <q-input
              v-model="deviceForm.os_version"
              outlined
              dense
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Device OS Version is required',
              ]"
            />
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
import { ref, reactive } from "vue";
import { useDeviceStore } from "src/stores/device";

const deviceStore = useDeviceStore();
const addDeviceDialog = ref(false);
const loading = ref(false);
const openAddDeviceDialog = () => {
  addDeviceDialog.value = true;
};

const deviceForm = reactive({
  uuid: "",
  name: "",
  model: "",
  os_version: "",
});

const createDevice = async () => {
  loading.value = true;
  try {
    await deviceStore.createDevices(deviceForm);
    addDeviceDialog.value = false;
    resetDeviceForm();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const resetDeviceForm = () => {
  deviceForm.uuid = "";
  deviceForm.name = "";
  deviceForm.model = "";
  deviceForm.os_version = "";
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
