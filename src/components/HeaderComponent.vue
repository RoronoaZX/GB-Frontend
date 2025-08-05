<template>
  <q-header elevated class="bg-white">
    <q-toolbar class="row">
      <div class="col-4">
        <div class="row">
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
        <div class="text-black mx-2 text-h6">
          <div>{{ getActiveMenuItemLabel }}</div>
        </div>
      </div>

      <div class="col-4" align="right">
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
        @click="setActiveMenuItem(item.name)"
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
import { ref, onMounted, computed } from "vue";
import ProfileAvatarComponent from "./ProfileAvatarComponent.vue";

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
  {
    name: "settings",
    icon: "fa-solid fa-gear",
    to: "/admin/settings",
    label: "Settings",
    toolbarDisplay: "⚙️ General Settings",
  },
];

// Sync with localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem("activeMenuItem");
  if (saved) {
    activeMenuItem.value = saved;
  } else {
    localStorage.setItem("activeMenuItem", activeMenuItem.value);
  }
});

// Update on click
const setActiveMenuItem = (itemName) => {
  if (bar.value) bar.value.start();
  activeMenuItem.value = itemName;
  localStorage.setItem("activeMenuItem", itemName);
  if (bar.value) bar.value.stop();
};

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
