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
          <div class="text-h6">Expenses Report</div>
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
      <!-- {{ sales_report_id }} -->
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
          <AddingExpenses
            :reports="expensesReports"
            :user="props.user"
            :sales_report_id="props.sales_report_id"
            :user_id="props.user_id"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :filter="filter"
          :virtual-scroll-sticky-size-start="48"
          flat
          :columns="expensesReportColumn"
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
              <span>{{ `${capitalizeFirstLetter(props.row.name)}` }}</span>
              <!-- Popup for editing the amount -->
              <q-popup-edit
                @update:model-value="(val) => updateName(props.row, val)"
                v-model="props.row.name"
                auto-save
                v-slot="scope"
              >
                <q-input
                  class="text-capitalize"
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
          <template v-slot:body-cell-description="props">
            <q-td :props="props">
              <span>{{
                `${capitalizeFirstLetter(props.row.description)}`
              }}</span>
              <!-- Popup for editing the amount -->
              <q-popup-edit
                @update:model-value="(val) => updateDescription(props.row, val)"
                v-model="props.row.description"
                auto-save
                v-slot="scope"
              >
                <q-input
                  class="text-capitalize"
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
          <template v-slot:body-cell-amount="props">
            <q-td :props="props">
              <!-- Display the formatted amount -->
              <span>{{ formatPrice(props.row.amount) }}</span>

              <!-- Popup for editing the amount -->
              <q-popup-edit
                @update:model-value="
                  (val) => updateAmount(props.row, parseFloat(val))
                "
                v-model="props.row.amount"
                auto-save
                v-slot="scope"
              >
                <q-input
                  v-model.number="scope.value"
                  dense
                  type="number"
                  mask="##0.00"
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
            Overall Total Expenses: {{ formatPrice(overallTotal || "0") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import AddingExpenses from "./AddingExpenses.vue";
import { useDialogPluginComponent } from "quasar";
import { api } from "src/boot/axios";
import { ref, computed } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const dialog = ref(false);
const maximizedToggle = ref(true);
const filter = ref("");
const pagination = ref({
  rowsPerPage: 0,
});

const props = defineProps({
  reports: Array,
  user: Object,
  sales_report_id: Number,
  user_id: Number,
});
// defineEmits("hide", "ok", "cancel");

const expensesReports = props.reports;
console.log("Expenses total", props.total);

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const updateName = async (data, val) => {
  console.log("update data of the updateName", data);
  console.log("update val of the updateName", val);

  try {
    const response = await api.put(
      "/api/update-expenses-sales-name-report/" + data.id,
      {
        name: val,
      }
    );
    console.log("Updated expenses amount response:", response.data);
  } catch (error) {
    console.error(error);
  }
};
const updateDescription = async (data, val) => {
  console.log("update data of the description", data);
  console.log("update val of the description", val);

  try {
    const response = await api.put(
      "/api/update-expenses-sales-description-report/" + data.id,
      {
        description: val,
      }
    );
    console.log("Updated expenses amount response:", response.data);
  } catch (error) {
    console.error(error);
  }
};

const updateAmount = async (data, val) => {
  console.log("update data of the amount", data);
  console.log("update val of the amount", val);

  try {
    const response = await api.put(
      "/api/update-expenses-sales-amount-report/" + data.id,
      {
        amount: parseFloat(val),
      }
    );
    console.log("Updated expenses amount response:", response.data);
  } catch (error) {
    console.error(error);
  }
};

const expensesReportColumn = [
  {
    name: "name",
    label: "Expenses Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.name || "N/A"; // Adjust this according to your data
    },
    align: "center",
  },
  {
    name: "description",
    label: "Description",
    field: "description",
    align: "center",
  },
  {
    name: "amount",
    label: "Amount",
    field: "amount",
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
// Replace this with your actual filtered rows logic
const filteredRows = computed(() => {
  // Assuming `breads` is an array in `reports`
  console.log("Filtered rows:", props.reports || []);
  return props.reports || [];
});

const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    const amount = parseFloat(row.amount) || 0; // Ensure proper parsing and handle non-numeric values
    return total + amount;
  }, 0); // Provide an initial value for reduce
  return total;
});

console.log("Expenses:", filteredRows.value);
</script>

<style scoped></style>
