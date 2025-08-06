<template>
  <q-table :rows="incentives" :columns="incentivesBasesColumns">
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

    <template v-slot:body-cell-number_of_employees="props">
      <q-td :props="props" class="cursor-pointer">
        <span>
          {{
            props.row.number_of_employees
              ? props.row.number_of_employees
              : " - - "
          }}
          <q-tooltip class="bg-blue-grey-8">
            Edit Number of Employees
          </q-tooltip>
        </span>
        <q-popup-edit
          v-model="editedValue"
          @before-show="editedValue = props.row.number_of_employees"
          @hide="(val) => updateNumberEmployee(props.row, val)"
          v-slot="scope"
        >
          <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
            <div class="text-h6 text-primary text-center q-mb-sm">
              Edit Number of Employees
            </div>

            <q-input
              v-model.number="scope.value"
              outlined
              dense
              label="Number of Employees"
              type="number"
              autofocus
              clearable
              :rules="[
                (val) => !!val || 'Number of employees is required',
                (val) =>
                  val > 0 || 'Number of employees must be greater than 0',
              ]"
            />
            <div class="row justify-end q-mt-md">
              <q-btn flat label="Close" color="primary" @click="scope.cancel" />
              <q-btn flat label="Save" color="primary" @click="scope.set" />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { useIncentivesStore } from "src/stores/incentives";
import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";

const incentivesStore = useIncentivesStore();
const incentives = computed(() => incentivesStore.incentives);
const $q = useQuasar();
const editedValue = ref(null);

const tableLoading = ref(false);

const updateNumberEmployee = async (row, val) => {
  // 1. Check for a no-op update
  if (Number(val) === Number(row.number_of_employees)) {
    console.log("Value did not change, no API call made.");
    return;
  }

  tableLoading.value = true;
  try {
    // 2. Call the store action with the correct ID and new value
    await incentivesStore.updateNumberEmployee(row.id, val);

    // 3. Update the local row data ONLY after a successful API call
    row.number_of_employees = val;

    $q.notify({
      type: "positive",
      message: "Number of employees updated successfully.",
    });
  } catch (error) {
    console.error(error);

    // 4. Detailed error handling based on the response
    if (error.response && error.response.status === 422) {
      const errorMessage = error.response.data.error;
      $q.notify({
        type: "negative",
        message: errorMessage || "An unexpected validation error occurred.",
      });
    } else {
      $q.notify({
        type: "negative",
        message: "An error occurred while updating the number of employees.",
      });
    }
  } finally {
    tableLoading.value = false;
  }
};

const fetchIncentivesData = async () => {
  await incentivesStore.fetchIncentives();
};
onMounted(fetchIncentivesData);

const formatCurrency = (value) => {
  const numericValue = parseFloat(value) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

const incentivesBasesColumns = [
  {
    name: "number_of_employees",
    required: true,
    label: "Number of Employee",
    align: "center",
    field: (row) => row.number_of_employees,
  },
  {
    name: "target",
    required: true,
    label: "Target Kilo",
    align: "center",
    field: (row) => row.target,
  },
  {
    name: "baker_multiplier",
    required: true,
    label: "Baker Multiplier",
    align: "center",
    field: (row) => row.baker_multiplier,
    format: (val) => {
      const num = parseFloat(val);
      if (!num) return "0";
      return `x${num % 1 === 0 ? num.toFixed(0) : num}`;
    },
  },
  {
    name: "lamesador_multiplier",
    required: true,
    label: "Lamesador Multiplier",
    align: "center",
    field: (row) => row.lamesador_multiplier,
    format: (val) => {
      const num = parseFloat(val);
      if (!num) return "0";
      return `x${num % 1 === 0 ? num.toFixed(0) : num}`;
    },
  },
  {
    name: "hornero_incentives",
    required: true,
    label: "Hornero Incentives",
    align: "center",
    field: (row) => row.hornero_incentives,
    format: (val) => formatCurrency(val),
  },
];
</script>

<style lang="scss" scoped>
.gradient-header {
  background: #926400;
}

.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
