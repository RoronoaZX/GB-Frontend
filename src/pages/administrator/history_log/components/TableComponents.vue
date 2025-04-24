<template>
  <div>
    <q-table
      class="table-container elegant-container sticky-header"
      :virtual-scroll-sticky-size-start="48"
      flat
      style="height: 500px"
      :rows-per-page-options="[0]"
      hide-bottom
      title="Activity Logs"
      :rows="rows"
      :columns="columns"
      row-key="id"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const columns = [
  {
    name: "timestamp",
    label: "Timestamp",
    align: "left",
    field: "timestamp",
    sortable: true,
  },
  {
    name: "report_id",
    label: "Report ID",
    align: "center",
    field: "report_id",
    sortable: true,
  },
  {
    name: "type_of_report",
    label: "Type of Report",
    align: "left",
    field: "type_of_report",
    sortable: true,
  },
  { name: "user", label: "User", align: "left", field: "user", sortable: true },
  {
    name: "action",
    label: "Action",
    align: "left",
    field: "action",
    sortable: true,
  },
  { name: "details", label: "Details", align: "left", field: "details" },
];

const rows = ref([
  {
    id: 1,
    timestamp: "2025-04-23 10:15:32",
    report_id: "1",
    type_of_report: "Sales Report",
    user: "John Doe",
    action: "Updated",
    details:
      "User updated AM sales report bread product Francis beginnings from 25 pcs to 30 pcs",
  },
  {
    id: 2,
    timestamp: "2025-04-23 10:17:45",
    report_id: "2",
    type_of_report: "Bakers Report",
    user: "JOhn Doe",
    action: "Updated",
    details:
      "User updated AM bakers report UBE YOYO Recipe kilo from 1 kg/s to 2 kg/s ",
  },
  {
    id: 3,
    timestamp: "2025-04-23 10:20:02",
    report_id: "3",
    type_of_report: "Bakers Report",
    user: "Jame Smith",
    action: "Logout",
    details: "Session ended",
  },
]);
</script>

<style scoped lang="scss">
.table-container {
  max-height: 500px;
  overflow: hidden;
}

.elegant-container {
  background: #f7f8fc;
  padding: 1rem;
  border-radius: 8px;
}
</style>
