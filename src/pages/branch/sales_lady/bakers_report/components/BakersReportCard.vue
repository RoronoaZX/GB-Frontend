<template>
  <q-page padding>
    <div class="q-gutter-md">
      <div>
        <q-input
          rounded
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          style="width: 500px; max-width: 1500px; min-width: 100px"
        >
          <template v-slot:append>
            <q-icon v-if="!loadingSearchIcon" name="search" />
            <q-spinner v-else />
          </template>
        </q-input>
      </div>
      <q-scroll-area style="height: 450px; max-width: 1500px">
        <div class="q-gutter-md q-ma-md">
          <q-card v-for="report in filteredRows" :key="report.id">
            <q-card-section>
              <div class="row justify-between">
                <div>
                  <div class="text-subtitle1">
                    {{ formatDate(report.created_at) }}
                  </div>
                  <div class="text-subtitle1">
                    {{ formatTime(report.created_at) }}
                  </div>
                </div>
                <div class="text-h6">
                  {{ formatFullname(report.user.employee) }} -
                  {{ capitalizeFirstLetter(report.branch_recipe.recipe.name) }}
                </div>
                <div>
                  <q-badge outlined :color="getBadgeStatusColor(report.status)">
                    {{ capitalizeFirstLetter(report.status) }}
                  </q-badge>
                </div>
                <div>
                  <ReportView :report="report" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>

      <q-card v-if="showNoDataMessage && filteredRows.length === 0">
        <q-card-section class="text-h6 text-center"
          >No reports found.</q-card-section
        >
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useBakerReportsStore } from "src/stores/baker-report";
import { computed, ref, watch, onMounted } from "vue";
import { date as quasarDate } from "quasar";
import ReportView from "./BakersReportView.vue";

const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
const branchId = userData.value?.employee?.branch_id || "";
const filter = ref("");
const loadingSearchIcon = ref(false);
const showNoDataMessage = ref(false);

// Fetch reports on component mount
onMounted(async () => {
  console.log("props.userID in onMounted:", branchId);
  if (branchId) {
    await fetchReports(branchId);
  }
});

// Fetch reports function
const fetchReports = async (branchId) => {
  loadingSearchIcon.value = true;
  await bakerReportStore.fetchDoughReports(branchId);
  loadingSearchIcon.value = false;
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Watch for changes in filter
watch(filter, async (newFilter) => {
  loadingSearchIcon.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loadingSearchIcon.value = false;
});

const filteredRows = computed(() => {
  if (!filter.value) {
    return bakerReportStore.reports;
  }
  const filterText = filter.value.toLowerCase();
  return bakerReportStore.reports.filter(
    (row) =>
      (row.branch_recipe.recipe.name &&
        row.branch_recipe.recipe.name.toLowerCase().includes(filterText)) ||
      (row.created_at &&
        quasarDate
          .formatDate(row.created_at, "MMMM D, YYYY")
          .toLowerCase()
          .includes(filterText)) ||
      (row.branch_recipe.recipe.category &&
        row.branch_recipe.recipe.category.toLowerCase().includes(filterText))
  );
});

console.log("baekr reports", filteredRows.value);
const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};
const formatTime = (timeString) => {
  return quasarDate.formatDate(timeString, "hh:mm A");
};

const formatUserName = (fullName) => {
  if (!fullName) return "";

  // Split the full name into parts
  const parts = fullName.split(" ");

  // Capitalize each part and handle middle initial
  const formattedParts = parts.map((part, index) => {
    if (index === 0 || index === parts.length - 1) {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    } else {
      return part.charAt(0).toUpperCase() + ".";
    }
  });

  return formattedParts.join(" ");
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

const viewReport = (report) => {
  // Navigate to the detailed view of the report or handle as needed
  console.log("Viewing report:", report);
};

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "orange";
    case "declined":
      return "negative";
    case "confirmed":
      return "green";
    default:
      return "grey";
  }
};
</script>
