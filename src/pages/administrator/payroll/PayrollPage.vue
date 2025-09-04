<template>
  <q-page class="elegant-container" flat>
    <q-tabs
      v-model="tab"
      dense
      outline
      flat
      no-caps
      inline-label
      class="user-tab justify-center q-ma-md"
      align="justify"
      active-color="teal"
      indicator-color="teal"
    >
      <!-- Dashboard Tab -->
      <q-route-tab :to="{ name: 'admin-payroll-dashboard' }" exact>
        <div class="q-pa-md q-gutter-sm flex flex-column items-center">
          <q-icon
            name="insert_chart"
            size="md"
            :class="tab === 'dashboard' ? 'text-teal' : 'text-grey-7'"
          />
          <div class="text-weight-bold">Dashboard</div>
          <!-- <div class="text-caption text-grey-6">Recent Updates & Reports</div> -->
        </div>
      </q-route-tab>

      <!-- Incentives Tab -->
      <q-route-tab :to="{ name: 'admin-payroll-incentives' }" exact>
        <div class="q-pa-md q-gutter-sm flex flex-column items-center">
          <q-icon
            name="attach_money"
            size="md"
            :class="tab === 'incentives' ? 'text-teal' : 'text-grey-7'"
          />
          <div class="text-weight-bold text-lg">Salary & Incentives</div>
          <!-- <div class="text-caption text-grey-6">List & New Entries</div> -->
        </div>
      </q-route-tab>

      <!-- Employees Tab -->
      <q-route-tab :to="{ name: 'admin-payroll-employees' }" exact>
        <div class="q-pa-md q-gutter-sm flex flex-column items-center">
          <q-icon
            name="group"
            size="md"
            :class="tab === 'employees' ? 'text-teal' : 'text-grey-7'"
          />
          <div class="text-weight-bold text-lg">Employees</div>
          <!-- <div class="text-caption text-grey-6">List & New Entries</div> -->
        </div>
      </q-route-tab>
      <!-- Employees Tab -->
      <q-route-tab :to="{ name: 'admin-payroll-holidays' }" exact>
        <div class="q-pa-md q-gutter-sm flex flex-column items-center">
          <q-icon
            name="event"
            size="md"
            :class="tab === 'holidays' ? 'text-teal' : 'text-grey-7'"
          />
          <div class="text-weight-bold text-lg">Holidays</div>
          <!-- Calendar Holidays -->
          <!-- <div class="text-caption text-grey-6">List & New Entries</div> -->
        </div>
      </q-route-tab>

      <!-- Salary Tab -->
      <q-route-tab
        :to="{ name: 'admin-payroll-attendance-dtr-overview' }"
        exact
      >
        <div class="q-pa-md q-gutter-sm flex flex-column items-center">
          <q-icon
            name="access_time"
            size="md"
            :class="tab === 'attendance' ? 'text-teal' : 'text-grey-7'"
          />
          <div class="text-weight-bold text-lg">Attendance</div>
          <!-- <div class="text-caption text-grey-6">Salary Report</div> -->
        </div>
      </q-route-tab>

      <!-- Allowances & Deductions Tab -->
      <q-route-tab
        :to="{ name: 'admin-payroll-allowances-deductions-allowances' }"
        exact
      >
        <div class="q-pa-md q-gutter-sm flex flex-column items-center">
          <q-icon
            name="add_circle_outline"
            size="md"
            :class="tab === 'allowances' ? 'text-teal' : 'text-grey-7'"
          />
          <div class="text-weight-bold text-lg">Allowances & Deductions</div>
        </div>
      </q-route-tab>

      <!-- Administration Tab -->
      <q-route-tab :to="{ name: 'admin-payroll-payslip' }" exact>
        <div class="q-pa-sm q-gutter-sm flex flex-column items-center">
          <q-icon
            name="payment"
            size="md"
            :class="tab === 'payslip' ? 'text-teal' : 'text-grey-7'"
          />
          <div class="text-weight-bold text-lg">Payslip</div>
          <!-- <div class="text-caption text-grey-6">Department, Grade & Settings</div> -->
        </div>
      </q-route-tab>
    </q-tabs>
    <div style="background-color: #f7f8fc">
      <router-view />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const brancheStatusDialog = ref();

const tab = ref("dashboard");
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
