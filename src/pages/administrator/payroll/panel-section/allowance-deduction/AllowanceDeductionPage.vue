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
    <!-- <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="allowance">
        <div>
          <AllowanceTable />
        </div>
      </q-tab-panel>
      <q-tab-panel name="benefits">
        <div>
          <DeductionTable />
        </div>
      </q-tab-panel>
      <q-tab-panel name="uniform">
        <div>
          <UniformTable />
        </div>
      </q-tab-panel>
      <q-tab-panel name="cash-advance">
        <div>
          <CashAdvanceTable />
        </div>
      </q-tab-panel>
    </q-tab-panels> -->
  </div>
</template>

<script setup>
import AllowanceTable from "./allowance-section/AllowanceTable.vue";
import DeductionTable from "./benefits-section/BenefitsTable.vue";
import UniformTable from "./uniform-section/UniformTable.vue";
import CashAdvanceTable from "./cash-advance-section/CashAdvanceTable.vue";
import { ref } from "vue";

const tab = ref("allowance");
</script>

<style lang="scss" scoped>
.gradient-btn {
  /*16. Charcoal to Slate */
  // background: linear-gradient(to right, #1e293b, #334155);

  /*17. Black to Dark Purple */
  // background: linear-gradient(to right, #0f172a, #312e81);

  /*18. Gray to Graphite */
  // background: linear-gradient(to right, #6b7280, #111827);

  // /*19. Navy to Midnight */
  // background: linear-gradient(to right, #1e3a8a, #0f172a);
  background: #0e7490;
  // background: #6b7280;

  // /*20. Smoky Blue to Ink */
  // background: linear-gradient(to right, #475569, #1e293b);

  // /* 9. Pale Blue to Aqua */
  // background: linear-gradient(to right, #1e909f, #26c6da);
  /* 2. Slate to Navy */
  // background: linear-gradient(to right, #64748b, #1e3a8a);

  // background: linear-gradient(to right, #64748b, #1e293b);
  border: none;
}
</style>
