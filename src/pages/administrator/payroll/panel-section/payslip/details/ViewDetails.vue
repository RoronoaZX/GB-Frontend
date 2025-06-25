<template>
  <q-page class="bg-grey-2 q-pa-md">
    <!-- Header Section -->
    <div class="row items-center q-mb-md q-gutter-x-md">
      <q-btn flat round icon="arrow_back" @click="goBack" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
      </q-avatar>

      <div class="col-auto">
        <div class="text-h6">{{ formatFullname(employeesData) }}</div>
        <q-chip
          dense
          icon="fiber_manual_record"
          :color="getStatusChip(employeesData.status).chipColor"
          :text-color="getStatusChip(employeesData.status).chipTextColor"
        >
          {{ getStatusChip(employeesData.status).label }}
        </q-chip>
      </div>
      <q-separator vertical spaced />
      <q-space />
      <q-btn flat round dense icon="chevron_left" />
      <q-btn flat round dense icon="chevron_right" />
      <span class="text-body2 q-mx-sm">1 of 32</span>
      <q-btn flat round dense icon="more_vert" />
      <q-btn
        unelevated
        color="teal"
        icon="send"
        label="Send Email"
        class="q-ml-md"
        no-caps
      />
    </div>
    <!-- Tabs Navigation -->
    <q-tabs
      v-model="tab"
      align="left"
      class="text-grey-7"
      active-color="primary"
      indicator-color="primary"
      no-caps
    >
      <q-tab
        name="personal"
        icon="person_outline"
        label="Personal Information"
      />
      <q-tab name="payroll" icon="receipt_long" label="Payroll" />
      <q-tab name="time" icon="schedule" label="Time Management" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <!-- Personal Information Tab -->
      <q-tab-panel name="personal">
        <div class="row q-col-gutter-lg q-mt-none">
          <!-- Left Column -->
          <div class="col-12 col-md-8">
            <div class="column q-gutter-y-lg">
              <!-- Personal Information Card -->
              <PersonalInformationCard
                :employee="employeesData"
                @editClicked="handleEdit('personal')"
              />
              <!-- Address Information Card -->
              <AddressInformationCard
                :employee="employeesData"
                @editClicked="handleEdit('address')"
              />
              <!-- Employment Overview Card -->
              <EmploymentOverview
                :employee="employeesData"
                @editClicked="handleEdit('employment')"
              />
            </div>
          </div>
          <!-- Right Column -->
          <div class="col-12 col-md-4">
            <div class="column q-gutter-y-lg">
              <!-- Contact Information Card -->
              <ContactInformationCard
                :employee="employeesData"
                @editClicked="handleEdit('contact')"
              />
            </div>
          </div>
        </div>
      </q-tab-panel>
      <!-- Payroll Tab -->

      <!-- ** THIS IS WHERE YOU ADD THE NEW COMPONENT ** -->
      <q-tab-panel name="time">
        <TimeManagementDashboard
          v-if="employeesData"
          :employee-id="employeesData.id"
        />
      </q-tab-panel>
    </q-tab-panels>
    <!-- Main Content -->
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEmployeeStore } from "src/stores/employee";
import {
  formatFullname,
  capitalizeAddress,
} from "src/composables/employeeFunction/useEmployeeFunctions";
import PersonalInformationCard from "./components/personal-info/PersonalInformationCard.vue";
import AddressInformationCard from "./components/personal-info/AddressInformationCard.vue";
import EmploymentOverview from "./components/personal-info/EmploymentOverview.vue";
import ContactInformationCard from "./components/personal-info/ContactInformationCard.vue";
import TimeManagementDashboard from "./components/time-management/TimeManagementDashboard.vue";

const employeeStore = useEmployeeStore();
const employeesSample = computed(() => employeeStore.employees);
const employeesData = ref([]);

const isLoading = ref(true);

const tab = ref("personal");
const router = useRouter();
const route = useRoute();

const employee_id = route.params.employee_id;
console.log("Employee ID:", employee_id);

onMounted(() => {
  fetchEmployeeDetails();
});

const fetchEmployeeDetails = async () => {
  try {
    isLoading.value = true;
    employeesSample.value =
      await employeeStore.fetchCertianEmployeeWithEmploymentTypeAndDesignation(
        employee_id
      );

    console.log("Fetched Employees Sample:", employeesSample.value);

    employeesData.value = employeesSample.value;
    console.log("Employees Data:", employeesData.value);
  } catch (error) {
    console.error("Error fetching employee details:", error);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push({ name: "admin-payroll-payslip" });
};

// This function now handles the 'edit' event from any card
const handleEdit = (section) => {
  console.log(`Edit button clicked for the "${section}" section!`);
  // Here you would typically open a modal or navigate to an edit page
  // For example: router.push({ name: 'EmployeeEdit', params: { section: section } });
};

// --- HELPERS ---
// UPDATED: This object defines the styling for each status type to match the new image
const statusConfig = {
  Active: {
    label: "Active",
    chipColor: "green-6", // grey chip background
    chipTextColor: "white", // white grey text/icon
    icon: "lens",
    borderColor: "#68B984", // Green border at the bottom
  },
  Invited: {
    label: "Invited",
    chipColor: "grey-10",
    chipTextColor: "white",
    icon: "check",
    borderColor: "#333333",
  },
  Inactive: {
    label: "Inactive",
    chipColor: "grey-4",
    chipTextColor: "grey-8",
    icon: "pause",
    borderColor: "#BDBDBD",
  },
};

function getStatusChip(status) {
  return statusConfig[status] || statusConfig.Inactive;
}
</script>

<style lang="scss" scoped>
.elegant-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  // transition: box-shadow 0.3s ease-in-out;
}

.elegant-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.age-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
}
.contact-box {
  font-weight: 500;
}
.edit-btn {
  border-radius: 6px;
  padding: 0 10px;
  border-color: #e0e0e0; /* Softer outline color */
}
</style>
