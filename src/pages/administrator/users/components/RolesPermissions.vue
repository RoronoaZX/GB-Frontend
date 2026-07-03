<template>
  <div class="row q-col-gutter-md roles-permissions-container">
    <!-- Left Pane: Role List -->
    <div class="col-12 col-md-4">
      <q-card class="roles-list-card" flat>
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-weight-bold text-grey-9 q-mb-xs">User Roles</div>
          <div class="text-caption text-grey-6 q-mb-md">Select a role to configure its system permissions.</div>
        </q-card-section>
        
        <q-card-section class="q-pt-none q-px-sm">
          <div v-if="loading" class="q-pa-md">
            <q-skeleton type="rect" height="60px" class="q-mb-sm" v-for="n in 5" :key="n" />
          </div>
          <q-list v-else separator>
            <q-item
              v-for="role in roles"
              :key="role.id"
              clickable
              v-ripple
              :active="selectedRole && selectedRole.id === role.id"
              active-class="active-role-item"
              class="role-item q-py-md q-my-xs q-mx-xs rounded-borders"
              @click="selectRole(role)"
            >
              <q-item-section avatar>
                <q-avatar :icon="getRoleIcon(role.name)" color="indigo-1" text-color="indigo" size="42px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold text-grey-9">{{ role.display_name }}</q-item-label>
                <q-item-label caption class="text-grey-6 text-truncate" style="max-width: 220px;">
                  {{ role.description }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-badge color="blue-grey-1" text-color="blue-grey-7" class="q-py-xs q-px-sm text-weight-medium">
                  {{ role.user_count }} {{ role.user_count === 1 ? 'user' : 'users' }}
                </q-badge>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- Right Pane: Permission Matrix -->
    <div class="col-12 col-md-8">
      <q-card class="permissions-matrix-card" flat>
        <div v-if="!selectedRole" class="no-selection-wrapper flex flex-center column q-pa-xl text-center">
          <q-icon name="admin_panel_settings" size="80px" color="blue-grey-2" class="q-mb-md" />
          <div class="text-h6 text-grey-5 text-weight-medium">No Role Selected</div>
          <div class="text-caption text-grey-5">Please select a role from the left pane to configure authorization rules.</div>
        </div>

        <div v-else>
          <!-- Header -->
          <q-card-section class="row items-center justify-between border-bottom q-py-md bg-grey-1">
            <div>
              <div class="row items-center q-gutter-sm">
                <div class="text-h6 text-weight-bold text-grey-9">{{ selectedRole.display_name }}</div>
                <q-badge color="indigo" outline class="q-px-sm text-weight-medium">{{ selectedRole.name }}</q-badge>
              </div>
              <div class="text-caption text-grey-6 q-mt-xs">{{ selectedRole.description }}</div>
            </div>
            
            <q-btn
              v-if="isSuperAdmin"
              color="primary"
              label="Save Permissions"
              icon="save"
              unelevated
              rounded
              class="q-px-md"
              @click="savePermissions"
            />
            <q-chip
              v-else
              outline
              icon="lock"
              color="warning"
              text-color="warning"
              class="q-py-md text-weight-medium"
            >
              Read-Only Mode
            </q-chip>
          </q-card-section>

          <!-- Permissions Checklist -->
          <q-card-section class="q-pa-md permissions-scroller">
            <div v-if="loading" class="q-pa-md">
              <q-skeleton type="rect" height="40px" class="q-mb-md" v-for="n in 6" :key="n" />
            </div>

            <div v-else>
              <div v-for="(groupPermissions, groupName) in groupedPermissions" :key="groupName" class="q-mb-xl">
                <!-- Group Header -->
                <div class="group-header row items-center q-mb-md q-pb-xs border-bottom-subtle">
                  <q-icon :name="getGroupIcon(groupName)" color="indigo-7" size="sm" class="q-mr-sm" />
                  <span class="text-subtitle1 text-weight-bold text-indigo-9">{{ groupName }}</span>
                </div>

                <!-- Group Items Grid -->
                <div class="row q-col-gutter-md">
                  <div 
                    v-for="perm in groupPermissions" 
                    :key="perm.id" 
                    class="col-12 col-sm-6"
                  >
                    <q-card 
                      flat 
                      bordered 
                      class="permission-tile-card cursor-pointer"
                      :class="{ 'permission-active': isPermissionChecked(perm.id) }"
                      @click="togglePermission(perm.id)"
                    >
                      <q-card-section class="row items-start no-wrap q-pa-sm">
                        <div class="col-auto q-mr-sm q-mt-xs">
                          <q-checkbox 
                            v-model="checkedPermissions" 
                            :val="perm.id" 
                            :disable="!isSuperAdmin"
                            dense
                            color="indigo"
                            @click.stop
                          />
                        </div>
                        <div class="col">
                          <div class="text-subtitle2 text-weight-bold text-grey-9" style="font-size: 13px; line-height: 1.2;">
                            {{ perm.display_name }}
                          </div>
                          <div class="text-caption text-grey-6 q-mt-xs" style="font-size: 11px; line-height: 1.3;">
                            {{ perm.description }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useUsersStore } from "src/stores/user";
import { useQuasar } from "quasar";

const userStore = useUsersStore();
const $q = useQuasar();

const loading = ref(true);
const selectedRole = ref(null);
const checkedPermissions = ref([]);

const roles = computed(() => userStore.roles);
const groupedPermissions = computed(() => userStore.permissions);

// Identify if logged-in user is Super Admin
const isSuperAdmin = computed(() => {
  return userStore.userData?.data?.role === "Super Admin";
});

onMounted(async () => {
  try {
    loading.value = true;
    await Promise.all([
      userStore.fetchRoles(),
      userStore.fetchPermissions()
    ]);

    // Select the first role by default
    if (roles.value.length > 0) {
      selectRole(roles.value[0]);
    }
  } catch (error) {
    console.error("Error initializing roles/permissions dashboard:", error);
  } finally {
    loading.value = false;
  }
});

const selectRole = (role) => {
  selectedRole.value = role;
  // Initialize checked permissions with role's current permissions
  checkedPermissions.value = role.permissions.map((p) => p.id);
};

const isPermissionChecked = (permissionId) => {
  return checkedPermissions.value.includes(permissionId);
};

const togglePermission = (permissionId) => {
  if (!isSuperAdmin.value) return; // Read-only

  const index = checkedPermissions.value.indexOf(permissionId);
  if (index === -1) {
    checkedPermissions.value.push(permissionId);
  } else {
    checkedPermissions.value.splice(index, 1);
  }
};

const savePermissions = async () => {
  if (!selectedRole.value) return;

  try {
    const roleId = selectedRole.value.id;
    const response = await userStore.updateRolePermissions(roleId, checkedPermissions.value);
    
    // Refresh selected role with updated values
    const updatedRole = roles.value.find((r) => r.id === roleId);
    if (updatedRole) {
      selectedRole.value = updatedRole;
    }
  } catch (err) {
    console.error("Failed to update role permissions:", err);
  }
};

// UI Helpers for Icons
const getRoleIcon = (roleName) => {
  switch (roleName) {
    case "Super Admin": return "admin_panel_settings";
    case "Admin": return "shield";
    case "Supervisor": return "supervisor_account";
    case "Baker": return "local_pizza";
    case "Cake Maker": return "cake";
    case "Scaler": return "scale";
    case "Cashier": return "point_of_sale";
    case "Sales Clerk": return "badge";
    case "Lamesador": return "accessibility_new";
    default: return "person";
  }
};

const getGroupIcon = (groupName) => {
  switch (groupName) {
    case "System & Security": return "settings_suggest";
    case "Inventory & Logistics": return "inventory";
    case "Production & Recipes": return "restaurant_menu";
    case "HR & Payroll": return "payments";
    default: return "tune";
  }
};
</script>

<style lang="scss" scoped>
.roles-permissions-container {
  min-height: 70vh;
}

.roles-list-card {
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  height: 100%;
}

.permissions-matrix-card {
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  min-height: 60vh;
  height: 100%;
  position: relative;
}

.rounded-borders {
  border-radius: 8px;
}

.role-item {
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f5f7fa;
    transform: translateX(3px);
  }
}

.active-role-item {
  background-color: #edeef7 !important;
  color: #1a237e !important;
  border-left: 4px solid #3f51b5;
  border-radius: 0 8px 8px 0;
  
  .text-grey-9 {
    color: #1a237e !important;
  }
}

.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}

.border-bottom-subtle {
  border-bottom: 2px solid #edeef7;
}

.no-selection-wrapper {
  min-height: 50vh;
}

.permissions-scroller {
  max-height: 65vh;
  overflow-y: auto;
}

.permission-tile-card {
  border-radius: 8px;
  background-color: #fafbfc;
  transition: all 0.2s ease;
  border: 1px solid #eeeeee;

  &:hover {
    background-color: #f5f7fa;
    border-color: #cfd8dc;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.03);
  }
}

.permission-active {
  background-color: #f0f3fd !important;
  border-color: #c5cae9 !important;
  
  .text-grey-9 {
    color: #1a237e !important;
  }
}

.group-header {
  padding-bottom: 6px;
}

.body--dark {
  .roles-list-card, .permissions-matrix-card {
    background: #0f172a;
    border-color: #1e293b;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  }

  .text-grey-9 {
    color: #f8fafc !important;
  }

  .text-grey-6, .text-grey-5 {
    color: #94a3b8 !important;
  }

  .role-item {
    &:hover {
      background-color: #1e293b;
    }
  }

  .active-role-item {
    background-color: rgba(59, 130, 246, 0.08) !important;
    border-left: 4px solid #3b82f6;
    
    .text-grey-9 {
      color: #3b82f6 !important;
    }
  }

  .border-bottom {
    border-bottom: 1px solid #1e293b;
  }

  .border-bottom-subtle {
    border-bottom: 2px solid #1e293b;
  }

  .bg-grey-1 {
    background-color: #1e293b !important;
  }

  .permission-tile-card {
    background-color: #0f172a;
    border: 1px solid #1e293b;

    &:hover {
      background-color: #1e293b;
      border-color: #334155;
    }
  }

  .permission-active {
    background-color: rgba(59, 130, 246, 0.08) !important;
    border-color: rgba(59, 130, 246, 0.3) !important;
    
    .text-grey-9 {
      color: #60a5fa !important;
    }
  }
}
</style>
