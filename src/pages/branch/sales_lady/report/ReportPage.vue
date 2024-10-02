<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="fa-solid fa-layer-group" />
        Sales Report
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row q-gutter-md q-mb-lg">
        <div>
          <ExpensesReport />
        </div>
        <div>
          <EmployeeCreditReport />
        </div>
        <div>
          <DenominationReport />
        </div>
      </div>
      <div class="q-mt-md">
        <OverAllTotal />
      </div>
      <div class="q-mt-md q-gutter-y-md">
        <EmployeeCreditReportField />
        <ExpensesReportField />
        <BreadReportField />
        <SelectaReportField />
        <SoftdrinksReportField />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import DenominationReport from "./components/DenominationReport.vue";
import EmployeeCreditReport from "./components/EmployeeCreditReport.vue";
import ExpensesReport from "./components/ExpensesReport.vue";
import OverAllTotal from "./components/OverAllTotal.vue";
import SoftdrinksReportField from "./components/SoftdrinksReportField.vue";
import SelectaReportField from "./components/SelectaReportField.vue";
import BreadReportField from "./components/BreadReportField.vue";
import ExpensesReportField from "./components/ExpensesReportField.vue";
import EmployeeCreditReportField from "./components/EmployeeCreditReportField.vue";
import { ref, reactive } from "vue";

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
const breadList = reactive([
  {
    name: "Whole Wheat",
    sold: 10,
    price: 5,
    beginning: 20,
    sales: 30,
  },
  {
    name: "Sourdough",
    sold: 15,
    price: 7,
    beginning: 25,
    sales: 40,
  },
  {
    name: "Pan de Coco",
    sold: 15,
    price: 4,
    beginning: 25,
    sales: 40,
  },
  // Add more bread items as needed
]);
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #24241d, #ef4444);
}
</style>
