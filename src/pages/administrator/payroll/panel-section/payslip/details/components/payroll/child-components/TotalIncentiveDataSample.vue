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
        <span class="text-cyan-7 text-weight-semibold">000.00</span>
      </q-item-label>
      {{ dtrFrom }} - {{ dtrTo }}sss
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useIncentivesBasesStore } from "src/stores/incentive-bases";
import { useEmployeeIncentivesStore } from "src/stores/employee-incentives";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(["dtrFrom", "dtrTo"]);
const route = useRoute();
const employeeId = computed(() => route.params.employee_id || "");
console.log("employee incentives IDssqq", employeeId.value);
const incentivesBasesStore = useIncentivesBasesStore();
const incentivesBases = computed(() => incentivesBasesStore.incentivesBases);
const employeeIncentivesStore = useEmployeeIncentivesStore();
const employeeIncentives = computed(
  () => employeeIncentivesStore.employeeIncentives
);

const fetchIncentivesBases = async () => {
  await incentivesBasesStore.fetchIncentivesBases();
  console.log("incentivesssss", incentivesBases.value);
};
onMounted(fetchIncentivesBases);

const fetchEmployeeIncentives = async () => {
  await incentivesBasesStore.fetchIncentivesBases(
    props.dtrFrom,
    props.dtrTo,
    employeeId.value
  );
  // console.log("employeeIncentives", employeeIncentives.value);
};
onMounted(fetchEmployeeIncentives);
</script>

<style scoped>
.text-body2 {
  /* For all general labels like "Schedule:", "Rate / Day:", etc. */
  font-size: 0.7rem; /* Smaller than default body1 */
}
</style>
