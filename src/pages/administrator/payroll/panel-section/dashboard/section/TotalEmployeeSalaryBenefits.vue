<template>
  <q-card class="q-pa-md q-mb-md q-mt-sm text-center user-card">
    <q-card-section horizontal>
      <!-- Total Employee Section -->
      <div class="col q-pa-md">
        <div class="text-h6">Total Employee</div>
        <div class="text-caption text-grey-6">Total Number Of Employees</div>
        <div class="text-h3 text-primary q-my-sm">{{ employees.length }}</div>
        <div class="text-caption text-grey-7">Employees</div>
      </div>

      <q-separator vertical />

      <!-- Salary Per Month Section -->
      <div class="col q-pa-md">
        <div class="text-h6">Salary Per Month</div>
        <div class="text-caption text-grey-6">
          Current Total Salary Per Month
        </div>
        <div class="text-h3 text-positive q-my-sm">₱ 52,962</div>
        <div class="text-caption text-grey-7">PHP</div>
      </div>

      <q-separator vertical />

      <!-- Provident Fund Section -->
      <div class="col q-pa-md">
        <div class="text-h6">Benefits Fund</div>
        <div class="text-caption text-grey-6">For all Employees Per Month</div>
        <div class="text-h3 text-warning q-my-sm">₱ 200,123</div>
        <div class="text-caption text-grey-7">PHP</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useEmployeeStore } from "src/stores/employee";
import { computed, onMounted } from "vue";

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);

onMounted(async () => {
  await fetchEmployeeData();
});

const fetchEmployeeData = async () => {
  try {
    employees.value = await employeeStore.fetchAllEmployee();
  } catch (error) {
    console.log("error fetching employee: ", error);
  }
};
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
.my-virtual-scroll {
  white-space: nowrap; /* Ensure horizontal scroll is maintained */
}

.user-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.user-tab {
  height: 100%;
  border-radius: none;
  background: #fff;
  color: #333;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

/* Custom styling for grid */
.q-table .q-pa-md {
  background-color: #f5f5f5;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, min(70px, 1fr), max(150px, 1fr));
  gap: 20px;
}
.my-card {
  margin: 8px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  display: inline-block;
  vertical-align: top; /* Align cards at the top */
  width: auto;
  min-width: 150px; /* Optional: Set a minimum width if needed */
  margin-right: 10px; /* Optional: Add space between cards */
}

.my-virtual-scroll {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 16px;
}

.my-virtual-scroll .q-card {
  display: inline-block;
  white-space: normal;
}

.my-center-text {
  text-align: center;
}
</style>
