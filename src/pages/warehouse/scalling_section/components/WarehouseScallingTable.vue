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
      :columns="transactionHistoryColumns"
      :rows="transactionHistoryRow"
      row-key="name"
    >
      <template v-slot:body-cell-rawMaterialsStatus="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <WarehouseScallingTableBreadStatus />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <WarehouseScallingTableAction />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import WarehouseScallingTableAction from "./WarehouseScallingTableAction.vue";
import WarehouseScallingTableBreadStatus from "./WarehouseScallinGTableRawMaterialsStatus.vue";
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
    label: "Branch Name",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "rawMaterialsStatus",
    label: "Raw Materials Status",
    align: "center",
    field: "rawMaterialsStatus",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
  },
];

const transactionHistoryRow = [
  {
    name: "Branch 1",
  },
  {
    name: "Branch 2",
  },
  {
    name: "Branch 3",
  },
  {
    name: "Branch 4",
  },
];
</script>
