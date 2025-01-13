<template>
  <div>
    <q-card class="user-card">
      <q-card-section>
        <div class="text-h6" align="center">Credits Report</div>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-x-md" align="center">
          <q-btn
            label="OPEN"
            rounded
            style="width: 200px"
            color="light-blue-6"
            class="user-button"
            @click="
              handleCreditsDialog(
                props.sales_Reports[0].credit_reports,
                props.sales_Reports[0].credit_total
              )
            "
          />
        </div>
      </q-card-section>
      <!-- <q-card-section>
        <div class="text-weight-regular text-subtitle1">
          Total Credits :
          {{ formatPrice(props.sales_Reports[0].credit_total) }}
        </div>
      </q-card-section> -->
      <q-card-section>
        <!-- {{ sales_Reports[0].credit_reports }} -->
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import CreditsReportDialog from "./CreditsReportDialog.vue";

const props = defineProps(["sales_Reports"]);
const $q = useQuasar();
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

const handleCreditsDialog = (dataReports, total) => {
  $q.dialog({
    component: CreditsReportDialog,
    componentProps: {
      reports: dataReports,
      total: total,
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
