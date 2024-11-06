import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useDeviceStore = defineStore("devices", () => {
  const device = ref(null);
  const devices = ref([]);

  const fetchDevices = async () => {
    try {
      const response = await api.get("/api/device");
      devices.value = response.data;
    } catch (error) {
      console.log("error fetchig  device", error);
      Notify.create({
        type: "negative",
        message: "Failed to fetch devices",
        setTimeout: 1000,
      });
    }
  };

  const createDevices = async (data) => {
    Loading.show();
    console.log("Data parameters being sent:", data);
    try {
      const response = await api.post("/api/device", data);

      devices.value.unshift(response.data);
      Notify.create({
        type: "positive",
        message: "Device created successfully",
        setTimeout: 1000,
        // position: "top",
      });
    } catch (error) {
      console.error("error device", error);
      Notify.create({
        type: "negative",
        message: "Failed to create device",
        setTimeout: 1000,
        // position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const updateDevice = async (id, data) => {
    Loading.show();
    try {
      const response = await api.put(`/api/device/${id}`, data);
      const index = devices.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        devices.value[index] = response.data;
      }
      Notify.create({
        type: "positive",
        message: "Device updated successfully",
        setTimeout: 1000,
        // position: "top",
      });
    } catch (error) {
      console.log("update device error", error);
      Notify.create({
        type: "negative",
        message: "Failed to update device",
        setTimeout: 1000,
        // position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const deleteDevice = async (id) => {
    Loading.show();
    try {
      const response = await api.delete(`/api/device/${id}`);
      devices.value = devices.value.filter((item) => item.id !== id);
      Notify.create({
        type: "positive",
        message: "Device deleted successfully",
        // position: "top",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to delete device",
        // position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  return {
    device,
    devices,
    fetchDevices,
    createDevices,
    updateDevice,
    deleteDevice,
  };
});
