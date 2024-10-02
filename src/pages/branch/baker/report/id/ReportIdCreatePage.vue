<template>
  <div>
    <q-card flat>
      <!-- {{ report.
       }} -->
      <q-card-section>
        <div class="text-h6 text-dark row justify-between">
          <div>
            <q-btn outline flat icon="arrow_back" to="/branch/baker/report" />
          </div>
          <q-space />
          <div>
            <!-- <q-icon name="fa-solid fa-store" /> -->
            Bakers Report
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <BakersReportSearch />
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
          <!-- <div class="col">
            <ReportRawMaterialsList />
          </div> -->
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-y-md">
          <div>
            <ReportContentComponent />
          </div>
        </div>
      </q-card-section>
      <!-- <q-card-section>
        <div align="right">
          <ReportCreateComponent />
        </div>
      </q-card-section> -->
    </q-card>
  </div>
</template>

<script setup>
import ReportContentComponent from "./components/ReportListComponent.vue";
import ReportRecipeInput from "./components/ReportRecipeInputComponent.vue";
import ReportSearch from "./components/ReportSearchComponent.vue";
// import ReportRawMaterialsList from "./components/ReportRawMaterialsListComponent.vue";
// import ReportCreateComponent from "./components/ReportCreateComponent.vue";
import { useBakerReportsStore } from "src/stores/baker-report";
import { computed } from "vue";

const bakerReport = useBakerReportsStore();
const report = computed(() => bakerReport.recipes);

console.log("report", report);
</script>

<style lang="scss" scoped></style>
