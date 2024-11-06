<template>
  <router-view />
</template>

<script setup>
// import { onMounted, ref } from "vue";
// import { Device } from "@capacitor/device";
// import { api } from "./boot/axios";

defineOptions({
  name: "App",
});

// const uuid = ref("");

// const getDeviceUUID = async () => {
//   const info = await Device.getId();
//   uuid.value = info; // Save only the UUID in the reactive reference
//   console.log("MY_APP_TAG: Retrieved Device UUID:", uuid.value); // Correctly log the UUID value
//   return uuid.value; // Return the UUID
// };

// Function to check if the device is authorized
// const checkDevice = async () => {
//   const deviceUUID = await getDeviceUUID();
//   console.log(
//     "MY_APP_TAG: Checking authorization for Device UUID:",
//     deviceUUID
//   ); // Log UUID

//   try {
//     const response = await api.post("/api/checkDevice", {
//       uuid: deviceUUID,
//     });
//     console.log("MY_APP_TAG: Server Response:", response.data); // Log server response

//     if (!response.data.authorized) {
//       alert("This device is not authorized to install the app.");
//     }
//   } catch (error) {
//     console.error("MY_APP_TAG: Error checking device authorization:", error); // Log error
//     alert("An error occurred while checking device authorization.");
//   }
// };

// Use onMounted to call checkDevice when the app is initialized
// onMounted(() => {
//   checkDevice();
// });
</script>
