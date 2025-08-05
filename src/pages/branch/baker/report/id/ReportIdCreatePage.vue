<template>
  <div>
    <q-card flat>
      <q-card-section>
        <div class="text-h6 text-dark row justify-between">
          <div>
            <q-btn outline flat icon="arrow_back" @click="goBack" />
          </div>
          <q-space />
          <div>Bakers Report</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <ReportSearch />
        </div>
        <div class="q-gutter-y-md">
          <div>
            <ReportRecipeInput />
          </div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="q-gutter-y-md">
          <div>
            <ReportListComponent />
          </div>
        </div>
      </q-card-section>
      <q-separator></q-separator>

      <EmployeeWithInShiftsComponent />

      <q-separator></q-separator>

      <div align="right" class="q-mt-md">
        <q-btn
          outlined
          color="red-6"
          icon="edit"
          label="Create"
          @click="saveReports"
        />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import ReportListComponent from "./components/ReportListComponent.vue";
import ReportRecipeInput from "./components/ReportRecipeInputComponent.vue";
import ReportSearch from "./components/ReportSearchComponent.vue";
import EmployeeWithInShiftsComponent from "./components/EmployeeWithInShiftsComponent.vue";
import { useBakerReportsStore } from "src/stores/baker-report";
import { computed } from "vue";

const router = useRouter();
const bakerReport = useBakerReportsStore();
const report = computed(() => bakerReport.recipes);

console.log("report", report);
const goBack = () => {
  bakerReport.clearData(); // Clear the data in the store
  router.push("/branch/baker/report"); // Navigate back
};

const saveReports = async () => {
  bakerReport.createReports();
};
</script>

<style lang="scss" scoped></style>
