<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-white">
        <q-toolbar class="row">
          <q-btn
            color="dark"
            flat
            @click="drawer = !drawer"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title class="text-dark text-weight-bold py-md"
            >GB Warehouse</q-toolbar-title
          >
          <div class="col-4 d-flex justify-center" align="center">
            <div class="text-black mx-2 text-h6">
              {{ userData?.device?.reference?.name || "Undefined" }}
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
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
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
                        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                      </q-avatar>

                      <div class="text-subtitle1 q-mt-md q-mb-xs">
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
                <q-dialog v-model="loading">
                  <q-card>
                    <q-card-section class="row items-center q-gutter-md">
                      <span class="q-ml-md">Signing out</span>
                      <q-spinner-dots size="50px" />
                    </q-card-section>
                  </q-card>
                </q-dialog>
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
          <q-list bordered padding class="rounded-borders">
            <q-item
              :clickable="true"
              v-ripple
              v-for="(item, index) in menuItems"
              :key="index"
              @click="activeMenuItem = item.name"
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
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { LocalStorage, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useWarehousesStore } from "src/stores/warehouse";
import { api } from "src/boot/axios";

const drawer = ref(false);
const activeMenuItem = ref("0");
const warehouseStore = useWarehousesStore();
const userData = computed(() => warehouseStore.user);
console.log("employee", userData.value);
const quasar = useQuasar();
const loading = ref(false);
const router = useRouter();

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
//     const fullName = user.value.data.name;
//     const parts = fullName.split(" ");
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
    name: "transaction",
    icon: "fact_check",
    to: "/warehouse",
    label: "Transaction History",
    separator: true,
  },
  {
    name: "ingredients",
    icon: "assignment",
    to: "/warehouse/ingredients",
    label: "Ingredients",
    separator: true,
  },
  {
    name: "scallingSection",
    icon: "fa-solid fa-chart-pie",
    to: "/warehouse/scalling_section",
    label: "Scaling Section",
    separator: true,
  },
  {
    name: "analytics",
    icon: "query_stats",
    to: "",
    label: "Analytics",
    separator: true,
  },
];
</script>

<style scoped>
.my-menu-link {
  color: white;
  background: #ef4444;
}
</style>
