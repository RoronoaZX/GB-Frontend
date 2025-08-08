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
        <span class="text-cyan-7 text-weight-semibold">{{}}</span>
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
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import OpenButton from "src/components/buttons/OpenButton.vue";
import TotalIncentiveDataDialog from "./TotalIncentiveDataDialog.vue";
import { useQuasar } from "quasar";

const props = defineProps(["dtrFrom", "dtrTo"]);
const route = useRoute();
const employeeId = route.params.employee_id || "";
console.log("employee incentives ID", employeeId);
const incentivesBasesStore = useIncentivesBasesStore();
const incentivesBases = computed(() => incentivesBasesStore.incentivesBases);
const employeeIncentivesStore = useEmployeeIncentivesStore();
const employeeIncentives = computed(
  () => employeeIncentivesStore.employeeIncentives
);
console.log("employeeIncentivessss", employeeIncentives.value);

const $q = useQuasar();

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

const handleEmployeeIncentives = (dtrFrom, dtrTo) => {
  $q.dialog({
    component: TotalIncentiveDataDialog,
    componentProps: {
      incentiveDatas: mergedEmployeeIncentives.value,
      dtrFrom: dtrFrom,
      dtrTo: dtrTo,
    },
  });
};
</script>
