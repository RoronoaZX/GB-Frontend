<template>
  <div>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
      <q-card style="width: 870px; max-width: 80vw">
        <q-card-section style="background-color: #607d8b">
          <div class="row justify-between text-white">
            <div class="text-h6">Other Products Report</div>
            <q-btn icon="close" flat dense round v-close-popup>
              <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
        <q-card-section>
          <q-table
            :filter="filter"
            :virtual-scroll-sticky-size-start="48"
            flat
            :columns="otherProductsReportColumn"
            :rows="filteredRows"
            row-key="name"
            virtual-scroll
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
            hide-bottom
            style="height: 350px"
            class="table-container sticky-header"
          >
            <template v-slot:body-cell-name="props">
              <q-td :props="props">
                <span>{{
                  `${capitalizeFirstLetter(props.row.other_products.name)}`
                }}</span>
              </q-td>
            </template>
            <template v-slot:body-cell-price="props">
              <q-td :props="props">
                <span>{{ `${formatPrice(props.row.price)}` }}</span>
              </q-td>
            </template>
            <template v-slot:body-cell-sales="props">
              <q-td :props="props">
                <span>{{ `${formatPrice(props.row.sales)}` }}</span>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
        <q-card-section>
          <div class="row justify-end q-mt-md">
            <div class="text-h6">
              Overall Total Sales: {{ formatPrice(overallTotal || "0") }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports"]);

const filteredRows = computed(() => {
  // Assuming `breads` is an array in `reports`
  console.log("Filtered rows:", props.reports || []);
  return props.reports || [];
});

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

const otherProductsReportColumn = [
  {
    name: "name",
    label: "Product Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.other_products.name || "N/A";
    },
  },
  {
    name: "price",
    label: "Price",
    field: "price",
  },
  {
    name: "beginnings",
    label: "Beginnings (PCS)",
    field: "beginnings",
    format: (val) => `${val}`,
  },
  {
    name: "remaining",
    label: "Remaining (PCS)",
    field: "remaining",
    format: (val) => `${val}`,
  },
  {
    name: "out",
    label: "Product Out (PCS)",
    field: "out",
    format: (val) => `${val}`,
  },
  {
    name: "sold",
    label: "Product Sold (PCS)",
    field: "sold",
    format: (val) => `${val}`,
  },
  {
    name: "sales",
    label: "Total Sales",
    field: "sales",
  },
];
const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    const salesAmount = parseFloat(row.sales) || 0;
    console.log(`Adding salesAmount: ${salesAmount} to total: ${total}`);
    return total + salesAmount;
  }, 0);
  console.log("Overall Total Sales computed as:", total);
  return total;
});
</script>

<style lang="scss" scoped></style>
