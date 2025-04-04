<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-white">
        <q-toolbar>
          <q-btn
            color="red-6"
            flat
            @click="drawer = !drawer"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title class="py-md">
            <img
              src="../assets/GB_LOGO.png"
              style="width: 50px; height: 40px"
            />
          </q-toolbar-title>

          <div class="q-gutter-sm row items-center no-wrap">
            <!-- <q-btn round dense flat icon="message" v-if="$q.screen.gt.sm">
              <q-tooltip>Messages</q-tooltip>
            </q-btn>
            <q-btn round dense flat color="grey-10" icon="notifications">
              <q-badge color="red" class="text-white" floating> 2 </q-badge>
              <q-tooltip>Notifications</q-tooltip>
            </q-btn> -->
            <q-btn round flat>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <div class="text-h6 q-mb-md">Settings</div>
                    <q-list>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>Account</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>Help &amp; Feedback</q-item-section>
                      </q-item>
                    </q-list>
                    <!-- <q-toggle v-model="mobileData" label="Use Mobile Data" />
                    <q-toggle v-model="bluetooth" label="Bluetooth" /> -->
                  </div>

                  <q-separator vertical inset class="q-mx-lg" />

                  <div class="column items-center">
                    <q-avatar size="72px">
                      <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                    </q-avatar>

                    <div class="text-subtitle1 q-mt-md q-mb-xs">
                      {{ formattedUserName }}
                    </div>

                    <q-btn
                      color="primary"
                      label="Logout"
                      push
                      size="sm"
                      @click="signOut"
                      v-close-popup
                    />
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        behavior="mobile"
        :width="200"
        :breakpoint="500"
        bordered
      >
        <q-scroll-area class="fit">
          <q-list bordered padding>
            <q-item
              :clickable="true"
              v-for="(item, index) in menuItems"
              :key="index"
              @click="setActiveMenuItem(item.name)"
              :to="item.to"
              :active="activeMenuItem === item.name"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                {{ item.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page>
          <router-view />
        </q-page>
      </q-page-container>
      <q-dialog v-model="loading">
        <q-card>
          <q-card-section class="row items-center q-gutter-md">
            <span class="q-ml-md">Signing out</span>
            <q-spinner-dots size="50px" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { LocalStorage, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

const user = ref({});
const drawer = ref(false);
const activeMenuItem = ref("0");
const quasar = useQuasar();
const router = useRouter();
const loading = ref(false);

onMounted(async () => {
  try {
    const response = await api.get("/api/profile");
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

const formattedUserName = computed(() => {
  if (user.value && user.value.data && user.value.data.name) {
    const fullname = user.value.data.name;
    const parts = fullname.split(" ");
    const formattedparts = parts.map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    });
    if (formattedparts.length > 1) {
      const middleIndex = Math.floor(formattedparts.length / 2);
      formattedparts[middleIndex] =
        formattedparts[middleIndex].charAt(0).toUpperCase() + ".";
    }
    return formattedparts.join(" ");
  } else {
    return "";
  }
});

const signOut = () => {
  loading.value = true;
  setTimeout(() => {
    LocalStorage.removeItem("token");
    LocalStorage.removeItem("role");
    LocalStorage.removeItem("activeMenuItem");
    loading.value = false;
    router.push("/");
  }, 1000);
};

const menuItems = [
  {
    name: "reports",
    icon: "fact_check",
    to: "/supervisor/reports",
    label: "Reports",
    separator: true,
  },
  {
    name: "dtr",
    icon: "event",
    to: "/supervisor/dtr",
    label: "Daily Time Record",
    separator: true,
  },
  {
    name: "employee",
    icon: "group",
    to: "/supervisor/employee",
    label: "Employee",
    separator: true,
  },
];
onMounted(() => {
  const storedActiveMenuItem = localStorage.getItem("activeMenuItem");
  if (storedActiveMenuItem) {
    activeMenuItem.value = storedActiveMenuItem;
  }
});

// Function to update activeMenuItem and store it in localStorage
const setActiveMenuItem = (itemName) => {
  activeMenuItem.value = itemName;
  localStorage.setItem("activeMenuItem", itemName);
};
</script>

<style scoped>
.my-menu-link {
  color: white;
  background: #ef4444;
}
.account-card {
  position: absolute;
  z-index: 999; /* Ensure the card is above other elements */
}
</style>
