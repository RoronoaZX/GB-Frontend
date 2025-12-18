<template>
  <q-dialog
    ref="dialogRef"
    v-model="dialog"
    @hide="onDialogHide"
    @ok="handleButtonClick"
    @cancel="onDialogCancel"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="background-color: #f7f8fc">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #595a5a"
      >
        <div class="text-h6">
          {{
            `${capitalizeFirstLetter(
              reports.branch_name
            )} ( ${reportLabel} Reports)`
          }}
        </div>
        <q-space />
        <div class="row q-gutter-x-md">
          <div>
            <q-btn icon="close" flat dense round v-close-popup>
              <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <q-tabs
            v-model="tab"
            align="justify"
            narrow-indicator
            class="q-mb-lg"
          >
            <q-tab
              class="text-purple"
              name="bakerReport"
              label="Baker Reports"
            />
            <q-tab
              class="text-orange"
              name="salesReport"
              label="Sales Report"
            />
          </q-tabs>
        </div>
        <div>
          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="scale"
            transition-next="scale"
            style="background-color: #f7f8fc"
          >
            <q-tab-panel name="bakerReport">
              <BakerReportPanel
                :bakersReport="bakerReports"
                :sales_report_id="sales_report_id"
              />
            </q-tab-panel>
            <q-tab-panel name="salesReport">
              <SalesReportPanel
                :salesReport="salesReports"
                :reportLabel="reportLabel"
                :rowIndex="rowIndex"
                :reportDate="reportDate"
                :reportId="sales_report_id"
              />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useDialogPluginComponent } from "quasar";
import BakerReportPanel from "./report-panel/BakerReportPanel.vue";
import SalesReportPanel from "./report-panel/SalesReportPanel.vue";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter } = typographyFormat();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports", "reportLabel", "rowIndex", "reportDate"]);
console.log("production report sss", props.reports);
console.log("rowIndex", props.rowIndex);
console.log("reportDate", props.reportDate);

const bakerReports = props.reports.baker_reports;
console.log("bakerReportsssss", bakerReports);
const salesReports = props.reports.sales_reports;
// const reportLabel = props.reports.reportLabel;
const sales_report_id = props.reports.sales_reports_id;
console.log("sales_reporssst_id", sales_report_id);

const emit = defineEmits(["selectReport", "hide", "ok", "cancel"]); // Declare emits

const tab = ref("bakerReport");
const maximizedToggle = ref(true);
const dialog = ref(false);

const handleButtonClick = () => {
  emit("selectReport", props.reports);
  dialog.value = true;
};
</script>

<style lang="scss" scoped>
.user-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}
</style>
