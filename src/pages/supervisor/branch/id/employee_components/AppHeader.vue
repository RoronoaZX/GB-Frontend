<template>
  <div class="premium-header">
    <div class="header-content q-pa-md">
      <div class="row items-center justify-between">
        <div>
          <div class="text-h6 text-weight-bold text-white">Employess</div>
          <div class="text-caption text-white">Manage your team</div>
        </div>
        <div class="row q-gutter-sm">
          <q-btn
            unelevated
            rounded
            class="action-btn"
            @click="$emit('requestLeave')"
          >
            <q-icon name="add" size="18px" /> Request
          </q-btn>

          <q-btn
            unelevated
            ropunded
            class="action-btn"
            @click="$emit('openLeaves')"
          >
            <q-icon name="event_note" size="18px" /> Leaves
            <q-badge v-if="pendingCount" floating color="negative" rounded>
              {{ pendingCount }}
            </q-badge>
          </q-btn>

          <q-btn
            unelevated
            rounded
            :class="['action-btn', { active: showLeaveList }]"
            @click="$emit('toggle')"
          >
            <q-icon :name="showLeaveList ? 'people' : 'list_alt'" size="18px" />
            {{ showLeaveList ? "Employees" : "List" }}
          </q-btn>

          <q-avatar size="44px" class="header-avatar">
            <q-icon name="people" color="primary" size="24px" />
          </q-avatar>
        </div>
      </div>

      <q-input
        :model-value="searchValue"
        @update:model-value="$emit('update:search', $event)"
        outlined
        dense
        debounce="300"
        :placeholder="showLeaveList ? 'Search leaves...' : 'Search employee...'"
        class="glass-search q-mt-md"
        bg-color="white"
        rounded
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>

        <template v-slot:append v-if="searchValue">
          <q-icon
            name="close"
            class="cursor-pointer"
            @click="$emit('update:search')"
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
  pendingCount: Number,
  search: String,
});

const emit = defineEmits([
  "toggle",
  "openLeaves",
  "requestLeave",
  "update:search",
]);

const searchValue = computed({
  fet: () => props.search,
  set: (val) => emit("update:search", val),
});
</script>

<style lang="scss" scoped>
.premium-header {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 24px 24px;
  padding-bottom: 40px;

  // Added missing header-content styles
  .header-content {
    position: relative;
    z-index: 2;
  }

  .header-avatar {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
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
}

.action-btn {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  color: white;
  font-weight: 500;
  gap: 6px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.25);

    &::before {
      width: 200px;
      height: 200px;
    }
  }

  &.active {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.25),
      rgba(255, 255, 255, 255, 0.2)
    );
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .glass-search :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white;
    transition: all 0.3s ease;

    &:focus-within {
      background: rgba(255, 255, 255, 0.3) !important;
      border-color: rgba(255, 255, 255, 0.5) !important;
    }

    &::before {
      border: none;
    }
  }

  :deep(.q-field__native) {
    color: white;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}

// Responsive styles
@media (max-width: 480px) {
  .action-btn {
    padding: 8px 12px;

    .q-icon {
      margin-right: 0;
    }
  }
}
</style>
