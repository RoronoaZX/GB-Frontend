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
          style="width: 500px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <q-scroll-area style="height: 450px; max-width: 1500px">
        <q-card v-for="pendingReport in cakeMakerReport" :key="pendingReport">
          <div class="row justify-between q-ma-md">
            <div>
              <div class="text-subtitle1">
                {{ formatDate(pendingReport.created_at) }}
              </div>
              <div class="text-subtitle1">
                {{ formatTime(pendingReport.created_at) }}
              </div>
            </div>
            <div class="text-h6">
              {{ formatFullname(pendingReport.user.employee) }} -
              {{ capitalizeFirstLetter(pendingReport.name) }}
            </div>
            <div>
              <q-chip
                :color="getBadgeStatusColor(pendingReport.confirmation_status)"
              >
                {{ pendingReport.confirmation_status }}
              </q-chip>
              <!-- {{ getBadgeStatusColor(pendingReport.confirmation_status) }} -->
            </div>
            <div>
              <CakeReportView :report="pendingReport" />
            </div>
          </div>
        </q-card>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup>
import { date as quasarDate } from "quasar";
import { useCakeMakerReportStore } from "src/stores/cake-maker-report";
import CakeReportView from "./CakeReportView.vue";
import { computed, onMounted } from "vue";

const useCakeMakerReport = useCakeMakerReportStore();
const cakeMakerReport = computed(() => useCakeMakerReport.pendingReports);
console.log("pendong report", cakeMakerReport.value);
const branchId = localStorage.getItem("branch_id");

console.log("branch IDss", branchId);

const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};
const formatTime = (timeString) => {
  return quasarDate.formatDate(timeString, "hh:mm A");
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

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

onMounted(async () => {
  if (branchId) {
    await fetchCakeReports(branchId);
  }
});

const fetchCakeReports = async (branchId) => {
  await useCakeMakerReport.fetchCakePendingReport(branchId);
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

<style lang="scss" scoped></style>
