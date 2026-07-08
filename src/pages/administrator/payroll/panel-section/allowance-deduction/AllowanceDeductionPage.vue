<template>
  <div class="elegant-container">
    <div class="q-mb-md">
      <q-tabs
        v-model="tab"
        no-caps
        inline-label
        dense
        align="left"
        class="modern-subtabs"
        active-color="emerald"
        indicator-color="transparent"
      >
        <q-route-tab
          :to="{ name: 'admin-payroll-allowances-deductions-allowances' }"
          name="allowance"
          icon="account_balance_wallet"
          label="Allowance"
        />

        <q-route-tab
          :to="{ name: 'admin-payroll-allowances-deductions-benefits' }"
          name="benefits"
          icon="view_timeline"
          label="Benefits"
        />

        <q-route-tab
          :to="{ name: 'admin-payroll-allowances-deductions-uniforms' }"
          name="uniform"
          icon="settings_accessibility"
          label="Uniform"
        />

        <q-route-tab
          :to="{ name: 'admin-payroll-allowances-deductions-cash-advance' }"
          name="cash-advance"
          icon="wallet"
          label="Cash Advance"
        />
      </q-tabs>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("allowance");
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
}

.modern-subtabs {
  background: #ffffff;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(226, 232, 240, 0.8);
  
  :deep(.q-tab) {
    min-height: 40px;
    padding: 0 20px;
    border-radius: 8px;
    margin: 0 4px;
    color: #64748b;
    font-weight: 600;
    transition: all 0.25s ease;

    .q-tab__icon {
      font-size: 18px;
      margin-right: 6px;
    }

    &:hover {
      color: #0f172a;
      background: #f1f5f9;
    }
  }

  :deep(.q-tab--active) {
    color: #0d9488 !important; /* Emerald/Teal color */
    background: #f0fdf4 !important; /* Soft green/teal background */
    box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.15);
  }
}
</style>
