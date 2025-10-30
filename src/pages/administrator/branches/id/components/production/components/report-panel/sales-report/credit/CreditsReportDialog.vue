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
          <AddingCredit
            :reports="creditReports"
            :user="props.user"
            :userId="userId"
            :saleReportId="salesReportId"
          />
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
              <span>{{ `${formatPrice(props.row.total_amount)}` }}</span>
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

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice, formatFullname } =
  typographyFormat();

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();

const dialog = ref(false);
const maximizedToggle = ref(true);
const props = defineProps({
  reports: {
    type: Array,
    default: () => [], // Default to empty array if reports are not provided
  },
  user: {
    type: Object,
    default: () => ({}), // Default to empty object if user is not provided
  },
  salesReportId: {
    type: Number,
    default: null, // Default to null if salesReportId is not provided
  },
  userId: {
    type: Number,
    default: null, // Default to null if userId is not provided
  },
});

console.log("Credit Reports:", props.reports);
console.log("User Data:", props.user);
console.log("Sales Report ID:", props.salesReportId);
console.log("User ID:", props.userId);
const filter = ref("");
const pagination = ref({
  rowsPerPage: 0,
});

const creditReports = props.reports;
const user = props.user;

if (!creditReports.length) {
  console.warn("No credit reports provided!");
}

const filteredRows = computed(() => {
  return creditReports.flatMap((report) => {
    return (
      report.credit_products?.map((product) => {
        const pieces = parseInt(product.pieces, 10) || 0;
        const price = parseFloat(product.price) || 0;
        const totalAmount = pieces * price;

        return {
          ...product,
          total_amount: totalAmount,
        };
      }) || []
    ); // Ensure fallback to empty array if credit_products is missing
  });
});

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
      return row.product?.name || "N/A"; // Ensure fallback if product.name is missing
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

const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    const amount = parseFloat(row.total_amount) || 0; // Ensure proper parsing
    return total + amount;
  }, 0);
  return total;
});
</script>

<style lang="scss" scoped></style>
