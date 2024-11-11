<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    @ok="handleButtonClick"
    @cancel="onDialogCancel"
  >
    <q-card style="width: 870px; max-width: 80vw">
      <q-card-section style="background-color: #03a9f4">
        <div class="row justify-between text-white">
          <div class="text-h6">Credits Report</div>
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
          :columns="creditProductsColumn"
          :rows="filteredRows"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 350px"
          class="table-container sticky-header"
        >
          <template v-slot:body-cell-productName="props">
            <q-td :props="props">
              <span>{{
                `${capitalizeFirstLetter(props.row.product.name)}`
              }}</span>
            </q-td>
          </template>
          <template v-slot:body-cell-price="props">
            <q-td :props="props">
              <span>{{ `${formatPrice(props.row.price)}` }}</span>
            </q-td>
          </template>
          <template v-slot:body-cell-total_amount="props">
            <q-td :props="props">
              <span>{{ `${formatAmount(props.row.total_amount)}` }}</span>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <div class="row justify-end q-mt-md">
          <div class="text-h6">
            Overall Credits Total: {{ formatPrice(total || "0") }}
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
const props = defineProps({
  reports: Array,
  total: Number,
});

const creditReports = props.reports;
console.log("creditReports data", creditReports);

creditReports.forEach((report, index) => {
  console.log(`Report ${index}:`, report);
  console.log(
    `Credit Products for Report ${index}:`,
    report.credit_products.total_amount
  );
});

const filteredRows = computed(() => {
  return creditReports.flatMap((report) => {
    return report.credit_products.map((product) => {
      // Parse pieces and price, calculate total_amount
      const pieces = parseInt(product.pieces, 10) || 0;
      const price = parseFloat(product.price) || 0;
      const totalAmount = pieces * price;

      // Return product with calculated total_amount added
      return {
        ...product,
        total_amount: totalAmount,
      };
    });
  });
});
console.log("All Credit Products:", filteredRows.value[0]);

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

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const creditProductsColumn = [
  {
    name: "name",
    label: "Employee Name",
    field: (row) => formatFullname(row.credit_user_id),
    align: "center",
  },
  {
    name: "productName",
    label: "Product Name",
    field: (row) => {
      return row.product.name || "N/A";
    },
    align: "center",
  },
  {
    name: "pieces",
    label: "Pieces",
    field: "pieces",
    align: "center",
  },
  {
    name: "price",
    label: "Price",
    field: "price",
    align: "center",
  },
  {
    name: "total_amount",
    label: "Total Amount",
    field: "total_amount",
    align: "center",
  },
];

// Log to verify the structure of props.reports
console.log("Reports data structure:", props.reports);

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};
const formatAmount = (total_amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(total_amount);
};

// console.log("Expenses:", filteredRows.value);
</script>

<style lang="scss" scoped></style>
