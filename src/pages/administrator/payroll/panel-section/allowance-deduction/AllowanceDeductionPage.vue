<template>
  <div>
    <div class="q-gutter-y-sm">
      <q-tabs
        v-model="tab"
        narrow-indicator
        no-caps
        inline-label
        dense
        align="justify"
        class="gradient-btn"
      >
        <q-route-tab
          :to="{ name: 'admin-payroll-allowances-deductions-allowances' }"
          class="text-white"
          name="allowance"
          icon="account_balance_wallet"
          label="Allowance"
        />
        <!-- view_timeline -->

        <q-route-tab
          :to="{ name: 'admin-payroll-allowances-deductions-benefits' }"
          class="text-white"
          name="benefits"
          icon="view_timeline"
          label="Benefits"
        />

        <q-route-tab
          :to="{ name: 'admin-payroll-allowances-deductions-uniforms' }"
          class="text-white"
          name="uniform"
          icon="settings_accessibility"
          label="Uniform"
        />

        <!-- payments -->
        <q-route-tab
          :to="{ name: 'admin-payroll-allowances-deductions-cash-advance' }"
          class="text-white"
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
.gradient-btn {
  background: #0e7490;
  border: none;
}
</style>
