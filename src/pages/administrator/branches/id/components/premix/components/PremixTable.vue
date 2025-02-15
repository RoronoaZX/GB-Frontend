<template>
  <div class="row justify-between">
    <div>
      <q-input
        class="q-pb-lg q-pl-md"
        v-model="filter"
        outlined
        placeholder="Search"
        debounce="1000"
        style="width: 450px; max-width: 1500px; min-width: 100px"
        flat
        dense
        rounded
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="q-my-sm">
      <PremixCreate />
    </div>
  </div>
  <div>
    <q-table
      class="table-container sticky-header"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      :columns="branchPremixColumns"
      :rows="filteredRows"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 350px"
    >
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import PremixCreate from "./PremixCreate.vue";
import { usePremixStore } from "/src/stores/premix";
import { useRoute } from "vue-router";

const premixStore = usePremixStore();
const premixRows = computed(() => premixStore.premixes);

const route = useRoute();
const branchId = route.params.branch_id;
const loading = ref(false);
const filter = ref("");
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});

const filteredRows = computed(() => {
  if (!filter.value) {
    return premixRows.value;
  }
  return premixRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  if (branchId) {
    await reloadTableData(branchId);
  }
});

const reloadTableData = async (branchId) => {
  try {
    loading.value = true;
    const response = await premixStore.fetchBranchPremix(branchId);
    premixRows.value = response;
    console.log("premix branch fetch data", premixRows.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const branchPremixColumns = [
  {
    name: "name",
    label: "Premix Name",
    align: "center",
    field: (row) => row.name,
  },
  {
    name: "available_stocks",
    label: "Available Stocks",
    align: "center",
    field: "available_stocks",
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
  },
];
</script>

<style lang="scss" scoped></style>
