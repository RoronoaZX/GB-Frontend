<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 870px; max-width: 80vw">
      <q-card-section style="background-color: #f44336">
        <div class="row justify-between text-white">
          <div class="text-h6">Selecta Report</div>
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
          :columns="selectaReportColumn"
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
                `${capitalizeFirstLetter(props.row.selecta.name)}`
              }}</span>
            </q-td>
          </template>
          <template v-slot:body-cell-price="props">
            <q-td :props="props">
              <span>{{ `${formatPrice(props.row.price)}` }}</span>
              <q-popup-edit
                @update:model-value="(val) => updatedPrice(props.row, val)"
                v-model="props.row.price"
                auto-save
                v-slot="scope"
              >
                <q-input
                  v-model="scope.value"
                  dense
                  mask="#####"
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
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
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { api } from "src/boot/axios";
import { computed } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports"]);

// Log to verify the structure of props.reports
console.log("Reports data structure:", props.reports);

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const updatedPrice = async (data, val) => {
  console.log("update data of the price", data);
  console.log("update val of the price", val);

  try {
    const response = await api.put(
      "/api/update-selecta-sales-price-report/" + data.id,
      {
        price: parseInt(val),
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const selectaReportColumn = [
  {
    name: "name",
    label: "Selecta Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.selecta.name || "N/A"; // Adjust this according to your data
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
    label: "Selecta Out (PCS)",
    field: "out",
    format: (val) => `${val}`,
  },
  {
    name: "added_stocks",
    label: "Added Stocks (PCS)",
    field: "added_stocks",
    format: (val) => `${val}`,
  },
  {
    name: "total_selecta",
    label: "Total Stocks (PCS)",
    field: (row) => (row.beginnings || 0) + (row.added_stocks || 0),
    format: (val) => `${val}`,
  },
  {
    name: "sold",
    label: "Selecta Sold (PCS)",
    field: (row) => {
      const totalSelecta = (row.beginnings || 0) + (row.added_stocks || 0);
      const totalSelectaDifference = (row.remaining || 0) + (row.out || 0);
      return totalSelecta - totalSelectaDifference;
    },
    format: (val) => `${val}`,
  },
  {
    name: "sales",
    label: "Total Sales",
    field: (row) => {
      const totalSelecta = (row.beginnings || 0) + (row.added_stocks || 0);
      const totalSelectaDifference = (row.remaining || 0) + (row.out || 0);
      const selectaSold = totalSelecta - totalSelectaDifference;
      return selectaSold * (row.price || 0);
    },
  },
];

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};
// Replace this with your actual filtered rows logic
const filteredRows = computed(() => {
  // Assuming `breads` is an array in `reports`
  console.log("Filtered rows:", props.reports || []);
  return props.reports || [];
});

const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    const salesAmount = parseFloat(row.sales) || 0;
    console.log(`Adding salesAmount: ${salesAmount} to total: ${total}`);
    return total + salesAmount;
  }, 0);
  console.log("Overall Total Sales computed as:", total);
  return total;
});

console.log("Filtered Rows:", filteredRows.value);
</script>

<style lang="scss" scoped></style>
