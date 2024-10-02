<template>
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
        Please log in to continue.
      </div>
    </q-card-section>

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
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { Notify, useQuasar, Loading } from "quasar";
import { useRouter } from "vue-router";
import axios, { api } from "src/boot/axios";

const isPwd = ref(true);
const email = ref("johndoe@example.com");
const password = ref("password");

const loading = ref(false);

const formIsValid = computed(() => email.value !== "" && password.value !== "");

const quasar = useQuasar();
const router = useRouter();

const login = async () => {
  Loading.show();
  try {
    const response = await api.post("/api/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    Loading.hide();

    Notify.create({
      type: "positive",
      message: response.data.message || "Login successful!",
      position: "top",
    });

    const role = response.data.role;
    if (role === "Admin") {
      await router.push("/admin/dashboard");
    } else if (role === "Supervisor") {
      await router.push("/supervisor/reports");
    } else if (role === "Cashier") {
    } else if (role === "Baker") {
      await router.push("/branch/baker");
    } else if (role === "Cashier") {
      await router.push("/branch/sales_lady/products");
    }
  } catch (error) {
    console.error("Error during login:", error);
    const errorDisplay =
      error.response?.data?.message ||
      "Login failed. Incorrect email & password.";
    Notify.create({
      type: "negative",
      message: errorDisplay,
      position: "top",
    });

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
