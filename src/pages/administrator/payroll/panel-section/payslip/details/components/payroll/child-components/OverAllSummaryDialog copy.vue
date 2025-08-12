<template>
  <q-dialog ref="dialogRef" full-height persistent>
    <q-card class="overall-summary-list-card elegant-card">
      <!-- Header -->
      <q-card-section class="header-section elegant-header">
        <div class="text-h6 text-weight-bolder text-shadow">Run Payslipsss</div>
        <q-space />
        <q-btn
          icon="close"
          flat
          dense
          round
          v-close-popup
          color="white"
          class="close-btn"
        />
      </q-card-section>

      <!-- Employee Info -->
      <q-card-section class="q-pb-none">
        <div
          class="row items-center q-col-gutter-lg text-caption text-weight-medium"
        >
          <div class="col-6">
            <div class="row justify-between q-mb-xs">
              <span class="text-grey-7">Employee Name:</span>
              <span class="text-weight-bold">{{
                props.formatFullnameProps(employeesData || "N/A")
              }}</span>
            </div>
            <div class="row justify-between q-mb-xs">
              <span class="text-grey-7">Payroll Release Date:</span>
              <span class="text-weight-bold">{{
                getPayrollReleaseDate(props.dtrRecord.from, props.dtrRecord.end)
              }}</span>
            </div>
            <div class="row justify-between">
              <span class="text-grey-7">Rate / Day:</span>
              <span class="text-weight-bold">{{
                props.formatCurrencyProps(
                  employeesData?.employment_type?.salary
                )
              }}</span>
            </div>
            <div class="row justify-between">
              <span class="text-grey-7">Total Days:</span>
              <span class="text-weight-bold">{{
                dtrEarningsData.totalDays || "N/A"
              }}</span>
            </div>
          </div>
          <div class="col-6">
            <div class="row justify-between">
              <span class="text-grey-7">From:</span>
              <span class="text-weight-bold">{{
                dtrRecord.from || "N/A"
              }}</span>
              <span class="text-grey-7">To:</span>
              <span class="text-weight-bold">{{ dtrRecord.end || "N/A" }}</span>
            </div>
            <div
              class="text-center text-negative text-uppercase q-mb-xs q-mt-sm"
            >
              Undertime / Lates
            </div>
            <div class="row justify-between text-caption text-weight-light">
              <div>
                Total Hours:
                <span class="text-weight-bold text-negative">{{
                  dtrEarningsData.undertime.formatted || "N/A"
                }}</span>
              </div>
              <div>
                Cost:
                <span class="text-weight-bold text-negative">{{
                  dtrEarningsData.undertime.cost || "N/A"
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- Earnings & Deductions -->
      <q-card-section
        class="content-wrapper row q-col-gutter-lg q-pt-sm items-start"
      >
        <!-- Earnings -->
        <div class="col-12 col-md-6">
          <div class="summary-card">
            <div class="summary-header">
              <q-icon
                name="attach_money"
                color="primary"
                size="20px"
                class="q-mr-sm"
              />
              Earning Summary
            </div>
            <div
              class="summary-item"
              v-for="earning in earnings"
              :key="earning"
            >
              <span>{{ earning.label }}</span>
              <span class="text-decoration-custom">{{
                earning.formatted
              }}</span>
            </div>
            <div class="summary-total">
              <span class="text-uppercase">Total Income:</span>
              <span>{{ dtrEarningsData.totalIncome.formatted || "N/A" }}</span>
            </div>
          </div>
        </div>

        <!-- Deductions -->
        <div class="col-12 col-md-6">
          <div class="summary-card">
            <div class="summary-header">
              <q-icon
                name="remove_circle"
                color="negative"
                size="20px"
                class="q-mr-sm"
              />
              Deductions Summary
            </div>
            <div
              class="summary-item"
              v-for="deduction in deductions"
              :key="deduction"
            >
              <span>{{ deduction.label }}</span>
              <span>_______</span>
            </div>
            <div class="summary-total negative">
              <span class="text-uppercase">Total Deductions:</span>
              <span>__________</span>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- Footer -->
      <q-card-actions align="right" class="elegant-footer">
        <q-btn
          label="Proceed"
          color="white"
          text-color="primary"
          class="q-px-lg text-weight-bolder"
          unelevated
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, date } from "quasar";
const { dialogRef, onDialogHide } = useDialogPluginComponent();

const props = defineProps({
  formatFullnameProps: Function,
  formatCurrencyProps: Function,
  employeesData: Object,
  dtrRecord: Object,
  dtrSummaryData: Object,
  dtrEarningsData: Object,
  dtrDeductionsData: Object,
});

console.log("propssssss", props);

const holidays = props.dtrRecord.holidays || [];
console.log("holidays", holidays);

const getPayrollReleaseDate = (from, end) => {
  const fromDate = date.extractDate(from, "MMMM DD, YYYY");
  const endDate = date.extractDate(end, "MMMM DD, YYYY");

  if (!fromDate || !endDate) return null;

  // Check: May 26 → June 10 → June 20
  if (
    fromDate.getMonth() === 4 &&
    fromDate.getDate() === 26 && // May is month 4 (0-based)
    endDate.getMonth() === 5 &&
    endDate.getDate() === 10 // June is month 5
  ) {
    return date.formatDate(new Date(2025, 5, 20), "MMMM DD, YYYY");
  }

  // Check: June 11 → June 25 → July 5
  if (
    fromDate.getMonth() === 5 &&
    fromDate.getDate() === 11 && // June
    endDate.getMonth() === 5 &&
    endDate.getDate() === 25
  ) {
    return date.formatDate(new Date(2025, 6, 5), "MMMM DD, YYYY"); // July
  }

  return null;
};

const earnings = [
  {
    label: "Regular Pay",
    formatted: props.dtrEarningsData.workingHours.cost,
    // cost: props.dtrEarningsData.regularPay.cost,
  },
  {
    label: "Overtime Pay",
    formatted: props.dtrEarningsData.overtime.cost,
    // cost: props.dtrEarningsData.overtimePay.cost,
  },
  {
    label: "Holiday Pay",
    formatted: props.dtrEarningsData.holidayPay.cost,
    // cost: props.dtrEarningsData.holidayPay.cost,
  },
  // {
  //   label: "COLA",
  //   // formatted: props.dtrEarningsData.holidayPay.formatted,
  //   // cost: props.dtrEarningsData.holidayPay.cost,
  // },
  {
    label: "Night Differential",
    formatted: props.dtrEarningsData.nightDifferential.cost,
    // cost: props.dtrEarningsData.holidayPay.cost,
  },
  {
    label: "Total Allowance",
    formatted: props.dtrEarningsData.allowances.cost,
    // cost: props.dtrEarningsData.holidayPay.cost,
  },
  {
    label: "Quota Incentive",
    formatted: props.dtrEarningsData.incentives.cost,
    // cost: props.dtrEarningsData.holidayPay.cost,
  },
  // {
  //   label: "Other Incentives / Adjustments",
  //   // formatted: props.dtrEarningsData.holidayPay.formatted,
  //   // cost: props.dtrEarningsData.holidayPay.cost,
  // },

  // "Regular Pay",
  // "Overtime Pay",
  // "Holiday Pay",
  // "COLA",
  // "Night Differential",
  // "Daily Allowance",
  // "Overtime",
  // "Quota Incentive",
  // "Other Incentives / Adjustments",
];

const deductions = [
  {
    label: "Credits",
    formatted: props.dtrDeductionsData?.creditTotal || 0.0,
    // cost: props.dtrDeductionsData.credits.cost,
  },
  {
    label: "Uniform",
    formatted: props.dtrDeductionsData?.uniformTotal || 0.0,
    // cost: props.dtrDeductionsData.credits.cost,
  },
  {
    label: "Penalty",
    formatted: props.dtrDeductionsData?.penaltyTotal || 0.0,
    // cost: props.dtrDeductionsData.credits.cost,
  },
  {
    label: "Cash Advance",
    formatted: props.dtrDeductionsData?.cashAdvanceTotal || 0.0,
    // cost: props.dtrDeductionsData.credits.cost,
  },
  {
    label: "Shorts / Charges",
    formatted: props.dtrDeductionsData?.employeeChargesTotal || 0.0,
    // cost: props.dtrDeductionsData.credits.cost,
  },
  {
    label: "SSS",
    formatted: props.dtrDeductionsData.details?.employeeBenefits?.sss || 0.0,
    // cost: props.dtrDeductionsData.credits.cost,
  },
  {
    label: "Pag-IBIG Housing Fund",
    // formatted: props.dtrDeductionsData.credits.cost,
    // cost: props.dtrDeductionsData.credits.cost,
  },
  {
    label: "PhilHealth Insurance",
    // formatted: props.dtrDeductionsData.credits.cost,
    // cost: props.dtrDeductionsData.credits.cost,
  },
  // "Credits",
  // "Uniform",
  // "Penalty",
  // "Cash Advance",
  // "Late/s",
  // "Shorts",
  // "SSS",
  // "Pag-IBIG Housing Fund",
  // "PhilHealth Insurance",
];

// Example run
console.log(
  "Payroll Release:",
  getPayrollReleaseDate(props.dtrRecord.from, props.dtrRecord.end)
);
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap");

$primary-blue: #0ca289;
$secondary-blue: #105f73;
$light-blue: #e6f3ff;
$gray-light: #f8f9fa;
$gray-medium: #e9ecef;
$text-dark: #343a40;
$text-medium: #6c757d;
$white: #ffffff;
$shadow-color: rgba(0, 0, 0, 0.15);

.overall-summary-list-card.elegant-card {
  width: 800px;
  max-width: 95vw;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  font-family: "Montserrat", sans-serif;
  overflow: hidden;
  background: $white;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  font-size: 14px; /* Base font size for the card */
}

.header-section.elegant-header {
  background: linear-gradient(135deg, $primary-blue 0%, #3aaeb8 100%);
  color: $white;
  padding: 16px 24px; /* Adjusted padding */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50px;
    left: -50px;
    width: 150%;
    height: 150%;
    background: radial-gradient(
      circle at top left,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 70%
    );
    opacity: 0.7;
  }

  .text-shadow {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }

  .close-btn {
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: rotate(90deg) scale(1.2);
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

.content-wrapper {
  padding: 20px;
}

.q-pb-none {
  padding-bottom: 8px !important;
}
.row.justify-between {
  margin-bottom: 4px;
}

.summary-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px; /* Reduced gap */
  border: 1px solid #f0f0f0;
  height: 100%;
}

.summary-header {
  font-weight: 600;
  font-size: 1rem; /* Reduced font size */
  color: $primary-blue;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #e0f4f1;
  padding-bottom: 6px;
  margin-bottom: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem; /* Reduced font size (14px) */
  color: #555;
}

.summary-total {
  margin-top: auto;
  padding-top: 12px;
  font-weight: 700;
  font-size: 0.9rem; /* Reduced font size */
  border-top: 1px solid #e0e0e0;
  color: $primary-blue;
  display: flex;
  justify-content: space-between;
}

.summary-total.negative {
  color: #d64545;
}

.elegant-footer {
  background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 18px 30px;
  border-top: 1px solid $gray-medium;
  margin-top: auto;
  display: flex;
  justify-content: flex-end;

  .q-btn {
    position: relative;
    border-radius: 14px;
    padding: 12px 30px;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: white !important;
    text-transform: uppercase;
    backdrop-filter: blur(14px);
    background: linear-gradient(
      135deg,
      rgba(12, 162, 137, 0.85) 0%,
      rgba(0, 190, 155, 0.85) 100%
    ) !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    transition: all 0.25s ease-in-out;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &:hover {
      background: linear-gradient(
        135deg,
        rgba(0, 190, 155, 0.95) 0%,
        rgba(12, 162, 137, 0.95) 100%
      ) !important;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 26px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(0.97);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg, #ffffff80, #ffffff00);

      /* Standard mask properties */
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;

      /* WebKit compatibility */
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;

      pointer-events: none;
    }
  }
}

.text-decoration-custom {
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
