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
        <!-- {{ reports }} -->
        <div class="text-subtitle1 text-weight-regular">
          <div>
            Name:
            {{ formatFullname(currentReport?.user?.employee || "No Report") }}
          </div>
          <div>
            Date: {{ formatDate(currentReport?.created_at || "No report") }}
          </div>
          <div>
            Time:
            {{ formatTimeFromDB(currentReport?.created_at || "No report") }}
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
import { ref } from "vue";
import { date, useQuasar } from "quasar";
import { useDialogPluginComponent } from "quasar";
import BreadTable from "./products-report/BreadTable.vue";
import SelectaTable from "./products-report/SelectaTable.vue";
import SoftdrinksTable from "./products-report/SoftdrinksTable.vue";
import OtherProductsTable from "./products-report/OtherProductsTable.vue";
import CreditsReportsTable from "./products-report/CreditsReportsTable.vue";
import ExpensesTable from "./products-report/ExpensesTable.vue";
import DenominationCard from "./products-report/DenominationCard.vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports", "reportLabel"]);
console.log("props sales report", props.reports[0]);

// Determine the active report (use reports[0] or fall back to reports[1])
const currentReport = props.reports[0] || props.reports[1] || null;

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

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const formatTimeFromDB = (dateString) => {
  const dateObj = new Date(dateString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return dateObj.toLocaleTimeString(undefined, options);
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str
      ? str
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")
      : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const handleButtonClick = () => {
  emit("selectReport", props.reports);
  dialog.value = true;
};
</script>

<style lang="scss" scoped></style>
