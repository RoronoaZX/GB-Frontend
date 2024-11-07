<template>
  <q-btn
    color="accent"
    icon="visibility"
    size="md"
    flat
    round
    dense
    @click="openBakersReportsDialog"
  />

  <q-dialog v-model="bakersReportDialog" class="report-dialog">
    <q-card class="report-card">
      <q-card-section class="report-header">
        <div class="report-title">Report Details</div>
        <q-btn
          class="close-btn"
          color="grey-8"
          flat
          round
          dense
          icon="close"
          @click="bakersReportDialog = false"
        />
      </q-card-section>

      <q-card-section class="report-info">
        <div class="invoice-header">
          <div><strong>Date:</strong> {{ formatDate(report.created_at) }}</div>
          <div>
            <strong>Branch:</strong>
            {{ capitalizeFirstLetter(report.branch.name) }}
          </div>
        </div>

        <div class="invoice-body">
          <div>
            <strong>Baker:</strong> {{ formatFullname(report.user.employee) }}
          </div>
          <div>
            <strong>Recipe:</strong>
            {{ capitalizeFirstLetter(report.branch_recipe.recipe.name) }}
          </div>
          <div>
            <strong>Status:</strong> {{ capitalizeFirstLetter(report.status) }}
          </div>
          <div><strong>Kilo:</strong> {{ report.kilo }}</div>
          <div><strong>Over:</strong> {{ report.over }}</div>
          <div><strong>Short:</strong> {{ report.short }}</div>
          <div><strong>Actual Target:</strong> {{ report.actual_target }}</div>
        </div>

        <!-- Conditionally Display Breads -->
        <div v-if="filteredBreads.length" class="invoice-section">
          <div class="section-title">Breads</div>
          <ul>
            <li v-for="bread in filteredBreads" :key="bread.id">
              <span class="bread-name"> {{ bread.bread.name }} -</span>
              <span class="bread-production"
                >{{ bread.bread_production }} pcs</span
              >
            </li>
          </ul>
        </div>
      </q-card-section>

      <q-card-section class="report-actions q-gutter-sm" align="right">
        <q-btn
          color="negative"
          label="Decline"
          @click="openRemarkDialog"
          class="action-btn"
        />
        <q-btn
          color="positive"
          label="Confirm"
          @click="confirmReport"
          class="action-btn"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="remarkDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Decline Report</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="remark"
          placeholder="Enter your remark"
          label="Remark"
          type="textarea"
          filled
          lazy-rules
          :rules="[(val) => !!val || 'Remark is required']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="negative" @click="declineReport" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { date, useQuasar } from "quasar";
import { useBakerReportsStore } from "src/stores/baker-report";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const remarkDialog = ref(false);

const openRemarkDialog = () => {
  remarkDialog.value = true;
};

const $q = useQuasar();
const bakerReports = useBakerReportsStore();
const bakersReportDialog = ref(false);

const openBakersReportsDialog = () => {
  bakersReportDialog.value = true;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const formatDate = (dateTimeString) => {
  return date.formatDate(dateTimeString, "MMMM D, YYYY hh:mm A");
};

const filteredBreads = computed(() => {
  return props.report.bread_bakers_reports.filter(
    (bread) => bread.bread_production > 0
  );
});

const confirmReport = async () => {
  try {
    const confirmedReport = await bakerReports.confirmReport(props.report.id);
    console.log("Report confirmed:", confirmedReport);
    $q.notify({ type: "positive", message: "Report confirmed successfully" });
    bakersReportDialog.value = false;
  } catch (error) {
    $q.notify({ type: "negative", message: "Failed to confirm report" });
  }
};
const declineReport = async () => {
  try {
    if (!remark.value.trim()) {
      $q.notify({ type: "negative", message: "Remark cannot be empty" });
      return;
    }

    await bakerReports.declineReport(props.report.id, remark.value);
    $q.notify({ type: "positive", message: "Report declined successfully" });
    bakersReportDialog.value = false;
    remarkDialog.value = false;
  } catch (error) {
    $q.notify({ type: "negative", message: "Failed to decline report" });
  }
};
</script>

<style scoped>
.report-dialog {
  max-width: 600px;
}

.report-card {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
}

.report-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.close-btn {
  padding: 0;
  min-width: auto;
}

.report-info {
  padding: 1rem;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.invoice-body {
  margin-bottom: 1rem;
}

.invoice-section {
  margin-top: 1.5rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

ul li {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.bread-name {
  font-weight: bold;
  margin-right: 0.5rem;
}

.bread-production {
  color: #555;
}
</style>
