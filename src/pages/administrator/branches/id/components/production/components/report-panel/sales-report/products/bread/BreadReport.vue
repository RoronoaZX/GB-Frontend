<!-- <template>
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
          />
        </div>
      </q-card-section>
      <q-card-section v-if="negativeSalesRows.length">
        <q-card>
          <q-banner dense class="bg-orange-1 text-dark q-mb-md" rounded>
            <div class="text-subtitle1 text-weight-bold">
              ⚠️ Negative Sales Detected
            </div>
            <div class="text-caption">
              These products are excluded from Overall Total Sales.
            </div>
          </q-banner>

          <q-table
            flat
            :rows="negativeSalesRows"
            :columns="negativeBreadReportColumn"
            row-key="id"
            hide-bottom
          >
          </q-table>
        </q-card>
      </q-card-section>
      <q-card-section>
        <q-table
          :filter="filter"
          :virtual-scroll-sticky-size-start="48"
          flat
          :columns="breadReportColumns"
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
import { computed, ref } from "vue";
import { useUsersStore } from "src/stores/user";
import { useRoute } from "vue-router";
import { useProductionStore } from "src/stores/production";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice, formatDate, formatFullname } =
  typographyFormat();

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
const reportLength = computed(() => filteredRows.value.length);

const props = defineProps([
  "reports",
  "sales_report_id",
  "user",
  "reportLabel",
  "reportDate",
]);

console.log("propsssssss", props);

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

const negativeBreadReportColumn = [
  {
    name: "name",
    label: "Bread",
    field: (row) => row.bread.name,
    format: (val) => capitalizeFirstLetter(val),
    align: "justify",
  },
  {
    name: "breadSold",
    label: "Bread Sold",
    field: "breadSold",
    align: "justify",
  },
  {
    name: "salesAmount",
    label: "Negative Sales",
    field: "salesAmount",
    format: (val) => formatPrice(val),
    align: "justify",
  },
];

const breadReportColumns = [
  {
    name: "name",
    label: "Bread Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.bread.name || "N/A"; // Adjust this according to your data
    },
    sortable: true,
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
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "justify",
  },
  {
    name: "reason",
    label: "Reason",
    field: "reason",
    align: "justify",
  },
  {
    name: "handled_by",
    label: "Handled By",
    field: (row) => (row.handled_by ? formatFullname(row.handled_by) : "N/A"),
    align: "justify",
  },
];

// Replace this with your actual filtered rows logic
const filteredRows = computed(() => {
  if (!filter.value || !filter.value.trim()) {
    // If there's no filter, return all rows
    return props.reports || [];
  }

  const search = filter.value.trim().toLowerCase(); // Normalize the filter input
  return (props.reports || []).filter((row) => {
    // Perform filtering on relevant fields
    return (
      row.bread.name.toLowerCase().includes(search) || // Bread name
      row.price.toString().includes(search) || // Price
      row.sales.toString().includes(search) // Sales
    );
  });
});

const overallTotal = computed(() => {
  return filteredRows.value.reduce((total, row) => {
    const beginnings = Number(row.beginnings) || 0;
    const newProduction = Number(row.new_production) || 0;
    const remaining = Number(row.remaining) || 0;
    const breadOut = Number(row.bread_out) || 0;
    const price = Number(row.price) || 0;

    const totalValue = beginnings + newProduction;
    const totalBreadDifference = remaining + breadOut;
    const breadSold = totalValue - totalBreadDifference;
    const salesAmount = breadSold * price;

    // ✅ ONLY ADD POSITIVE SALES
    if (salesAmount > 0) {
      return total + salesAmount;
    }

    return total;
  }, 0);
});

console.log("Overall Total Sales:", overallTotal.value);

const negativeSalesRows = computed(() => {
  return filteredRows.value
    .map((row) => {
      const beginnings = Number(row.beginnings) || 0;
      const newProduction = Number(row.new_production) || 0;
      const remaining = Number(row.remaining) || 0;
      const breadOut = Number(row.bread_out) || 0;
      const price = Number(row.price) || 0;

      const total = beginnings + newProduction;
      const breadSold = total - (remaining + breadOut);
      const salesAmount = breadSold * price;

      return {
        ...row,
        breadSold,
        salesAmount,
      };
    })
    .filter((row) => row.salesAmount < 0);
});
</script>

<style scoped></style> -->

<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-grey-1">
      <q-card-section class="header-gradient text-white q-py-md">
        <div class="row items-center justify-between">
          <div class="row items-center q-gutter-md">
            <q-avatar
              icon="bakery_dining"
              color="white"
              text-color="brown-7"
              shadow-2
            />
            <div>
              <div class="text-h6 text-weight-bold">Bread Report Detail</div>
              <div class="text-caption opacity-80">
                {{ formatDate(reportDate) }} •
                {{ props.reportLabel || "Daily Inventory" }}
              </div>
            </div>
          </div>
          <div class="row items-center q-gutter-sm">
            <q-btn
              :icon="maximizedToggle ? 'fullscreen_exit' : 'fullscreen'"
              flat
              dense
              round
              @click="maximizedToggle = !maximizedToggle"
            />
            <q-btn icon="close" flat dense round v-close-popup>
              <q-tooltip class="bg-dark">Close Report</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section
        class="bg-white row items-center justify-between q-py-sm shadow-1"
      >
        <q-input
          v-model="filter"
          outlined
          placeholder="Search bread variety..."
          debounce="500"
          dense
          rounded
          class="bg-white"
          style="width: 400px"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="primary" />
          </template>
        </q-input>

        <AddingBreadReport
          :sales_Reports="props.reports"
          :sales_report_id="sales_report_id"
          :user="props.user"
          :reportLabel="props.reportLabel"
          :reportDate="props.reportDate"
          :reportLength="reportLength"
        />
      </q-card-section>

      <q-card-section v-if="negativeSalesRows.length" class="q-pb-none">
        <q-banner
          dense
          class="bg-red-1 text-red-10 border-red rounded-borders shadow-1"
        >
          <template v-slot:avatar>
            <q-icon name="report_problem" color="red" />
          </template>
          <div class="text-weight-bold text-subtitle2">
            Negative Sales Detected ({{ negativeSalesRows.length }} Items)
          </div>
          <div class="text-caption">
            The quantity remaining/out exceeds total stock. These rows are
            excluded from the Overall Total.
          </div>

          <template v-slot:action>
            <q-btn
              flat
              color="red-10"
              :label="showErrors ? 'Hide Details' : 'View Errors'"
              @click="showErrors = !showErrors"
            />
          </template>
        </q-banner>

        <q-slide-transition>
          <div v-if="showErrors">
            <q-table
              flat
              bordered
              :rows="negativeSalesRows"
              :columns="negativeBreadReportColumn"
              row-key="id"
              class="q-mt-sm bg-white error-table"
              hide-bottom
            />
          </div>
        </q-slide-transition>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div style="height: calc(100vh - 420px); overflow-y: auto">
          <q-table
            :filter="filter"
            flat
            bordered
            :columns="breadReportColumns"
            :rows="filteredRows"
            row-key="id"
            class="inventory-table sticky-header-table shadow-2"
            :rows-per-page-options="[0]"
            hide-bottom
            virtual-scroll
          >
            <template v-slot:body-cell-name="props">
              <q-td :props="props" class="text-weight-bold text-blue-grey-9">
                {{ capitalizeFirstLetter(props.row.bread.name) }}
              </q-td>
            </template>

            <template
              v-for="col in [
                'price',
                'beginnings',
                'new_production',
                'remaining',
                'bread_out',
              ]"
              :key="col"
              v-slot:[`body-cell-${col}`]="props"
            >
              <q-td :props="props" class="editable-cell cursor-pointer">
                <div class="row items-center justify-between no-wrap">
                  <span>{{
                    col === "price"
                      ? formatPrice(props.row[col])
                      : props.row[col]
                  }}</span>
                  <q-icon
                    name="edit"
                    size="12px"
                    color="grey-4"
                    class="edit-hint"
                  />
                </div>

                <q-popup-edit
                  v-model="props.row[col]"
                  auto-save
                  buttons
                  label-set="Update"
                  @save="(val) => handleGlobalUpdate(props.row, col, val)"
                  v-slot="scope"
                >
                  <q-input
                    v-model.number="scope.value"
                    dense
                    autofocus
                    type="number"
                    hint="Press Enter to save"
                  />
                </q-popup-edit>
              </q-td>
            </template>

            <template v-slot:body-cell-sales="props">
              <q-td :props="props">
                <q-badge
                  :color="props.value < 0 ? 'red-2' : 'green-1'"
                  :text-color="props.value < 0 ? 'red-10' : 'green-10'"
                  class="text-weight-bolder q-pa-sm"
                >
                  {{ formatPrice(props.value) }}
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-badge
                  :color="getStatusColor(props.row.status)"
                  rounded
                  class="q-px-md q-py-xs text-weight-bold shadow-1"
                >
                  {{ props.value }}
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-handled_by="props">
              <q-td :props="props">
                <q-chip
                  outlined
                  text-color="blue-grey-9"
                  icon="person"
                  size="sm"
                  class="bg-blue-grey-1"
                >
                  {{ props.value }}
                </q-chip>
              </q-td>
            </template>

            <template v-slot:body-cell-reason="props">
              <q-td :props="props" class="text-italic text-grey-8">
                <div class="ellipsis" style="max-width: 150px">
                  <q-icon
                    name="notes"
                    size="xs"
                    color="grey-4"
                    class="q-mr-xs"
                  />
                  <span class="ellipsis" style="max-width: 150px">
                    {{ props.value }}
                    <q-tooltip
                      v-if="props.value !== 'N/A'"
                      anchor="top middle"
                      self="bottom middle"
                    >
                      {{ props.value }}
                    </q-tooltip>
                  </span>
                </div>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-card-section>

      <q-card-section class="footer-summary q-pa-lg">
        <div class="row justify-between items-center">
          <div>
            <div class="text-overline text-grey-7">Report Statistics</div>
            <div class="row q-gutter-md">
              <div class="text-body2">
                Items: <strong>{{ filteredRows.length }}</strong>
              </div>
              <div class="text-body2 text-red" v-if="negativeSalesRows.length">
                Discrepancies: <strong>{{ negativeSalesRows.length }}</strong>
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-subtitle1 text-grey-7">Net Sales Computed</div>
            <div class="text-h4 text-weight-bolder text-primary">
              {{ formatPrice(overallTotal) }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import AddingBreadReport from "./AddingBreadReport.vue";
import { Notify, useDialogPluginComponent } from "quasar";
import { computed, ref } from "vue";
import { useUsersStore } from "src/stores/user";
import { useRoute } from "vue-router";
import { useProductionStore } from "src/stores/production";
import { typographyFormat } from "src/composables/typography/typography-format";

// --- Composables & Stores ---
const { capitalizeFirstLetter, formatPrice, formatDate, formatFullname } =
  typographyFormat();
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const productionStore = useProductionStore();
const userStore = useUsersStore();
const route = useRoute();

// --- Props & Emits ---
const props = defineProps([
  "reports",
  "sales_report_id",
  "user",
  "reportLabel",
  "reportDate",
]);
const emit = defineEmits(["summary-updated"]);

// --- State ---
const dialog = ref(false);
const maximizedToggle = ref(true);
const filter = ref("");
const showErrors = ref(false);
const branchId = route.params.branch_id;

// --- Computed ---
const userId = computed(() => userStore.userData?.data?.id ?? null);
const reportLength = computed(() => filteredRows.value.length);

const breadReportColumns = [
  {
    name: "name",
    label: "Bread Name",
    field: (row) => row.bread.name,
    sortable: true,
    align: "left",
  },
  { name: "price", label: "Price", field: "price", align: "center" },
  {
    name: "beginnings",
    label: "Beginnings",
    field: "beginnings",
    align: "center",
  },
  {
    name: "new_production",
    label: "New Production",
    field: "new_production",
    align: "center",
  },
  {
    name: "remaining",
    label: "Remaining",
    field: "remaining",
    align: "center",
  },
  { name: "bread_out", label: "Out", field: "bread_out", align: "center" },
  {
    name: "bread_sold",
    label: "Bread Sold",
    field: (row) => {
      const stock =
        (Number(row.beginnings) || 0) + (Number(row.new_production) || 0);
      const sold =
        stock - ((Number(row.remaining) || 0) + (Number(row.bread_out) || 0));
      return sold;
    },
    align: "center",
  },
  {
    name: "sales",
    label: "Calculated Sales",
    field: (row) => {
      const stock =
        (Number(row.beginnings) || 0) + (Number(row.new_production) || 0);
      const sold =
        stock - ((Number(row.remaining) || 0) + (Number(row.bread_out) || 0));
      return sold * (Number(row.price) || 0);
    },
    align: "right",
  },
  {
    name: "status",
    label: "Status",
    field: (row) => (row.status ? capitalizeFirstLetter(row.status) : "N/A"),
    align: "center",
  },

  {
    name: "handled_by",
    label: "Handled By",
    field: (row) => (row.handled_by ? formatFullname(row.handled_by) : "N/A"),
    align: "center",
  },
  {
    name: "reason",
    label: "Reason",
    field: (row) => (row.reason ? capitalizeFirstLetter(row.reason) : "N/A"),
    align: "left",
  },
];

const getStatusColor = (status) => {
  if (!status) return "grey";

  const s = status.toLowerCase();

  if (s.includes("sold") || s.includes("confirmed")) return "positive";
  if (s.includes("pending") || s.includes("new")) return "orange";
  if (s.includes("declined") || s.includes("return")) return "negative";

  return "blue-grey";
};

const negativeBreadReportColumn = [
  {
    name: "name",
    label: "Bread",
    field: (row) => row.bread.name,
    format: (val) => capitalizeFirstLetter(val),
    align: "left",
  },
  {
    name: "beginnings",
    label: "Beginnings",
    field: "beginnings",
    align: "center",
  },
  {
    name: "new_production",
    label: "New Prod",
    field: "new_production",
    align: "center",
  },
  {
    name: "bread_out",
    label: "Out",
    field: "bread_out",
    align: "center",
  },
  {
    name: "remaining",
    label: "Remaining",
    field: "remaining",
    align: "center",
  },
  {
    name: "bread_sold",
    label: "Bread Sold",
    field: (row) => {
      const stock =
        (Number(row.beginnings) || 0) + (Number(row.new_production) || 0);
      const sold =
        stock - ((Number(row.remaining) || 0) + (Number(row.bread_out) || 0));
      return sold;
    },
    align: "center",
  },
  {
    name: "salesAmount",
    label: "Deficit Amount",
    field: "salesAmount",
    format: (val) => formatPrice(val),
    align: "right",
  },
];

const filteredRows = computed(() => {
  const data = props.reports || [];
  if (!filter.value) return data;
  const s = filter.value.toLowerCase();
  return data.filter((r) => r.bread.name.toLowerCase().includes(s));
});

const negativeSalesRows = computed(() => {
  return filteredRows.value
    .map((row) => {
      const stock =
        (Number(row.beginnings) || 0) + (Number(row.new_production) || 0);
      const sold =
        stock - ((Number(row.remaining) || 0) + (Number(row.bread_out) || 0));
      const salesAmount = sold * (Number(row.price) || 0);
      return { ...row, salesAmount };
    })
    .filter((row) => row.salesAmount < 0);
});

console.log("Negative Sales Rows:", negativeSalesRows.value);

const overallTotal = computed(() => {
  return filteredRows.value.reduce((acc, row) => {
    const stock =
      (Number(row.beginnings) || 0) + (Number(row.new_production) || 0);
    const sold =
      stock - ((Number(row.remaining) || 0) + (Number(row.bread_out) || 0));
    const sales = sold * (Number(row.price) || 0);
    return sales > 0 ? acc + sales : acc;
  }, 0);
});

// --- Methods ---
const handleGlobalUpdate = async (row, field, newVal) => {
  if (!userId.value) return;

  const meta = {
    report_id: row.id,
    name: row?.bread?.name || "Unknown",
    original_data: row[field],
    updated_data: newVal,
    updated_field: field,
    designation: branchId,
    designation_type: "branch",
    action: "updated",
    type_of_report: `Bread Report Update (${props.reportLabel})`,
    user_id: userId.value,
    sales_report_id: props.sales_report_id,
  };

  try {
    await productionStore.updateSalesField(
      row.id,
      newVal,
      meta,
      "bread",
      field
    );
    // Notify.create({
    //   message: "Inventory updated",
    //   color: "positive",
    //   icon: "check",
    //   position: "top-right",
    //   timeout: 1000,
    // });
  } catch (e) {
    Notify.create({ message: "Failed to update", color: "negative" });
  }
};
</script>

<style scoped>
.header-gradient {
  background: linear-gradient(135deg, #795548 0%, #5d4037 100%);
}

.inventory-table {
  border-radius: 12px;
  overflow: hidden;
}

.sticky-header-table :deep(.q-table__middle) {
  max-height: 100%;
}

.sticky-header-table :deep(thead tr:first-child th) {
  background-color: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 1;
  font-weight: bold;
}

.editable-cell {
  transition: all 0.2s;
}

.editable-cell:hover {
  background-color: #fff8e1 !important; /* Light amber highlight */
}

.edit-hint {
  opacity: 0;
}

.editable-cell:hover .edit-hint {
  opacity: 1;
}

.footer-summary {
  background: white;
  border-top: 1px solid #eee;
  position: sticky;
  bottom: 0;
  z-index: 2;
}

.error-table {
  border: 1px solid #ffcdd2;
  border-radius: 8px;
}

.border-red {
  border: 1px solid #f44336;
}
</style>
