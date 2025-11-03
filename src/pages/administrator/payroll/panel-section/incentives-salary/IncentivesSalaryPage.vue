<template>
  <q-page>
    <div class="q-gutter-y-sm">
      <q-tabs
        v-model="tab"
        narrow-indicator
        no-caps
        inline-label
        dense
        align="justify"
      >
        <q-tab
          name="salary"
          label="Salary"
          :class="tab === 'salary' ? 'text-teal' : 'text-grey-7'"
        />
        <q-tab
          name="incentives"
          label="Incentives"
          :class="tab === 'incentives' ? 'orange' : 'text-grey-7'"
        />
      </q-tabs>
    </div>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="salary">
        <SalaryPage />
      </q-tab-panel>
      <q-tab-panel name="incentives">
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
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
</style>
