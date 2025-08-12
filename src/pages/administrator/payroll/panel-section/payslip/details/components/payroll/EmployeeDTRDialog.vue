<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="row items-center justify-between q-pb-md">
        <div class="col-auto">
          <div class="text-h6 text-weight-bold text-primary">
            Name: {{ formatFullname(employeesData || "N/A") }}
          </div>
          <div class="text-subtitle1 text-grey-7">
            From : {{ dtrRecord.from }} &bull; To: {{ dtrRecord.end }}
          </div>
        </div>
        <q-btn icon="close" flat dense round v-close-popup>
          <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
        </q-btn>
      </q-card-section>

      <q-card-section>
        <HolidayList :dtr-holidays="dtrHolidays" />
      </q-card-section>

      <q-card-section class="q-pt-sm">
        <DTRTable
          :dtr-rows="dtrRows"
          :employee-data="employeesData"
          :dtr-holidays="dtrHolidays"
          @dtr-summary-calculated="handleDTRSummaryCalculated"
        />
      </q-card-section>

      <q-card-section class="row justify-around q-pt-sm q-pb-md q-mt-lg">
        <div class="col-6">
          <SummaryCard
            :dtr-rows="dtrRows"
            :employee-data="employeesData"
            :dtr-record="props.dtrRecord"
            :summary-data="dtrSummaryData"
            :dtr-from="dtrRecord.from"
            :dtr-to="dtrRecord.end"
            @dtr-earnings-summary-calculated="
              handleDTREarningsSummaryCalculated
            "
          />
        </div>
        <div class="col-5">
          <DeductionSummaryCard
            :dtr-from="dtrRecord.from"
            :dtr-to="dtrRecord.end"
            :employee-data="employeesData"
            @dtr-deductions-summary-calculated="
              handleDTRDeductionsSummaryCalculated
            "
          />
        </div>
      </q-card-section>

      <!-- <q-separator spaced="md" class="q-my-md" /> -->
      <!--
      <q-card-section>
        <div align="center">NET Income: 000.00</div>
      </q-card-section> -->

      <q-card-section align="right">
        <ModifiedButton
          :disable="!isDTRSummaryReady"
          @click="handleOverAllSummaryDialog(employeesData, props.dtrRecord)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";
import { useEmployeeStore } from "src/stores/employee";
import { useRoute } from "vue-router"; // No need for useRouter if not navigating programmatically
import DTRTable from "./child-components/DTRTable.vue";
import SummaryCard from "./child-components/SummaryCard.vue";
import DeductionSummaryCard from "./child-components/DeductionSummaryCard.vue";
import HolidayList from "./child-components/HolidayList.vue";
import ModifiedButton from "src/components/buttons/ModifiedButton.vue";
import OverAllSummaryDialog from "./child-components/OverAllSummaryDialog.vue";

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const $q = useQuasar(); // Quasar instance for notifications

// const helpers = useAttendanceHelpers(); // Commented out
const props = defineProps(["dtrRecord", "employeeId"]);
console.log("dtrRecordss", props.dtrRecord);

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const employeesData = ref(null); // This will hold the specific employee's details
const route = useRoute();
const employee_id = route.params.employee_id || "";
console.log("empoyee_id", employee_id);
const dtrRows = props.dtrRecord.records || [];
const dtrHolidays = props.dtrRecord.holidays || [];

const maximizedToggle = ref(true);
const loadingTable = ref(true); // Added for loading state of the table

// --- State for summary data from DTRTable --- //
const dtrSummaryData = ref(null); // Inittialize to null
const dtrEarningsData = ref(null);
const dtrDeductionsData = ref(null);

// --- Method to handle event from DTRTable --- //

const handleDTREarningsSummaryCalculated = (summary) => {
  console.log("Parent received earnings calculated DTR summary:", summary);
  dtrEarningsData.value = summary; // Update the reactive state
};

const handleDTRDeductionsSummaryCalculated = (summary) => {
  console.log("Parent received deductions calculated DTR summary:", summary);
  dtrDeductionsData.value = summary;
};
const handleDTRSummaryCalculated = (summary) => {
  console.log("Parent received calculated DTR summary:", summary);
  dtrSummaryData.value = summary; // Update the reactive state
};

// --- Data Fetching Functions ---
const fetchEmployeeDetails = async () => {
  loadingTable.value = true;
  try {
    await employeeStore.fetchCertianEmployeeWithEmploymentTypeAndDesignation(
      employee_id
    );
    employeesData.value = employees.value; // Assign the fetched employee details
    console.log("Employee Designation Data Loaded:", employeesData.value);

    if (
      !(
        employeesData.value &&
        employeesData.value.designation &&
        employeesData.value.employment_type
      )
    ) {
      console.error(
        "Employee designation or employment_type is missing from the fetched employee data!"
      );
      $q.notify({
        type: "negative",
        message:
          "Employee's regular work hours or salary data not found. Calculations might be inaccurate.",
      });
    }
  } catch (error) {
    console.error("Error fetching employee details:", error);
    $q.notify({
      type: "negative",
      message: "Error fetching employee details. Please try again.",
    });
  } finally {
    loadingTable.value = false;
  }
};
onMounted(async () => {
  await fetchEmployeeDetails();
});

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const formatCurrency = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue === 0) {
    return "₱ 0.00";
  }
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(numValue);
};

const handleOverAllSummaryDialog = () => {
  $q.dialog({
    component: OverAllSummaryDialog,
    componentProps: {
      // Use componentProps to define the props
      employeesData: employeesData.value,
      dtrRecord: props.dtrRecord,
      dtrSummaryData: dtrSummaryData.value,
      dtrEarningsData: dtrEarningsData.value,
      dtrDeductionsData: dtrDeductionsData.value,
      formatFullnameProps: formatFullname,
      formatCurrencyProps: formatCurrency,
    },
  });
};
</script>

<style lang="scss" scoped></style>

<!-- <template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="row items-center justify-between q-pb-md">
        <div class="col-auto">
          <div class="text-h6 text-weight-bold text-primary">
            Name: {{ formatFullname(employeesData || "N/A") }}
          </div>
          <div class="text-subtitle1 text-grey-7">
            From : {{ dtrRecord.from }} &bull; To: {{ dtrRecord.end }}
          </div>
        </div>
        <q-btn icon="close" flat dense round v-close-popup>
          <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
        </q-btn>
      </q-card-section>

      <q-stepper v-model="step" color="primary" animated flat class="q-pa-md">
        <q-step
          :name="1"
          title="DTR Earnings & Deductions"
          icon="calendar_month"
          :done="step > 1"
          ><q-card-section>
            <HolidayList :dtr-holidays="dtrHolidays" />
          </q-card-section>

          <q-card-section class="q-pt-sm">
            <DTRTable
              :dtr-rows="dtrRows"
              :employee-data="employeesData"
              :dtr-holidays="dtrHolidays"
              @dtr-summary-calculated="handleDTRSummaryCalculated"
            />
          </q-card-section>

          <q-card-section class="row justify-around q-pt-sm q-pb-md q-mt-lg">
            <div class="col-6">
              <SummaryCard
                :dtr-rows="dtrRows"
                :employee-data="employeesData"
                :dtr-record="props.dtrRecord"
                :summary-data="dtrSummaryData"
                :dtr-from="dtrRecord.from"
                :dtr-to="dtrRecord.end"
              />
            </div>
            <div class="col-5">
              <DeductionSummaryCard
                :dtr-from="dtrRecord.from"
                :dtr-to="dtrRecord.end"
                :employee-data="employeesData"
              />
            </div>
          </q-card-section>

          <q-stepper-navigation>
            <q-card-section align="center">
              <ModifiedButton label="Proceed Payslip" @click="step = 2" />
            </q-card-section>
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Summary & Deductions"
          icon="summarize"
          :done="step > 2"
        >
          <q-card-section class="row justify-around q-pt-sm q-pb-md q-mt-lg">
            <div class="col-6">
              <SummaryCard
                :dtr-rows="dtrRows"
                :employee-data="employeesData"
                :dtr-record="props.dtrRecord"
                :summary-data="dtrSummaryData"
                :dtr-from="dtrRecord.from"
                :dtr-to="dtrRecord.end"
              />
            </div>
            <div class="col-5">
              <DeductionSummaryCard
                :dtr-from="dtrRecord.from"
                :dtr-to="dtrRecord.end"
                :employee-data="employeesData"
              />
            </div>
          </q-card-section>
          <q-stepper-navigation>
            <q-card-section align="center" class="row justify-center">
              <q-btn
                flat
                @click="step = 1"
                color="primary"
                label="Back"
                class="q-ml-sm"
              />
              <ModifiedButton label="Proceed Payslip" @click="step = 3" />
            </q-card-section>
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Summary & Deductions"
          icon="summarize"
          :done="step > 3"
        >
          <q-stepper-navigation>
            <q-btn @click="step = 4" color="primary" label="Continue" />
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="4" title="Finalize Payslip" icon="receipt_long">
          <q-stepper-navigation>
            <q-btn
              flat
              @click="step = 3"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";
import { useEmployeeStore } from "src/stores/employee";
import { useRoute } from "vue-router";
import DTRTable from "./child-components/DTRTable.vue";
import SummaryCard from "./child-components/SummaryCard.vue";
import DeductionSummaryCard from "./child-components/DeductionSummaryCard.vue";
import HolidayList from "./child-components/HolidayList.vue";
import ModifiedButton from "src/components/buttons/ModifiedButton.vue";
import OverAllSummaryDialog from "./child-components/OverAllSummaryDialog.vue";

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const $q = useQuasar();

const props = defineProps(["dtrRecord", "employeeId"]);
console.log("dtrRecordss", props.dtrRecord);

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const employeesData = ref(null);
const route = useRoute();
const employee_id = route.params.employee_id || "";
console.log("empoyee_id", employee_id);
const dtrRows = props.dtrRecord.records || [];
const dtrHolidays = props.dtrRecord.holidays || [];

const maximizedToggle = ref(true);
const loadingTable = ref(true);

// Stepper state
const step = ref(1); // Start at the first step

// --- State for summary data from DTRTable --- //
const dtrSummaryData = ref(null);

// --- Method to handle event from DTRTable --- //
const handleDTRSummaryCalculated = (summary) => {
  console.log("Parent received calculated DTR summary:", summary);
  dtrSummaryData.value = summary;
};

// --- Data Fetching Functions ---
const fetchEmployeeDetails = async () => {
  loadingTable.value = true;
  try {
    await employeeStore.fetchCertianEmployeeWithEmploymentTypeAndDesignation(
      employee_id
    );
    employeesData.value = employees.value;
    console.log("Employee Designation Data Loaded:", employeesData.value);

    if (
      !(
        employeesData.value &&
        employeesData.value.designation &&
        employeesData.value.employment_type
      )
    ) {
      console.error(
        "Employee designation or employment_type is missing from the fetched employee data!"
      );
      $q.notify({
        type: "negative",
        message:
          "Employee's regular work hours or salary data not found. Calculations might be inaccurate.",
      });
    }
  } catch (error) {
    console.error("Error fetching employee details:", error);
    $q.notify({
      type: "negative",
      message: "Error fetching employee details. Please try again.",
    });
  } finally {
    loadingTable.value = false;
  }
};
onMounted(async () => {
  await fetchEmployeeDetails();
});

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const handleOverAllSummaryDialog = () => {
  $q.dialog({
    component: OverAllSummaryDialog,
    // Pass any necessary props to the OverAllSummaryDialog here
    // For example, if it needs dtrSummaryData, employeeData, etc.
    props: {
      dtrSummaryData: dtrSummaryData.value,
      employeeData: employeesData.value,
      dtrRecord: props.dtrRecord,
      // ... other props it might need
    },
  });
};
</script>

<style scoped>
/* Add any specific styles for your stepper or cards here if needed */
</style> -->
