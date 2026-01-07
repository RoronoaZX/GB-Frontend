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
      <q-card-section style="background-color: #795548">
        <div class="row justify-between text-white">
          <div class="text-h6">Bread Report {{ formatDate(reportDate) }}</div>
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
          <AddingBreadReport
            :sales_Reports="props.reports"
            :sales_report_id="sales_report_id"
            :user="props.user"
            :reportLabel="props.reportLabel"
            :reportDate="props.reportDate"
            :reportLength="reportLength"
            @bread-added="handleNewBread"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :filter="filter"
          :virtual-scroll-sticky-size-start="48"
          flat
          :columns="breadReportColumns"
          :rows="filteredRows"
          row-key="id"
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
                `${capitalizeFirstLetter(props.row.bread.name)}`
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
                buttons
                label-set="Save"
                label-cancel="Close"
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
                buttons
                label-set="Save"
                label-cancel="Close"
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
          <template v-slot:body-cell-new_production="props">
            <q-td :props="props">
              <span>{{ `${props.row.new_production}` }}</span>
              <q-popup-edit
                @update:model-value="
                  (val) => updatedNewProduction(props.row, val)
                "
                v-model="props.row.new_production"
                auto-save
                buttons
                label-set="Save"
                label-cancel="Close"
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
                buttons
                label-set="Save"
                label-cancel="Close"
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
          <template v-slot:body-cell-bread_out="props">
            <q-td :props="props">
              <span>{{ `${props.row.bread_out}` }}</span>
              <q-popup-edit
                @update:model-value="(val) => updatedBreadOut(props.row, val)"
                v-model="props.row.bread_out"
                auto-save
                buttons
                label-set="Save"
                label-cancel="Close"
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
          <!-- <template v-slot:body-cell-sales="props">
            <q-td :props="props">
              <span>{{ `${formatPrice(props.row.sales)}` }}</span>
            </q-td>
          </template> -->
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
import AddingBreadReport from "./AddingBreadReport.vue";
import { Notify, useDialogPluginComponent } from "quasar";
import { api } from "src/boot/axios";
import { computed, reactive, ref, watch } from "vue";
import { useUsersStore } from "src/stores/user";
import { useRoute } from "vue-router";
import { useProductionStore } from "src/stores/production";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice, formatDate } = typographyFormat();

const route = useRoute();

const emit = defineEmits(["summary-updated"]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const productionStore = useProductionStore();

const userStore = useUsersStore();
const userData = computed(() => userStore.userData);
console.log("producttable user data", userData.value);

const overAmount = ref(0);
const chargesAmount = ref(0);

const userId = computed(() => {
  return userStore.userData?.data?.id ?? null;
});

// Optional: show a smal loading if user not yet ready
const userReady = computed(() => !!userId.value);

const branchId = route.params.branch_id;

const dialog = ref(false);

const maximizedToggle = ref(true);
// const reportLength = computed(() => filteredRows.value.length);

const props = defineProps([
  "reports",
  "sales_report_id",
  "user",
  "reportLabel",
  "reportDate",
]);

console.log("props iDsssss", props.sales_report_id);
console.log("propssssss", props);

const filter = ref("");
const pagination = ref({
  rowsPerPage: 0,
});

// Log to verify the structure of props.reports
console.log("Reports data structure:", props.reports);
console.log("Reports data sales_report_id:", props.sales_report_id);

const buildHistoryMeta = (row, field, originalVal, newVal) => {
  if (!userReady.value) {
    console.warn("user not loaded yet, cannot log history");
  }

  return {
    report_id: row.id,
    name: row?.bread?.name || "Unknown Bread",
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
    await productionStore.updateSalesField(
      row.id,
      newPrice,
      meta,
      "bread",
      "price"
    );
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
      "bread",
      "beginnings"
    );
  } catch (error) {
    Notify.create({
      message: "Update failed",
      color: "negative",
    });
  }
};

const updatedNewProduction = async (row, newVal) => {
  const meta = buildHistoryMeta(
    row,
    "new_production",
    row.new_production,
    newVal
  );

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
      "bread",
      "new_production"
    );
  } catch (error) {
    console.log("Error updating new production:", error);
    Notify.create({ message: "Update failed", color: "negative" });
    throw error;
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
      "bread",
      "remaining"
    );
  } catch (error) {
    console.log("Error updating remaining:", error);
    Notify.create({
      message: "Update faled",
      color: "negative",
    });
  }
};

const updatedBreadOut = async (row, newVal) => {
  const meta = buildHistoryMeta(row, "breaad_out", row.bread_out, newVal);

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
      "bread",
      "bread_out"
    );
  } catch (error) {
    Notify.create({
      message: "Update failed",
      color: "negative",
    });
  }
};

const breadReportColumns = [
  {
    name: "name",
    label: "Bread Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.bread.name || row.name || "N/A"; // Adjust this according to your data
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
    name: "new_production",
    label: "New Production (PCS)",
    field: "new_production",
    format: (val) => `${val}`,
  },
  {
    name: "remaining",
    label: "Remaining (PCS)",
    field: "remaining",
    format: (val) => `${val}`,
  },
  {
    name: "bread_out",
    label: "Bread Out (PCS)",
    field: "bread_out",
    format: (val) => `${val}`,
  },

  {
    name: "total",
    label: "Bread Total (PCS)",
    field: (row) => {
      // Ensure values are converted to numbers before summing
      return (Number(row.beginnings) || 0) + (Number(row.new_production) || 0);
    },
  },
  {
    name: "breadSold",
    label: "Bread Sold (PCS)",
    field: (row) => {
      // Ensure all values are treated as numbers
      const beginnings = Number(row.beginnings) || 0;
      const newProduction = Number(row.new_production) || 0;
      const remaining = Number(row.remaining) || 0;
      const breadOut = Number(row.bread_out) || 0;

      const total = beginnings + newProduction;
      const totalBreadDifference = remaining + breadOut;

      return total - totalBreadDifference; // Calculate bread sold
    },
    format: (val) => `${val}`,
  },
  {
    name: "sales",
    label: "Total Sales",
    field: (row) => {
      // Ensure all values are treated as numbers
      const beginnings = Number(row.beginnings) || 0;
      const newProduction = Number(row.new_production) || 0;
      const remaining = Number(row.remaining) || 0;
      const breadOut = Number(row.bread_out) || 0;
      const price = Number(row.price) || 0;

      const total = beginnings + newProduction;
      const totalBreadDifference = remaining + breadOut;
      const breadSold = total - totalBreadDifference;

      return breadSold * price; // Calculate total sales
    },
    format: (val) => `${formatPrice(val)}`, // Formats sales to 2 decimal places
  },
];

// // Computed: Get the correct bread reports directly from store
// const localReports = computed(() => {
//   if (
//     !productionStore.productions ||
//     !Array.isArray(productionStore.productions)
//   ) {
//     return [];
//   }

//   const dateGroup = productionStore.productions.find(
//     (group) => group.date === props.reportDate
//   );

//   if (!dateGroup || !dateGroup[props.reportLabel]) {
//     return [];
//   }

//   return dateGroup[props.reportLabel].bread_reports || [];
// });

// const localReports = computed(() => props.reports || []);

const localReports = computed(() => {
  const dateGroup = productionStore.productions.find(
    (g) => g.date === props.reportDate
  );

  if (!dateGroup) return [];

  const shiftGroup = dateGroup[props.reportLabel];
  if (!shiftGroup) return [];

  return shiftGroup.bread_reports || [];
});

// Watch for prop changes
// watch(
//   () => props.reports,
//   (newVal) => {
//     localReports.splice(0, localReports.length, ...newVal);
//   }
// );

// Computed: filtered rows
// const filteredRows = computed(() => {
//   if (!filter.value?.trim()) return localReports;

//   const search = filter.value.trim().toLowerCase();
//   return localReports.value.filter(
//     (row) =>
//       row.bread.name.toLowerCase().includes(search) ||
//       row.price.toString().includes(search) ||
//       (row.sales || 0).toString().includes(search)
//   );
// });

const filteredRows = computed(() => {
  const source = props.reports || [];

  if (!filter.value?.trim()) return source;

  const search = filter.value.toLowerCase().trim();
  return source.filter(
    (row) =>
      row.bread?.name?.toLowerCase().includes(search) ||
      String(row.price || "").includes(search)
    // add more fields if you want
  );
});
// Computed: overall total sales
const overallTotal = computed(() =>
  localReports.value.reduce((acc, row) => {
    const beginnings = Number(row.beginnings) || 0;
    const newProduction = Number(row.new_production) || 0;
    const remaining = Number(row.remaining) || 0;
    const breadOut = Number(row.bread_out) || 0;
    const price = Number(row.price) || 0;

    const totalProduced = beginnings + newProduction;
    const breadSold = totalProduced - (remaining + breadOut);
    return acc + breadSold * price;
  }, 0)
);

// Computed: report length
const reportLength = computed(() => filteredRows.value.length);

const handleNewBreadAdded = () => {
  // This tells the PARENT to refresh teh reports
  emit("summary-updated");

  // OR better: emit a dedicated event
  emit("refresh-reports");
};

// 🔹 Handle new bread added from AddingBreadReport
// const handleNewBread = (backendData) => {
//   // backendData is the response from the API
//   // Find or create the correct shift row (AM/PM) if necessary
//   const label = props.reportLabel; // AM / PM
//   const reportDate = props.reportDate;

//   // Add the backend data to the top of localReports
//   localReports.unshift({
//     ...backendData,
//     date: reportDate,
//     label,
//   });

//   // Optionally: update global store
//   productionStore.productions.unshift({
//     ...backendData,
//     date: reportDate,
//     label,
//   });

//   console.log("Local Reports after push:", localReports);
// };\

const handleNewBread = (backendData) => {
  const newItem = {
    ...backendData,
    date: props.reportDate,
    label: props.reportLabel,
  };

  // Update local table (reactive array)
  localReports.value.unshift(newItem);

  // Optionally: update global store
  productionStore.productions.unshift(newItem);

  // Emit event to parent
  emit("bread-added", newItem);

  console.log("Local Reports after adding:", localReports);
};
</script>

<style scoped></style>
