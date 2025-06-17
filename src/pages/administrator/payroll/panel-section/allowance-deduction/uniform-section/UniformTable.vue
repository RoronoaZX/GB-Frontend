<template>
  <div class="row justify-between q-mb-md" align="right">
    <div class="row q-gutter-md">
      <AddUniform @create="handleCreateuniforms" />
    </div>
    <q-input
      v-model="filter"
      @update:model-value="handleInput"
      outlined
      dense
      flat
      label="Search"
      style="width: 300px"
    >
      <template v-slot:append>
        <div>
          <q-icon v-if="!loading" name="search" />
          <q-spinner v-else size="sm" />
        </div>
      </template>
    </q-input>
  </div>
  <q-table
    :filter="filter"
    :rows="uniformRows"
    :columns="uniformColumns"
    row-key="name"
    v-model:pagination="pagination"
    :rows-per-page-options="[5, 7, 10, 0]"
    @request="handleRequest"
    :loading="loading"
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
    <template v-slot:body-cell-number_of_payments="props">
      <q-td :props="props">
        <span>
          {{ props.row.number_of_payments || " - - " }}
          <q-tooltip>Edit Number Of Payments</q-tooltip>
        </span>
        <q-popup-edit
          @update:model-value="(val) => updateNumberOfPayments(props.row, val)"
          v-model="props.row.number_of_payments"
          :value="props.row.number_of_payments"
          :disable="
            props.row.number_of_payments === null ||
            props.row.number_of_payments === undefined
          "
          :auto-save="true"
          :persistent="true"
          :input-class="'text-center'"
          :options="{ offser: [0, 10] }"
          buttons
          label-set="Save"
          label-cancel="Close"
          v-slot="scope"
        >
          <q-input
            v-model="scope.value"
            :v-model="scope.value"
            @update:model-value="scope.value = $event"
            type="text"
            autofocus
            counter
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-td>
    </template>
    <template v-slot:body-cell-t_shirt="props">
      <q-td :props="props">
        <!-- <q-tooltip
          :offset="[0, 10]"
          :delay="600"
          class="bg-info text-dark text-subtitle1"
          style="width: 200px"
        >
          <div
            class="q-pb-sm text-center text-h6 text-weight-bold text-subtitle2"
          >
            T-Shirt
          </div>
          <q-separator class="q-mb-md" color="yellow" />
          <div class="" v-for="tShirt in props.row.t_shirt" :key="tShirt.size">
            <div class="row justify-between">
              <div>Size :</div>
              <div>
                {{ tShirt.size }}
              </div>
            </div>
            <div class="row justify-between">
              <div>PCS :</div>
              <div>
                {{ tShirt.pcs }}
              </div>
            </div>
            <div class="row justify-between">
              <div>PRICE :</div>
              <div>
                {{ formatCurrency(tShirt.price) }}
              </div>
            </div>
          </div>
        </q-tooltip> -->
        <q-chip
          square
          outline
          color="red-6"
          text-color="white"
          clickable
          @click="showTShirtDialog(props.row.t_shirt)"
        >
          {{ props.row.t_shirt.length }} T-Shirt
        </q-chip>
      </q-td>
      <q-dialog v-model="tShirtDialog">
        <q-card>
          <q-card-section class="text-h6">T-Shirt Details</q-card-section>

          <q-card-section>
            <div v-for="(item, i) in selectedTShirts" :key="i" class="q-mb-sm">
              • Size: {{ item.size }} — {{ item.pcs }} pcs — ₱{{ item.price }}
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Close" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </template>
    <template v-slot:body-cell-pants="props">
      <q-td :props="props">
        <q-tooltip
          :offset="[0, 10]"
          :delay="600"
          class="bg-info text-dark text-subtitle1"
          style="width: 200px"
        >
          <div
            class="q-pb-sm text-center text-h6 text-weight-bold text-subtitle2"
          >
            Pants
          </div>
          <q-separator class="q-mb-md" color="yellow" />
          <div class="" v-for="pant in props.row.pants" :key="pant.size">
            <div class="row justify-between">
              <div>Size :</div>
              <div>
                {{ pant.size }}
              </div>
            </div>
            <div class="row justify-between">
              <div>PCS :</div>
              <div>
                {{ pant.pcs }}
              </div>
            </div>
            <div class="row justify-between">
              <div>PRICE :</div>
              <div>
                {{ formatCurrency(pant.price) }}
              </div>
            </div>
          </div>
        </q-tooltip>
        <q-chip square outline color="brown-6" class="text-white">
          {{ props.row.pants.length }} Pants
        </q-chip>
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <EditUniform :edit="props.row" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import AddUniform from "./AddUniform.vue";
import { useUniformStore } from "stores/uniform";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import EditUniform from "./EditUniform.vue";

const uniformStore = useUniformStore();
const filter = ref("");
const uniforms = computed(() => uniformStore.uniforms);
const uniformRows = ref([]);
const loading = ref(false);
const pagination = ref({
  rowsPerPage: 0,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const tShirtDialog = ref(false);
const selectedTShirts = ref([]);

const showTShirtDialog = (tShirtData) => {
  selectedTShirts.value = tShirtData;
  tShirtDialog.value = true;
};

const handleCreateuniforms = (newEntry) => {
  rows.value.unshift(newEntry);
};
// const viewTShirtDetails = (row) => {
//   console.log("viewTShirtDetails", row);
//   alert("T-Shirt data:", row);
//   // You can open a dialog or set a reactive `selectedTShirt = row.t_shirt` etc.
// };

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
    loading.value = true;
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
  } catch (error) {
    console.log("error fetching madepakeer", error);
  } finally {
    loading.value = false;
  }
};

let debounceTimeout;
const handleInput = () => {
  loading.value = true; // Start loading when typing
  clearTimeout(debounceTimeout); // Clear previous timeout
  debounceTimeout = setTimeout(() => {
    loading.value = false; // Stop loading after debounce delay
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
  await reloadTableData(
    pagination.value.page,
    pagination.value.rowsPerPage,
    newVal
  );
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
    name: "t_shirt",
    label: "T-Shirt",
    align: "center",
    field: "t_shirt",
  },
  {
    name: "pants",
    label: "Pants",
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
.gradient-header {
  background: linear-gradient(135deg, #444444, #111111);
}
</style>
