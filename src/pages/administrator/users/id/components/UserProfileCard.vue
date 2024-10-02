<template>
  <div v-if="user && user.branch_employee">
    <q-card class="profile-card q-pa-md">
      <q-card-section class="row items-center justify-center">
        <q-avatar size="100px">
          <img
            src="https://cdn.quasar.dev/img/boy-avatar.png"
            alt="Profile Picture"
          />
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div align="center">
          <div class="text-h5 text-center">{{ user.name }}</div>
          <div class="text-subtitle2 text-center q-mb-md">
            <div class="email-container">
              <!-- Display Email with Inline Editing -->
              <q-popup-edit
                v-model="user.email"
                title="Edit Email"
                buttons
                persistent
                auto-save
                fit
                v-slot="scope"
                @save="onSave"
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
                />
              </q-popup-edit>

              <div class="email-display" @click="editEmail">
                <span class="email-text">{{ user.email }}</span>
                <q-icon name="edit" size="sm" class="edit-icon text-primary" />
              </div>
            </div>
          </div>
          <q-chip text-color="white" :color="getBadgePositionColor(user.role)">
            {{ user.role }}
          </q-chip>
        </div>
        <q-list separator>
          <q-item>
            <q-item-section>Designation:</q-item-section>
            <q-item-section>
              {{ user.branch_employee.branch?.name }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Time Shift:</q-item-section>
            <q-item-section>
              {{ formatTimeFromDB(user.branch_employee.time_shift) }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Phone:</q-item-section>
            <q-item-section>
              {{ user.phone }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Address:</q-item-section>
            <q-item-section>
              {{ user.address }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Employment Status:</q-item-section>
            <q-item-section>
              {{ `${user.status} ${user.role}` }}
            </q-item-section>
          </q-item>
        </q-list>
        <div align="center">
          <q-btn
            label="Edit Profile"
            color="positive"
            class="q-mt-md"
            @click="handleDialog(user)"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Loading, useQuasar, date, QPopupProxy } from "quasar";
import { useUsersStore } from "src/stores/user";
import UserEditDialog from "./UserEditDialog.vue";

const route = useRoute();
const router = useRouter();
const userStore = useUsersStore();
const user = computed(() => userStore.user);

console.log("Page user ID", route.params.user_id);

const getUserData = async () => {
  try {
    Loading.show(); // Show loading indicator
    const userId = route.params.user_id;
    const userRes = await userStore.fetchUserById(userId);
    console.log("Fetched User Data:", user.value);
  } catch (error) {
    console.error("Error fetching user data:", error);
  } finally {
    Loading.hide(); // Hide loading indicator
  }
};

onMounted(() => {
  getUserData(); // Fetch data when the component mounts
});

const getBadgePositionColor = (role) => {
  switch (role) {
    case "Super Admin":
      return "negative";
    case "Admin":
      return "blue-grey-8";
    case "Scaler":
      return "info";
    case "Lamesador":
      return "indigo";
    case "Hornero":
      return "purple";
    case "Baker":
      return "warning";
    case "Cashier":
      return "secondary";
    case "Sales Clerk":
      return "deep-orange";
    case "Utility":
      return "deep-purple";
    case "Not Yet Assigned":
      return "grey";
    default:
      return "grey";
  }
};

const $q = useQuasar();

const handleDialog = (userData) => {
  $q.dialog({
    component: UserEditDialog,
    componentProps: {
      userData: userData,
    },
  });
};

const formatTimeFromDB = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${String(hour).padStart(2, "0")}:${minutes} ${ampm}`;
};

const editEmail = () => {
  // Trigger the popup edit manually
  QPopupProxy.show({
    ref: "emailPopup",
  });
};
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  color: #333;
}
.user-profile-page {
  max-width: 1200px;
  margin: auto;
}

.profile-card,
.account-card,
.bills-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.profile-card q-card-section:first-child {
  margin-top: 1rem;
}

.q-list q-item {
  align-items: center;
  /* padding: 1rem 0.5rem; */
}

.q-list q-item:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}

.q-list q-item-section {
  color: #667;
  font-size: 0.9rem;
}

.q-list q-item-section:first-child {
  flex: 1 1 auto;
}

.q-list q-item-section[side] {
  flex: 0 0 auto;
}

.q-btn {
  min-width: 90px;
}

.q-btn[flat] {
  padding: 0 8px;
}

.email-container {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.email-display {
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  background-color: transparent;
}

.email-display:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.email-text {
  font-size: 1rem;
  font-weight: 400;
  color: #333;
  margin-right: 8px;
}

.edit-icon {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.email-display:hover .edit-icon {
  opacity: 1;
}

.q-popup-edit {
  max-width: 300px;
}

.popup-input {
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 6px;
}
</style>
