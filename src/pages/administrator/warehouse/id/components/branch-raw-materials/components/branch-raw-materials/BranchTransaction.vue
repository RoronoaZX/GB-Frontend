<template>
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
        <q-icon v-else :thickness="2" color="teal" size="1em" />
      </template>
    </q-input>
  </div>
  <div>
    <q-table
      :filter="filter"
      flat
      :columns="transactionListColumns"
      :rows="premixDatas"
      row-key="name"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge outlined :color="getBadgeStatusColor(props.row.status)">
            {{ capitalizeFirstLetter(props.row.status) }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <div>
            <TransactionView
              :report="props.row"
              @update-history="updateReportHistory"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted } from "vue";
import { usePremixStore } from "src/stores/premix";
import { date as quasarDate } from "quasar";
import { useRoute } from "vue-router";
import TransactionView from "./TransactionView.vue";

const route = useRoute();
const warehouseID = computed(() => route.params.warehouse_id || null);
const premixStore = usePremixStore();
const premixDatas = computed(() => premixStore.branchPremix);
console.log("premixDatas", premixDatas.value);

const filter = ref("");
const loadingSearchIcon = ref(true);
const props = defineProps({
  branchId: Object,
});

const branchId = props.branchId;

onMounted(async () => {
  if (branchId) {
    await fetchRequestBranchPremix(branchId);
  }
  console.log("premixdatas", premixDatas.value);
});

const fetchRequestBranchPremix = async () => {
  await premixStore.fetchRequestBranchPremix(branchId);
};

watch(filter, () => {
  loadingSearchIcon.value = true;
  setTimeout(() => {
    loadingSearchIcon.value = false;
  });
});
const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMM D, YYYY - hh:mm A");
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "declined":
      return "red-6";
    case "confirmed":
      return "green";
    case "process":
      return "primary";
    case "completed":
      return "dark";
    case "to deliver":
      return "brown-9";
    case "to receive":
      return "amber-10";
    case "received":
      return "secondary";
    default:
      return "grey";
  }
};

const transactionListColumns = [
  {
    name: "name",
    label: "Transactions Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Created Date",
    field: "created_at",
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "updated_at",
    align: "center",
    label: "Updated Date",
    field: "updated_at",
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    name: "view",
    align: "right",
    label: "View",
    field: "view",
    sortable: true,
  },
];
</script>

<style lang="scss" scoped></style>
