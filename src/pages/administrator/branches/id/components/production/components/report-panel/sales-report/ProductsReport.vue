<template>
  <div>
    <q-card class="user-card">
      <q-card-section>
        <div class="text-h6" align="center">Products Report</div>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md" align="center">
          <q-btn
            @click="handleBreadDialog(props.sales_Reports[0].bread_reports)"
            no-caps
            label="Bread Report"
            rounded
            color="brown"
            style="width: 150px"
            class="user-button"
          />
          <q-btn
            @click="handleSelectaDialog(productsReport[0].selecta_reports)"
            no-caps
            label="Selecta Report"
            rounded
            color="red-6"
            style="width: 150px"
            class="user-button"
          />
          <q-btn
            @click="
              handleSoftdrinksDialog(productsReport[0].softdrinks_reports)
            "
            no-caps
            label="Softdrinks Report"
            rounded
            color="accent"
            style="width: 150px"
            class="user-button"
          />
          <q-btn
            @click="handleCakeDialog(productsReport[0].cake_sales_reports)"
            no-caps
            label="Cake Report"
            rounded
            color="teal"
            style="width: 150px"
            class="user-button"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-weight-regular text-subtitle1">
          Total sales:
          {{ formatPrice(productsReport[0].products_total_sales) }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import ProductsReportDialog from "./products/ProductsReportDialog.vue";
import BreadReport from "./products/BreadReport.vue";
import SelectaReport from "./products/SelectaReport.vue";
import SoftdrinksReport from "./products/SoftdrinksReport.vue";
import CakeReport from "./products/CakeReport.vue";

const props = defineProps(["sales_Reports"]);
const productsReport = props.sales_Reports;
console.log("sales report2", props);
const $q = useQuasar();

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

const handleBreadDialog = (dataReports) => {
  $q.dialog({
    component: BreadReport,
    componentProps: {
      reports: dataReports,
    },
  });
};
const handleSelectaDialog = (dataReports) => {
  $q.dialog({
    component: SelectaReport,
    componentProps: {
      reports: dataReports,
    },
  });
};
const handleSoftdrinksDialog = (dataReports) => {
  $q.dialog({
    component: SoftdrinksReport,
    componentProps: {
      reports: dataReports,
    },
  });
};
const handleCakeDialog = (dataReports) => {
  $q.dialog({
    component: CakeReport,
    componentProps: {
      reports: dataReports,
    },
  });
};
</script>

<style lang="scss" scoped>
.user-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}
</style>
