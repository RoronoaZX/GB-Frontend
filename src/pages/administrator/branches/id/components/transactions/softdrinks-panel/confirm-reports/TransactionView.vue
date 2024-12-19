<template>
  <div>
    <q-btn
      color="accent"
      icon="visibility"
      size="md"
      flat
      round
      dense
      @click="openDialog"
    />
  </div>
  <q-dialog v-model="dialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">Softdrinks Added Stocks Report</div>
          <q-btn
            class="close-btn"
            color="grey-8"
            flat
            round
            dense
            icon="close"
            @click="dialog = false"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div>Cashier: {{ formatFullname(report.employee) }}</div>
        <div>
          Branch:
          {{ report.branch.name }}
        </div>
        <div>
          Status:
          <q-badge color="green" outlined> {{ report.status }} </q-badge>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="filteredRows"
          :columns="transactionsColumns"
          row-key="id"
          flat
          bordered
          dense
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 350px"
          class="table-container sticky-header"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useSoftdrinksProductStore } from "src/stores/softdrinks-products";
import { computed, ref } from "vue";

const softdrinksProductStore = useSoftdrinksProductStore();
const remarkDialog = ref(false);
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const filteredRows = computed(() => {
  console.log("Filtered rows:", props.report || []);
  return props.report.softdrinks_added_stocks || [];
});

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

const transactionsColumns = [
  {
    name: "product_name",
    label: "Product Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.product.name || "N/A"; // Adjust this according to your data
    },
    align: "left",
  },
  {
    name: "price",
    label: "Price",
    align: "center",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.price || "N/A"; // Adjust this according to your data
    },
  },
  {
    name: "added_stocks",
    label: "Added Stocks",
    align: "center",
    // field: (row) => {
    //   console.log("Row data:", row); // Debug each row's data
    //   return row.added_stocks || "N/A"; // Adjust this according to your data
    // },
    field: (row) => (row.added_stocks ? `${row.added_stocks} pcs` : "N/A"),
  },
];
</script>

<style lang="scss" scoped></style>
