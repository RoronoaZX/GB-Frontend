<template>
  <!-- <div>
    <q-btn @click="checkDevice"> Check Device UUID </q-btn>
    <p v-if="uuid">Device UUID: {{ uuid }}</p>
  </div> -->
  <q-card
    class="my-card q-pa-md q-ma-lg"
    style="
      width: 430px;
      max-width: 90%;
      height: 500px; /* Set a fixed height */
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    "
  >
    <q-card-section class="q-pa-sm text-center">
      <div class="text-h5 text-red-6 q-mb-sm">
        <img src="../../assets/GB_LOGO.png" class="logo" />
      </div>
      <div class="text-caption text-grey-8 q-mb-sm">
        Please log in to continuesss.
      </div>
    </q-card-section>

    <!-- <q-card-section>
      <div v-if="machineId" class="q-mt-md">
        <q-chip label="UUID" icon="fingerprint" />
        <div class="text-body1 q-mt-sm">{{ machineId }}</div>
      </div>
      <div v-else class="q-mt-md text-caption">Fetching UUID...</div>
    </q-card-section> -->

    <q-card-section class="q-mt-sm flex-grow-1">
      <q-form @submit="login">
        <div class="q-gutter-y-sm">
          <q-input
            v-model="email"
            outlined
            placeholder="Email"
            dense
            autofocus
            required
            class="input-dynamic"
          />
          <q-input
            v-model="password"
            outlined
            placeholder="Password"
            :type="isPwd ? 'password' : 'text'"
            dense
            required
            class="input-dynamic"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
                class="cursor-pointer"
                style="color: #9e9e9e"
              />
            </template>
          </q-input>
        </div>
        <div class="q-my-md text-center">
          <q-btn
            type="submit"
            color="red-6"
            label="Login"
            class="q-mt-sm"
            dense
            :loading="loading"
            :disable="!formIsValid"
            style="width: 100%; max-width: 350px; border-radius: 8px"
          />
        </div>
      </q-form>
    </q-card-section>
    this is uuid {{ uuid }}
    <!-- <CheckUUID /> -->
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Device } from "@capacitor/device";
import { Notify, useQuasar, Loading } from "quasar";
import { useRouter } from "vue-router";
import axios, { api } from "src/boot/axios";
// import { Device } from "@capacitor/device";

// import CheckUUID from "./CheckUUID.vue";
// const uuid = ref("");

// const checkDevice = async () => {
//   try {
//     const info = await Device.getId();
//     uuid.value = info;
//     console.log("Device UUID:", uuid.value);
//   } catch (error) {
//     console.error("Error fetching device UUID:", error);
//   }
// };
// Reactive variable to hold machine UUID
// const machineId = ref(
//   "f2edb9c41f6b7d1b147016a56f9d30b71ee02de8eb7375c737ec910a2be5dc29"
// );

// Method to get UUID from Electron using node-machine-id
// const getUUID = async () => {
//   if (window.require) {
//     const { machineId: getMachineId } = window.require("node-machine-id");

//     try {
//       // Fetch UUID
//       machineId.value = await getMachineId();
//       console.log("machineId", machineId.value);
//     } catch (error) {
//       console.error("Error fetching machine UUID:", error);
//     }
//   } else {
//     console.warn("Electron not available.");
//   }
// };

// Automatically fetch UUID when the component is mounted
// onMounted(() => {
//   getUUID();
// });
// johndoe@example.com
// password

const uuid = ref("946c1697d02c5951");

// Method to get UUID from Electron using node-machine-id
// ===================================================//
// Use this code for building electron and if you've develop this project to  mobile app comment this out //
// const getUUID = async () => {
//   if (window.require) {
//     try {
//       // Import `node-machine-id` using `window.require`
//       const { machineId } = window.require("node-machine-id");

//       // Fetch UUID using `machineId` function
//       uuid.value = await machineId();
//     } catch (error) {
//       console.error("Error fetching machine UUID:", error);
//     }
//   } else {
//     console.warn("Electron not available.");
//   }
// };
// onMounted(() => {
//   getUUID();
// });

const isPwd = ref(true);
const email = ref("cakemaker1@gmail.com");
const password = ref("password");
// const uuid = ref("");
const loading = ref(false);

const formIsValid = computed(() => email.value !== "" && password.value !== "");

const quasar = useQuasar();
const router = useRouter();
const activeMenuItem = ref("");

// ===================================================//
// Use this code for building adroid app and if you've develop this project to  desktop app comment this out //
// ===================================================//

// const checkDevice = async () => {
//   try {
//     const id = await Device.getId();
//     // const info = await Device.getInfo();
//     uuid.value = id.identifier;
//     //  {
//     //   deviceInfo: info,
//     //   id: id,
//     // }; // Store the UUID in the reactive variable
//     console.log("Device UUID:", uuid.value); // Log the UUID
//   } catch (error) {
//     console.error("Error fetching device UUID:", error);
//   }
// };

// onMounted(() => {
//   checkDevice();
// });

const login = async () => {
  Loading.show();
  try {
    const response = await api.post("/api/login", {
      uuid: uuid.value,
      email: email.value,
      password: password.value,
      // uuid: machineId.value,
    });

    console.log("user:", response.data);
    localStorage.setItem("activeMenuItem", "dashboard");
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("uuid", response.data.device.uuid);
    localStorage.setItem("branch_id", response.data.device.branch_id);

    const role = response.data.role;
    const storedActiveMenuItem = localStorage.getItem("activeMenuItem");
    if (role === "Admin" || role === "Super Admin") {
      let path;

      // If a stored value is found in localStorage, set the activeMenuItem
      if (storedActiveMenuItem) {
        path = `/admin/${storedActiveMenuItem}`;
        activeMenuItem.value = storedActiveMenuItem;
      } else {
        path = "/admin/dashboard";
        localStorage.setItem("activeMenuItem", "dashboard");
        activeMenuItem.value = "dashboard";
      }

      // Navigate to the stored path or new path
      await router.push(path);
      Notify.create({
        type: "positive",
        message: response.data.message || "Login successful!",
        // position: "top",
        setTimeout: 5000,
      });
    } else if (role === "Baker") {
      await router.push("/branch/baker");
    } else if (role === "Cake Maker") {
      await router.push("/branch/cake_maker/raw_materials");
    } else if (role === "Cashier") {
      await router.push("/branch/sales_lady/products");
    }
    // else if (role === "Supervisor") {
    //   await router.push("/supervisor/reports");
    // }
  } catch (error) {
    console.error("Error during login:", error);
    const errorDisplay =
      error.response?.data?.message ||
      "Login failed. Incorrect email & password.";
    Notify.create({
      type: "negative",
      message: errorDisplay,
      // position: "bottom",
    });
  } finally {
    Loading.hide();
  }
};
</script>

<style scoped>
.my-card {
  background-color: #ffffff;
  animation: mymove 2s infinite;
}

.logo {
  width: 150px;
  height: auto;
  max-width: 100%;
}

.input-dynamic {
  transition: all 0.3s ease;
}

@media (max-height: 600px) {
  .my-card {
    height: 90vh; /* Make card responsive when screen height is small */
  }
  .input-dynamic {
    font-size: 14px;
    padding: 8px 12px;
  }
}

@keyframes mymove {
  50% {
    box-shadow: 10px 20px 30px rgb(254, 154, 154);
  }
}
</style>
