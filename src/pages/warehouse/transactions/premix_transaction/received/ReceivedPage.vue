<template>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="premixData.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-table
      :rows="premixData"
      :columns="receivedPremixColumns"
      v-model:pagination="pagination"
      :rows-per-page-options="[3, 5, 10, 0]"
      @request="handleRequest"
      flat
      bordered
      v-else
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge color="green">
            {{ capitalizeFirstLetter(props.row.status) }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <TransactionView :report="props.row" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useWarehousesStore } from "src/stores/warehouse";
import { usePremixStore } from "src/stores/premix";
import { date as quasarDate } from "quasar";
import { computed, onMounted, ref } from "vue";
import TransactionView from "./TransactionView.vue";
import { preFetch } from "quasar/wrappers";

const warehouseStore = useWarehousesStore();
const userData = computed(() => warehouseStore.user);
const warehouseId = userData.value.device.reference_id;
console.log("warehouseId", warehouseId);
const premixStore = usePremixStore();
const receivePremixData = computed(() => premixStore.receivePremixData);
console.log("receivePremixData", receivePremixData.value);

const premixData = ref([]);

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});
const status = ref("process");
const loading = ref(true);
const showNoDataMessage = ref(false);

onMounted(async () => {
  if (warehouseId) {
    await fetchReceivePremix(warehouseId);
  }
  console.log("receivePremixData", receivePremixData.value);
});

const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};

const formatTime = (timeString) => {
  return quasarDate.formatDate(timeString, "hh:mm A");
};
const formatTimestamp = (val) => {
  return quasarDate.formatDate(val, "MMM DD, YYYY || hh:mm A");
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

const fetchReceivePremix = async (warehouseId, page = 0, rowsPerPage = 5) => {
  try {
    loading.value = true;
    await premixStore.fetchReceivePremix(
      warehouseId,
      status.value,
      page,
      rowsPerPage
    );
    console.log("receivePremixDatssa", receivePremixData.value);

    const { data, current_page, per_page, total } = receivePremixData.value;

    premixData.value = data;
    console.log("premixData.value", premixData.value);
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;

    if (!receivePremixData.value.length) {
      showNoDataMessage.value = true;
    }
  } catch (error) {
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

const handleRequest = (props) => {
  fetchReceivePremix(
    warehouseId,
    props.pagination.page,
    props.pagination.rowsPerPage
  );
};

const receivedPremixColumns = [
  {
    name: "created_at",
    label: "Date / Time",
    align: "left",
    field: (row) => formatTimestamp(row.created_at) || "Not Available",
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
    name: "branch",
    label: "Branch Name",
    align: "left",
    field: (row) =>
      row.branch_premix.branch_recipe.branch.name || "Not Available",
    sortable: true,
  },
  {
    name: "premix_name",
    label: "Premix Name",
    align: "left",
    field: (row) => row.name || "Not Available",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    align: "left",
    field: "action",
    sortable: true,
  },
];
</script>

<style lang="scss" scoped>
$primary-dark: #2c3e50;
$accent-purple: #9c27b0;
$light-grey-bg: #f9fafb;
$border-grey: #6d6363;
$text-dark: #37474f;
$text-muted: #90a4ae;

// 🌀 Spinner Center (No change)
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}

// 📭 No Data Message (Small changes to align text size)
.no-date-message {
  padding: 60px 20px;
  color: $text-muted;

  .q-icon {
    color: $border-grey;
    opacity: 0.8;
  }

  .text-h6 {
    font-size: 1rem;
    color: $text-dark;
    font-weight: 600;
  }

  .text-body1 {
    font-size: 08rem;
    color: $text-muted;
  }
}

// 💳 Card Styling (Added Font Family, Reduced Base Size)
.elegant-card {
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-family: "Inter", sans-serif; /* 🚀 New Font Family */
  font-size: 0.8rem; /* ⬇️ Reduced from 0.85rem */

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.12);
  }
}

.emphasized-card {
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: linear-gradient(180deg, #ffffff, #f3e5f5);
}

.enhanced-card-section {
  padding: 14px; /* ⬇️ Reduced from 18px */
}

// 🏷️ Text Styles (Reduced Font Sizes)
.text-caption {
  font-size: 0.7rem; /* ⬇️ Reduced from 0.8rem */
  color: $text-muted;
}

.text-body2 {
  font-size: 0.75rem; /* ⬇️ Reduced from 0.8rem */
  color: $text-dark;
}

// ❌ Received Badge
.received-badge {
  border-radius: 16px;
  font-size: 0.7rem;
  padding: 1px 8px; /* ⬇️ Reduced padding slightly */
  background-color: $accent-purple !important;
  color: white;
  letter-spacing: 0.6px;
  box-shadow: 0 2px 5px rgba($accent-purple, 0.4);
}

// 📝 Remarks Text
.remarks-text {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.7rem; /* ⬇️ Reduced from 0.8rem */
  color: $text-muted;
  max-width: 100%;
}

// ➖ Divider
.divider-elegant {
  background-color: $border-grey;
  height: 1px;
  opacity: 0.6;
  margin: 8px 0;
}

.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
