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
              currentReport?.branch?.name || "No Report in this Branch"
            )} ( ${reportLabel} Report)`
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
        <div class="row justify-between">
          <div class="text-subtitle1 text-weight-regular">
            <div v-if="currentReport.employee_salescharges_reports?.length">
              <div class="text-weight-medium">Employee:</div>
              <div
                v-for="(
                  charge, index
                ) in currentReport.employee_salescharges_reports"
                :key="index"
                class="q-ml-md"
              >
                <div>
                  <div class="text-overline">
                    {{
                      `${formatFullname(charge.employee)} - ${
                        charge?.employee?.position
                      }`
                    }}
                  </div>
                  <div class="text-caption">
                    Short / Charges:
                    {{ formatPrice(charge.charge_amount || 0) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              Employee:
              {{ formatFullname(currentReport?.user?.employee || "No report") }}
            </div>
            <div>
              Date: {{ formatDate(currentReport?.created_at || "No report") }}
            </div>
            <div>
              Time:
              {{ formatTimeFromDB(currentReport?.created_at || "No report") }}
            </div>
          </div>

          <div>
            <q-btn
              v-if="confirmedOrDeclinedNegativeProducts.length"
              unelevated
              color="red-1"
              text-color="red-9"
              icon="warning_amber"
              label="Negative Products"
              class="text-weight-bold"
              @click="handleNegativeProductsDialog(negativeProducts)"
            >
              <q-badge floating color="red-9" text-color="white" rounded>
                {{ negativeProducts.length }}
              </q-badge>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <BreadTable :breadReports="breadReports || 'No Report'" />
      </q-card-section>
      <q-card-section>
        <SelectaTable :selectaReports="selectaReports || 'No Report'" />
      </q-card-section>
      <q-card-section>
        <SoftdrinksTable
          :softdrinksReports="softdrinksReports || 'No Report'"
        />
      </q-card-section>
      <q-card-section>
        <OtherProductsTable
          :otherProductsReport="otherProductsReport || 'No Report'"
        />
      </q-card-section>
      <q-card-section>
        <CreditsReportsTable :creditsReports="creditsReports || 'No Report'" />
      </q-card-section>
      <q-card-section>
        <ExpensesTable :expensesReports="expensesReports || 'No Report'" />
      </q-card-section>
      <q-card-section>
        <DenominationCard
          :denominationReports="denominationReports || 'No Report'"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { date, useQuasar } from "quasar";
import { useDialogPluginComponent } from "quasar";
import BreadTable from "./products-report/BreadTable.vue";
import SelectaTable from "./products-report/SelectaTable.vue";
import SoftdrinksTable from "./products-report/SoftdrinksTable.vue";
import OtherProductsTable from "./products-report/OtherProductsTable.vue";
import CreditsReportsTable from "./products-report/CreditsReportsTable.vue";
import ExpensesTable from "./products-report/ExpensesTable.vue";
import DenominationCard from "./products-report/DenominationCard.vue";
import NegativeProductsReport from "./negative-products/NegativeProductsReport.vue";

import { typographyFormat } from "src/composables/typography/typography-format";

const {
  capitalizeFirstLetter,
  formatFullname,
  formatDate,
  formatTime,
  formatPrice,
} = typographyFormat();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports", "reportLabel"]);
console.log("props sales report", props.reports[0]);

const $q = useQuasar();

// Determine the active report (use reports[0] or fall back to reports[1])
const currentReport = props.reports[0] || props.reports[1] || null;

console.log("currentReport", currentReport);

// Handle report-specific data
const breadReports = currentReport?.bread_reports || "No report";
const selectaReports = currentReport?.selecta_reports || "No report";
const softdrinksReports = currentReport?.softdrinks_reports || "No report";
const otherProductsReport =
  currentReport?.other_products_reports || "No report";
const expensesReports = currentReport?.expenses_reports || "No report";
const creditsReports = currentReport?.credit_reports || "No report";
const denominationReports = currentReport?.denomination_reports || "No report";

const emit = defineEmits(["selectReport", "hide", "ok", "cancel"]); // Declare emits

const username = props.reports.user;
console.log("username", username);
const maximizedToggle = ref(true);
const dialog = ref(false);

const formatTimeFromDB = (dateString) => {
  const dateObj = new Date(dateString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return dateObj.toLocaleTimeString(undefined, options);
};

const handleButtonClick = () => {
  emit("selectReport", props.reports);
  dialog.value = true;
};

const handleNegativeProductsDialog = (negativeProducts) => {
  $q.dialog({
    component: NegativeProductsReport,
    componentProps: {
      negativeProducts: negativeProducts,
    },
  });
};

const negativeProducts = computed(() => {
  if (!currentReport) return [];

  const negatives = [];

  const processCategory = (items, type) => {
    (items || []).forEach((item) => {
      const beginnings = Number(item.beginnings || 0);
      const added = Number(item.new_production || item.added_stocks || 0);
      const remaining = Number(item.remaining || 0);
      const out = Number(item.bread_out || item.out || 0);
      const price = Number(item.price || 0);
      const status = item.status || "pending";

      const total = beginnings + added;
      const sold = total - (remaining + out);
      const sales = sold * price;

      if ((sales < 0 && status === "confirmed") || status === "declined") {
        negatives.push({
          type,
          name:
            item.bread?.name ||
            item.selecta?.name ||
            item.softdrinks?.name ||
            item.other_products?.name ||
            "Unknown",
          sold,
          price,
          sales,
          beginnings,
          added,
          remaining,
          out,
          status,
        });
      }
    });
  };

  processCategory(currentReport.bread_reports, "Bread");
  processCategory(currentReport.selecta_reports, "Selecta");
  processCategory(currentReport.softdrinks_reports, "Soft Drinks");
  processCategory(currentReport.other_products_reports, "Other Products");

  console.log("Negative Products:", negatives);

  return negatives;
});

console.log("negativeProducts", negativeProducts.value);

// Alias for template clarity
const confirmedOrDeclinedNegativeProducts = negativeProducts;
</script>

<style lang="scss" scoped></style>
