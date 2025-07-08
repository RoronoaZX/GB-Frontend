<template>
  <q-card flat bordered class="summary-card q-pa-md"> This is card </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const route = useRoute();
const $q = useQuasar();
const employee_id = route.params.employee_id || "";
const employeesData = ref(null);
const loadingTable = ref(true);

console.log("Summary Card", employee_id);

const fetchEmployeeDetails = async () => {
  loadingTable.value = true;
  try {
    await employeeStore.fetchCertianEmployeeWithEmploymentTypeAndDesignation(
      employee_id
    );
    employeesData.value = employees.value;
    console.log("employee Designation Data Loaded:", employeesData.value);

    if (
      !(
        employeesData.value &&
        employeesData.value.designation &&
        employeesData.value.employment_type
      )
    ) {
      console.log(
        "Employee designation or employment_type is missing from the fetched employee data!"
      );
      $q.notify({
        type: "negative",
        message:
          "Employee's regular work hours or salary data not found. Calculations might be inaccurate.",
      });
    }
  } catch (error) {
    console.log("Error fetching employee details:", error);
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
</script>
<style lang="scss" scoped>
.summary-card {
  background-color: #ffffff; // White background for summary card
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); // More prominent shadow
  border: 1px solid #e0e0e0; // Light border
}
.q-list--dense > .q-item {
  min-height: 40px; // Slightly increase item height for better touch targets
  padding: 10px 18px; // Adjust padding
}

.q-item-label {
  font-size: 14px; // Standard text size for labels
}

.q-item-section--avatar {
  min-width: 40px; // Ensure consistent icon spacing
}

.q-icon {
  font-size: 20px; // Slightly larger icons
}

.q-separator {
  background-color: #e8e8e8; // Lighter separator color
  margin: 10px 0; // Spacing for separators
}
</style>
