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

          <!-- <div class="col-4 g-flex justify-center" align="center">
            <div class="text-black mx-2 text-h6">
              <div>{{ getActiveMenuItemLabel }}</div>
            </div>
          </div> -->

          <div class="col-4" align="right">
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
                      {{
                        formatFullname(userData.data.employee) || "Undefined"
                      }}
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
import { useSupervisorStore } from "src/stores/supervisor";

const supervisor = useSupervisorStore();
const userData = computed(() => supervisor.user);

const user = ref({});
const drawer = ref(false);
const activeMenuItem = ref("0");
const quasar = useQuasar();
const router = useRouter();
const loading = ref(false);

// onMounted(async () => {
//   try {
//     const response = await api.get("/api/profile");
//     user.value = response.data;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
// });

const formatFullname = (row) => {
  const capitalize = (str) =>
    str
      ? str
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")
      : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

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
    name: "branches",
    icon: "fa-solid fa-store",
    to: "/supervisor",
    label: "Branches",
    separator: true,
    toolbarDisplay: "🏭 Branches",
  },
  {
    name: "reports",
    icon: "fact_check",
    to: "/supervisor/reports",
    label: "Reports",
    separator: true,
    toolbarDisplay: "📄 Reports",
  },
  {
    name: "dtr",
    icon: "event",
    to: "/supervisor/dtr",
    label: "Daily Time Record",
    separator: true,
    toolbarDisplay: "🕰️ DTR",
  },
  {
    name: "employee",
    icon: "group",
    to: "/supervisor/employee",
    label: "Employee",
    separator: true,
    toolbarDisplay: "👥 Employee",
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

const getActiveMenuItemLabel = computed(() => {
  const activeItem = menuItems.find((item) => item.me === activeMenuItem.value);
  return activeItem?.toolbarDisplay || "Menu";
});
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
