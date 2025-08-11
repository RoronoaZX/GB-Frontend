<template>
  <q-item class="col-12 col-md-6 q-pa-more">
    <span></span>
  </q-item>
  <q-item class="col-12 col-md-6 q-pa-none">
    <q-item-section avatar class="q-mr-sm">
      <q-icon name="paid" color="cyan-7" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-body2 text-weight-medium text-grey-8">
        Total Incentives :
        <span class="text-cyan-7 text-weight-semibold">{{
          formatCurrency(totalIncentiveValue)
        }}</span>
      </q-item-label>

      <q-item-label class="text-body2 text-weight-medium text-grey-8">
        <span class="text-cyan-7 text-weight-semibold">
          <OpenButton @open-dialog="handleEmployeeIncentives(dtrFrom, dtrTo)" />
        </span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useEmployeeIncentivesStore } from "src/stores/employee-incentives";
import { useIncentivesBasesStore } from "src/stores/incentive-bases";
import { computed, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import OpenButton from "src/components/buttons/OpenButton.vue";
import TotalIncentiveDataDialog from "./TotalIncentiveDataDialog.vue";
import { useQuasar } from "quasar";

const props = defineProps(["dtrFrom", "dtrTo"]);
const emit = defineEmits(["update:totalIncentive"]);
const route = useRoute();
const employeeId = route.params.employee_id || "";
console.log("employee incentives ID", employeeId);
const incentivesBasesStore = useIncentivesBasesStore();
const incentivesBases = computed(() => incentivesBasesStore.incentivesBases);
const employeeIncentivesStore = useEmployeeIncentivesStore();
const employeeIncentives = computed(
  () => employeeIncentivesStore.employeeIncentives
);
console.log("employeeIncentivessss on the [arent  ]", employeeIncentives.value);
const parentTotalIncentive = ref(0);

const $q = useQuasar();

const formatCurrency = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue === 0) {
    return "₱ 0.00";
  }
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(numValue);
};

// ✅ Step 1: Create a function to handle the update
const updateTotalIncentive = (value) => {
  parentTotalIncentive.value = value;
};

const fetchIncentivesBases = async () => {
  await incentivesBasesStore.fetchIncentivesBases();
  console.log("incentivesssss", incentivesBases.value);
};
onMounted(fetchIncentivesBases);

const fetchEmployeeIncentives = async () => {
  await employeeIncentivesStore.fetchEmployeeIncentives(
    props.dtrFrom,
    props.dtrTo,
    employeeId
  );
  console.log("employeeIncentivessss", employeeIncentives.value);
};
onMounted(fetchEmployeeIncentives);

const mergedEmployeeIncentives = computed(() => {
  return employeeIncentives.value.map((incentive) => {
    const base = incentivesBases.value.find(
      (b) => b.number_of_employees === incentive.number_of_employees
    );

    const target = base ? parseFloat(base.target) : 0;
    const bakerKilo = parseFloat(incentive.baker_kilo_total ?? 0);
    const excessKilo = bakerKilo > target ? bakerKilo - target : 0;

    return {
      ...incentive,
      incentive_base: base || null,
      target: target,
      excess_kilo: excessKilo,
    };
  });
});
console.log("mergedEmployeeIncentivessss", mergedEmployeeIncentives.value);

const incentiveDatasWithValue = computed(() => {
  return mergedEmployeeIncentives.value.map((item) => {
    if (!item.incentive_base) return { ...item, incentive_value: 0 };

    const excessKilo = parseFloat(item.excess_kilo) || 0;
    const bakerMultiplier =
      parseFloat(item.incentive_base.baker_multiplier) || 0;
    const lamesadorMultiplier =
      parseFloat(item.incentive_base.lamesador_multiplier) || 0;
    const horneroIncentives =
      parseFloat(item.incentive_base.hornero_incentives) || 0;

    let incentiveValue = 0;
    let multiplierUsed = 0;

    const designation = (item.designation || "").trim().toLowerCase();
    switch (designation) {
      case "baker":
        multiplierUsed = bakerMultiplier;
        incentiveValue = excessKilo * bakerMultiplier;
        break;
      case "lamesador":
        multiplierUsed = lamesadorMultiplier;
        incentiveValue = excessKilo * lamesadorMultiplier;
        break;
      case "hornero":
        multiplierUsed = horneroIncentives;
        incentiveValue = horneroIncentives;
        break;
    }
    return {
      ...item,
      incentive_value: incentiveValue,
      multiplier_used: multiplierUsed,
    };
  });
});

const totalIncentiveValue = computed(() => {
  return incentiveDatasWithValue.value.reduce((sum, item) => {
    return sum + (Number(item.incentive_value) || 0);
  }, 0);
});

watch(
  [employeeIncentives, incentivesBases],
  ([incentivesBases, bases]) => {
    if (incentivesBases.length > 0 && bases.length > 0) {
      console.log(
        "mergedEmployeeIncentivessss",
        mergedEmployeeIncentives.value
      );
    }
  },
  {
    immediate: false,
  }
);

watch(totalIncentiveValue, (newValue) => {
  emit("update:totalIncentive", newValue);
});

const handleEmployeeIncentives = (dtrFrom, dtrTo) => {
  $q.dialog({
    component: TotalIncentiveDataDialog,
    componentProps: {
      incentiveDatas: incentiveDatasWithValue.value,
      dtrFrom: dtrFrom,
      dtrTo: dtrTo,
      formatCurrencyProp: formatCurrency,
      onUpdateTotalIncentive: updateTotalIncentive,
    },
  });
};
</script>

<style scoped>
.text-body2 {
  /* For all general labels like "Schedule:", "Rate / Day:", etc. */
  font-size: 0.7rem; /* Smaller than default body1 */
}

.text-grey-8 {
  color: #555; /* Slightly lighter grey for labels */
  font-weight: 500; /* Medium weight for labels */
}
</style>
