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
      :rows="ransactionListRow"
      row-key="name"
    >
      <!-- <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <div>
            <TransactionView />
          </div>
        </q-td>
      </template> -->
    </q-table>
  </div>
</template>

<script setup>
// import TransactionView from "./TransactionView.vue";
import { ref, watch } from "vue";

const filter = ref("");
const loadingSearchIcon = ref(true);

watch(filter, () => {
  loadingSearchIcon.value = true;
  setTimeout(() => {
    loadingSearchIcon.value = false;
  });
});

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
    label: "Date",
    field: "date",
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
const ransactionListRow = [
  {
    name: "Transactions 1",
    date: "4/4/24",
  },
  {
    name: "Transactions 2",
    date: "4/4/24",
  },
  {
    name: "Transactions 3",
    date: "4/4/24",
  },
  {
    name: "Transactions 4",
    date: "4/4/24",
  },
];
</script>
