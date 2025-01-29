<template>
  <div>
    <q-dialog
      ref="dialogRef"
      @hide="onDialogHide"
      v-model="dialog"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section style="background-color: #607d8b">
          <div class="row justify-between text-white">
            <div class="text-h6">Other Products Report</div>
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
            <AddingOtherReport
              :sales_Reports="props.reports"
              :sales_report_id="sales_report_id"
              :user="props.user"
            />
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
            style="height: 500px"
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
            <template v-slot:body-cell-beginnings="props">
              <q-td :props="props">
                <span>{{ `${props.row.beginnings}` }}</span>
                <q-popup-edit
                  @update:model-value="
                    (val) => updatedBeginnings(props.row, val)
                  "
                  v-model="props.row.beginnings"
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
            <template v-slot:body-cell-remaining="props">
              <q-td :props="props">
                <span>{{ `${props.row.remaining}` }}</span>
                <q-popup-edit
                  @update:model-value="
                    (val) => updatedRemaining(props.row, val)
                  "
                  v-model="props.row.remaining"
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
            <template v-slot:body-cell-out="props">
              <q-td :props="props">
                <span>{{ `${props.row.out}` }}</span>
                <q-popup-edit
                  @update:model-value="
                    (val) => updatedOtherProductsOut(props.row, val)
                  "
                  v-model="props.row.out"
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
            <template v-slot:body-cell-added_stocks="props">
              <q-td :props="props">
                <span>{{ `${props.row.added_stocks}` }}</span>
                <q-popup-edit
                  @update:model-value="
                    (val) => updatedAddedStocks(props.row, val)
                  "
                  v-model="props.row.added_stocks"
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
import { api } from "src/boot/axios";
import { ref, computed } from "vue";
import AddingOtherReport from "./AddingOtherReport.vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const dialog = ref(false);
const maximizedToggle = ref(true);
const props = defineProps(["reports", "sales_report_id", "user"]);
const filter = ref("");
const pagination = ref({
  rowsPerPage: 0,
});

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

const updatedPrice = async (data, val) => {
  console.log("update data of the price", data);
  console.log("update val of the price", val);

  try {
    const response = await api.put(
      "/api/update-otherProducst-sales-price-report/" + data.id,
      {
        price: parseInt(val),
      }
    );
    console.log("Updated price response:", response.data);
  } catch (error) {
    console.error(error);
  }
};

const updatedBeginnings = async (data, val) => {
  console.log("update data of the beginnings", data);
  console.log("update val of the beginnings", val);
  try {
    const response = await api.put(
      "/api/update-otherProducst-sales-beginnings-report/" + data.id,
      {
        beginnings: parseInt(val),
      }
    );
    console.log("reponse", response.data);
  } catch (error) {
    console.error(error);
  }
};
const updatedRemaining = async (data, val) => {
  console.log("update data of the updatedRemaining", data);
  console.log("update val of the updatedRemaining", val);
  try {
    const response = await api.put(
      "/api/update-otherProducst-sales-remaining-report/" + data.id,
      {
        remaining: parseInt(val),
      }
    );
    console.log("reponse", response.data);
  } catch (error) {
    console.error(error);
  }
};
const updatedOtherProductsOut = async (data, val) => {
  console.log("update data of the updatedRemaining", data);
  console.log("update val of the updatedRemaining", val);
  try {
    const response = await api.put(
      "/api/update-otherProducst-sales-out-report/" + data.id,
      {
        out: parseInt(val),
      }
    );
    console.log("reponse", response.data);
  } catch (error) {
    console.error(error);
  }
};
const updatedAddedStocks = async (data, val) => {
  console.log("update data of the updatedAddedStocks", data);
  console.log("update val of the updatedAddedStocks", val);
  try {
    const response = await api.put(
      "/api/update-otherProducst-sales-addedstocks-report/" + data.id,
      {
        added_stocks: parseInt(val),
      }
    );
    console.log("reponse", response.data);
  } catch (error) {
    console.error(error);
  }
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
    name: "added_stocks",
    label: "Added Stocks (PCS)",
    field: "added_stocks",
    format: (val) => `${val}`,
  },
  {
    name: "total_other_products",
    label: "Total Stocks (PCS)",
    field: (row) => {
      const totalSelecta =
        Number(row.beginnings || 0) + Number(row.added_stocks || 0);
      return totalSelecta;
    },
    format: (val) => `${val}`,
  },
  {
    name: "sold",
    label: "Product Sold (PCS)",
    field: (row) => {
      const beginnings = Number(row.beginnings || 0);
      const addedStocks = Number(row.added_stocks || 0);
      const out = Number(row.out || 0);
      const remaining = Number(row.remaining || 0);
      const totalOtherProducts = beginnings + addedStocks;
      const totalProductDiff = remaining + out;
      const totalSold = totalOtherProducts - totalProductDiff;
      return totalSold;
    },
    format: (val) => `${val}`,
  },
  {
    name: "sales",
    label: "Total Sales",
    field: (row) => {
      const beginnings = Number(row.beginnings || 0);
      const addedStocks = Number(row.added_stocks || 0);
      const out = Number(row.out || 0);
      const remaining = Number(row.remaining || 0);
      const price = Number(row.price || 0);

      const totalOtherProducts = beginnings + addedStocks;
      const totalProductDiff = remaining + out;
      const totalSold = totalOtherProducts - totalProductDiff;

      return totalSold * price;
    },
    format: (val) => `${formatPrice(val)}`,
  },
];

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};
const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    const beginnings = Number(row.beginnings || 0);
    const addedStocks = Number(row.added_stocks || 0);
    const out = Number(row.out || 0);
    const remaining = Number(row.remaining || 0);

    const totalOtherProducts = beginnings + addedStocks;
    const totalProductDiff = remaining + out;
    const totalSold = totalOtherProducts - totalProductDiff;
    const salesAmount = totalSold * (row.price || 0);
    console.log(`Adding salesAmount: ${salesAmount} to total: ${total}`);

    return total + salesAmount;
  }, 0);
  console.log("Overall Total Sales computed as:", total);
  return total;
});
</script>

<style lang="scss" scoped></style>
