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
    <q-card :class="$q.dark.isActive ? 'dialog-card--dark' : 'dialog-card--light'">
      <q-card-section
        class="row items-center text-white"
        :style="$q.dark.isActive ? 'background-color: #0f172a; border-bottom: 1px solid #1e293b;' : 'background-color: #595a5a'"
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
        <!-- Notice Banner when both reports are empty -->
        <q-banner
          v-if="!hasBakerReports && !hasSalesReports"
          class="bg-amber-1 text-amber-10 rounded-borders q-mb-md border-amber"
          style="border: 1px solid #fef3c7; border-radius: 12px;"
        >
          <template v-slot:avatar>
            <q-icon name="report_problem" color="amber-9" size="md" />
          </template>
          <div class="text-weight-bold text-subtitle1">No Reports Filed for {{ reportLabel }} Shift</div>
          <div class="text-caption">
            Neither a Baker Production Report nor a Sales Report has been submitted for this shift yet.
          </div>
        </q-banner>

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
            >
              <div class="row items-center no-wrap">
                <q-icon name="bakery_dining" size="sm" class="q-mr-xs" />
                <span>Baker Reports</span>
                <q-badge
                  :color="hasBakerReports ? 'purple-8' : 'grey-6'"
                  :outline="!hasBakerReports"
                  class="q-ml-sm"
                >
                  {{ hasBakerReports ? bakerReports.length : 'No Report' }}
                </q-badge>
              </div>
            </q-tab>
            <q-tab
              class="text-orange"
              name="salesReport"
            >
              <div class="row items-center no-wrap">
                <q-icon name="receipt_long" size="sm" class="q-mr-xs" />
                <span>Sales Report</span>
                <q-badge
                  :color="hasSalesReports ? 'orange-8' : 'grey-6'"
                  :outline="!hasSalesReports"
                  class="q-ml-sm"
                >
                  {{ hasSalesReports ? salesReports.length : 'No Report' }}
                </q-badge>
              </div>
            </q-tab>
          </q-tabs>
        </div>
        <div>
          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="scale"
            transition-next="scale"
            :class="$q.dark.isActive ? 'panels--dark' : 'panels--light'"
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
import { ref, computed } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import BakerReportPanel from "./report-panel/BakerReportPanel.vue";
import SalesReportPanel from "./report-panel/SalesReportPanel.vue";

const $q = useQuasar();

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter } = typographyFormat();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports", "reportLabel", "rowIndex", "reportDate"]);

const bakerReports = props.reports?.baker_reports || [];
const salesReports = props.reports?.sales_reports || [];
const sales_report_id = props.reports?.sales_reports_id;

const hasBakerReports = computed(() => bakerReports && bakerReports.length > 0);
const hasSalesReports = computed(() => salesReports && salesReports.length > 0);

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

// Light Mode dialog card
.dialog-card--light {
  background-color: #f7f8fc;
}

// Dark Mode dialog card
.dialog-card--dark {
  background-color: #0b0f19 !important;
  color: #f8fafc !important;
}

// Light Mode tab panels
.panels--light {
  background-color: #f7f8fc;
}

// Dark Mode tab panels
.panels--dark {
  background-color: #0b0f19 !important;
  color: #f8fafc !important;
}
</style>
