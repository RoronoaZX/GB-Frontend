<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6" align="center">
          <div
            class="profile-picture"
            :style="{ width: size + 'px', height: size + 'px' }"
          >
            <label for="fileInput">
              <q-avatar size="150px" color="grey-2">
                <img :src="imageUrl" :alt="altText" @error="handleImageError" />
              </q-avatar>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style="display: none"
                @change="handleFileChange"
              />
            </label>
            <div class="overlay" v-if="hovered">
              <q-icon name="edit" @click="editImage" class="edit-icon" />
            </div>
          </div>
          <div class="q-mt-md">{{ formattedUserName(user) }}</div>
          <div class="q-mt-md">
            <q-chip
              :color="getBadgePositionColor(user.role)"
              text-color="white"
              class="q-mt-sm elegant-chip"
            >
              {{ user.role }}
            </q-chip>
          </div>
          <div class="q-mt-xl text-center">
            <!-- Display Email with Inline Editing -->
            <q-popup-edit
              v-model="localUser.email"
              title="Edit Email"
              buttons
              persistent
              auto-save
              fit
              @save="onSave"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-input
                v-model="localUser.email"
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
              <span class="email-text">{{ localUser.email }}</span>
              <q-icon name="edit" size="sm" class="edit-icon text-primary" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { QPopupEdit } from "quasar";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const dialogRef = ref(null);
const size = ref(150); // Default avatar size
const hovered = ref(false);
const imageUrl = ref("https://cdn.quasar.dev/img/boy-avatar.png"); // Default image URL

const handleImageError = () => {
  imageUrl.value = "https://cdn.quasar.dev/img/boy-avatar.png"; // Default fallback URL
};

const formattedUserName = (user) => {
  if (!user) return ""; // Return an empty string if user is undefined

  const { firstname, middlename, lastname } = user;

  const formattedFirstName = firstname
    ? firstname
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(" ")
    : "";
  const middleInitial = middlename
    ? `${middlename.charAt(0).toUpperCase()}.`
    : "";
  const lastInitial = lastname
    ? lastname.charAt(0).toUpperCase() + lastname.slice(1)
    : "";

  return `${formattedFirstName} ${middleInitial} ${lastInitial}`;
};

const localUser = computed({
  get: () => ({ ...props.user }),
  set: (newValue) => {
    // Mutate the local copy without modifying the original prop
    Object.assign(localUser.value, newValue);
  },
});

const getBadgePositionColor = (role) => {
  const roleColors = {
    "Super Admin": "blue-10",
    Admin: "purple-10",
    Supervisor: "teal-7",
    Scaler: "green-8",
    Lamesador: "orange-5",
    Hornero: "red-6",
    Baker: "brown",
    Cashier: "green-5",
    "Sales Clerk": "blue-5",
    Utility: "grey-7",
    "Not Yet Assigned": "grey-4",
  };
  return roleColors[role] || "grey-4"; // Default Light Gray
};

const editEmail = () => {
  dialogRef.value.show();
};

const emailRule = (value) =>
  value && value.includes("@") ? true : "Please enter a valid email";

const onSave = async (newEmail) => {
  try {
    user.value.email = newEmail;
  } catch (error) {}
};
</script>

<style lang="scss" scoped>
.profile-picture {
  position: relative;
}
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
