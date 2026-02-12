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
          <div class="row item-center q-gutter-md">
            <q-avatar
              icon="ac_unit"
              color="white"
              text-color="blue-8"
              shadow-2
            />
            <div>
              <div class="text-h6 text-weight-bold">Nestlé Report Details</div>
              <div class="text-caption opacity-80">
                {{ formatDate(reportDate) }} •
                {{ props.reportLabel || "Daily Inventory " }}
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
          placeholder="Search nesle variety..."
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

        <AddingNestleReport
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
            The quantity remaining/out exceeds total stock. These row are
            excluded from overall total.
          </div>

          <template v-slot:action>
            <q-qtn
              flat
              color="red-10"
              :label="showErrors ? 'HideDetails' : 'View Errors'"
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
              :columns="negativeNestleProductColumn"
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
            :columns="nestleReportColumns"
            :rows="filteredRows"
            row-key="qi"
            class="inventory-table sticky-header-table shadow-2"
            :rows-per-page-options="[0]"
            hide-bottom
            virtual-scroll
          >
            <template v-slot:body-cell-name="props">
              <q-td :props="props" class="text-weight-bold text-blue-grey-9">
                {{ capitalizeFirstLetter(props.row.nestle.name) }}
              </q-td>
            </template>

            <template
              v-for="col in [
                'price',
                'beginnings',
                'added_stocks',
                'remaining',
                'out',
              ]"
              :key="col"
              v-slot:[`body-cell-${col}`]="props"
            >
              <q-td :props="props" class="editable-cell cursor-pointer">
                <div class="row items-center justify-between no-wrap">
                  <span>
                    {{
                      col === "price"
                        ? formatPrice(props.row[col])
                        : props.row[col]
                    }}
                  </span>
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
                    @keyup.enter="scope.set"
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
            <div class="text-overline text-grey-7">Reports Statistics</div>
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
import { Notify, useDialogPluginComponent } from "quasar";
import AddingNestleReport from "./AddingNestleReport.vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "src/stores/user";
import { useProductionStore } from "src/stores/production";
import { computed, ref } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice, formatDate, formatFullname } =
  typographyFormat();

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const productionStore = useProductionStore();
const userStore = useUsersStore();
const route = useRoute();

const props = defineProps([
  "reports",
  "sales_report_id",
  "user",
  "reportLabel",
  "reportDate",
]);

console.log("Propssssss..", props);

const emit = defineEmits(["summary-updated"]);

const dialog = ref(false);
const maximizedToggle = ref(true);
const filter = ref("");
const showErrors = ref(false);
const branchId = route.params.branch_id;

const userId = computed(() => userStore.userData?.data?.id ?? null);
const reportLength = computed(() => filteredRows.value.length);

const userReady = computed(() => !!userId.value);

const nestleReportColumns = [
  {
    name: "name",
    label: "Product Name",
    field: (row) => row.nestle.name,
    sortable: true,
    align: "center",
  },
  {
    name: "price",
    label: "Price",
    field: "price",
    align: "center",
  },
  {
    name: "beginnings",
    label: "Beginnings",
    field: "beginnings",
    align: "center",
  },
  {
    name: "remaining",
    label: "Remaining",
    field: "remaining",
    align: "center",
  },
  {
    name: "out",
    label: "Out",
    field: "out",
    align: "center",
  },
  {
    name: "added_stocks",
    label: "Added Stocks",
    field: "added_stocks",
    align: "center",
  },
  {
    name: "total_nestle",
    label: "Total Stocks",
    field: (row) => {
      const totalNestle =
        Number(row.beginnings || 0) + Number(row.added_stocks || 0);
      return totalNestle;
    },

    align: "center",
  },
  {
    name: "sold",
    label: "Sold",
    field: (row) => {
      const stock =
        (Number(row.beginnings) || 0) + (Number(row.added_stocks) || 0);
      const sold =
        stock - ((Number(row.remaining) || 0) + (Number(row.out) || 0));
      return sold;
    },
    align: "center",
  },
  {
    name: "sales",
    label: "Calculated Sales",
    field: (row) => {
      const stock =
        (Number(row.beginnings) || 0) + (Number(row.added_stocks) || 0);
      const sold =
        stock - ((Number(row.remaining) || 0) + (Number(row.out) || 0));

      return sold * (Number(row.price) || 0);
    },
    align: "center",
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
    align: "center",
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

const negativeNestleProductColumn = [
  {
    name: "name",
    label: "Nestlé Name",
    field: (row) => row.nestle.name || "N/A",
    format: (val) => capitalizeFirstLetter(val),
    align: "justify",
  },
  {
    name: "beginnings",
    label: "Beginnings",
    field: "beginnings",
    align: "center",
  },
  {
    name: "added_stocks",
    label: "Added Stocks",
    field: "added_stocks",
    align: "justify",
  },
  {
    name: "remaining",
    label: "Remaining",
    field: "remaining",
    align: "justify",
  },
  {
    name: "out",
    label: "Out",
    field: "out",
    align: "justify",
  },
  {
    name: "nestleSold",
    label: "Sold",
    field: (row) => {
      const stock =
        (Number(row.beginnings) || 0) + (Number(row.added_stocks) || 0);
      const sold =
        stock - ((Number(row.remaining) || 0) + (Number(row.out) || 0));
      return sold;
    },
    align: "center",
  },
  {
    name: "salesAmount",
    label: "Deficit Amount",
    field: "salesAmount",
    format: (val) => formatPrice(val),
    align: "justify",
  },
];

const filteredRows = computed(() => {
  const data = props.reports || [];
  if (!filter.value) return data;
  const s = filter.value.toLowerCase();
  return data.filter((r) => r.nestle.name.toLowerCase().includes(s));
});

const negativeSalesRows = computed(() => {
  return filteredRows.value
    .map((row) => {
      const stock = (Number(row.remaining) || 0) + (Number(row.out) || 0);
      const sold =
        stock - ((Number(row.remaining) || 0) + (Number(row.out) || 0));
      const salesAmount = sold * (Number(row.price) || 0);
      return { ...row, salesAmount };
    })
    .filter((row) => row.salesAmount < 0);
});

const overallTotal = computed(() => {
  return filteredRows.value.reduce((acc, row) => {
    const stock =
      (Number(row.beginnings) || 0) + (Number(row.added_stocks) || 0);
    const sold =
      stock - ((Number(row.remaining) || 0) + (Number(row.out) || 0));
    const sales = sold * (Number(row.price) || 0);

    return sales > 0 ? acc + sales : acc;
  }, 0);
});

const handleGlobalUpdate = async (row, field, newVal) => {
  if (!userId.value) return;

  const meta = {
    report_id: row.id,
    name: row?.nestle?.name || "Unknown",
    original_data: row[field],
    updated_data: newVal,
    designation: branchId,
    designation_type: "branch",
    action: "updated",
    type_of_report: `Nestle Report Update (${props.reportLabel})`,
    user_id: userId.value,
    sales_report_id: props.sales_report_id,
  };

  console.log("meta", meta);

  try {
    await productionStore.updateSalesField(
      row.id,
      newVal,
      meta,
      "nestle",
      field
    );
  } catch (error) {
    Notify.create({
      message: "Update failed",
      color: "negative",
    });
  }
};
</script>

<style lang="scss" scoped>
.header-gradient {
  background: linear-gradient(to right, #054f6a 0%, #15c2ee 100%);
}

.inventory-table {
  border-radius: 12px;
  overflow: hidden;
}

.sticky-header-table :deep(.q-table__middle) {
  max-height: 100%;
}

.sticky-header-table :deep(thread tr:first-child th) {
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

.footer-summary {
  background: white;
  border-top: 1px solid #eee;
  position: sticky;
  bottom: 0;
  z-index: 2;
}

.error-table {
  border: 1px solid #77b6f0;
  border-radius: 8px;
}

.border-red {
  border: 1px solid #2387e5;
}
</style>
