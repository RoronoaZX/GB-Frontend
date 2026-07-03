<template>
  <q-header elevated :class="isDark ? 'bg-dark text-white' : 'bg-white text-black'">
    <q-toolbar class="row">
      <div class="col-4">
        <div class="row items-center">
          <q-btn
            color="red-6"
            flat
            dense
            icon="menu"
            @click="adminDrawer = !adminDrawer"
          />
          <q-toolbar-title class="py-md">
            <img
              src="../assets/GB_LOGO.png"
              alt="GB Logo"
              style="width: 50px; height: 40px"
            />
          </q-toolbar-title>
        </div>
      </div>
      <div class="col-4 d-flex justify-center" align="center">
        <div class="text-h6 font-weight-bold" :class="isDark ? 'text-white' : 'text-black'">
          <div>{{ getActiveMenuItemLabel }}</div>
        </div>
      </div>

      <div class="col-4 flex items-center justify-end q-gutter-sm" align="right">
        <!-- Theme Toggle Button -->
        <q-btn
          flat
          round
          dense
          :icon="isDark ? 'light_mode' : 'dark_mode'"
          :color="isDark ? 'amber-5' : 'grey-8'"
          @click="toggleDarkMode"
          class="theme-toggle-btn"
        >
          <q-tooltip>{{ isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}</q-tooltip>
        </q-btn>
        <ProfileAvatarComponent />
      </div>
    </q-toolbar>
    <q-ajax-bar ref="bar" position="top" color="red-6" size="7px" skip-hijack />
  </q-header>

  <q-drawer
    v-model="adminDrawer"
    show-if-above
    :width="200"
    :breakpoint="500"
    bordered
  >
    <q-list bordered padding>
      <q-item
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.to"
        :clickable="true"
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
  </q-drawer>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import ProfileAvatarComponent from "./ProfileAvatarComponent.vue";

const route = useRoute();
const $q = useQuasar();

const isDark = computed(() => $q.dark.isActive);

const toggleDarkMode = () => {
  $q.dark.toggle();
  localStorage.setItem("darkMode", $q.dark.isActive);
};

// Role & drawer state
const role = ref(localStorage.getItem("role"));
const adminDrawer = ref(false);

// Default active menu based on role
const defaultMenu =
  role.value === "Super Admin" ? "dashboard" : "raw_materials";
const activeMenuItem = ref(defaultMenu);

// Refs
const bar = ref(null);

// Menu items based on role
const menuItems = [
  ...(role.value === "Super Admin"
    ? [
        {
          name: "dashboard",
          icon: "fa-solid fa-house",
          to: "/admin/dashboard",
          label: "Dashboard",
          toolbarDisplay: "📊 Dashboard",
        },
      ]
    : []),
  {
    name: "raw_materials",
    icon: "fa-solid fa-layer-group",
    to: "/admin/raw_materials",
    label: "Raw Materials",
    toolbarDisplay: "🛠️ Raw Materials",
  },
  {
    name: "recipe",
    icon: "description",
    to: "/admin/recipe",
    label: "Recipe",
    toolbarDisplay: "📜 Recipe",
  },
  {
    name: "stocks",
    icon: "local_shipping",
    to: "/admin/stocks",
    label: "Stocks",
    toolbarDisplay: "🚚 Stocks",
  },
  {
    name: "warehouse",
    icon: "factory",
    to: "/admin/warehouse",
    label: "Warehouse",
    toolbarDisplay: "🏭 Warehouse",
  },
  {
    name: "branches",
    icon: "fa-solid fa-store",
    to: "/admin/branches",
    label: "Branches",
    toolbarDisplay: "🏪 Branches",
  },
  {
    name: "products",
    icon: "fa-solid fa-cake-candles",
    to: "/admin/products",
    label: "Products",
    toolbarDisplay: "🥖 Products",
  },
  ...(role.value === "Super Admin"
    ? [
        {
          name: "users",
          icon: "fa-solid fa-users",
          to: "/admin/users",
          label: "Users",
          toolbarDisplay: "👥 Roles and Permission",
        },
        {
          name: "devices",
          icon: "fa-solid fa-mobile",
          to: "/admin/devices",
          label: "Devices",
          toolbarDisplay: "📱 Device",
        },
        {
          name: "history",
          icon: "fa-solid fa-history",
          to: "/admin/history_log",
          label: "History Log",
          toolbarDisplay: "🕰️ History Logs",
        },
      ]
    : []),
  {
    name: "payroll",
    icon: "fa-solid fa-sack-dollar",
    to: "/admin/payroll",
    label: "Payroll",
    toolbarDisplay: "💰 Payroll Management",
  },
  // {
  //   name: "settings",
  //   icon: "fa-solid fa-gear",
  //   to: "/admin/settings",
  //   label: "Settings",
  //   toolbarDisplay: "⚙️ General Settings",
  // },
];

// Automatically sync sidebar highlight with current URL
watch(
  () => route.path,
  (newPath) => {
    const activeItem = menuItems.find((item) => {
      if (item.to === "/admin/dashboard") return newPath === item.to;
      return item.to && newPath.startsWith(item.to);
    });
    if (activeItem) {
      activeMenuItem.value = activeItem.name;
      localStorage.setItem("activeMenuItem", activeItem.name);
    }
  },
  { immediate: true }
);

onMounted(() => {
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  $q.dark.set(savedDarkMode);
});



// Display toolbar label
const getActiveMenuItemLabel = computed(() => {
  const activeItem = menuItems.find(
    (item) => item.name === activeMenuItem.value
  );
  return activeItem?.toolbarDisplay || "Menu";
});
</script>

<style scoped lang="scss">
.my-menu-link {
  color: white;
  background: #ef4444;
}
.account-card {
  position: absolute;
  z-index: 999;
}
</style>
