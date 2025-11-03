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
      <q-td :props="props">
        <span>
          {{
            props.row.number_of_employees
              ? props.row.number_of_employees
              : " - - "
          }}
          <q-tooltip class="bg-blue-grey-8">Edit Number of Employees</q-tooltip>
        </span>
        <q-popup-edit
          @update:model-value="(val) => updateNumberEmployee(props.row, val)"
          v-model="props.row.number_of_employees"
          v-slot="scope"
        >
          <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
            <div class="text-h6 text-primary text-center q-mb-sm">
              Edit Number of Employees
            </div>
            <div class="text-subtitle2 q-mb-md">
              Name: {{ props.row.number_of_employees }}
            </div>
            <q-input
              v-model="scope.value"
              :model-value="scope.value"
              @value:model-value="scope.value = $event"
              type="text"
              counter
              @keyup.enter="scope.set"
            />
            <div class="row justify-end q-mt-md">
              <q-btn flat label="Close" color="primary" @click="scope.cancel" />
              <q-btn flat label="Save" color="primary" @click="scope.set" />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>

    <template v-slot:body-cell-target="props">
      <q-td :props="props" class="cursor-pointer">
        <span>
          {{ props.row.target ? props.row.target : " - - -" }}
          <q-tooltip class="bg-blue-grey-8"> Edit Target Kilo </q-tooltip>
        </span>
        <q-popup-edit
          @update:model-value="(val) => updateTargetKilo(props.row, val)"
          v-model="props.row.target"
          v-slot="scope"
        >
          <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
            <div class="text-h6 text-primary text-center q-mb-sm">
              Edit Target Kilo
            </div>
            <!-- <div class="text-subtitle2 q-mb-md">
              Name: {{ props.row.target }}
            </div> -->
            <q-input
              v-model="scope.value"
              :model-value="scope.value"
              @value:model-value="scope.value = $event"
              type="text"
              counter
              @keyup.enter="scope.set"
            />
            <div class="row justify-end q-mt-md">
              <q-btn flat label="Close" color="primary" @click="scope.cancel" />
              <q-btn flat label="Save" color="primary" @click="scope.set" />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>

    <template v-slot:body-cell-baker_multiplier="props">
      <q-td :props="props" class="cursor-pointer">
        <span>
          {{
            formatMultiplier(
              props.row.baker_multiplier ? props.row.baker_multiplier : " - - -"
            )
          }}
          <q-tooltip class="bg-blue-grey-8"> Edit Baker Multiplier </q-tooltip>
        </span>
        <q-popup-edit
          @update:model-value="(val) => updateBakerMultiplier(props.row, val)"
          v-model="props.row.baker_multiplier"
          v-slot="scope"
        >
          <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
            <div class="text-h6 text-primary text-center q-mb-sm">
              Edit Baker Multiplier
            </div>
            <q-input
              v-model="scope.value"
              :model-value="formatNumber(scope.value)"
              @value:model-value="scope.value = $event"
              type="text"
              counter
              prefix="x"
              @keyup.enter="scope.set"
            />
            <div class="row justify-end q-mt-md">
              <q-btn flat label="Close" color="primary" @click="scope.cancel" />
              <q-btn flat label="Save" color="primary" @click="scope.set" />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>

    <template v-slot:body-cell-lamesador_multiplier="props">
      <q-td :props="props" class="cursor-pointer">
        <span>
          {{ formatMultiplier(props.row.lamesador_multiplier) }}
          <q-tooltip class="bg-blue-grey-8">
            Edit Lamesador Multiplier
          </q-tooltip>
        </span>
        <q-popup-edit
          @update:model-value="
            (val) => udpateLamesadorMultiplier(props.row, val)
          "
          v-model="props.row.lamesador_multiplier"
          v-slot="scope"
        >
          <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
            <div class="text-h6 text-primary text-center q-mb-sm">
              Edit Lamesador Multiplier
            </div>

            <q-input
              v-model="scope.value"
              :model-value="formatNumber(scope.value)"
              @value:model-value="scope.value = $event"
              type="text"
              counter
              prefix="x"
              @keyup.enter="scope.set"
            >
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </q-input>
          </div>
        </q-popup-edit>
      </q-td>
    </template>

    <template v-slot:body-cell-hornero_incentives="props">
      <q-td :props="props" class="cursor-pointer">
        <span>
          {{ formatMultiplier(props.row.hornero_incentives) }}
          <q-tooltip class="bg-blue-grey-8">
            Edit Hornero Incentives
          </q-tooltip>
        </span>
        <q-popup-edit
          @update:model-value="(val) => updateHorneroIncentives(props.row, val)"
          v-model="props.row.hornero_incentives"
          v-slot="scope"
        >
          <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
            <div class="text-h6 text-primary text-center q-mb-sm">
              Edit Hornero Incentives
            </div>

            <q-input
              v-model="scope.value"
              :model-value="formatNumber(scope.value)"
              @value:model-value="scope.value = $event"
              type="text"
              counter
              prefix="x"
              @keyup.enter="scope.set"
            >
              <div class="row justify-end q-mt-md">
                <q-btn
                  flat
                  label="Close"
                  color="primary"
                  @click="scope.cancel"
                />
                <q-btn flat label="Save" color="primary" @click="scope.set" />
              </div>
            </q-input>
          </div>
        </q-popup-edit>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { useIncentivesBasesStore } from "src/stores/incentive-bases";
import { computed, onMounted, ref } from "vue";
import { Notify, useQuasar } from "quasar";

const incentivesStore = useIncentivesBasesStore();
const incentives = computed(() => incentivesStore.incentivesBases);
const $q = useQuasar();
const editedValue = ref(null);

const tableLoading = ref(false);

const updateNumberEmployee = async (data, val) => {
  console.log("updateNumberEmployee", data, val);
  try {
    tableLoading.value = true;
    await incentivesStore.updateNumberEmployee(data, val);
  } catch (error) {
    console.error("Error updating number of employees:", error);
  } finally {
    tableLoading.value = false;
  }
};

const updateTargetKilo = async (data, val) => {
  console.log("updateTargetKilo", data, val);
  try {
    tableLoading.value = true;
    await incentivesStore.updateTargetKilo(data, val);
  } catch (error) {
    console.error("Error updating target kilo:", error);
  } finally {
    tableLoading.value = false;
  }
};

const updateBakerMultiplier = async (data, val) => {
  console.log("updateBakerMultiplier", data, val);
  try {
    tableLoading.value = true;
    await incentivesStore.updateBakerMultiplier(data, val);
  } catch (error) {
    console.error("Error updating baker multiplier:", error);
  } finally {
    tableLoading.value = false;
  }
};

const udpateLamesadorMultiplier = async (data, val) => {
  console.log("udpateLamesadorMultiplier", data, val);
  try {
    tableLoading.value = true;
    await incentivesStore.updateLamesadorMultiplier(data, val);
  } catch (error) {
    console.error("Error updating lamesador multiplier:", error);
  } finally {
    tableLoading.value = false;
  }
};

const updateHorneroIncentives = async (data, val) => {
  console.log("updateHorneroIncentives", data, val);
  try {
    tableLoading.value = true;
    await incentivesStore.updateHorneroIncentives(data, val);
  } catch (error) {
    console.error("Error updating hornero multiplier:", error);
  } finally {
    tableLoading.value = false;
  }
};

const fetchIncentivesData = async () => {
  await incentivesStore.fetchIncentivesBases();
};
onMounted(fetchIncentivesData);

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
const formatCurrency = (value) => {
  const numericValue = parseFloat(value) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

const formatMultiplier = (val) => {
  const num = parseFloat(val);
  if (isNaN(num) || num === 0) return "0";

  return `x${num % 1 === 0 ? num.toFixed(0) : num}`;
};

const formatNumber = (val) => {
  if (!val) return "0";
  const num = parseFloat(val);
  if (isNaN(num)) return val;

  return num % 1 === 0
    ? num.toString()
    : num.toString().replace(/0+$/, "").replace(/\.$/, "");
};

// 🔥 expose to parent
defineExpose({ fetchIncentivesData });

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
    // format: (val) => {
    //   const num = parseFloat(val);
    //   if (!num) return "0";
    //   return `x${num % 1 === 0 ? num.toFixed(0) : num}`;
    // },
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
  // background: #926400;
  background: linear-gradient(135deg, #926400, #d4af37);
}

.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
