<template>
  <q-card class="elegant-container" flat>
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between q-mb-md">
        <!-- Modern Pill Tabs Header -->
        <q-tabs
          v-model="activeTab"
          dense
          class="modern-tabs"
          active-color="primary"
          align="left"
          no-caps
        >
          <q-tab name="users" label="User Accounts" icon="group" />
          <q-tab name="permissions" label="Roles & Permissions" icon="admin_panel_settings" />
        </q-tabs>

        <!-- User Create Button (only visible in user accounts tab) -->
        <div v-show="activeTab === 'users'" class="create-btn-wrapper">
          <UsersCreate />
        </div>
      </div>
    </q-card-section>

    <q-separator class="q-my-md separator-line" />

    <q-card-section class="q-pa-none">
      <q-tab-panels v-model="activeTab" animated class="bg-transparent">
        <q-tab-panel name="users" class="q-pa-none">
          <UsersCard />
        </q-tab-panel>

        <q-tab-panel name="permissions" class="q-pa-none">
          <RolesPermissions />
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import UsersCreate from "./components/UsersCreate.vue";
import UsersCard from "./components/UsersCard.vue";
import RolesPermissions from "./components/RolesPermissions.vue";

const activeTab = ref("users");
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.02);
}

.modern-tabs {
  background: #f1f5f9;
  border-radius: 30px;
  padding: 4px;
  border: 1px solid #e2e8f0;
  
  :deep(.q-tab) {
    border-radius: 28px;
    padding: 0 24px;
    min-height: 42px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    color: #64748b;
    font-weight: 500;
    
    .q-tab__indicator {
      display: none; /* Hide standard indicator line */
    }
    
    .q-tab__content {
      min-height: 42px;
    }
    
    &.q-tab--active {
      background: #ffffff;
      color: #3b82f6 !important;
      box-shadow: 0px 4px 10px rgba(15, 23, 42, 0.06);
      font-weight: 600;
    }

    &:hover:not(.q-tab--active) {
      color: #334155;
      background: rgba(226, 232, 240, 0.5);
    }
  }
}

.separator-line {
  background: #e2e8f0;
  opacity: 0.6;
}

.create-btn-wrapper {
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
}

.body--dark {
  .elegant-container {
    background: #0b0f19;
    border-color: #1e293b;
    box-shadow: none;
  }
  
  .modern-tabs {
    background: #1e293b;
    border-color: #334155;
    
    :deep(.q-tab) {
      color: #94a3b8;
      
      &.q-tab--active {
        background: #0f172a;
        color: #60a5fa !important;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
      }
      
      &:hover:not(.q-tab--active) {
        color: #f1f5f9;
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
  
  .separator-line {
    background: #1e293b;
  }
}
</style>
