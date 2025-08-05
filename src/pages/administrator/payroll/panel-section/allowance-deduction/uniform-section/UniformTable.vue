<template>
  <q-page class="q-my-md">
    <div class="row justify-between q-mb-md" align="right">
      <div class="row q-gutter-md">
        <AddUniform @created="reloadTableData" />
      </div>
      <TableFilter v-model="filter" @update:model-value="filter" />
    </div>
    <q-table
      :filter="filter"
      :rows="uniformRows"
      :columns="uniformColumns"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 0]"
      @request="handleRequest"
      :loading="tableLoading"
    >
      <template v-slot:header="props">
        <q-tr
          :props="props"
          class="gradient-header text-white text-weight-bold"
        >
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

      <template v-slot:body-cell-remaining_payments="props">
        <q-td :props="props">
          <span
            v-if="props.row.remaining_payments === '0.00'"
            class="text-green-8 text-bold q-px-sm q-py-xs rounded-borders"
            style="background-color: #e0ffe0; border: 1px solid #a0f0a0"
          >
            Paid
          </span>
          <span v-else>
            {{ formatCurrency(props.row.remaining_payments) }}
          </span>
        </q-td>
      </template>

      <template v-slot:body-cell-t_shirt="props">
        <q-td :props="props">
          <div v-if="props.row.t_shirt[0]">
            <div class="q-mb-sm q-pb-sm">
              <div class="q-ml-sm">
                <p class="q-my-none text-caption">
                  <span class="text-bold">Size:</span>
                  {{ props.row.t_shirt[0].size }}
                </p>
                <p class="q-my-none text-caption">
                  <span class="text-bold">Qty:</span>
                  {{ props.row.t_shirt[0].pcs }} pcs
                </p>
                <p class="q-my-none text-caption">
                  <span class="text-bold">Price:</span>
                  {{ formatCurrency(props.row.t_shirt[0].price) }}
                </p>
              </div>
            </div>
          </div>
          <!-- <div v-if="props.row.t_shirt[0]">
            <div class="q-mb-sm q-pb-sm" style="border-bottom: 1px dashed #ccc">
              <div class="q-ml-sm">
                <p class="q-my-none text-caption">
                  <span class="text-bold">Size:</span>
                  {{ props.row.t_shirt[0].size }} |
                  <span class="text-bold">Qty:</span>
                  {{ props.row.t_shirt[0].pcs }} pcs
                </p>
                <p class="q-my-none text-caption">
                  <span class="text-bold">Price:</span>
                  {{ formatCurrency(props.row.t_shirt[0].price) }}
                </p>
              </div>
              <strong>Size:</strong> {{ props.row.t_shirt[0].size }} <br />
              <strong>Qty:</strong> {{ props.row.t_shirt[0].pcs }} pcs <br />
              <strong>Price:</strong> {{ props.row.t_shirt[0].price }} <br />
            </div>
          </div> -->
          <div v-else>👕 No Data</div>
        </q-td>
      </template>

      <template v-slot:body-cell-pants="props">
        <q-td :props="props">
          <div v-if="props.row.pants[0]">
            <div class="q-ml-sm">
              <p class="q-my-none text-caption">
                <span class="text-bold">Size:</span>
                {{ props.row.pants[0].size }}
              </p>
              <p class="q-my-none text-caption">
                <span class="text-bold">Qty:</span>
                {{ props.row.pants[0].pcs }} pcs
              </p>
              <p class="q-my-none text-caption">
                <span class="text-bold">Price:</span>
                {{ formatCurrency(props.row.pants[0].price) }}
              </p>
            </div>
          </div>
          <div v-else>👖 No Data</div>
        </q-td>
      </template>

      <!-- <template v-slot:body-cell-pants="props">
        <q-td :props="props">
          <q-chip
            square
            outline
            color="brown-6"
            text-color="white"
            clickable
            @click="openUniformDialog(props.row.pants, 'Pants')"
          >
            Pants
            <q-tooltip :offset="[10, 10]" style="background-color: #155e75">
              Click to view pants details!
            </q-tooltip>
          </q-chip>
        </q-td>
      </template> -->

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <EditUniform :edit="props.row" @edited="reloadTableData" />
        </q-td>
      </template>
      <template #loading>
        <q-inner-loading showing>
          <q-spinner-ios size="50px" color="grey-10" />
        </q-inner-loading>
      </template>
    </q-table>
    <ViewUniformDetails
      v-model="tShirtDialog"
      :items="selectedItems"
      :label="dialogLabel"
    />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import AddUniform from "./AddUniform.vue";
import { useUniformStore } from "stores/uniform";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import EditUniform from "./EditUniform.vue";
import ViewUniformDetails from "./ViewUniformDetails.vue";
import TableFilter from "../components/TableFilter.vue";

const uniformStore = useUniformStore();
const filter = ref("");
const uniforms = computed(() => uniformStore.uniforms);
const uniformRows = ref([]);
const tableLoading = ref(false);
const searchLoading = ref(false);
const pagination = ref({
  rowsPerPage: 0,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const tShirtDialog = ref(false);
const selectedItems = ref([]);
const dialogLabel = ref("");

const openUniformDialog = (items, labelText) => {
  selectedItems.value = items;
  dialogLabel.value = labelText;
  tShirtDialog.value = true;
};

async function updateNumberOfPayments(data, val) {
  console.log("updateNumberOfPayments", data, val);
  try {
    const response = await api.put(
      "/api/update-uniform-number-of-payments/" + data.id,
      {
        numberOfPayments: val,
      }
    );
    Notify.create({
      message: "Number of payments updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error updating number of payments:", error);
    Notify.create({
      message: "Failed to update number of payments",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  }
}

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async (page = 1, rowsPerPage = 7, search = "") => {
  try {
    tableLoading.value = true;
    uniformRows.value = await uniformStore.fetchUniform(
      page,
      rowsPerPage,
      search
    );
    console.log("uniform", uniformRows.value);

    const { data, current_page, per_page, total } = uniforms.value;
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;

    uniformRows.value = data;
    console.log("uniformss", uniformRows.value);
  } catch (error) {
    console.log("error fetching madepakeer", error);
  } finally {
    tableLoading.value = false;
  }
};

let debounceTimeout;
const handleInput = () => {
  searchLoading.value = true; // Start loading when typing
  clearTimeout(debounceTimeout); // Clear previous timeout
  debounceTimeout = setTimeout(() => {
    searchLoading.value = false; // Stop loading after debounce delay
  }, 500); // Adjust debounce delay as needed
};

const handleRequest = (props) => {
  reloadTableData(
    props.pagination.page,
    props.pagination.rowsPerPage,
    props.filter
  );
};
watch(filter, async (newVal) => {
  searchLoading.value = true;
  await reloadTableData(
    pagination.value.page,
    pagination.value.rowsPerPage,
    newVal
  );
  searchLoading.value = false;
});

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

// Format currency values
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};

const formatDate = (dateTime) => {
  if (!dateTime) return " - - "; // Return a placeholder if the value is missing
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) return " - - ";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }); // Format as "Oct. 14, 2024"
};

const uniformColumns = [
  {
    name: "date",
    required: true,
    label: "Date",
    align: "left",
    field: (row) => formatDate(row.created_at),
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => formatFullname(row.employee),
  },
  {
    name: "number_of_payments",
    required: true,
    label: "Number of Payments",
    align: "center",
    field: "number_of_payments",
  },
  {
    name: "total_amount",
    required: true,
    label: "Total Amount",
    align: "center",
    field: (row) => formatCurrency(row.total_amount),
  },
  {
    name: "payments_per_payroll",
    required: true,
    label: "Payments Per Payroll",
    align: "center",
    field: (row) => formatCurrency(row.payments_per_payroll),
  },
  {
    name: "remaining_payments",
    required: true,
    label: "Remaining Payments",
    align: "center",
    field: (row) =>
      row.remaining_payments === "0.00"
        ? "Paid"
        : formatCurrency(row.remaining_payments),
  },
  {
    name: "t_shirt",
    label: "👕 T-Shirt",
    align: "center",
    field: "t_shirt",
  },
  {
    name: "pants",
    label: "👖 Pants",
    align: "center",
    field: "pants",
  },
  {
    name: "actions",
    label: "Actions",
    align: "center",
    field: "actions",
  },
];
</script>

<style lang="scss" scoped>
.custom-table {
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
}

.gradient-header {
  background: #155e75;
}

.gradient-loader {
  background: linear-gradient(135deg, #42a5f5, #478ed1, #5c6bc0);
  color: white;
  z-index: 10;
  opacity: 0.85;
}
</style>
