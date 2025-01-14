<template>
  <q-btn
    color="accent"
    icon="visibility"
    size="md"
    flat
    round
    dense
    @click="openCreditDialog"
  />

  <q-dialog v-model="creditDialog">
    <q-card flat dense style="width: 700px; max-width: 80vw">
      <q-card-section class="row justify-between">
        <div class="report-title">Report Details</div>
        <q-btn
          class="close-btn"
          color="grey-8"
          flat
          round
          dense
          icon="close"
          @click="creditDialog = false"
        />
      </q-card-section>
      <q-card-section>
        Name: {{ formatFullname(creditsReportList[0]?.credit_user_id) }}
      </q-card-section>
      <q-card-section>
        <q-table
          v-if="creditsReportList.length > 0"
          :rows="creditsReportList"
          :columns="creditProductsColumn"
        >
          <template v-slot:body-cell-price="props">
            <q-td :props="props">
              <span>{{ `${formatPrice(props.row.price)}` }}</span>
            </q-td>
          </template>
        </q-table>
        <div v-else>No report available</div>
      </q-card-section>
      <!-- {{ creditsReportList }} -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { format } from "quasar";
import { ref } from "vue";

const props = defineProps({
  creditsReportList: {
    type: Array,
    required: true,
  },
});

const formatFullname = (row) => {
  const capitalize = (str) =>
    str
      ? str
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")
      : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const creditDialog = ref(false);

const openCreditDialog = () => {
  creditDialog.value = true;
};

console.log("Received creditsReportList:", props.creditsReportList);

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

const creditProductsColumn = [
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
    field: (row) => row.pieces * row.price || 0,
    align: "center",
    format: (val) => formatPrice(val),
  },
];
</script>

<style lang="scss" scoped></style>
