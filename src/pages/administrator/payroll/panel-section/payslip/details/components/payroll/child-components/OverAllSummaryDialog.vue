<template>
  <q-dialog ref="dialogRef" full-height persistent>
    <q-card class="overall-summary-list-card elegant-card">
      <!-- Header -->
      <q-card-section class="header-section elegant-header">
        <div class="text-h6 text-weight-bolder text-shadow">Run Payslip</div>
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

      <!-- Scroll Area for Tablet/Mobile -->
      <q-scroll-area class="content-scroll">
        <!-- Employee Info -->
        <q-card-section class="q-pb-none">
          <div
            class="row items-center q-col-gutter-lg text-caption text-weight-medium"
          >
            <div class="col-6">
              <div class="row justify-between q-mb-xs">
                <span class="text-grey-7">Employee Name:</span>
                <span class="text-weight-bold">{{
                  formatFullnameProps(employeesData || "N/A")
                }}</span>
              </div>
              <div class="row justify-between q-mb-xs">
                <span class="text-grey-7">Payroll Release Date:</span>
                <span class="text-weight-bold">{{
                  getPayrollReleaseDate(
                    props.dtrRecord.from,
                    props.dtrRecord.end
                  )
                }}</span>
              </div>
              <div class="row justify-between">
                <span class="text-grey-7">Rate / Day:</span>
                <span class="text-weight-bold">{{
                  formatCurrencyProps(employeesData?.employment_type?.salary)
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
                <span class="text-weight-bold">{{
                  dtrRecord.end || "N/A"
                }}</span>
              </div>
              <q-field outlined dense readonly class="q-mt-sm">
                <div class="row justify-between">
                  <div
                    class="col-4 text-center text-negative text-uppercase q-mb-xs q-mt-sm"
                  >
                    Undertime / Lates
                  </div>
                  <q-separator vertical />
                  <div class="col-5 q-mt-md">
                    <div
                      class="row justify-between text-caption text-weight-light"
                    >
                      <div class="row q-gutter-md">
                        <div>Total Hours:</div>
                        <div>
                          <span class="text-weight-bold text-negative">{{
                            dtrEarningsData.undertime.formatted || "N/A"
                          }}</span>
                        </div>
                      </div>
                      <div class="row q-gutter-md">
                        <div>Cost:</div>
                        <span class="text-weight-bold text-negative">{{
                          dtrEarningsData.undertime.cost || "N/A"
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </q-field>
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
                <!-- class="text-decoration-custom" -->
                <span>{{ earning.formatted }}</span>
              </div>
              <div class="summary-total">
                <span class="text-uppercase">Total Income:</span>
                <span>{{
                  dtrEarningsData.totalIncome.formatted || "0.00"
                }}</span>
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
                <span>{{ formatCurrencyProps(deduction.formatted) }}</span>
              </div>
              <div class="summary-total negative">
                <span class="text-uppercase">Total Deductions:</span>
                <span>{{
                  formatCurrencyProps(dtrDeductionsData.totalDeductions)
                }}</span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-scroll-area>

      <!-- Footer -->
      <q-card-actions class="payslip-footer-light">
        <div class="row items-center full-width">
          <!-- Column 1: Balance Details -->
          <div class="col-12 col-md-4 balances-section">
            <div>
              <span>Uniform Balance:</span>
              <span class="balance-value">{{
                formatCurrencyProps(uniformBalance)
              }}</span>
            </div>
            <div>
              <span>Credit Balance:</span>
              <span class="balance-value">{{
                formatCurrencyProps(creditBalance)
              }}</span>
            </div>
            <div>
              <span>Cash Advance Balance:</span>
              <span class="balance-value">{{
                formatCurrencyProps(cashAdvanceBalance)
              }}</span>
            </div>
          </div>

          <!-- Column 2: Net Income (Main Focus) -->
          <div class="col-12 col-md-4 net-income-section">
            <div class="net-income-label">Net Income</div>
            <div class="net-income-value">
              {{ formatCurrencyProps(netIncome) }}
            </div>
          </div>

          <!-- Column 3: Action Button -->
          <div class="col-12 col-md-4 action-section">
            <q-btn
              label="Proceed"
              unelevated
              class="proceed-btn"
              @click="proceed"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, date, useQuasar } from "quasar";
import { computed, reactive } from "vue";
import { usePayslipStore } from "src/stores/payslip";
import SelectionPrintOrPrintOnlyDialog from "../SelectionPrintOrPrintOnlyDialog.vue";

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const payslipStore = usePayslipStore();

const $q = useQuasar();

const props = defineProps({
  formatFullnameProps: Function,
  formatCurrencyProps: Function,
  employeesData: Object,
  dtrRecord: Object,
  dtrSummaryData: Object,
  dtrEarningsData: Object,
  dtrDeductionsData: Object,
});

console.log("propssss", props);

const holidays = props.dtrRecord.holidays || [];
console.log("holidays", holidays);

const payrollCycles = [
  // From day, To day, Release day, Release month offset (relative to end date)
  { fromDay: 26, toDay: 10, releaseDay: 20, monthOffset: 0 }, // same month as "to" date
  { fromDay: 11, toDay: 25, releaseDay: 5, monthOffset: 1 }, // next month after "to" date
];

const getPayrollReleaseDate = (from, end) => {
  const fromDate = date.extractDate(from, "MMMM DD, YYYY");
  const endDate = date.extractDate(end, "MMMM DD, YYYY");

  if (!fromDate || !endDate) return null;

  for (const cycle of payrollCycles) {
    if (
      fromDate.getDate() === cycle.fromDay &&
      endDate.getDate() === cycle.toDay
    ) {
      let releaseDate = new Date(endDate);
      releaseDate.setMonth(releaseDate.getMonth() + cycle.monthOffset);
      releaseDate.setDate(cycle.releaseDay);

      return date.formatDate(releaseDate, "MMMM DD, YYYY");
    }
  }

  return null; // No matching cycle
};

const earnings = [
  {
    label: "Regular Pay",
    formatted: props.dtrEarningsData.workingHours.cost || 0.0,
    // cost: props.dtrEarningsData.regularPay.cost,
  },
  {
    label: "Overtime Pay",
    formatted: props.dtrEarningsData.overtime.cost || 0.0,
    // cost: props.dtrEarningsData.overtimePay.cost,
  },
  {
    label: "Holiday Pay",
    formatted: props.dtrEarningsData.holidayPay.cost || 0.0,
    // cost: props.dtrEarningsData.holidayPay.cost,
  },
  // {
  //   label: "COLA",
  //   // formatted: props.dtrEarningsData.holidayPay.formatted,
  //   // cost: props.dtrEarningsData.holidayPay.cost,
  // },
  {
    label: "Night Differential",
    formatted: props.dtrEarningsData.nightDifferential.cost || 0.0,
    // cost: props.dtrEarningsData.holidayPay.cost,
  },
  {
    label: "Total Allowance",
    formatted: props.dtrEarningsData.allowances.cost || 0.0,
    // cost: props.dtrEarningsData.holidayPay.cost,
  },
  {
    label: "Quota Incentive",
    formatted: props.dtrEarningsData.incentives.cost || 0.0,
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
    formatted: props.dtrDeductionsData.details?.employeeBenefits?.hdmf || 0.0,
    // cost: props.dtrDeductionsData.credits.cost,
  },
  {
    label: "PhilHealth Insurance",
    formatted: props.dtrDeductionsData.details?.employeeBenefits?.phic || 0.0,
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

const uniformBalance = computed(() => {
  const uniforms = Array.isArray(props.dtrDeductionsData?.details?.uniforms)
    ? props.dtrDeductionsData?.details?.uniforms
    : [];

  return uniforms.reduce((sum, uniform) => {
    const paymentsPerPayroll = parseFloat(uniform.payments_per_payroll || 0.0);
    const remainingPayments = parseFloat(uniform.remaining_payments || 0.0);
    let diff = remainingPayments - paymentsPerPayroll;

    // ✅ Handle floating point tolerances
    if (diff < 0 && diff >= -0.25) {
      diff = 0;
    } else if (diff < -0.25) {
      throw new Error(
        `Uniform balance error: Invalid negative value (${diff.toFixed(2)})`
      );
    }

    return sum + diff;
  }, 0);
});

// Example run
console.log(
  "Payroll Release:",
  getPayrollReleaseDate(props.dtrRecord.from, props.dtrRecord.end)
);

const netIncome = computed(() => {
  const totalEarnings = parseFloat(
    props.dtrEarningsData?.totalIncome?.raw || 0.0
  );
  const totalDeductions = parseFloat(
    props.dtrDeductionsData?.totalDeductions || 0.0
  );
  return totalEarnings - totalDeductions;
});

const totalCredits = computed(() => {
  return (props.dtrDeductionsData?.details?.credits || []).reduce(
    (sum, item) => sum + Number(item.total_price || 0),
    0
  );
});

const creditBalance = computed(() => {
  const computedTotalCredits = totalCredits.value;
  const rawTotalCredits = parseFloat(
    props.dtrDeductionsData?.creditTotal || 0.0
  );
  return computedTotalCredits - rawTotalCredits;
});

const cashAdvanceBalance = computed(() => {
  const cashAdvance = Array.isArray(
    props.dtrDeductionsData?.details?.cashAdvances
  )
    ? props.dtrDeductionsData.details.cashAdvances
    : [];

  const totalCAPaymentsPerPayroll = cashAdvance.reduce(
    (sum, item) => sum + parseFloat(item.payment_per_payroll || 0),
    0
  );

  const totalRemainingPayments = cashAdvance.reduce(
    (sum, item) => sum + parseFloat(item.remaining_payments || 0),
    0
  );

  let balance = totalRemainingPayments - totalCAPaymentsPerPayroll;

  // ✅ Clamp tiny negatives to 0
  if (balance < 0 && balance > -1) {
    balance = 0;
  }

  // ✅ If balance is -1 or less, throw an error or return a flag
  if (balance <= -1) {
    console.error(
      "❌ Cash advance balance error: balance is below -1",
      balance
    );
    return "Error"; // or return `null`, or even throw an Error depending on UX
  }

  return balance;
});

const payslipEarnings = reactive({
  allowances_pay: props.dtrEarningsData.allowances.costRaw,
  holidays_pay: props.dtrEarningsData.holidayPay.costRaw,
  incentives_pay: props.dtrEarningsData.incentives.costRaw,
  night_diff_pay: props.dtrEarningsData.nightDifferential.costRaw,
  overtime_pay: props.dtrEarningsData.overtime.costRaw,
  undertime_pay: props.dtrEarningsData.undertime.costRaw,
  working_hours_pay: props.dtrEarningsData.workingHours.costRaw,
  payslip_incentives: props.dtrEarningsData.incentiveDatasFromChild,
});

const payslipDeductions = reactive({
  benefits_total: props.dtrDeductionsData.benefitsTotal,
  cash_advance_total: props.dtrDeductionsData.cashAdvanceTotal,
  credit_total: props.dtrDeductionsData.creditTotal,
  employee_charge_total: props.dtrDeductionsData.employeeChargesTotal,
  total_deductions: props.dtrDeductionsData.totalDeductions,
  uniform_total: props.dtrDeductionsData.uniformTotal,
  // details: props.dtrDeductionsData.details,
  payslip_deduction_ca: props.dtrDeductionsData.details.cashAdvances,
  payslip_deduction_charges: props.dtrDeductionsData.details.employeeCharges,
  payslip_deduction_credits: props.dtrDeductionsData.details.credits,
  payslip_deduction_benefits: props.dtrDeductionsData.details.employeeBenefits,
  payslip_deduction_uniforms: props.dtrDeductionsData.details.uniforms,
});

const payslipDtr = reactive({
  from: props.dtrRecord.from,
  end: props.dtrRecord.end,
  release_date: getPayrollReleaseDate(
    props.dtrRecord.from,
    props.dtrRecord.end
  ),
  holidays: props.dtrRecord.holidays,
  payslip_dtr_record: props.dtrRecord.records,
});

const payslipHolidaySummary = reactive({
  dtr_summary: props.dtrSummaryData.calculateAdditionalHolidayPays,
});

// const proceed = async () => {
//   console.log("payslipFullData", payslipDataToBeSend);
//   await payslipStore.createPayslip(payslipDataToBeSend);
// };

const payslipDataToBeSend = reactive({
  employee_id: props.employeesData.id,
  from: props.dtrRecord.from,
  to: props.dtrRecord.end,
  payroll_release_date: getPayrollReleaseDate(
    props.dtrRecord.from,
    props.dtrRecord.end
  ),
  rate_per_day: props.employeesData.employment_type.salary,
  total_days: props.dtrEarningsData.totalDays,
  uniform_balance: uniformBalance.value,
  credit_balance: creditBalance.value,
  cash_advance_balance: cashAdvanceBalance.value,
  total_earnings: props.dtrEarningsData.totalIncome.raw,
  total_deductions: props.dtrDeductionsData.totalDeductions,
  net_income: netIncome.value,

  // nested Earnings objects
  payslip_earnings: {
    ...payslipEarnings,
  },

  // nested DTR objects
  payslip_dtr: {
    ...payslipDtr,
  },

  // nested Holiday Summary objects
  payslip_holiday_summary: {
    ...payslipHolidaySummary,
  },

  // nested Deductions Summary objects
  payslip_deductions: {
    ...payslipDeductions,
  },
});

const proceed = () => {
  $q.dialog({
    component: SelectionPrintOrPrintOnlyDialog,
    componentProps: {
      payslipDataToBeSend,
    },
  });
};
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
  font-size: 14px;
}

.header-section.elegant-header {
  background: linear-gradient(135deg, $primary-blue 0%, #3aaeb8 100%);
  color: $white;
  padding: 16px 24px;
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

.content-scroll {
  flex: 1;
  height: auto;

  @media (max-width: 1023px) {
    height: calc(90vh - 130px); // minus header & footer height
  }

  @media (min-width: 1024px) {
    overflow: visible !important;
    height: auto !important;
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
  gap: 6px;
  border: 1px solid #f0f0f0;
  height: 100%;
}

.summary-header {
  font-weight: 600;
  font-size: 1rem;
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
  font-size: 0.875rem;
  color: #555;
}

.summary-total {
  margin-top: auto;
  padding-top: 12px;
  font-weight: 700;
  font-size: 0.9rem;
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
  padding: 13px 10px;
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
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      pointer-events: none;
    }
  }
}

.payslip-footer-light {
  /* Your original elegant gradient, now with better padding and spacing */
  background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 16px 24px;
  border-top: 1px solid #dee2e6;
  margin-top: 16px;
  width: 100%;

  /* Balances section (left) */
  .balances-section {
    font-size: 0.8rem;
    color: #6c757d; // Soft gray for secondary text
    line-height: 1.7;
    text-align: left;
    span:first-child {
      font-weight: 500;
      margin-right: 8px;
    }
    .balance-value {
      font-weight: 600;
      color: #343a40; // Dark text for readability
    }
  }

  /* Net Income section (middle) */
  .net-income-section {
    text-align: center;
    .net-income-label {
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #6c757d; // Soft gray
    }
    .net-income-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: #2a9d8f; // Themed color for the main value
      line-height: 1.2;
    }
  }

  /* Action button section (right) */
  .action-section {
    text-align: right;
  }

  /* Responsive stacking */
  @media (max-width: 768px) {
    .balances-section,
    .net-income-section,
    .action-section {
      text-align: center;
      margin-bottom: 16px;
    }
    .action-section {
      margin-bottom: 0;
    }
  }

  /* The button style remains the same */
}

.proceed-btn {
  // --- 1. THEME VARIABLES ---
  // Change your button's look by just editing these colors.
  --gradient-start: #00be9b; // Bright end of the gradient
  --gradient-end: #0ca289; // Darker end of the gradient
  --shadow-color: rgba(12, 162, 137, 0.35);
  --shadow-hover-color: rgba(12, 162, 137, 0.5);

  // --- 2. CORE STYLES ---
  position: relative;
  border: none;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: white;
  text-transform: uppercase;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  // --- 3. VISUAL POLISH ---
  // The Gradient Fill using our variables
  background: linear-gradient(
    135deg,
    var(--gradient-end) 0%,
    var(--gradient-start) 100%
  );
  // A shadow from the button's own color for a cohesive glow
  box-shadow: 0 6px 20px var(--shadow-color);
  // A subtle inner border to catch the light
  border: 1px solid rgba(255, 255, 255, 0.2);
  // Improves text readability against the gradient
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  // --- 4. ENHANCED INTERACTIVITY ---
  // The hover state makes it "lift" and glow more intensely
  &:hover {
    // Moves up and gets slightly bigger
    transform: translateY(-3px) scale(1.03);
    // Shadow becomes larger and more intense
    box-shadow: 0 10px 25px var(--shadow-hover-color);
  }

  // The active state simulates a physical press
  &:active {
    // Shrinks down slightly to mimic being pressed
    transform: scale(0.98);
    // Shadow retracts
    box-shadow: 0 4px 15px var(--shadow-color);
  }

  // --- 5. THE "GLASS" EDGE EFFECT ---
  // This pseudo-element creates the glossy highlight on the border
  &::before {
    content: "";
    position: absolute;
    inset: 0; // Covers the entire button area
    border-radius: inherit; // Matches the button's border-radius
    padding: 1px; // The thickness of the highlight

    // A white-to-transparent gradient for the highlight
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );

    // This magic property masks the gradient to only appear on the border
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    pointer-events: none; // Allows clicks to pass through to the button
  }
}

.btn-outline {
  --primary-color: #1a9686; // Main Teal

  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  padding: 10px 28px; // Padding is slightly less vertically due to border
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: uppercase;

  // The hover effect is a satisfying fill
  &:hover {
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(26, 150, 134, 0.2);
  }

  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: none;
  }
}

.text-decoration-custom {
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
