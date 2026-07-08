<template>
  <q-page class="elegant-page-bg">
    <div class="flex flex-center q-py-md">
      <q-tabs
        v-model="tab"
        no-caps
        dense
        class="capsule-tabs"
        active-color="white"
        indicator-color="transparent"
      >
        <q-tab
          name="salary"
          label="Salary"
          :class="tab === 'salary' ? 'text-white active-capsule-tab' : 'text-grey-7'"
        />
        <q-tab
          name="incentives"
          label="Incentives"
          :class="tab === 'incentives' ? 'text-white active-capsule-tab' : 'text-grey-7'"
        />
      </q-tabs>
    </div>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <q-tab-panel name="salary" class="q-pa-none">
        <SalaryPage />
      </q-tab-panel>
      <q-tab-panel name="incentives" class="q-pa-none">
        <IncentivesPage />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import SalaryPage from "./salary/SalaryPage.vue";
import IncentivesPage from "./incentives/IncentivesPage.vue";

const tab = ref("salary");
</script>

<style lang="scss" scoped>
.elegant-page-bg {
  background-color: #f8fafc;
  min-height: 100vh;
}

.capsule-tabs {
  background: #e2e8f0;
  border-radius: 9999px;
  padding: 4px;
  border: 1px solid #cbd5e1;
  display: inline-flex;
  min-width: 260px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);

  :deep(.q-tab) {
    border-radius: 9999px;
    min-height: 36px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 600;
    font-size: 0.9rem;
    padding: 2px 24px;
    margin: 0 2px;
    
    &:hover {
      color: #0f172a;
    }
  }

  :deep(.q-tab--active) {
    background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
    box-shadow: 0 4px 10px rgba(13, 148, 136, 0.25);
  }

  :deep(.q-tab__indicator) {
    display: none;
  }
}
</style>
