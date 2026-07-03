<template>
  <q-page>
    <div class="q-pa-md elegant-container">
      <div>
        <q-input
          class="q-pb-lg"
          v-model="searchQuery"
          @update:model-value="search"
          outlined
          placeholder="Search"
          debounce="1000"
          flat
          dense
          rounded
          style="width: 100%; max-width: 600px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div v-if="loading" class="skeleton-wrapper row q-col-gutter-md">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          v-for="n in 8"
          :key="n"
        >
          <q-card class="user-card skeleton-card">
            <q-skeleton height="200px" class="q-mb-md" />
            <q-card-section class="text-center">
              <q-skeleton type="circle" size="80px" class="q-mb-md" />
              <q-skeleton type="text" width="60%" class="q-mt-lg" />
              <q-skeleton type="text" width="40%" class="q-mt-sm" />
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-skeleton type="text" width="80%" class="q-mb-sm" />
              <q-skeleton type="text" width="60%" class="q-mb-sm" />
              <q-skeleton type="text" width="70%" class="q-mb-sm" />
              <q-skeleton type="text" width="50%" class="q-mb-sm" />
              <q-skeleton type="text" width="90%" class="q-mt-md" />
            </q-card-section>
            <q-separator />
            <q-card-actions class="q-pa-md text-center">
              <q-skeleton type="rect" width="40%" height="36px" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div v-else-if="showNoDataMessage" class="data-error">
        <q-icon name="error" size="50px" color="negative" />
        <div>No data available</div>
      </div>
      <div v-else class="q-pa-md row q-col-gutter-md">
        <div
          v-for="user in users"
          :key="user.id"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-card class="user-card" :class="{ 'deactivated-card': user.is_active === false }">
            <div class="user-card-banner" :class="getBannerClass(user.role)"></div>
            <q-card-section class="text-center position-relative card-header-section">
              <div>
                <q-avatar
                  icon="person"
                  size="76px"
                  :color="getAvatarColor(user.role)"
                  text-color="white"
                  class="q-mb-md avatar-position"
                />
              </div>
              <div class="q-mt-xl text-center">
                <div
                  class="text-h6 text-weight-bold elegant-name text-capitalize"
                >
                  {{ formatFullname(user) }}
                </div>
                <q-chip
                  :class="getRoleBadgeClass(user.role)"
                  class="q-mt-sm role-badge"
                  dense
                >
                  {{ capitalizeFirstLetter(user.role || "") }}
                </q-chip>
              </div>
            </q-card-section>
            <q-separator class="separator q-mx-md" />
            <q-card-section class="q-px-lg q-py-md">
              <!-- Email Row -->
              <div class="q-mb-sm elegant-detail">
                <q-icon name="mail" class="q-mr-md text-grey-4" size="20px" />
                <q-popup-edit
                  @update:model-value="(val) => onSave(user, val)"
                  v-model="user.email"
                  title="Edit Email"
                  persistent
                  auto-save
                  buttons
                  label-set="Save"
                  label-cancel="Close"
                  fit
                  v-slot="scope"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-input
                    v-model="scope.value"
                    dense
                    type="email"
                    :rules="[emailRule]"
                    placeholder="Email"
                    class="popup-input"
                    filled
                    borderless
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>

                <div class="email-display">
                  <span class="email-text">{{ user.email }}</span>
                  <q-icon
                    name="edit"
                    size="14px"
                    class="edit-icon text-blue-3"
                  />
                </div>
              </div>

              <!-- Password Row -->
              <div class="q-mb-sm elegant-detail">
                <q-icon name="vpn_key" class="q-mr-md text-grey-4" size="20px" />
                <div class="password-fieldrow">
                  <span class="password-dots">••••••••</span>
                  <span class="change-password-link" @click="openChangePasswordDialog(user)">
                    <q-icon name="settings_backup_restore" size="14px" class="q-mr-xs" />
                    Reset
                  </span>
                </div>
              </div>

              <!-- Birthdate Row -->
              <div class="q-mb-sm elegant-detail">
                <q-icon name="calendar_today" class="q-mr-md text-grey-4" size="20px" />
                <span class="detail-text">{{ formatDate(user.birthdate || "-") }}</span>
              </div>

              <!-- Phone Row -->
              <div class="q-mb-sm elegant-detail">
                <q-icon name="smartphone" class="q-mr-md text-grey-4" size="20px" />
                <span class="detail-text">{{ user.phone || "-" }}</span>
              </div>

              <!-- Location Row -->
              <div class="q-mb-sm elegant-detail text-capitalize">
                <q-icon name="location_on" class="q-mr-md text-grey-4" size="20px" />
                <span class="detail-text">{{ capitalizeFirstLetter(user.address || "-") }}</span>
              </div>
            </q-card-section>
            
            <q-separator class="separator q-mx-md" />
            
            <q-card-actions class="row items-center justify-between q-px-lg q-py-sm">
              <div class="row items-center q-gutter-xs">
                <q-chip
                  dense
                  :color="user.is_active !== false ? 'green-5' : 'red-5'"
                  text-color="white"
                  style="font-size: 11px; font-weight: bold; margin: 0; padding: 2px 8px; border-radius: 6px;"
                >
                  {{ user.is_active !== false ? 'Active' : 'Deactivated' }}
                </q-chip>
              </div>
              <div class="row items-center">
                <span class="text-caption q-mr-sm text-grey-4" style="font-size: 11px; font-weight: 500;">
                  Account Access
                </span>
                <q-toggle
                  :model-value="user.is_active !== false"
                  :disable="!canToggleStatus(user)"
                  @update:model-value="confirmToggleStatus(user)"
                  color="green-5"
                  dense
                  size="sm"
                />
              </div>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useUsersStore } from "src/stores/user";
import { computed, onMounted, ref, watch } from "vue";
import { date, Loading, Notify, useQuasar, QPopupProxy } from "quasar";
import { useRouter } from "vue-router";
import UserEditProfile from "./UserEditProfile.vue";
import ChangingPassword from "./ChangingPassword.vue";

import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter, formatFullname, formatDate } =
  typographyFormat();
const { getUserBadgePositionColor } = badgeColor();

const userStore = useUsersStore();
const router = useRouter();
const emailPopup = ref(null);
const $q = useQuasar();
const users = computed(() => userStore.users);
/* console.log("userdatasssss  ", users.value); */

onMounted(async () => {
  await reloadUserData();
});

const reloadUserData = async () => {
  try {
    loading.value = true;
    users.value = await userStore.fetchUsers();
    if (!users.value.length) {
      showNoDataMessage.value = true;
    }
    /* console.log("Users", users.value); */
  } catch (error) {
    /* console.log("error fetching recipe: ", error); */
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

const openChangePasswordDialog = (user) => {
  $q.dialog({
    component: ChangingPassword,
    componentProps: {
      user: user,
    },
  }).onOk((data) => {
    /* console.log("Password changed data:", data); */
  });
};

const loading = ref(true);
const showNoDataMessage = ref(false);
const searchQuery = ref("");

const search = async () => {
  loading.value = true;
  showNoDataMessage.value = false;
  await userStore.searchUser(searchQuery.value);
  loading.value = false;
};

const onSave = async (user, newEmail) => {
  try {
    const id = user.id;

    users.value.email = newEmail;

    // console.log("id", id);
    // console.log("newEmail", newEmail);
    await userStore.updateEmail(id, newEmail);
    Notify.create({
      type: "positive",
      message: "yeah",
    });
  } catch (error) {
    /* console.log("===================================="); */
    /* console.log("ERRRR", error); */
    /* console.log("===================================="); */
  }
};

const handleUserDialog = (user) => {
  $q.dialog({
    component: UserEditProfile,
    componentProps: {
      user: user,
    },
  });
};

const currentUserId = computed(() => userStore.userData?.data?.id);
const currentUserRole = computed(() => userStore.userData?.data?.role || localStorage.getItem("role"));

const canToggleStatus = (targetUser) => {
  const myRole = currentUserRole.value;
  const myId = currentUserId.value;

  // If not Admin/Super Admin, they cannot toggle
  if (myRole !== "Super Admin" && myRole !== "Admin") {
    return false;
  }

  // Standard Admin cannot toggle Super Admin
  if (myRole === "Admin" && targetUser.role === "Super Admin") {
    return false;
  }

  // Cannot toggle self-deactivation
  if (myId === targetUser.id) {
    return false;
  }

  return true;
};

const confirmToggleStatus = (targetUser) => {
  const nextStateText = targetUser.is_active !== false ? "deactivate" : "activate";
  $q.dialog({
    title: "Confirm Status Change",
    message: `Are you sure you want to ${nextStateText} the account for ${formatFullname(targetUser)}?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await userStore.toggleUserStatus(targetUser.id);
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  });
};

const getBannerClass = (role) => {
  switch (role) {
    case "Super Admin": return "banner-super-admin";
    case "Admin": return "banner-admin";
    case "Supervisor": return "banner-supervisor";
    case "Baker":
    case "Cake Maker": return "banner-baker";
    case "Scaler":
    case "Lamesador": return "banner-scaler";
    case "Cashier":
    case "Sales Clerk": return "banner-sales";
    default: return "banner-default";
  }
};

const getRoleBadgeClass = (role) => {
  switch (role) {
    case "Super Admin": return "badge-super-admin";
    case "Admin": return "badge-admin";
    case "Supervisor": return "badge-supervisor";
    case "Baker":
    case "Cake Maker": return "badge-baker";
    case "Scaler":
    case "Lamesador": return "badge-scaler";
    case "Cashier":
    case "Sales Clerk": return "badge-sales";
    default: return "badge-default";
  }
};

const getAvatarColor = (role) => {
  switch (role) {
    case "Super Admin": return "deep-purple-7";
    case "Admin": return "indigo-7";
    case "Supervisor": return "orange-7";
    case "Baker":
    case "Cake Maker": return "green-7";
    case "Scaler":
    case "Lamesador": return "blue-grey-7";
    case "Cashier":
    case "Sales Clerk": return "pink-6";
    default: return "primary";
  }
};
</script>

<style lang="scss" scoped>
.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.elegant-container {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
}

.elegant-search {
  margin-bottom: 2rem;
  border-radius: 30px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  }
}

.skeleton-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.skeleton-wrapper .col-xs-12 {
  margin-bottom: 1rem;
}

.skeleton-card {
  height: 380px;
  border-radius: 16px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

/* Premium Obsidian Glass User Card */
.user-card {
  height: 100%;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.user-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.04);
  border-color: rgba(59, 130, 246, 0.3);
}

.separator {
  background: #f1f5f9;
}

/* Header & Banner Styles */
.user-card-banner {
  height: 110px;
  width: 100%;
  position: relative;
  transition: opacity 0.3s ease;
}

.card-header-section {
  padding-top: 0;
  padding-bottom: 12px;
}

.avatar-position {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid #ffffff;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
  transition: transform 0.3s ease;
}

.user-card:hover .avatar-position {
  transform: translate(-50%, -53%) scale(1.03);
}

/* Role Banner Gradients */
.banner-super-admin {
  background: linear-gradient(135deg, #6366f1, #a855f7); /* Cosmic Purple */
}

.banner-admin {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6); /* Royal Blue */
}

.banner-supervisor {
  background: linear-gradient(135deg, #f97316, #eab308); /* Warm Sun */
}

.banner-baker {
  background: linear-gradient(135deg, #0d9488, #10b981); /* Forest Emerald */
}

.banner-scaler {
  background: linear-gradient(135deg, #64748b, #94a3b8); /* Slate Steel */
}

.banner-sales {
  background: linear-gradient(135deg, #ec4899, #f43f5e); /* Vivid Pink */
}

.banner-default {
  background: linear-gradient(135deg, #4b5563, #6b7280); /* Grey Scale */
}

/* Typography & Badges */
.elegant-name {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-weight: 700;
  color: #1e293b;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.role-badge {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 4px 12px;
  border-radius: 20px;
}

/* Role Badge Pastel Classes */
.badge-super-admin {
  background-color: #f3e8ff !important;
  border: 1px solid #e9d5ff;
  color: #7e22ce !important;
}

.badge-admin {
  background-color: #e0e7ff !important;
  border: 1px solid #c7d2fe;
  color: #4338ca !important;
}

.badge-supervisor {
  background-color: #ffedd5 !important;
  border: 1px solid #fed7aa;
  color: #c2410c !important;
}

.badge-baker {
  background-color: #dcfce7 !important;
  border: 1px solid #bbf7d0;
  color: #15803d !important;
}

.badge-scaler {
  background-color: #f1f5f9 !important;
  border: 1px solid #e2e8f0;
  color: #475569 !important;
}

.badge-sales {
  background-color: #fce7f3 !important;
  border: 1px solid #fbcfe8;
  color: #be185d !important;
}

.badge-default {
  background-color: #f3f4f6 !important;
  border: 1px solid #e5e7eb;
  color: #374151 !important;
}

/* Detail Rows */
.elegant-detail {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #475569;
  font-weight: 500;
  
  .q-icon {
    opacity: 0.8;
  }
}

.detail-text {
  color: #475569;
  font-weight: 500;
}

/* Reset Password Fields */
.password-fieldrow {
  display: flex;
  align-items: center;
  width: 100%;
}

.password-dots {
  letter-spacing: 0.1em;
  font-weight: bold;
  color: #94a3b8;
  margin-right: 12px;
}

.change-password-link {
  font-size: 11px;
  font-weight: 600;
  color: #2563eb;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(37, 99, 235, 0.05);

  &:hover {
    color: #1d4ed8;
    background: rgba(37, 99, 235, 0.1);
  }
}

/* Email Customization with Inline Edit */
.email-display {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  max-width: 180px;

  &:hover {
    background-color: #f1f5f9;
    
    .edit-icon {
      opacity: 1;
      transform: scale(1.1);
    }
  }
}

.email-text {
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  margin-right: 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.edit-icon {
  opacity: 0;
  transition: all 0.2s ease;
}

.popup-input {
  font-size: 0.9rem;
}

/* Deactivated State Card Styles */
.deactivated-card {
  border-color: rgba(239, 68, 68, 0.3) !important;
  box-shadow: 0 4px 15px -3px rgba(239, 68, 68, 0.03) !important;
  
  .user-card-banner {
    filter: grayscale(80%) opacity(30%);
  }

  .elegant-name {
    color: #94a3b8;
    text-decoration: line-through;
    opacity: 0.8;
  }
  
  .role-badge {
    filter: grayscale(50%) opacity(70%);
  }

  .detail-text, .email-text, .q-icon, .password-dots {
    color: #94a3b8;
    opacity: 0.7;
  }

  .change-password-link {
    pointer-events: none;
    background: #f1f5f9;
    color: #cbd5e1;
  }

  &:hover {
    transform: none;
    box-shadow: 0 4px 15px -3px rgba(239, 68, 68, 0.03) !important;
    border-color: rgba(239, 68, 68, 0.3) !important;
  }
}

.body--dark {
  .user-card {
    background: #0f172a !important; /* Slate 900 background */
    border-color: #1e293b; /* Slate 800 border */
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
    
    &:hover {
      border-color: rgba(59, 130, 246, 0.4);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }
  }

  .separator {
    background: #1e293b;
  }

  .elegant-name {
    color: #f8fafc; /* Slate 50 text */
  }

  .detail-text {
    color: #94a3b8; /* Slate 400 text */
  }

  .password-dots {
    color: #475569; /* Slate 600 */
  }

  .change-password-link {
    color: #60a5fa; /* Blue 400 */
    background: rgba(96, 165, 250, 0.05);

    &:hover {
      color: #93c5fd;
      background: rgba(96, 165, 250, 0.1);
    }
  }

  .email-display {
    &:hover {
      background-color: #1e293b;
    }
  }

  .email-text {
    color: #94a3b8;
  }

  .avatar-position {
    border-color: #0f172a; /* Match background */
  }
  
  .deactivated-card {
    border-color: rgba(239, 68, 68, 0.2) !important;
    background: #090d16 !important;
    
    .change-password-link {
      background: #1e293b;
      color: #475569;
    }
  }

  /* Role Badge Dark Mode overrides */
  .badge-super-admin {
    background-color: rgba(168, 85, 247, 0.15) !important;
    border-color: rgba(168, 85, 247, 0.3) !important;
    color: #c084fc !important;
  }

  .badge-admin {
    background-color: rgba(59, 130, 246, 0.15) !important;
    border-color: rgba(59, 130, 246, 0.3) !important;
    color: #93c5fd !important;
  }

  .badge-supervisor {
    background-color: rgba(249, 115, 22, 0.15) !important;
    border-color: rgba(249, 115, 22, 0.3) !important;
    color: #ffb74d !important;
  }

  .badge-baker {
    background-color: rgba(16, 185, 129, 0.15) !important;
    border-color: rgba(16, 185, 129, 0.3) !important;
    color: #34d399 !important;
  }

  .badge-scaler {
    background-color: rgba(148, 163, 184, 0.15) !important;
    border-color: rgba(148, 163, 184, 0.3) !important;
    color: #cbd5e1 !important;
  }

  .badge-sales {
    background-color: rgba(236, 72, 153, 0.15) !important;
    border-color: rgba(236, 72, 153, 0.3) !important;
    color: #f472b6 !important;
  }

  .badge-default {
    background-color: rgba(75, 85, 99, 0.15) !important;
    border-color: rgba(75, 85, 99, 0.3) !important;
    color: #9ca3af !important;
  }
}
</style>
