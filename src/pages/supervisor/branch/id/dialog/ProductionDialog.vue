<template>
  <q-dialog
    ref="dialogRef"
    v-model="dialog"
    @hide="onDialogHide"
    @cancel="onDialogCancel"
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="slide-right"
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
            )} ( ${reportsLabel} Reports)`
          }}
        </div>
        <q-space />
        <div class="row q-gutter-x-md">
          <div>
            <q-btn icon="keyboard_arrow_right" flat dense round v-close-popup>
              <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <div class="custom-toggle row no-wrap q-pa-sm">
        <q-btn
          :class="['toggle-btn', bakerToggleClass]"
          unelevated
          no-caps
          @click="tab = 'bakerReport'"
        >
          <q-icon name="bakery_dining" size="xs" class="q-mr-xs" />
          Bakers Report
          <q-badge v-if="bakerReports.length" floating color="positive" rounded>
            {{ bakerReports.length }}
          </q-badge>
        </q-btn>

        <q-btn
          :class="['toggle-btn', salesToggleClass]"
          unelevated
          no-caps
          @click="tab = 'salesReport'"
        >
          <q-icon name="point_of_sale" size="xs" class="q-mr-xs" />
          Sales Report
          <q-badge v-if="salesReports.length" floating color="positive" rounded>
            {{ salesReports.length }}
          </q-badge>
        </q-btn>
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
            <div class="report-content">
              <BakerReportsCard
                :bakerReports="bakerReports"
                :salesReportId="sales_report_id"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="salesReport">
            <!-- Sales Report Content -->
            <div class="report-content">
              <SalesReportsCard
                :salesReport="salesReports"
                :reportLabel="reportsLabel"
                :rowIndex="rowIndex"
                :reportDate="reportDate"
                :reportId="sales_report_id"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import BakerReportsCard from "../card/BakerReportsCard.vue";
import SalesReportsCard from "../card/SalesReportsCard.vue";
import { typographyFormat } from "src/composables/typography/typography-format";
import { computed, ref } from "vue";

const { capitalizeFirstLetter } = typographyFormat();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps([
  "reports",
  "reportsLabel",
  "rowIndex",
  "reportDate",
]);

console.log("production report sss", props.props);

console.log("production report sss", props.reports);
console.log("reportLabel", props.reportsLabel);
console.log("rowIndex", props.rowIndex);
console.log("reportDatessss", props.reportDate);

const bakerReports = props.reports.baker_reports;
console.log("bakerReportsss", bakerReports);

const salesReports = props.reports.sales_reports;

const sales_report_id = props.reports.sales_reports_id;
console.log("sales_reports_id", sales_report_id);

const tab = ref("bakerReport");
const maximizedToggle = ref(true);
const dialog = ref(false);
</script>

<style scoped lang="scss">
.custom-toggle {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;

  .toggle-btn {
    flex: 1;
    padding: 8px 16px;
    position: relative;
    transition: all 0.3s ease;

    &:first-child {
      border-right: 1px solid #e2e8f0;
    }

    &.bg-deep-orange {
      background-color: #ff5722 !important;
      color: white;
    }

    &.bg-light-blue-7 {
      background-color: #0288d1 !important;
      color: white;
    }

    &.bg-grey-3 {
      background-color: #e0e0e0 !important;
      color: black;
    }

    &:hover:not(.bg-deep-orange):not(.bg-light-blue-7) {
      background-color: #d0d0d0 !important;
    }
  }
}
</style>
