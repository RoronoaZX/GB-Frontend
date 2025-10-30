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
          <q-card class="user-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section class="text-center">
              <div>
                <q-avatar
                  icon="person"
                  size="80px"
                  color="primary"
                  text-color="white"
                  class="q-mb-md absolute"
                  style="top: 0; left: 12px; transform: translateY(-50%)"
                />
              </div>
              <div class="q-mt-lg">
                <div
                  class="text-h6 text-weight-medium elegant-name text-capitalize"
                >
                  {{ formatFullname(user) }}
                </div>
                <q-chip
                  :color="getUserBadgePositionColor(user.role)"
                  text-color="white"
                  class="q-mt-sm elegant-chip"
                >
                  {{ capitalizeFirstLetter(user.role || "") }}
                </q-chip>
              </div>
            </q-card-section>
            <q-separator class="separator q-mx-md" />
            <q-card-section>
              <div class="q-mb-sm elegant-detail">
                <q-icon name="mail" class="q-mr-sm" />
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
                    size="sm"
                    class="edit-icon text-light-green-13"
                  />
                </div>
              </div>
              <div class="q-mb-sm elegant-detail">
                <q-icon name="calendar_today" class="q-mr-sm" />
                <span>{{ formatDate(user.birthdate || "-") }}</span>
              </div>
              <div class="q-mb-sm elegant-detail">
                <q-icon name="smartphone" class="q-mr-sm" />
                <span>{{ user.phone || "-" }}</span>
              </div>
              <div class="q-mb-sm elegant-detail text-capitalize">
                <q-icon name="location_on" class="q-mr-sm" />
                <span>{{ capitalizeFirstLetter(user.address || "-") }}</span>
              </div>
            </q-card-section>
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
console.log("userdatasssss  ", users.value);

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
    console.log("Users", users.value);
  } catch (error) {
    console.log("error fetching recipe: ", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
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
    console.log("====================================");
    console.log("ERRRR", error);
    console.log("====================================");
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
</script>

<style lang="scss" scoped>
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.elegant-container {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  color: #333;
}

.elegant-search {
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
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
  height: 100%;
  border-radius: 15px;
  background: linear-gradient(135deg, #232526, #414345, #737373);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.user-card {
  height: 100%;
  border-radius: 15px;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.separator {
  // background: linear-gradient(135deg, #4facfe, #00f2fe); //Beach
  background: linear-gradient(135deg, #1d976c, #93f9b9);
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.text-center {
  text-align: center;
}

.q-mb-sm {
  margin-bottom: 0.5rem;
}

.elegant-name {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: #ffffff;
}

.elegant-chip {
  background-color: #007bff;
  border-radius: 8px;
  color: #fff;
}

.elegant-chip-outline {
  border-color: #007bff;
  color: #007bff;
}

.elegant-detail {
  display: flex;
  align-items: center;
  color: #ffffff;
}

.elegant-btn {
  color: #00ffd5;
  border-color: #007bff;
  font-weight: 600;
}

.edit-icon {
  color: white;
}
.email-display {
  cursor: pointer;
  display: flex;
  align-items: center;
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
  color: #ffffff;
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
