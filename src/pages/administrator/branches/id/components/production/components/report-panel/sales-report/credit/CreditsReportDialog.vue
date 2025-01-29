<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    @ok="handleButtonClick"
    @cancel="onDialogCancel"
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section style="background-color: #03a9f4">
        <div class="row justify-between text-white">
          <div class="text-h6">Credits Report</div>
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section class="row justify-between">
        <div>
          <q-input
            class="q-pb-lg q-pl-sm dynamic-width"
            v-model="filter"
            outlined
            placeholder="Search"
            debounce="1000"
            flat
            dense
            rounded
            style="width: 500px"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div>
          <AddingCredit :reports="creditReports" :user="props.user" />
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
            Overall Total Expenses: {{ formatPrice(overallTotal || "0") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import AddingCredit from "./AddingCredit.vue";
import { useDialogPluginComponent } from "quasar";
import { ref, computed } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const dialog = ref(false);
const maximizedToggle = ref(true);
const props = defineProps({
  reports: Array,
  user: Object,
});
const filter = ref("");
const pagination = ref({
  rowsPerPage: 0,
});

const creditReports = props.reports;
console.log("creditReports data testing", creditReports);
const employee_credits_id = creditReports[0].id;
console.log("employee_credits_id", employee_credits_id);
const user = props.user;
console.log("user data testing", props.user);

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

const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    const amount = parseFloat(row.total_amount) || 0; // Ensure proper parsing and handle non-numeric values
    return total + amount;
  }, 0); // Provide an initial value for reduce
  return total;
});

// console.log("Expenses:", filteredRows.value);
</script>

<style lang="scss" scoped></style>
