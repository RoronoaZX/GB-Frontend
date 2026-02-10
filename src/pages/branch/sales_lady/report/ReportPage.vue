<template>
  <q-card flat>
    <q-card-section
      class="row justify-between"
      style="background-color: #ef4444"
    >
      <div class="text-h6 text-white">
        <q-icon name="fa-solid fa-layer-group" />
        Sales Report
      </div>
      <!-- text-white  -->
      <div>
        <ViewOldReports />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row q-gutter-md q-mb-lg">
        <div>
          <ExpensesReport />
        </div>
        <!-- <div>
          <DeliveryReceiptReport />
        </div> -->
        <div>
          <EmployeeCreditReport />
        </div>
        <div>
          <DenominationReport />
        </div>
        <div>
          <DeliveryReceiptReport />
        </div>
      </div>
      <div class="q-mt-md">
        <OverAllTotal />
      </div>
      <div class="q-mt-md q-gutter-y-md">
        <!-- <WithReceiptExpensesReport /> -->
        <WithOutReceiptExpensesReportField />
        <EmployeeCreditReportField />
        <BreadReportField />
        <SelectaReportField />
        <NestleReportField />
        <SoftdrinksReportField />
        <CakeReportField />
        <OtherReportField />
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
import NestleReportField from "./components/NestleReportField.vue";
import BreadReportField from "./components/BreadReportField.vue";
import WithOutReceiptExpensesReportField from "./components/WithOutReceiptExpensesReportField.vue";
import WithReceiptExpensesReport from "./components/WithReceiptExpensesReport.vue";
import EmployeeCreditReportField from "./components/EmployeeCreditReportField.vue";
import ViewOldReports from "./components/view-reports/ViewOldReports.vue";
import CakeReportField from "./components/CakeReportField.vue";
import OtherReportField from "./components/OtherReportField.vue";
import { ref, reactive } from "vue";
import DeliveryReceiptReport from "./components/receipt-report/DeliveryReceiptReport.vue";

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

.gradient-btn {
  border: 5px solid; /* Define border size */
  border-image-slice: 1;
  border-width: 2px; /* Adjust the width as needed */
  border-image-source: linear-gradient(
    45deg,
    #fc0165,
    #2575fc
  ); /* Use your gradient */
  background-color: transparent; /* Set background to transparent if needed */
}

.gradient-btn q-btn {
  background-color: white; /* Keep the button's background white */
  padding: sm md;
  font-size: 1rem;
  color: #000; /* Adjust text color */
}
</style>
