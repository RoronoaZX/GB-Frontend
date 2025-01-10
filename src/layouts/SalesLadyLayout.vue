<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-white">
        <q-toolbar class="row">
          <div class="col-4">
            <div class="row">
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
            </div>
          </div>
          <div class="col-4 d-flex justify-center" align="center">
            <div class="text-black mx-2 text-h6">
              {{ userData?.device?.branch?.name || "Undefined" }}
            </div>
          </div>
          <div class="col-4" align="right">
            <div>
              <q-btn round dense flat icon="message" v-if="$q.screen.gt.sm">
                <q-tooltip>Messages</q-tooltip>
              </q-btn>
              <q-btn round dense flat color="grey-10" icon="notifications">
                <q-badge color="red" class="text-white" floating> 2 </q-badge>
                <q-tooltip>Notifications</q-tooltip>
              </q-btn>
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

                      <div class="text-overline q-mt-md q-mb-xs">
                        {{ formatFullname(userData.data.employee) }}
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
import { useSalesReportsStore } from "src/stores/sales-report";
import { api } from "src/boot/axios";

const salesReportsStore = useSalesReportsStore();
const userData = computed(() => salesReportsStore.user);
console.log("sales data for header", userData.value);
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

// const formattedUserName = computed(() => {
//   if (user.value && user.value.data && user.value.data.name) {
//     const fullname = user.value.data.name;
//     const parts = fullname.split(" ");
//     const formattedparts = parts.map((part) => {
//       return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
//     });
//     if (formattedparts.length > 1) {
//       const middleIndex = Math.floor(formattedparts.length / 2);
//       formattedparts[middleIndex] =
//         formattedparts[middleIndex].charAt(0).toUpperCase() + ".";
//     }
//     return formattedparts.join(" ");
//   } else {
//     return "";
//   }
// });

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
    name: "analytics",
    icon: "query_stats",
    to: "/branch/sales_lady",
    label: "Analytics",
    separator: true,
  },
  {
    name: "bread",
    icon: "fa-solid fa-cake-candles",
    to: "/branch/sales_lady/products",
    label: "Products",
    separator: true,
  },
  {
    name: "bakersReport",
    icon: "fact_check",
    to: "/branch/sales_lady/bakers_report",
    label: "Bakers Report",
    separator: true,
  },
  {
    name: "cakeReport",
    icon: "fact_check",
    to: "/branch/sales_lady/cake_report",
    label: "Cake Report",
    separator: true,
  },
  {
    name: "rawMaterials",
    icon: "fact_check",
    to: "/branch/sales_lady/report",
    label: "Report",
    separator: true,
  },
  {
    name: "accounts",
    icon: "person",
    to: "/branch/sales_lady/account",
    label: "Accounts",
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
