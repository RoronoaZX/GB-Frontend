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
              <q-menu
                transition-show="scale"
                transition-hide="scale"
                anchor="bottom left"
                self="top left"
              >
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-avatar size="26px">
                        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <div class="q-text-truncate text-primary">
                        {{ formattedUserName }}
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-avatar icon="settings" size="xl" />
                    </q-item-section>
                    <q-item-section>Setting</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="signOut">
                    <q-item-section avatar>
                      <q-avatar icon="logout" size="xl" />
                    </q-item-section>
                    <q-item-section>Sign Out</q-item-section>
                  </q-item>
                </q-list>
                <!-- <div class="row no-wrap q-pa-md">
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
                    <q-toggle v-model="mobileData" label="Use Mobile Data" />
                    <q-toggle v-model="bluetooth" label="Bluetooth" />
                  </div>

                  <q-separator vertical inset class="q-mx-lg" />

                  <div class="column items-center">
                    <q-avatar size="72px">
                      <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
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
                </div> -->
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
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { LocalStorage, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

const drawer = ref(false);
const activeMenuItem = ref("0");

const user = ref({});
const quasar = useQuasar();
const loading = ref(false);
const router = useRouter();
onMounted(async () => {
  try {
    const response = await api.get("/api/profile");
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

const formattedUserName = computed(() => {
  const { firstname, middlename, lastname } = user.value.data.employee;

  // Split first name if it has multiple words
  const formattedFirstName = firstname
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");

  const middleInitial = middlename
    ? `${middlename.charAt(0).toUpperCase()}.`
    : "";
  const lastInitial = lastname.charAt(0).toUpperCase();

  return `${formattedFirstName} ${middleInitial} ${lastInitial}${lastname.slice(
    1
  )}`;
});

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
    // LocalStorage.removeItem("activeMenuItem");
    LocalStorage.removeItem("uuid");
    LocalStorage.removeItem("branch_id");
    loading.value = false;
    router.push("/");
  }, 1000);
};

const menuItems = [
  // {
  //   name: "cake_maker",
  //   icon: "fa-solid fa-cake-candles",
  //   to: "/branch/cake_maker",
  //   label: "Cake",
  //   separator: true,
  // },
  // fa-solid fa-cake-candles
  {
    name: "raw_materials",
    icon: "fa-solid fa-layer-group",
    to: "/branch/cake_maker/raw_materials",
    label: "Raw Materials",
    separator: true,
  },
  {
    name: "report",
    icon: "fact_check",
    to: "/branch/cake_maker/report",
    label: "Report",
    separator: true,
  },
  // {
  //   name: "accounts",
  //   icon: "person",
  //   to: "/branch/baker/account",
  //   label: "Accounts",
  //   separator: true,
  // },
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
