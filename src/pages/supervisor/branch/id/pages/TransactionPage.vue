<template>
  <div class="mobile-supervisor-transactions">
    <!-- Bottom Navigation Tabs -->
    <div class="bottom-nav-container">
      <q-tabs
        v-model="tab"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
        no-caps
        inline-label
        dense
        align="justify"
        class="bottom-tabs"
      >
        <q-tab
          v-for="category in categories"
          :key="category.value"
          :name="category.value"
          class="tab-item"
        >
          <div class="column items-center">
            <span class="tab-icon">{{ category.icon }}</span>
            <span class="tab-label">{{ category.label }}</span>
          </div>
        </q-tab>
      </q-tabs>
    </div>

    <!-- Tab Panels -->
    <q-tab-panels v-model="tab" animated class="tab-panels">
      <q-tab-panel
        v-for="category in categories"
        :key="category.value"
        :name="category.value"
        class="q-pa-sm"
      >
        <TransactionProduct :category="category.value" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TransactionProduct from "../card/TransactionCard.vue";

const tab = ref("bread");

const categories = [
  { value: "bread", label: "Bread", icon: "🍞" },
  { value: "selecta", label: "Selecta", icon: "🍦" },
  { value: "nestle", label: "Nestle", icon: "❄️" },
  { value: "softdrinks", label: "Drinks", icon: "🥤" },
  { value: "cake", label: "Cake", icon: "🍰" },
  { value: "other", label: "Others", icon: "⭐" },
];
</script>

<style lang="scss" scoped>
.mobile-supervisor-transactions {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 70px; // Space for bottom nav
}

.header {
  background: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-input {
  :deep(.q-field__control) {
    border-radius: 30px;
    height: 40px;
  }
}

.bottom-nav-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
}

.bottom-tabs {
  background: white;
  padding: 4px 0;

  :deep(.q-tabs__content) {
    justify-content: space-around;
  }

  :deep(.q-tab) {
    min-height: 60px;
    padding: 4px;
    border-radius: 0;

    &.q-tab--active {
      background: linear-gradient(
        180deg,
        rgba(16, 52, 50, 0.1) 0%,
        rgba(16, 52, 50, 0) 100%
      );
    }
  }
}

.tab-item {
  .tab-icon {
    font-size: 20px;
    margin-bottom: 2px;
  }

  .tab-label {
    font-size: 11px;
    font-weight: 500;
  }
}

.tab-panels {
  background: transparent;
  margin-bottom: 60px;
}

// Active tab indicator
:deep(.q-tab--active) {
  .tab-icon,
  .tab-label {
    color: #103432;
    font-weight: 600;
  }
}

// Responsive adjustments
@media (max-width: 360px) {
  .tab-label {
    font-size: 10px;
  }

  .tab-icon {
    font-size: 18px;
  }
}
</style>
