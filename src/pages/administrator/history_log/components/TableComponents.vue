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
      :rows="historyLogsData"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-details="props">
        <q-td :props="props">
          <div class="row q-gutter-sm">
            <div class="text-italic text-capitalize text-bold text-primary">
              <!-- <q-badge outline color="primary"> -->
              {{ formatFullname(props.row?.user_id?.employee) || "undefined" }}
              <!-- </q-badge> -->
            </div>
            <div>
              {{ props.row?.action || "undefined" }}
            </div>
            <div class="text-italic text-capitalize text-bold text-red-6">
              {{ props.row?.designation?.name || "undefined" }}
            </div>
            <div class="text-lowercase">
              {{ props.row?.type_of_report || "undefined" }}
            </div>
            <div class="text-bold text-capitalize text-teal-5">
              {{ props.row?.name || "undefined" }}
            </div>
            <div>
              {{ props.row?.updated_field || "undefined" }}
            </div>
            <div>from</div>
            <div class="text-bold text-purple-14">
              {{ props.row?.original_data || "undefined" }}
            </div>
            <div>to</div>
            <div class="text-bold text-positive">
              {{ props.row?.updated_data || "undefined" }}
            </div>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="text-uppercase text-bold">
            {{ props.row?.action || "undefined" }}
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useHistoryLogsStore } from "src/stores/history-log";
import { date } from "quasar";

const useHistoryLogs = useHistoryLogsStore();
const historyLogsData = computed(() => useHistoryLogs.historyLogs);
console.log("historyLogsData", historyLogsData.value);

onMounted(async () => fetchHistoryLogs());

const fetchHistoryLogs = async () => {
  await useHistoryLogs.fetchHistoryLogs();
  console.log("historyLogsData", historyLogsData.value);
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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

const formatTimestamp = (val) => {
  return date.formatDate(val, "MMM DD, YYYY || hh:mm A");
};

const columns = [
  {
    name: "timestamp",
    label: "Timestamp",
    align: "left",
    field: (row) => formatTimestamp(row.created_at),
    sortable: true,
  },
  {
    name: "report_id",
    label: "Report ID",
    align: "center",
    field: "report_id",
    sortable: true,
  },
  // {
  //   name: "designation",
  //   label: "Designation",
  //   align: "left",
  //   field: (row) => row?.designation?.name || "Undefined",
  //   sortable: true,
  // },
  // {
  //   name: "type_of_report",
  //   label: "Type of Report",
  //   align: "left",
  //   field: "type_of_report",
  //   sortable: true,
  // },
  // {
  //   name: "user",
  //   label: "User",
  //   align: "left",
  //   field: (row) => formatFullname(row?.user_id?.employee) || "undefined",
  //   sortable: true,
  // },
  {
    name: "action",
    label: "Action",
    align: "left",
    field: (row) => capitalizeFirstLetter(row?.action || "undefined"),
    sortable: true,
  },
  {
    name: "details",
    label: "Details",
    align: "center",
    sortable: false,
  },
  // {
  //   name: "details",
  //   label: "Details",
  //   align: "left",
  //   field: (row) => {
  //     const user = formatFullname(row?.user_id?.employee) || "undefined";
  //     const action = row?.action || "undefined";
  //     const updatedField = row?.updated_field || "undefined";
  //     const designation = row?.designation?.name || "undefined";
  //     const typeOfReport = row?.type_of_report || "undefined";
  //     const name = row?.name || "undefined";
  //     const originalData = row?.original_data || "undefined";
  //     const updatedData = row?.updated_data || "undefiend";

  //     return `${user} ${action} ${designation} ${typeOfReport} ${name} ${updatedField} from ${originalData} to ${updatedData}`;
  //   },
  // },
];

const rows = ref([
  {
    id: 1,
    timestamp: "2025-04-23 10:15:32",
    report_id: "1",
    designation: "Branch 1",
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
    designation: "Branch 2",
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
    designation: "Warehouse",
    type_of_report: "Bakers Report",
    user: "Jame Smith",
    action: "Logout",
    details: "Session ended",
  },
]);
</script>

<style scoped lang="scss">
.elegant-table {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  background-color: #f9fafb;
  border-radius: 12px;

  thead {
    background-color: #f3f4f6;

    th {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      padding: 12px;
    }
  }

  tbody {
    tr {
      transition: background 0.2s;

      &:hover {
        background-color: #f1f5f9;
      }

      td {
        padding: 16px;
        vertical-align: middle;
        font-size: 14px;
        color: #374151;
      }
    }
  }

  .text-bold {
    font-weight: 600;
  }

  .text-muted {
    color: #6b7280;
  }

  .text-caption {
    font-size: 12px;
    color: #9ca3af;
  }
}
</style>
