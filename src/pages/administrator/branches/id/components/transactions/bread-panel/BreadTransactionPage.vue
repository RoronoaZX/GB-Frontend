<template>
  <div>
    <q-table
      flat
      bordered
      :rows="pendingReports"
      :columns="sentBreadColumns"
      row-key="id"
    >
      <!-- v-model:pagination="pagination" -->
      <!-- hide-pagination
      @request="fetchSendBreadPendingReports" -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="getBadgeCategoryColor(props.row.status)">
            {{ capitalizeFirstLetter(props.row.status) }}
          </q-badge>
        </q-td>
      </template>
    </q-table>
    <!-- <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumbers"
        size="sm"
        @update:model-value="fetchSendBreadPendingReports"
      />
    </div> -->
  </div>
</template>

<script setup>
import { useBreadProductStore } from "src/stores/bread-product";
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { date } from "quasar";

const route = useRoute();
const breadProductStore = useBreadProductStore();
const pendingReports = computed(() => breadProductStore.pendingBreads);
const branchId = route.params.branch_id;

// const pagination = ref({
//   page: 1,
//   rowsNumber: 5,
// });

// const pagesNumbers = computed(() => {
//   return Math.ceil(pendingReports.value.length / pagination.value.rowsNumber);
// });

const fetchSendBreadPendingReports = async () => {
  try {
    const response = await breadProductStore.fetchPendingBreadsReport(
      branchId
      // pagination.value.page,
      // pagination.value.rowsNumber
    );

    // if (response && response.data) {
    //   pendingReports.value = response.data; // Extract the actual data
    //   pagination.value.rowsNumber = response.last_page; // Update total rows for pagination
    // } else {
    //   console.error("Invalid response format:", response);
    // }
    console.log("Pending bread reports:", response);
    // pendingReports.value = response.data;
    console.log("Pending bread reports:", pendingReports.value);
  } catch (error) {
    console.error("Error fetching pending bread reports:", error);
  }
};

// const fetchSendBreadPendingReports = async () => {
//   try {
//     const response = await breadProductStore.fetchPendingBreadsReport(
//       branchId,
//       pagination.value.page,
//       pagination.value.rowsNumber
//     );
//     pendingReports.value = response.data;
//     console.log("pending bread reports", pendingReports.value);
//     pagination.value.rowsNumber = response.data.total;
//   } catch (error) {
//     console.error("Error fetching pending bread reports:", error);
//   }
// };

onMounted(async () => {
  if (branchId) {
    await fetchSendBreadPendingReports(
      branchId
      // pagination.value.page,
      // pagination.value.rowsNumber
    );
  }
});

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
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

const sentBreadColumns = [
  {
    name: "created_at",
    label: "Date",
    align: "left",
    field: (row) => formatDate(row.created_at) || "Not Available",
    sortable: true,
  },
  {
    name: "employee",
    label: "Employee",
    align: "left",
    field: (row) => formatFullname(row.employee) || "Not Available",
    sortable: true,
  },
  {
    name: "from_branch_name",
    label: "From Branch",
    align: "left",
    field: (row) => row.from_branch.name || "Not Available",
    sortable: true,
  },
  {
    name: "to_branch_name",
    label: "To Branch",
    align: "left",
    field: (row) => row.to_branch.name || "Not Available",
  },
  {
    name: "product_name",
    label: "Product",
    align: "left",
    field: (row) => row.product.name || "Not Available",
  },
  {
    name: "bread-added",
    label: "Bread Added",
    align: "center",
    field: (row) => row.bread_added || "Not Available",
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: (row) => row.status || "Not Available",
  },
];
const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "declined":
      return "red";
    case "received":
      return "green";
    case "pending":
      return "orange";
    default:
      return "grey";
  }
};
</script>

<style lang="scss" scoped></style>
