<template>
  <q-card flat class="q-pa-sm" style="width: 500px; max-width: 80vw">
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
              outlined
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
        <div>Profile</div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-gutter-y-sm">
        <div>
          <q-input
            @update:model-value="$emit('updateData', signUpForm)"
            v-model="signUpForm.email"
            outlined
            dense
            placeholder="email"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Email required']"
            type="email"
            suffix="@gmail.com"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
        </div>
        <div>
          <q-input
            v-model="signUpForm.password"
            @update:model-value="$emit('updateData', signUpForm)"
            outlined
            dense
            placeholder="Password"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Password is required',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div>
          <q-input
            v-model="signUpForm.confirmPass"
            @update:model-value="$emit('updateData', signUpForm)"
            outlined
            dense
            :type="isPwdConfirm ? 'password' : 'text'"
            placeholder="Confirm password"
            lazy-rules
            :rules="[
              () =>
                signUpForm.password === signUpForm.confirmPass ||
                `Passwords doesn't match`, // Custom validation rule
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdConfirm = !isPwdConfirm"
              />
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>
    <!-- <q-card-sect
      ><q-btn label="Next" color="primary" @click="validateAndProceed"
    /></q-card-sect> -->
  </q-card>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

const confirmPass = ref("");
const isPwd = ref(true);
const isPwdConfirm = ref(true);
const altText = "Profile Picture"; // Default alt text
const size = ref(150); // Default size
const hovered = ref(false);
const imageUrl = ref("https://cdn.quasar.dev/img/boy-avatar.png"); // Default image URL

defineEmits(["updateData"]);
const { userData } = defineProps(["userData"]);

const signUpForm = reactive({
  email: "",
  password: "",
  confirmPass: "",
});

onMounted(() => {
  Object.assign(signUpForm, userData);
});

const handleImageError = () => {
  // Handle image loading error by updating the image URL
  imageUrl.value = "https://cdn.quasar.dev/img/boy-avatar.png"; // Default image URL
};

const editImage = () => {
  // Logic for editing the image (e.g., open a modal or navigate to an edit page)
  console.log("Edit image clicked");
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imageUrl.value = reader.result; // Update the image URL with the data URL of the selected file
    };
    reader.readAsDataURL(file);
  }
};
</script>
<style scoped>
.profile-picture {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 50%; /* Set border-radius to 50% for a circular avatar */
  border: 3px solid #fff; /* Add a border with white color */
}

.profile-picture img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.overlay:hover {
  opacity: 1;
}

.edit-icon {
  color: white;
  font-size: 24px;
  cursor: pointer;
}
</style>
