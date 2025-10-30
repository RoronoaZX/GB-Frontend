<template>
  <q-dialog v-model="dialog" ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section :class="getHeaderClass(report.status)">
        <div class="row justify-between">
          <div class="text-h6">Selecta Added Stocks Report</div>
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
        <div>Cashier: {{ formatFullname(report.employee || "") }}</div>
        <div>
          Branch:
          {{ capitalizeFirstLetter(report.branch.name || "") }}
        </div>
        <div>
          Status:
          <q-badge color="green" outlined>
            {{ capitalizeFirstLetter(report.status || "") }}
          </q-badge>
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
import { computed, ref } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";

import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter, formatFullname, formatPrice } =
  typographyFormat();
const { getHeaderClass } = badgeColor();

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const dialog = ref(false);

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const filteredRows = computed(() => {
  console.log("Filtered rows:", props.report || []);
  return props.report.selecta_added_stocks || [];
});

const transactionsColumns = [
  {
    name: "product_name",
    label: "Product Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return capitalizeFirstLetter(row.product.name || "N/A"); // Adjust this according to your data
    },
    align: "left",
  },
  {
    name: "price",
    label: "Price",
    align: "center",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return formatPrice(row.price || "N/A"); // Adjust this according to your data
    },
  },
  {
    name: "added_stocks",
    label: "Added Stocks",
    align: "center",
    field: (row) => (row.added_stocks ? `${row.added_stocks} pcs` : "N/A"),
  },
];
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
}

.pending-header {
  background: linear-gradient(180deg, #ffffff, #e8e6b7);
}
.confirm-header {
  background: linear-gradient(180deg, #ffffff, #c1ffc7);
}
.decline-header {
  background: linear-gradient(180deg, #ffffff, #ffc7c7);
}
</style>
