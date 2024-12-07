<template>
  <q-btn
    class="bg-gradient text-white"
    outlined
    label="Stocks Reports"
    @click="openDialog"
  />

  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
    @update:model-value="onDialogChange"
  >
    <q-card>
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Selecta Stocks Reports</div>
          <div>
            <q-btn icon="close" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="selectaStocksReport"
          :columns="selectaReport"
          row-key="id"
          flat
          bordered
          dense
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
        >
          <template v-slot:body-cell-employee="props">
            <q-td :props="props">
              {{ formatFullname(props.row.employee) }}
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge :color="getBadgeCategoryColor(props.row.status)">
                {{ capitalizeFirstLetter(props.row.status) }}
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <SelectaViewStockReport
                :report="props.row.selecta_added_stocks"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useSelectaProductsStore } from "src/stores/selecta-product";
import SelectaViewStockReport from "./SelectaViewStockReport.vue";
import { date } from "quasar";

const selectaProductStore = useSelectaProductsStore();
const selectaStocksReport = computed(
  () => selectaProductStore.selectaProductReports
);
const selecta_added_stocks = selectaStocksReport.value.selecta_added_stocks;

const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
const branches_id = userData?.employee?.branch_id || "";
const dialog = ref(false);
const openDialog = async () => {
  try {
    if (branches_id) {
      await fetchSelectaProductReports(branches_id); // Fetch data before opening dialog
    }
    dialog.value = true; // Open the dialog after data is fetched
  } catch (error) {
    console.error("Error opening dialog:", error);
  }
};

const pagination = ref({
  rowsPerPage: 0,
});
const maximizedToggle = ref(true);

// const onDialogChange = async (value) => {
//   if (value) {
//     // Dialog is opening; fetch data
//     await fetchSelectaProductReports(branches_id);
//   }
// };

const fetchSelectaProductReports = async () => {
  try {
    const stocks = await selectaProductStore.fetchSelectaProductReports(
      branches_id
    );

    console.log("selectaStocksReport", selectaStocksReport.value);
  } catch (error) {
    console.log("selectaStocksReport", error);
  }
};

// onMounted(async () => {
//   if (branches_id) {
//     await fetchSelectaProductReports(branches_id);
//   }
// });

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const formatTimeFromDB = (dateString) => {
  const dateObj = new Date(dateString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return dateObj.toLocaleTimeString(undefined, options);
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

// const filteredRows = computed(() => {
//   if (!filter)
// })

const selectaReport = [
  {
    name: "date",
    align: "center",
    label: "Date",
    field: (row) => formatDate(row.created_at),
  },
  {
    name: "time",
    align: "center",
    label: "Time",
    field: (row) => formatTimeFromDB(row.created_at),
  },
  {
    name: "employee",
    align: "center",
    label: "Employee",
    field: "employee",
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
  },
  {
    name: "action",
    align: "center",
    label: "Actions",
    field: "action",
  },
];

const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "declined":
      return "red";
    case "confirmed":
      return "green";
    case "pending":
      return "orange";
    default:
      return "grey";
  }
};
const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  // background: linear-gradient(135deg, #6a11cb, #2575fc);
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  // background: linear-gradient(135deg, #8e44ad, #3498db);
}
</style>
