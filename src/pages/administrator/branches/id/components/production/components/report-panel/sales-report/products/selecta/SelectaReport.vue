<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section style="background-color: #f44336">
        <div class="row justify-between text-white">
          <div class="text-h6">Selecta Report</div>
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
          <AddingSelectaReport
            :sales_Reports="props.reports"
            :sales_report_id="sales_report_id"
            :user="props.user"
            :reportLabel="props.reportLabel"
            :reportDate="props.reportDate"
            :reportLength="reportLength"
          />
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
          style="height: 500px"
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
          <template v-slot:body-cell-beginnings="props">
            <q-td :props="props">
              <span>{{ `${props.row.beginnings}` }}</span>
              <q-popup-edit
                @update:model-value="(val) => updatedBeginnings(props.row, val)"
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
                @update:model-value="(val) => updatedRemaining(props.row, val)"
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
                @update:model-value="(val) => updatedSelectaOut(props.row, val)"
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
</template>

<script setup>
import { Notify, useDialogPluginComponent } from "quasar";
import AddingSelectaReport from "./AddingSelectaReport.vue";
import { api } from "src/boot/axios";
import { ref, computed } from "vue";

import { typographyFormat } from "src/composables/typography/typography-format";
import { useRoute } from "vue-router";
import { useProductionStore } from "src/stores/production";
import { useUsersStore } from "src/stores/user";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const route = useRoute();

const emit = defineEmits(["summary-updated"]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const productionStore = useProductionStore();

const userStore = useUsersStore();
const userData = computed(() => userStore.userData);

const overAmount = ref(0);
const chargesAmount = ref(0);

const userId = computed(() => {
  return userStore.userData?.data?.id ?? null;
});

const userReady = computed(() => !!userId.value);

const branchId = route.params.branch_id;

const dialog = ref(false);

const maximizedToggle = ref(true);
const reportLength = computed(() => filteredRows.value.length);

const props = defineProps([
  "reports",
  "sales_report_id",
  "user",
  "reportLabel",
  "reportDate",
]);

const filter = ref("");
const pagination = ref({
  rowsPerPage: 0,
});
// Log to verify the structure of props.reports
console.log("Reports data structure:", props.reports);

const buildHistoryMeta = (row, field, originalVal, newVal) => {
  console.log("rowsssssss", row);

  if (!userReady.value) {
    console.warn("user not loaded yet, cannot log history");
  }

  return {
    report_id: row.id,
    name: row?.selecta?.name || "Unknown Selecta",
    original_data: field.includes("price")
      ? `₱ ${originalVal}`
      : `${originalVal} pcs`,
    updated_data: field.includes("price") ? `₱ ${newVal}` : `${newVal} pcs`,
    updated_field: field,
    designation: branchId,
    designation_type: "branch",
    action: "updated",
    type_of_report: `Branch Production ${
      props.reportLabel?.toUpperCase() || ""
    } Report Table`,
    user_id: userId.value,
    sales_report_id: props.sales_report_id,
  };
};

const updatedPrice = async (row, newPrice) => {
  const meta = buildHistoryMeta(row, "price", row.price, newPrice);

  await productionStore.setAmounts();
  const chargesAmount = productionStore.chargesAmount;
  const overAmount = productionStore.overAmount;

  console.log("chargesAmount", chargesAmount);
  console.log("overAmount", overAmount);

  try {
    console.log("metassss", meta);

    await productionStore.updateSalesField(
      row.id,
      newPrice,
      meta,
      "selecta",
      "price"
    );
    // Notify.create({
    //   message: "Price updated successfully",
    //   color: "positive",
    //   icon: "check",
    // });
  } catch (error) {
    Notify.create({
      message: "Failed to update price",
      color: "negative",
      icon: "error",
    });
  }
};

const updatedBeginnings = async (row, newVal) => {
  const meta = buildHistoryMeta(row, "beginnings", row.beginnings, newVal);

  await productionStore.setAmounts();
  const chargesAmount = productionStore.chargesAmount;
  const overAmount = productionStore.overAmount;

  console.log("chargesAmount", chargesAmount);
  console.log("overAmount", overAmount);

  try {
    await productionStore.updateSalesField(
      row.id,
      newVal,
      meta,
      "selecta",
      "beginnings"
    );
    Notify.create({
      message: "Beginnings updated successfully",
      color: "positive",
    });
  } catch (error) {
    Notify.create({
      message: "Update failed",
      color: "negative",
    });
  }
};

const updatedRemaining = async (row, newVal) => {
  const meta = buildHistoryMeta(row, "remaining", row.remaining, newVal);

  await productionStore.setAmounts();
  const chargesAmount = productionStore.chargesAmount;
  const overAmount = productionStore.overAmount;

  console.log("chargesAmount", chargesAmount);
  console.log("overAmount", overAmount);

  try {
    await productionStore.updateSalesField(
      row.id,
      newVal,
      meta,
      "selecta",
      "remaining"
    );
    Notify.create({
      message: "Remaining updated",
      color: "positive",
    });
  } catch (error) {
    Notify.create({
      message: "Update failed",
      color: "negative",
    });
  }
};
const updatedSelectaOut = async (row, newVal) => {
  const meta = buildHistoryMeta(row, "selecta_out", row.out, newVal);

  await productionStore.setAmounts();
  const chargesAmount = productionStore.chargesAmount;
  const overAmount = productionStore.overAmount;

  console.log("chargesAmount", chargesAmount);
  console.log("overAmount", overAmount);

  try {
    await productionStore.updateSalesField(
      row.id,
      newVal,
      meta,
      "selecta",
      "out"
    );

    Notify.create({
      message: "Selecta out updated",
      color: "positive",
    });
  } catch (error) {
    Notify.create({
      message: "Update failed",
      color: "negative",
    });
  }
};
const updatedAddedStocks = async (row, newVal) => {
  const meta = buildHistoryMeta(row, "added_stocks", row.added_stocks, newVal);

  await productionStore.setAmounts();

  const chargesAmount = productionStore.chargesAmount;
  const overAmount = productionStore.overAmount;

  console.log("chargesAmount", chargesAmount);
  console.log("overAmount", overAmount);

  try {
    await productionStore.updateSalesField(
      row.id,
      newVal,
      meta,
      "selecta",
      "added_stocks"
    );
    Notify.create({
      message: "Added stocks updated",
      color: "positive",
    });
  } catch (error) {
    Notify.create({
      message: "Update failed",
      color: "negative",
    });
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
    field: (row) => {
      const totalSelecta =
        Number(row.beginnings || 0) + Number(row.added_stocks || 0);
      return totalSelecta;
    },
    format: (val) => `${val}`,
  },
  {
    name: "sold",
    label: "Selecta Sold (PCS)",
    field: (row) => {
      const beginnings = Number(row.beginnings || 0);
      const newStocks = Number(row.added_stocks || 0);
      const selectaOut = Number(row.out || 0);
      const remaining = Number(row.remaining || 0);
      const totalSelecta = beginnings + newStocks;
      const totalSelectaDifference = remaining + selectaOut;
      return totalSelecta - totalSelectaDifference;
    },
    format: (val) => `${val}`,
  },
  {
    name: "sales",
    label: "Total Sales",
    field: (row) => {
      const beginnings = Number(row.beginnings || 0);
      const newStocks = Number(row.added_stocks || 0);
      const selectaOut = Number(row.out || 0);
      const remaining = Number(row.remaining || 0);
      const price = Number(row.price || 0);

      const totalSelecta = beginnings + newStocks;
      const totalSelectaDifference = remaining + selectaOut;
      const selectaSold = totalSelecta - totalSelectaDifference;
      return selectaSold * price;
    },
    format: (val) => `${formatPrice(val)}`,
  },
];

// Replace this with your actual filtered rows logic
const filteredRows = computed(() => {
  if (!filter.value || !filter.value.trim()) {
    // If there's no filter, return all rows
    return props.reports || [];
  }

  const search = filter.value.trim().toLowerCase();
  return (props.reports || []).filter((row) => {
    // Perform filtering on relevant fields
    return (
      row.selecta.name.toLowerCase().includes(search) || // Selecta name
      row.price.toString().includes(search) || // Price
      row.sales.toString().includes(search) // Sales
    );
  });
});

const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    const beginnings = Number(row.beginnings) || 0;
    const addedStocks = Number(row.added_stocks) || 0;
    const selectaOut = Number(row.out) || 0;
    const remaining = Number(row.remaining) || 0;

    const totalSelecta = parseInt(beginnings) + parseInt(addedStocks);
    const totalSelectaDifference = parseInt(remaining) + parseInt(selectaOut);
    const selectaSold = totalSelecta - totalSelectaDifference;
    const salesAmount = selectaSold * (row.price || 0);

    console.log(`Adding salesAmount: ${salesAmount} to total: ${total}`);
    return total + salesAmount;
  }, 0);
  console.log("Overall Total Sales computed as:", total);
  return total;
});

console.log("Filtered Rows:", filteredRows.value);
</script>

<style lang="scss" scoped></style>
