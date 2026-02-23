<template>
  <q-input
    rounded
    outlined
    dense
    debounce="300"
    v-model="searchTerm"
    placeholder="Search products..."
    class="q-mb-md"
    @update:model-value="emitSearch"
    style="width: 380px; max-width: 1500px; min-width: 100px"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";

const searchTerm = ref("");
const emit = defineEmits(["update-search"]);

const emitSearch = () => {
  emit("update-search", searchTerm);
};
</script>

<style scoped lang="scss">
.search-container {
  width: 100%;

  &.expanded {
    position: absolute;
    left: 16px;
    right: 16px;
    z-index: 1000;
    background: white;
  }
}

.mobile-collapsed {
  display: flex;
  justify-content: flex-end;

  .mobile-search-trigger {
    background: rgba(59, 130, 246, 0.1);
    width: 40px;
    height: 40px;

    :deep(.q-icon) {
      font-size: 24px;
    }
  }
}

.responsive-search {
  width: 100%;
  max-width: 500px;
  transition: all 0.3s ease;

  &.full-width {
    max-width: 100%;
  }

  :deep(.q-field__control) {
    border-radius: 100px;
    background: #f8fafc;
    transition: all 0.2s ease;
    border: 1px solid transparent;

    &:hover {
      background: #f1f5f9;
      border-color: #e2e8f0;
    }
  }

  :deep(.q-field--focused) {
    .q-field__control {
      background: white;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }

  &.mobile-search {
    :deep(.q-field__control) {
      padding-left: 12px;
    }

    :deep(.q-field__native) {
      font-size: 16px;
      padding: 12px 8px;
    }
  }
}

// Responsive breakpoints
@media (min-width: 600px) {
  .responsive-search {
    max-width: 380px;
  }
}

@media (min-width: 1024px) {
  .responsive-search {
    max-width: 420px;
  }
}
</style>
