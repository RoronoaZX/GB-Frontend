<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-white">
        <q-toolbar>
          <q-btn
            color="dark"
            flat
            @click="drawer = !drawer"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title class="text-dark text-weight-bold"
            >GB Warehouse</q-toolbar-title
          >

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
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
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
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Your Profile</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-avatar icon="settings" size="xl" />
                    </q-item-section>
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-avatar icon="logout" size="xl" />
                    </q-item-section>
                    <q-item-section>Sign Out</q-item-section>
                  </q-item>
                </q-list>
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
import { ref } from "vue";

const drawer = ref(false);
const activeMenuItem = ref("0");

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
    label: "Scalling Section",
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
