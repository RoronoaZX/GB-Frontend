<template>
  <div>
    <q-input
      rounded
      outlined
      dense
      debounced="300"
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
      :columns="transactionHistoryColumns"
      :rows="transactionHistoryRow"
      row-key="name"
    >
      <template v-slot:body-cell-status="props">
        <q-td key="name" :props="props">
          <q-badge class="text-white" :color="getBadgeColor(props.row.status)">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <WarehouseTransactionAction />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import WarehouseTransactionAction from "./WarehouseTransactionAction.vue";
import { ref, watch } from "vue";

const filter = ref("");
const loadingSearchIcon = ref(false);

watch(filter, () => {
  loadingSearchIcon.value = true;
  setTimeout(() => {
    loadingSearchIcon.value = false;
  });
});
const transactionHistoryColumns = [
  {
    name: "name",
    label: "Transaction Name",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    label: "Date / Time",
    align: "center",
    field: "date",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
    sortable: true,
  },
  {
    name: "view",
    label: "View",
    align: "center",
    sortable: true,
  },
];

const transactionHistoryRow = [
  {
    name: "Transaction 1",
    date: "4/4/24 8:00 AM",
    status: "Processing",
  },
  {
    name: "Transaction 2",
    date: "4/4/24 9:00 AM",
    status: "To Receive",
  },
  {
    name: "Transaction 3",
    date: "4/4/24 10:00 AM",
    status: "Received",
  },
  {
    name: "Transaction 4",
    date: "4/4/24 11:00 AM",
    status: "Processing",
  },
  {
    name: "Transaction 5",
    date: "4/4/24 11:00 AM",
    status: "Adding Supply",
  },
];

const getBadgeColor = (status) => {
  switch (status) {
    case "Processing":
      return "blue";
    case "To Receive":
      return "red";
    case "Received":
      return "green";
    default:
      return "grey"; // default color if status doesn't match any case
  }
};
</script>
