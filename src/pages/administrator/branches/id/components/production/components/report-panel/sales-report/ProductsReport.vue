<template>
  <div>
    <q-card class="user-card">
      <q-card-section>
        <div class="text-h6" align="center">
          Products Report
          <div class="text-overline">
            {{ `(${formatDate(reportDate)}) - ${reportLabel}` }}
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="item-start q-gutter-md" align="center">
          <q-btn
            @click="
              handleBreadDialog(
                props.sales_Reports[0].bread_reports,
                props.sales_Reports[0].id,
                props.sales_Reports[0].user,
                props.reportLabel,
                props.reportDate
              )
            "
            no-caps
            label="Bread Report"
            rounded
            color="brown"
            style="width: 130px"
            class="user-button"
          />
          <q-btn
            @click="
              handleSelectaDialog(
                props.sales_Reports[0].selecta_reports,
                props.sales_Reports[0].id,
                props.sales_Reports[0].user,
                props.reportLabel,
                props.reportDate
              )
            "
            no-caps
            label="Selecta Report"
            rounded
            color="red-6"
            style="width: 130px"
            class="user-button"
          />
          <q-btn
            @click="
              handleSoftdrinksDialog(
                props.sales_Reports[0].softdrinks_reports,
                props.sales_Reports[0].id,
                props.sales_Reports[0].user,
                props.reportLabel,
                props.reportDate
              )
            "
            no-caps
            label="Softdrinks Report"
            rounded
            color="accent"
            style="width: 150px"
            class="user-button"
          />
          <q-btn
            @click="
              handleCakeDialog(
                props.sales_Reports[0].cake_sales_reports,
                props.sales_Reports[0].id,
                props.sales_Reports[0].user
              )
            "
            no-caps
            label="Cake Report"
            rounded
            color="teal"
            style="width: 130px"
            class="user-button"
          />
          <q-btn
            @click="
              handleOtherProductDialog(
                props.sales_Reports[0].other_products_reports,
                props.sales_Reports[0].id,
                props.sales_Reports[0].user,
                props.reportLabel,
                props.reportDate
              )
            "
            no-caps
            label="Other Products Report"
            rounded
            color="blue-grey"
            style="width: 180px"
            class="user-button"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar, date } from "quasar";
import ProductsReportDialog from "./products/ProductsReportDialog.vue";
import BreadReport from "./products/bread/BreadReport.vue";
import SelectaReport from "./products/selecta/SelectaReport.vue";
import SoftdrinksReport from "./products/softdrinks/SoftdrinksReport.vue";
import CakeReport from "./products/CakeReport.vue";
import OtherProductReport from "./products/other/OtherProductsReport.vue";

import { typographyFormat } from "src/composables/typography/typography-format";
import { ref } from "vue";

const { formatDate } = typographyFormat();

const props = defineProps([
  "sales_Reports",
  "reportLabel",
  "reportDate",
  "charges",
  "over",
  "reportId",
]);

console.log("Sales reportDate", props.reportDate);

console.log("Products Report", props.reportId);

const productsReportsss = props.sales_Reports;

console.log("sales report2sss", productsReportsss);
const $q = useQuasar();

const emit = defineEmits(["update-summary"]);

const localCharges = ref(props.charges ?? 0);
const localOver = ref(props.over ?? 0);

const saveSummary = () => {
  emit("update-summary", {
    charges,
    over,
  });
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

const handleBreadDialog = (
  dataReports,
  sales_report_id,
  user,
  reportLabel,
  reportDate
) => {
  $q.dialog({
    component: BreadReport,
    componentProps: {
      reports: dataReports,
      sales_report_id: sales_report_id,
      user: user,
      reportLabel: reportLabel,
      reportDate: reportDate,
    },
  }).onOk((summary) => {
    // summary = { charges, over }
    localCharges.value = summary.charges;
    localOver.value = summary.over;

    emit("update-summary", {
      reportId: props.reportId,
      charges: localCharges.value,
      over: localOver.value,
    });
  });
};
const handleSelectaDialog = (dataReports, sales_report_id, user) => {
  $q.dialog({
    component: SelectaReport,
    componentProps: {
      reports: dataReports,
      sales_report_id: sales_report_id,
      user: user,
    },
  }).onOk((summary) => {
    localCharges.value = summary.charges;
    localOver.value = summary.over;

    emit("update-summary", {
      reportId: props.reportId,
      charges: localCharges.value,
      over: localOver.value,
    });
  });
};
const handleSoftdrinksDialog = (dataReports, sales_report_id, user) => {
  $q.dialog({
    component: SoftdrinksReport,
    componentProps: {
      reports: dataReports,
      sales_report_id: sales_report_id,
      user: user,
    },
  }).onOk((summary) => {
    localCharges.value = summary.charges;
    localOver.value = summary.over;

    emit("update-summary", {
      reportId: props.reportId,
      charges: localCharges.value,
      over: localOver.value,
    });
  });
};
const handleCakeDialog = (dataReports, sales_report_id, user) => {
  $q.dialog({
    component: CakeReport,
    componentProps: {
      reports: dataReports,
      sales_report_id: sales_report_id,
      user: user,
    },
  });
};
const handleOtherProductDialog = (dataReports, sales_report_id, user) => {
  $q.dialog({
    component: OtherProductReport,
    componentProps: {
      reports: dataReports,
      sales_report_id: sales_report_id,
      user: user,
    },
  }).onOk((summary) => {
    localCharges.value = summary.charges;
    localOver.value = summary.over;

    emit("update-summary", {
      reportId: props.reportId,
      charges: localCharges.value,
      over: localOver.value,
    });
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
