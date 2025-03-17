<template>
  <div>
    <q-btn
      outline
      class="text-dark q-pa-sm"
      push
      dense
      elevated
      icon="add_circle"
      label="Create Baker Report"
      color="purple"
      @click="openDialog"
    ></q-btn>
  </div>

  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="background-color: #f7f8fc">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #9c27b0"
      >
        <div class="text-h6">Baker Report</div>
        <q-space />
        <div class="row q-gutter-x-md">
          <div>
            <q-btn icon="close" flat dense round v-close-popup>
              <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row q-gutter-lg">
        <div>
          <q-input
            v-model="searchQuery"
            outlined
            dense
            debounce="1000"
            style="width: 415px"
            placeholder="Search Name"
          >
            <template v-slot:append>
              <q-icon v-if="!employeeSearchLoading" name="search" />
              <q-spinner v-else color="grey" size="sm" />
            </template>
            <div
              v-if="isDropdownVisible && showUserCard"
              class="custom-list z-top"
            >
              <q-card>
                <q-list separator>
                  <!-- Loading Spinner -->
                  <q-item v-if="loading">
                    <q-item-section>
                      <q-spinner color="primary" />
                    </q-item-section>
                  </q-item>

                  <!-- No Data Available Message -->
                  <q-item v-if="!loading && !employees.length">
                    <q-item-section>
                      No data available in this branch.
                    </q-item-section>
                  </q-item>

                  <!-- Render User List -->
                  <template v-else>
                    <q-item
                      @click="autoFillUser(user)"
                      v-for="user in employees"
                      :key="user.id"
                      clickable
                    >
                      <q-item-section>
                        <q-item-label>
                          {{
                            `
                                  ${user?.firstname} ${
                              user?.middlename
                                ? user?.middlename.charAt(0).toUpperCase() + "."
                                : ""
                            } ${user?.lastname}`
                          }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
        </div>
        <q-input v-model="reportDate" type="date" outlined dense />
        <q-radio
          keep-color
          v-model="reportTime"
          val="03:00 PM"
          label="AM"
          color="cyan"
        />
        <q-radio
          keep-color
          v-model="reportTime"
          val="03:00 AM"
          label="PM"
          color="deep-orange"
        />
      </q-card-section>
      <q-card-section>
        <ReportSearch />
      </q-card-section>
      <q-card-section>
        <RecipeInput />
      </q-card-section>
      <q-card-section>
        <ReportList />
      </q-card-section>
      <q-card-section>
        <div align="right">
          <q-btn
            color="red-6"
            icon="edit"
            label="Create"
            @click="saveReports"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useEmployeeStore } from "src/stores/employee";
import { useBakerReportsStore } from "src/stores/baker-report";
import ReportSearch from "./components/ReportSearch.vue";
import RecipeInput from "./components/RecipeInput.vue";
import ReportList from "./components/ReportList.vue";

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const bakerReportStore = useBakerReportsStore();
console.log("employees", employees.value);
const dialog = ref(false);
const maximizedToggle = ref(true);
const employeeSearchLoading = ref(false);
const searchKeyword = ref("");
let userSelected = false;
const showUserCard = ref(false);
const searchQuery = ref("");
const userId = ref();

const reportTime = ref(false);
const reportDate = ref("");

const openDialog = () => (dialog.value = true);

const searchUsers = async () => {
  if (searchQuery.value) {
    employeeSearchLoading.value = true; // Set loading to true
    // const branchId = branchId;
    console.log("searchQuery.value", searchQuery.value);
    // console.log("branchId", branchId);
    await employeeStore.searchEmployee(searchQuery.value);
    // console.log("response user",);

    employeeSearchLoading.value = false;
    showUserCard.value = true;
  }
};

const isDropdownVisible = computed(() => {
  return searchQuery.value && employees.value.length > 0;
});

const autoFillUser = (user) => {
  console.log("Baker Reports", user);
  searchQuery.value = `${user.firstname} ${
    user.middlename ? user.middlename.charAt(0) + "." : ""
  } ${user.lastname}`;
  userId.value = user.id;
  console.log("userId", userId.value);
  // creditForm.name = `${user.firstname} ${
  //   user.middlename ? user.middlename.charAt(0) + "." : ""
  // } ${user.lastname}`;
  userSelected = true; // Set flag when user is selected
  showUserCard.value = false;
};

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

watch(searchQuery, (newQuery) => {
  if (newQuery.length > 2 && !userSelected) {
    searchUsers();
  } else {
    showUserCard.value = false;
  }
  userSelected = false; // Reset flag
});

const getCreatedAt = () => {
  if (!reportDate.value || !reportTime.value) return null;

  // Format like: 2025-03-17 08:00 PM
  const rawDateTime = `${reportDate.value} ${reportTime.value}`;

  // Convert to a proper datetime string (24hr format)
  const dateObj = new Date(rawDateTime);
  const formatted = dateObj.toISOString().slice(0, 19).replace("T", " ");

  return formatted;
};

const saveReports = async () => {
  const createdAt = getCreatedAt();
  if (!createdAt) {
    console.error("Invalid date or time selected");
    return;
  }

  // Add `createdAt` to each report object
  const reportsWithTimestamp = bakerReportStore.reports.map((report) => ({
    ...report,
    created_at: createdAt,
    user_id: userId.value,
  }));
  console.log("reportsWithTimestamp", reportsWithTimestamp);
  // Send the modified reports to the Pinia action
  await bakerReportStore.adminBakerCreateReports(reportsWithTimestamp);
};
</script>

<style lang="scss" scoped></style>
