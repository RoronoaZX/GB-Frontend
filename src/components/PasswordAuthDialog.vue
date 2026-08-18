<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
  >
    <q-card class="confirm-auth-card q-pa-md" style="width: 420px; max-width: 92vw; border-radius: 16px;">
      <q-card-section class="row items-center q-pb-none">
        <q-avatar
          icon="lock"
          :color="color"
          text-color="white"
          size="40px"
          class="q-mr-sm shadow-1"
        />
        <div>
          <div class="text-subtitle1 text-weight-bold" :class="`text-${color}`">
            {{ title || 'Authentication Required' }}
          </div>
          <div class="text-caption text-grey-6">
            Confidential Document Security
          </div>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="text-body2 text-grey-8 q-mb-sm">
          {{ description || `Please enter your password to authorize downloading` }}
          <strong :class="`text-${color}`">{{ label }}</strong>.
        </div>
        <q-input
          :model-value="password"
          @update:model-value="$emit('update:password', $event)"
          :type="showPassword ? 'text' : 'password'"
          label="Enter Your Password"
          outlined
          dense
          autofocus
          class="q-mt-sm"
          @keyup.enter="$emit('confirm')"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="$emit('update:showPassword', !showPassword)"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right" class="q-pt-none q-gutter-x-sm">
        <q-btn flat label="Cancel" color="grey-7" no-caps v-close-popup />
        <q-btn
          unelevated
          :label="confirmLabel || 'Confirm & Download'"
          :color="color"
          no-caps
          class="q-px-md rounded-btn"
          :loading="loading"
          @click="$emit('confirm')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Authentication Required",
  },
  label: {
    type: String,
    default: "Document",
  },
  description: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "primary",
  },
  confirmLabel: {
    type: String,
    default: "Confirm & Download",
  },
});

defineEmits(["update:modelValue", "update:password", "update:showPassword", "confirm"]);
</script>

<style scoped>
.confirm-auth-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
}
.rounded-btn {
  border-radius: 8px;
}
</style>
