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
                props.sales_Reports[0].user.employee,
                props.sales_Reports[0].id,
                props.sales_Reports[0].user_id
              )
            "
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import CreditsReportDialog from "./CreditsReportDialog.vue";

const props = defineProps(["sales_Reports"]);
console.log("sales_Reports to send in creditsss", props.sales_Reports);

const $q = useQuasar();

const handleCreditsDialog = (dataReports, userData, salesReportId, userId) => {
  $q.dialog({
    component: CreditsReportDialog,
    componentProps: {
      reports: dataReports,
      user: userData,
      salesReportId: salesReportId,
      userId: userId,
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
