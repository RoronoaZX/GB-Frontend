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
        <q-tab
          class="text-white"
          name="allowance"
          icon="account_balance_wallet"
          label="Allowance"
        />
        <!-- view_timeline -->

        <q-tab
          class="text-white"
          name="benefits"
          icon="view_timeline"
          label="Benefits"
        />
        <q-tab
          class="text-white"
          name="uniform"
          icon="settings_accessibility"
          label="Uniform"
        />
        <!-- payments -->
        <q-tab
          class="text-white"
          name="cash-advance"
          icon="wallet"
          label="Cash Advance"
        />
        <!-- <q-tab
          class="text-white"
          name="others"
          icon="devices_other"
          label="Others"
        /> -->
      </q-tabs>
    </div>
    <q-tab-panels v-model="tab" animated>
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
    </q-tab-panels>
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
  background: linear-gradient(45deg, #502a33, #a621a6);
  border: none;
}
</style>
