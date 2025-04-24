<template>
  <q-header elevated class="bg-white">
    <q-toolbar class="row">
      <div class="col-4">
        <div class="row">
          <q-btn
            color="red-6"
            flat
            @click="adminDrawer = !adminDrawer"
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
          <div>{{ getActiveMenuItemLabel }}</div>
        </div>
      </div>

      <!-- <q-btn round dense flat icon="message">
        <q-tooltip>Messages</q-tooltip>
      </q-btn>
      <q-btn round dense flat color="grey-10" icon="notifications">
        <q-badge color="red" class="text-white" floating> 2 </q-badge>
        <q-tooltip>Notifications</q-tooltip>
      </q-btn> -->
      <div class="col-4" align="right">
        <div class="">
          <div>
            <ProfileAvatarComponent />
          </div>
        </div>
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
  </q-drawer>
</template>

<script setup>
import ProfileAvatarComponent from "./ProfileAvatarComponent.vue";
import { ref, onMounted, computed } from "vue";

const adminDrawer = ref(false);
const activeMenuItem = ref("dashboard");
const role = ref(localStorage.getItem("role"));
const bar = ref(null);

const menuItems = [
  {
    name: "dashboard",
    icon: "fa-solid fa-house",
    to: "/admin/dashboard",
    label: "Dashboard",
    toolbarDisplay: "📊 Dashboard",
    separator: true,
  },
  {
    name: "raw_materials",
    icon: "fa-solid fa-layer-group",
    to: "/admin/raw_materials",
    label: "Raw Materials",
    toolbarDisplay: "🛠️ Raw Materials",
    separator: true,
  },
  // {
  //   name: "bir_reports",
  //   icon: "fa-solid fa-file-invoice",
  //   to: "/admin/bir_reports",
  //   label: "BIR Reports",
  //   toolbarDisplay: "📈 BIR Reports",
  //   separator: true,
  // },
  {
    name: "recipe",
    icon: "description",
    to: "/admin/recipe",
    label: "Recipe",
    toolbarDisplay: "📜 Recipe",
    separator: true,
  },
  {
    name: "warehouse",
    icon: "factory",
    to: "/admin/warehouse",
    label: "Warehouse",
    toolbarDisplay: "🏭 Warehouse",
    separator: true,
  },
  {
    name: "branches",
    icon: "fa-solid fa-store",
    to: "/admin/branches",
    label: "Branches",
    toolbarDisplay: "🏪 Branches",
    separator: true,
  },
  {
    name: "products",
    icon: "fa-solid fa-cake-candles",
    to: "/admin/products",
    label: "Products",
    toolbarDisplay: "🥖 Products",
    separator: true,
  },

  ...(role.value === "Super Admin"
    ? [
        {
          name: "users",
          icon: "fa-solid fa-users",
          to: "/admin/users",
          label: "Users",
          toolbarDisplay: "👥 Roles and Permission",
          separator: true,
        },
        {
          name: "devices",
          icon: "fa-solid fa-mobile",
          to: "/admin/devices",
          label: "Devices",
          toolbarDisplay: "📱 Device",
          separator: true,
        },
      ]
    : []),
  {
    name: "payroll",
    icon: "fa-solid fa-sack-dollar",
    to: "/admin/payroll",
    label: "Payroll",
    toolbarDisplay: "💰 Payroll Management",
    separator: true,
  },
  {
    name: "history",
    icon: "fa-solid fa-history",
    to: "/admin/history_log",
    label: "History Log",
    toolbarDisplay: "🕰️ History Logs",
    separator: true,
  },
];

onMounted(() => {
  const storedActiveMenuItem = localStorage.getItem("activeMenuItem");
  if (storedActiveMenuItem) {
    activeMenuItem.value = storedActiveMenuItem;
  }
});

const setActiveMenuItem = async (itemName) => {
  const barRef = bar.value; // Start the loading bar when a menu item is clicked
  barRef.start();
  activeMenuItem.value = itemName;
  localStorage.setItem("activeMenuItem", itemName);

  // Wait for the route navigation to complete, then stop the loading bar
  // Wait for the DOM update
  barRef.stop();
};

const getActiveMenuItemLabel = computed(() => {
  const activeItem = menuItems.find(
    (item) => item.name === activeMenuItem.value
  );
  return activeItem ? activeItem.toolbarDisplay : "Menu";
});
</script>

<style lang="scss" scoped>
.my-menu-link {
  color: white;
  background: #ef4444;
}
.account-card {
  position: absolute;
  z-index: 999; /* Ensure the card is above other elements */
}
</style>
