<template>
  <div class="premium-header">
    <div class="header-content q-pa-md">
      <div class="row items-center justify-between">
        <div>
          <div class="text-h6 text-weight-bold text-white">Employees</div>
          <div class="text-caption text-white text-opacity-80">
            Manage your team members
          </div>
        </div>
        <div class="row q-gutter-sm">
          <q-btn
            unelevated
            rounded
            dense
            icon="event_note"
            label="Request Leave"
            class="request-leave-btn-modern"
            @click="$emit('request-leave')"
          />
          <q-btn
            :unelevated="!showLeaveList"
            rounded
            dense
            :icon="showLeaveList ? 'people' : 'event_available'"
            :label="showLeaveList ? 'Employees' : 'Leave List'"
            class="leave-list-btn-modern"
            @click="$emit('toggle-leave-list')"
          />
          <q-avatar size="44px" class="header-avatar">
            <q-icon name="people" color="primary" size="24px" />
          </q-avatar>
        </div>
      </div>

      <q-input
        v-model="searchValue"
        outlined
        dense
        debounce="300"
        placeholder="Search employee..."
        class="glass-search q-mt-md"
        bg-color="white"
        rounded
      >
        <template v-slot:prepend>
          <q-icon name="search" color="white" size="20px" />
        </template>
        <template v-slot:append v-if="searchValue">
          <q-icon
            name="close"
            class="cursor-pointer"
            color="white"
            size="20px"
            @click="clearSearch"
          />
        </template>
      </q-input>
    </div>
    <div class="header-curve"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  showLeaveList: Boolean,
  search: String,
});

const emit = defineEmits([
  "update:search",
  "request-leave",
  "toggle-leave-list",
]);

const searchValue = computed({
  get: () => props.search,
  set: (val) => emit("update:search", val),
});

const clearSearch = () => {
  emit("update:search", "");
};
</script>

<style scoped>
.premium-header {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-bottom: 40px;
  overflow: hidden;
}
.premium-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 50%
  );
}
.header-content {
  position: relative;
  z-index: 2;
  padding-bottom: 40px;
}
.header-avatar {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}
.header-curve {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 40px;
  background: #f8faff;
  border-radius: 40px 40px 0 0;
}
.request-leave-btn-modern,
.leave-list-btn-modern {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.15)
  );
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 8px 20px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.request-leave-btn-modern:hover,
.leave-list-btn-modern:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.35),
    rgba(255, 255, 255, 0.25)
  );
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
.glass-search :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: white;
}
.glass-search :deep(.q-field__control::before) {
  border: none !important;
}
.glass-search :deep(.q-field__native) {
  color: white;
}
.glass-search :deep(.q-field__native::placeholder) {
  color: rgba(255, 255, 255, 0.7);
}
</style>
