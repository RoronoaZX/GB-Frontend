<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 870px; max-width: 80vw">
      <q-card-section style="background-color: #009688">
        <div class="row justify-between text-white">
          <div class="text-h6">Cake Report</div>
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <!-- {{ reports }} -->
        <q-table
          :filter="filter"
          :virtual-scroll-sticky-size-start="48"
          flat
          :columns="cakeReportColumns"
          :rows="filteredRows"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 350px"
          class="table-container sticky-header"
        >
        </q-table>
        <div class="row justify-end q-mt-md">
          <div class="text-h6">
            Overall Total Sales: {{ formatPrice(overallTotal || "0") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports"]);

console.log("Report cake:", props.reports);
const filteredRows = computed(() => {
  // Assuming `breads` is an array in `reports`
  console.log("Filtered cake rows:", props.reports || []);
  return props.reports || [];
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

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  })
    .format(price)
    .replace("₱", "₱ ");
};

const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    const salesAmount = parseFloat(row.cake_report.price) || 0;
    console.log(`Adding salesAmount: ${salesAmount} to total: ${total}`);
    return total + salesAmount;
  }, 0);
  console.log("Overall Total Sales computed as:", total);
  return total;
});

const cakeReportColumns = [
  {
    name: "name",
    label: "Cake Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.cake_report.name || "N/A"; // Adjust this according to your data
    },
  },
  {
    name: "cake_maker",
    label: "Cake Maker Name",
    field: (row) => formatFullname(row.cake_report.user.employee),
  },
  {
    name: "price",
    label: "Price",
    field: (row) => formatPrice(row.cake_report.price),
  },
  {
    name: "layers",
    label: "Layers",
    field: (row) => row.cake_report.layers,
  },
  {
    name: "sales_status",
    label: "Sale Status",
    field: (row) => row.cake_report.sales_status,
  },
];
</script>

<style lang="scss" scoped></style>
