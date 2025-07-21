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

      <q-card-section class="q-pt-sm q-pb-md">
        <SummaryCard
          :dtr-rows="dtrRows"
          :employee-data="employeesData"
          :dtr-record="props.dtrRecord"
          :summary-data="dtrSummaryData"
        />
        <q-card-section align="right"> </q-card-section>
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
import HolidayList from "./child-components/HolidayList.vue";

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

// --- Method to handle event from DTRTable --- //
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
</script>

<style lang="scss" scoped></style>
