<template>
  <q-page class="flex flex-center">
    <div>
      <button @click="checkDevice">Check Device UUID</button>
      <p v-if="uuid">Device UUID: {{ uuid }}</p>
    </div>
  </q-page>
</template>

<script setup>
import { Device } from "@capacitor/device";
import { ref } from "vue";

const uuid = ref(""); // Reactive variable to store the UUID

const checkDevice = async () => {
  try {
    const info = await Device.getId();
    uuid.value = info; // Store the UUID in the reactive variable
    console.log("Device UUID:", uuid.value); // Log the UUID
  } catch (error) {
    console.error("Error fetching device UUID:", error);
  }
};

// Optional: function to verify UUID with backend
// const verifyDeviceWithBackend = async (deviceUUID) => {
//   const response = await fetch('https://your-backend-url.com/api/verify-device', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ uuid: deviceUUID }),
//   });
//   const result = await response.json();
//   if (!result.allowed) {
//     alert('This device is not allowed to install the app.');
//   }
// };
</script>

<style scoped>
/* Add any styles if needed */
</style>
