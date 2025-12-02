<template>
  <q-dialog ref="dialogRef">
    <q-card style="width: 700px; max-width: 80vw">
      <!-- Header -->
      <q-card-section class="row items-center">
        <div>
          Changing
          <span class="text-bold">{{ formatFullname(user) }}</span> Password
        </div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup>
          <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
        </q-btn>
      </q-card-section>

      <!-- Stepper -->
      <q-card-section>
        <q-stepper
          v-model="step"
          ref="stepper"
          animated
          flat
          dense
          color="primary"
          done-color="green"
          active-color="blue"
          inactive-color="grey"
          @keyup.enter="handleEnter"
        >
          <!-- STEP 1: Verify Admin -->
          <q-step :name="1" title="Verify Admin Password" icon="password">
            <q-input
              v-model="adminPassword"
              outlined
              placeholder="Admin Password"
              :type="showAdmin ? 'text' : 'password'"
              class="q-mb-md"
            >
              <template #prepend><q-icon name="lock" /></template>
              <template #append>
                <q-icon
                  :name="showAdmin ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="showAdmin = !showAdmin"
                />
              </template>
            </q-input>

            <div v-if="errorStep1" class="text-negative text-caption q-mt-xs">
              {{ errorStep1 }}
            </div>
          </q-step>

          <!-- STEP 2: Set New Password -->
          <q-step :name="2" title="Set New Employee Password" icon="key">
            <q-input
              v-model="newPassword"
              outlined
              placeholder="New Password"
              :type="showNew ? 'text' : 'password'"
              lazy-rules
              :rules="[(val) => (val && val.length >= 6) || 'Min 6 characters']"
              class="q-mb-md"
            >
              <template #prepend><q-icon name="lock" /></template>
              <template #append>
                <q-icon
                  :name="showNew ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="showNew = !showNew"
                />
              </template>
            </q-input>

            <q-input
              v-model="confirmPassword"
              outlined
              placeholder="Confirm Password"
              :type="showConfirm ? 'text' : 'password'"
              lazy-rules
              :rules="[
                () =>
                  newPassword === confirmPassword || `Passwords don't match`,
              ]"
              class="q-mb-md"
            >
              <template #prepend><q-icon name="lock" /></template>
              <template #append>
                <q-icon
                  :name="showConfirm ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="showConfirm = !showConfirm"
                />
              </template>
            </q-input>
          </q-step>

          <!-- Navigation -->
          <template #navigation>
            <q-stepper-navigation class="q-ma-none">
              <div>
                <q-btn
                  v-if="step > 1"
                  flat
                  color="primary"
                  @click="$refs.stepper.previous()"
                  label="Back"
                  class="q-mr-sm"
                />
                <q-btn
                  color="primary"
                  :disable="isNextDisabled"
                  @click="nextStep"
                  :label="step === 2 ? 'Save' : 'Continue'"
                />
              </div>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { Notify, useDialogPluginComponent } from "quasar";
import { useUsersStore } from "src/stores/user";
import { typographyFormat } from "src/composables/typography/typography-format";

const { formatFullname } = typographyFormat();
const userStore = useUsersStore();

const props = defineProps({ user: Object });
const { dialogRef } = useDialogPluginComponent();

// Stepper
const step = ref(1);
const errorStep1 = ref("");
const failedAttempts = ref(0);

// Input fields
const adminPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

// Toggles
const showAdmin = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

// Disable next button logic
const isNextDisabled = computed(() => {
  if (step.value === 1) return adminPassword.value.length === 0;
  if (step.value === 2)
    return (
      newPassword.value.length < 6 ||
      newPassword.value !== confirmPassword.value
    );
  return false;
});

// Enter key handler
const handleEnter = () => {
  if (!isNextDisabled.value) nextStep();
};

// Stepper handler
const nextStep = async () => {
  if (step.value === 1) {
    errorStep1.value = "";
    const isValid = await userStore.verifyUserPassword(
      userStore.userData?.data?.id || 0,
      adminPassword.value
    );

    // if (!isValid) {
    //   errorStep1.value = "Invalid admin password! Are you the admin?";
    //   return;
    // }

    if (!isValid) {
      failedAttempts.value++;

      if (failedAttempts.value === 1) {
        errorStep1.value = "Invalid admin password!";
      } else if (failedAttempts.value === 2) {
        errorStep1.value = "Still incorrect. Make sure you're the admin.";
      } else if (failedAttempts.value === 3) {
        errorStep1.value = "Pag sure uy!";
      } else if (failedAttempts.value >= 4) {
        errorStep1.value = "Too many failed attempts! Please try again later.";
      }
      return;
    }

    step.value = 2;
    return;
  }

  if (step.value === 2) {
    savePassword();
  }
};

// Save password
const savePassword = async () => {
  try {
    const payload = {
      user_id: props.user.id,
      new_password: newPassword.value,
      new_password_confirmation: confirmPassword.value,
    };

    const res = await userStore.updatePassword(payload);

    console.log("response from database about password change:", res);

    if (res?.success) {
      Notify.create({
        type: "positive",
        message: res.message || "Password updated successfully.",
      });
      dialogRef.value.hide();
    } else {
      Notify.create({
        type: "negative",
        message: res.message || "Failed to update password.",
      });
    }
  } catch (err) {
    Notify.create({
      type: "negative",
      message: err.response?.data?.message || "Server error occurred.",
    });
  }
};
</script>
