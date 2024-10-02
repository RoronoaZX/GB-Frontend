<template>
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
import { ref, onMounted } from "vue";

const adminDrawer = ref(false);
const activeMenuItem = ref("0");

const menuItems = [
  {
    name: "dashboard",
    icon: "fa-solid fa-house",
    to: "/admin/dashboard",
    label: "Dashboard",
    separator: true,
  },
  {
    name: "rawMaterials",
    icon: "fa-solid fa-layer-group",
    to: "/admin/raw_materials",
    label: "Raw Materials",
    separator: true,
  },
  {
    name: "recipe",
    icon: "description",
    to: "/admin/recipe",
    label: "Recipe",
    separator: true,
  },
  {
    name: "wareHouse",
    icon: "factory",
    to: "/admin/warehouse",
    label: "Warehouse",
    separator: true,
  },
  {
    name: "storeBranches",
    icon: "fa-solid fa-store",
    to: "/admin/branches",
    label: "Branches",
    separator: true,
  },
  {
    name: "products",
    icon: "fa-solid fa-cake-candles",
    to: "/admin/products",
    label: "Products",
    separator: true,
  },
  {
    name: "users",
    icon: "fa-solid fa-users",
    to: "/admin/users",
    label: "Users",
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

<style lang="scss" scoped></style>
