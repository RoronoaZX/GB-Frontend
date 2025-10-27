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
              Supplier: {{ capitalizeFirstLetter(props.row.supplier) }}
            </div>

            <q-input
              v-model="scope.value"
              type="datetime-local"
              filled
              :model-value="convertDisplayToInput(props.row.created_at)"
              @update:model-value="scope.value = $event"
              hint="Select date & time"
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

const convertDisplayToInput = (displayVal) => {
  if (!displayVal) return "";

  const parsed = new Date(displayVal);
  if (isNaN(parsed)) return "";

  // "YYYY-MM-DDTHH:mm" → fits <input type="datetime-local">
  return date.formatDate(parsed, "YYYY-MM-DDTHH:mm");
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

const updateSupplierHistoriesDateTime = (row, newTime) => {
  console.log("Updating date time for row:", row.id, "to new time:", newTime);
  if (!row.id || !newTime) return;

  // Send only the selelcted date
  const response = supplierHistoryStore.updateSupplierHistoriesDateTime(
    row.id,
    newTime
  );
};

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
