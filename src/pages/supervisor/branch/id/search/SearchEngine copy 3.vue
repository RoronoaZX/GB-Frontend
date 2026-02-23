<template>
  <div class="search-container" :class="{ expanded: isExpanded || searchTerm }">
    <!-- Mobile: Collapsed State -->
    <div
      v-if="$q.screen.ltSm && !isExpanded && !searchTerm"
      class="mobile-collapsed"
    >
      <q-btn
        round
        dense
        flat
        icon="search"
        color="primary"
        @click="isExpanded = true"
        class="mobile-search-trigger"
      />
    </div>

    <!-- Desktop & Expanded Mobile -->
    <q-input
      v-else
      rounded
      outlined
      dense
      debounce="300"
      v-model="searchTerm"
      @input="emitSearch"
      :placeholder="placeholderText"
      class="responsive-search"
      :class="{
        'mobile-search': $q.screen.ltSm,
        'full-width': $q.screen.ltSm,
      }"
      @update:model-value="emitSearch"
      @blur="handleBlur"
      autofocus
    >
      <template v-slot:prepend v-if="$q.screen.gt.xs">
        <q-icon name="search" color="grey-6" />
      </template>

      <template v-slot:append>
        <q-icon
          v-if="searchTerm"
          name="close"
          class="cursor-pointer"
          @click="clearSearch"
          color="grey-5"
          size="20px"
        />
        <q-icon
          v-else-if="$q.screen.ltSm"
          name="arrow_back"
          class="cursor-pointer"
          @click="collapseSearch"
          color="grey-5"
          size="20px"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const searchTerm = ref("");
const isExpanded = ref(false);
const searchInput = ref(null);

const emit = defineEmits(["update:model-value"]);

const placeholderText = computed(() => {
  if ($q.screen.xs) return "Search products...";
  return "Search by name or category";
});

const emitSearch = () => {
  emit("update:model-value", searchTerm.value);
};

const clearSearch = () => {
  searchTerm.value = "";
  emitSearch();
};

const handleBlur = () => {
  if ($q.screen.ltSm && !searchTerm.value) {
    setTimeout(() => {
      if (!searchTerm.value) {
        isExpanded.value = false;
      }
    }, 200);
  }
};

const collapseSearch = () => {
  if (!searchTerm.value) {
    isExpanded.value = false;
  }
};

watch(isExpanded, async (newVal) => {
  if (newVal) {
    await nextTick();
    searchTerm.value?.focus();
  }
});
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
