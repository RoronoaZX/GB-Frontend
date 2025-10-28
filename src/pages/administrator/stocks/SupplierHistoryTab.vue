<template>
  <div>
    <q-input
      class="q-pb-lg q-pl-mb"
      v-model="filter"
      @update:model-value="filter"
      outlined
      placeholder="Search"
      debounce="1000"
      flat
      dense
      rounded
      style="width: 450px; max-width: 1500px; min-width: 100px"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>

  <q-table
    flat
    bordered
    row-key="id"
    :columns="supplierHistoryColumns"
    :rows="supplierHistoriesData || []"
    :loading="loading"
    v-model:pagination="pagination"
    :rows-per-page-options="[5, 7, 10, 0]"
    :filter="filter"
    @request="onPageRequest"
  >
    <template v-slot:header="props">
      <q-tr :props="props" class="gradient-header text-white text-weight-bold">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-center text-subtitle2"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell-date="props">
      <q-td :props="props" class="cursor-pointer">
        <span>
          {{
            props.row.created_at ? formatTimestamp(props.row.created_at) : "N/A"
          }}
          <q-tooltip class="bg-blue-grey-8"> Edit Date </q-tooltip>
        </span>
        <q-popup-edit
          v-model="props.row.created_at"
          v-slot="scope"
          persistent
          @save="(newVal) => updateSupplierHistoriesDateTime(props.row, newVal)"
        >
          <div>
            <div class="text-h6 text-primary text-center q-mb-sm">
              Edit Date & Time
            </div>
            <div class="text-subtitle2 q-mb-sm">
              Supplier: {{ capitalizeFirstLetter(props.row.supplier_name) }}
            </div>

            <q-input
              filled
              :model-value="splitDateTime(props.row.created_at).datePart"
              @update:model-value="
                (val) => updateCombinedDateTime(scope, val, 'date')
              "
              mask="####-##-##"
              label="Date"
              hint="Format: YYYY-MM-DD"
              class="q-mb-sm"
            />

            <q-input
              filled
              :model-value="splitDateTime(props.row.created_at).timePart"
              @update:model-value="
                (val) => updateCombinedDateTime(scope, val, 'time')
              "
              mask="##:## AA"
              label="Time (AM/PM)"
            />

            <div class="row justify-end q-mt-md">
              <q-btn
                flat
                label="Cancel"
                color="primary"
                @click="scope.cancel"
              />
              <q-btn flat label="Save" color="primary" @click="scope.set" />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>

    <template v-slot:body-cell-status="props">
      <q-td :props="props">
        <q-chip
          :color="getStatusColor(props.row.status)"
          text-color="white"
          size="sm"
          square
        >
          {{ capitalizeFirstLetter(props.row.status) || "N/A" }}
        </q-chip>
      </q-td>
    </template>

    <template v-slot:body-cell-number_of_items="props">
      <q-td :props="props">
        <q-btn
          flat
          dense
          color="primary"
          :label="`${props.row.supplier_ingredients.length} ${
            props.row.supplier_ingredients.length === 1 ? 'item' : 'items'
          }`"
          @click="openSupplierIngredients(props.row)"
        />
      </q-td>
    </template>

    <template #loading>
      <q-inner-loading showing>
        <q-spinner-ios size="50px" color="grey-10" />
      </q-inner-loading>
    </template>
  </q-table>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useSupplierHistoryStore } from "src/stores/supplier-history";
import { Notify, useQuasar, date } from "quasar";
import ViewIngredientItems from "./ViewIngredientItems.vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const { formatTimestamp, capitalizeFirstLetter, getStatusColor } =
  typographyFormat();

const supplierHistoryStore = useSupplierHistoryStore();
const supplierHistories = computed(
  () => supplierHistoryStore.supplierHistories
);

const convertDisplayToInput = (isoDateString) => {
  if (!isoDateString) return "";

  // Parse as UTC then adjust to local time (important if backend returns UTC)
  const localTime = date.extractDate(isoDateString, "YYYY-MM-DDTHH:mm:ss.SSSZ");

  // Format to Quasar-friendly combined value (12-hour format with AM/PM)
  // You can also use "HH:mm" if you prefer 24-hour
  return date.formatDate(localTime, "YYYY-MM-DD hh:mm AA");
};

const splitDateTime = (isoDateString) => {
  if (!isoDateString) return { datePart: "", timePart: "" };

  // ✅ Normalize microseconds and Zulu timezone
  const cleanISO = isoDateString.replace(/\.\d+Z$/, "Z");

  // ✅ Create a real JS Date (handles UTC correctly)
  const parsed = new Date(cleanISO);

  if (isNaN(parsed)) {
    console.error("Invalid date string: ", isoDateString);
    return { datePart: "", timePart: "" };
  }

  // ✅ Format to local time ( using Quasar utilities)
  const datePart = date.formatDate(parsed, "YYYY-MM-DD");
  const timePart = date.formatDate(parsed, "hh:mm A");

  return { datePart, timePart };
};

const getDateFromCombined = (combinedDateTimeString) => {
  if (!combinedDateTimeString) return "";
  const parts = combinedDateTimeString.split(" ");
  return parts[0] || ""; // Returns YYYY-MM-DD
};

// Extracts just the time part (hh:mm A) from a combined date-time string
const getTimeFromCombined = (combinedDateTimeString) => {
  if (!combinedDateTimeString) return "";
  const parts = combinedDateTimeString.split(" ");
  // Handles both "YYYY-MM-DD hh:mm A" and "YYYY-MM-DD HH:mm"
  if (parts.length === 3) return `${parts[1]} ${parts[2]}`; // hh:mm A
  if (parts.length === 2) return parts[1]; // HH:mm
  return "";
};

// Updates the combined scope.value when either date or time input changes
const updateCombinedDateTime = (scope, newValue, type) => {
  let currentDatePart = getDateFromCombined(
    scope.value || convertDisplayToInput(scope.initialValue)
  );
  let currentTimePart = getTimeFromCombined(
    scope.value || convertDisplayToInput(scope.initialValue)
  );

  if (type === "date") {
    currentDatePart = newValue;
  } else if (type === "time") {
    currentTimePart = newValue;
  }

  // Combine them back. Ensure both parts exist to avoid "YYYY-MM-DD undefined"
  if (currentDatePart && currentTimePart) {
    scope.value = `${currentDatePart} ${currentTimePart}`;
  } else if (currentDatePart) {
    // If only date is available
    scope.value = currentDatePart;
  } else if (currentTimePart) {
    // If only time is available
    scope.value = currentTimePart;
  } else {
    scope.value = ""; // Or handle as appropriate
  }
};

const supplierHistoriesData = ref([]);

const $q = useQuasar();

const loading = ref(false);

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const filter = ref("");

const updateSupplierHistoriesDateTime = async (row, newTime) => {
  if (!row.rm_delivery_id || !newTime) return;

  try {
    loading.value = true;
    // Check if user only changed the date (missing time)
    const hasTime = /\d{1,2}:\d{2}/.test(newTime);

    let finalDateTime = newTime;

    if (!hasTime) {
      // 🟢 Use original time from created_at if missing
      const original = splitDateTime(row.created_at);
      const originalTime = original.timePart || "12:00 AM"; // fallback
      finalDateTime = `${newTime} ${originalTime}`;
    }

    // ✅ Send the full date + time to backend
    const response = await supplierHistoryStore.updateSupplierHistoriesDateTime(
      row.rm_delivery_id,
      finalDateTime
    );

    console.log("Updated datetime payload:", finalDateTime);
    console.log("response", response);

    // 🟢 Update the current table row immediately
    if (response?.created_at) {
      row.created_at = response.created_at; // <-- refresh UI instantly
    }

    // 🟢 Optionally notify the user
    $q.notify({
      type: "positive",
      message: "Date & time updated successfully!",
      position: "top",
    });
  } catch (error) {
    console.error("Error updating DTR:", error);
    $q.notify({
      type: "negative",
      message: "Failed to update date & time.",
      position: "top",
    });
  } finally {
    loading.value = false;
  }
};

// const updateSupplierHistoriesDateTime = async (row, newTime) => {
//   if (!row.rm_delivery_id || !newTime) return;

//   try {
//     // Check if user only changed the data (missing time)
//     const hasTime = /\d{1,2}:\d{2}/.test(newTime);

//     let finalDateTime = newTime;

//     if (!hasTime) {
//       // 🟢 Use original time from.created_at if missing
//       const original = splitDateTime(row.created_at);
//       const originalTime = original.timePart || "12:00 AM"; // fallback

//       finalDateTime = `${newTime} ${originalTime}`;
//     }

//     // ✅ Send the full date + time to backend
//     const response = await supplierHistoryStore.updateSupplierHistoriesDateTime(
//       row.rm_delivery_id,
//       finalDateTime
//     );

//     console.log("Updated datetime payload:", finalDateTime);
//     console.log("responsess", response);

//     // 🟢 Update the current table row immediatedly
//     if (response?.created_at) {
//       row.create_at = response.created_at; // <-- refresh UI instantly
//     }

//     //  🟢 Optionally notify the user
//     $q.notify({
//       type: "positive",
//       message: "Date & Time updated successfully!",
//       position: "top-right",
//     });
//   } catch (error) {
//     console.error("Error updating DTR:", error);

//     $q.notify({
//       type: "negative",
//       messaage: "Failed to update date & time.",
//       position: "top-right",
//     });
//   }
// };

const fetchSupplierHistory = async (page = 0, rowsPerPage = 5, search = "") => {
  console.log("Fetching recipe costs in store...");
  try {
    loading.value = true;
    // ✅ If it's the first load (page just opened), show full spinner
    supplierHistories.value = await supplierHistoryStore.fetchSupplierHistory(
      page,
      rowsPerPage,
      search
    );
    console.log("supplierHistories", supplierHistories.value);

    const { data, current_page, per_page, total } = supplierHistories.value;
    supplierHistoriesData.value = data;
    console.log("supplierHistoriesData.value", supplierHistoriesData.value);
    pagination.value.page = current_page;
    console.log("pagination.value.page", pagination.value.page);
    pagination.value.rowsPerPage = per_page;
    console.log("pagination.value.rowsPerPage", pagination.value.rowsPerPage);
    pagination.value.rowsNumber = total;
    console.log("pagination.value.rowsNumber", pagination.value.rowsNumber);
  } catch (error) {
    console.log("Error fetching recipe costs:", error);
    Notify.create({
      message: "Error fetching recipe costs",
      color: "negative",
      position: "top",
    });
  } finally {
    loading.value = false;
  }
};
onMounted(fetchSupplierHistory);

const onPageRequest = (props) => {
  console.log("props", props);
  fetchSupplierHistory(
    props.pagination.page,
    props.pagination.rowsPerPage,
    props.filter
  );
};

const openSupplierIngredients = (row) => {
  console.log("Editing row:", row);

  $q.dialog({
    component: ViewIngredientItems,
    componentProps: {
      row,
    },
  });
};

const supplierHistoryColumns = [
  {
    name: "date",
    required: true,
    label: "Date",
    align: "center",
    field: "created_at",
  },
  {
    name: "supplier",
    required: true,
    label: "Supplier",
    align: "center",
    field: (row) =>
      row.supplier_name ? capitalizeFirstLetter(row.supplier_name) : "N/A",
  },
  {
    name: "status",
    required: true,
    label: "Status",
    align: "center",
    field: "status",
  },
  {
    name: "number_of_items",
    required: true,
    label: "Items",
    align: "center",
  },
];
</script>

<style scoped>
.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-wrapper {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-container {
  max-height: 450px; /* Adjust as needed */
  overflow: hidden;
}

.gradient-header {
  background: #155e75;
}
</style>
