<template>
  <div>
    <q-card flat bordered class="summary-card q-pa-lg">
      <q-list dense>
        <div class="q-mb-lg text-center">
          <q-item-label class="text-h6 text-weight-bold text-grey-9">
            Checking Deductions Summary
          </q-item-label>
        </div>

        <div class="row justify-between">
          <q-item class="col- q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="receipt_long" color="primary-7" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-meduim text-grey-8">
                Credit Deductions :
                <span class="text-negative text-weight-bold">
                  {{ formatCurrency(calculatedCreditTotal) }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-mt-md">
            <OpenButton
              @open-dialog="handleEmployeeCredit(allCreditProducts)"
            />
          </div>
        </div>

        <q-separator spaced="sm" class="q-my-md" />

        <div class="row justify-between">
          <q-item class="col- q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="man" color="primary-7" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-meduim text-grey-8">
                Uniforms Deductions :
                <span class="text-negative text-weight-bold">
                  {{ formatCurrency(calculatedUniformTotal) }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-mt-md">
            <OpenButton
              @open-dialog="handleEmployeeUniforms(allUniformProducts)"
            />
          </div>
        </div>

        <q-separator spaced="sm" class="q-my-md" />

        <div class="row justify-between">
          <q-item class="col- q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <!-- <q-icon name="credit_score" color="primary-7" /> -->
              <q-icon name="credit_score" color="primary-7" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-meduim text-grey-8">
                Cash Advances :
                <span class="text-negative text-weight-bold">
                  {{ formatCurrency(calculateCashAdvanceTotal) }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-mt-md">
            <OpenButton
              @open-dialog="handleEmployeeCashAdvance(cashAdvances)"
            />
          </div>
        </div>

        <q-separator spaced="sm" class="q-my-md" />

        <div class="row justify-between">
          <q-item class="col- q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="price_change" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-meduim text-grey-8">
                Short / Charges :
                <span class="text-negative text-weight-bold">
                  {{ formatCurrency(calculateEmployeeChargesTotal) }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-mt-md">
            <OpenButton @open-dialog="handleEmployeeCharges(employeeCharges)" />
          </div>
        </div>

        <q-separator spaced="sm" class="q-my-md" />

        <EmployeeBenefits
          :dtr-to="props.dtrTo"
          :dtr-from="props.dtrFrom"
          v-model:total="receivedTotalBenefits"
        />

        <q-separator spaced="sm" class="q-my-md" />

        <div class="row justify-end q-mt-md">
          <q-item class="col-auto q-pa-none">
            <q-item-section>
              <q-item-label class="text-h6 text-weight-bold text-grey-8">
                Total Deductions:
                <span class="text-negative">{{
                  formatCurrency(calculateTotalDeductions)
                }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-card>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCreditsStore } from "src/stores/employee-credits";
import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import CreditList from "./CreditList.vue";
import UniformList from "./UniformList.vue";
import CashAdvanceList from "./CashAdvanceList.vue";
import EmployeeBenefits from "./EmployeeBenefits.vue";
import EmployeeCharges from "./EmployeeCharges.vue";
import OpenButton from "src/components/buttons/OpenButton.vue";
import { useUniformStore } from "src/stores/uniform";
import { useCashAdvanceStore } from "src/stores/cash-advance";
import { useEmployeeChargesStore } from "src/stores/employee-charges";

const props = defineProps(["dtrFrom", "dtrTo", "employeeData"]);
const route = useRoute();

const employeeID = route.params.employee_id;
const creditsStore = useCreditsStore();
const credits = computed(() => creditsStore.credits);

const uniformStore = useUniformStore();
const uniformsData = computed(() => uniformStore.uniforms);
const cashAdvanceStore = useCashAdvanceStore();
const cashAdvances = computed(() => cashAdvanceStore.cashAdvances);
console.log("cashssssss advances data", cashAdvances.value);
const employeeChargesStore = useEmployeeChargesStore();
const employeeCharges = computed(() => employeeChargesStore.employeeCharges);

const $q = useQuasar();

const receivedTotalBenefits = ref(0);

const calculateTotalDeductions = computed(() => {
  return (
    parseFloat(calculatedCreditTotal.value) +
    parseFloat(calculatedUniformTotal.value) +
    parseFloat(calculateCashAdvanceTotal.value) +
    parseFloat(receivedTotalBenefits.value) // Ensure this is also parsed as a float
  );
});

// Calculate creditTotal directly from the 'credits' computed property
const calculatedCreditTotal = computed(() => {
  // 1. Check if credits.value exists and has credit_records
  if (!credits.value || !Array.isArray(credits.value.credit_records)) {
    return 0;
  }
  let totalSum = 0;

  // 2. Iterate through each credit record
  credits.value.credit_records.forEach((creditRecord) => {
    // 3. Ensure creditRecord.products exists and is an array
    if (Array.isArray(creditRecord.products)) {
      // 4. Iterate through eac product within the credit record
      creditRecord.products.forEach((product) => {
        // 5. Parse the total_price and to the sum
        const amount = parseFloat(product.total_price);
        if (!isNaN(amount)) {
          totalSum += amount;
        }
      });
    }
  });
  return totalSum;
});

console.log("calculatedCreditTotal", calculatedCreditTotal.value);

// Add this new computed property
const allCreditProducts = computed(() => {
  // Defensive check: Ensure credits.value exists and credit_records is an array
  if (!credits.value || !Array.isArray(credits.value.credit_records)) {
    return []; // Return an empty array if the data isn't in the expected shape yet
  }

  // Use flatMap to iterate over each 'creditRecord' in 'credit_records'
  // and for each 'creditRecord', return its 'products' array.
  // flatMap then flattens all these individual 'products' arrays into one single array.
  return credits.value.credit_records.flatMap((creditRecord) => {
    // Another defensive check: Ensure 'products' exists and is an array within each 'creditRecord'
    return Array.isArray(creditRecord.products) ? creditRecord.products : [];
  });
});

// Calculate uniformTotal directly from the 'uniformsData' computed property
const calculatedUniformTotal = computed(() => {
  // 1. Check if uniformsData.value is a valid array; if not, return 0.
  if (!Array.isArray(uniformsData.value)) {
    return 0;
  }

  let totalSumInCentavos = 0;

  uniformsData.value.forEach((uniformRecord) => {
    const amount = parseFloat(uniformRecord.payments_per_payroll);
    console.log("amount uniforms", amount);
    if (!isNaN(amount)) {
      totalSumInCentavos += Math.round(amount * 100);
    }
  });

  return (totalSumInCentavos / 100).toFixed(2);
});
console.log("calculatedUniformTotal", calculatedUniformTotal.value);

const allUniformProducts = computed(() => {
  if (!uniformsData.value || !Array.isArray(uniformsData.value)) {
    return { pants: [], t_shirts: [] }; // Return an object with empty arrays if data isn't ready
  }

  const combinedPants = [];
  const combinedTShirts = [];
  let numberOfPayments = 0;
  let paymentsPerPayroll = 0;
  let remainingPayments = 0;
  let totalAmount = 0;

  uniformsData.value.forEach((uniformRecord) => {
    if (Array.isArray(uniformRecord.pants)) {
      combinedPants.push(...uniformRecord.pants);
    }
    if (Array.isArray(uniformRecord.t_shirt)) {
      combinedTShirts.push(...uniformRecord.t_shirt);
    }
  });

  uniformsData.value.forEach((uniformRecord) => {
    console.log("uniformRecordssss", uniformRecord);
    numberOfPayments = uniformRecord.number_of_payments;
    paymentsPerPayroll = uniformRecord.payments_per_payroll;
    remainingPayments = uniformRecord.remaining_payments;
    totalAmount = uniformRecord.total_amount;
  });
  return {
    pants: combinedPants,
    t_shirts: combinedTShirts,
    numberOfPayments,
    paymentsPerPayroll,
    remainingPayments,
    totalAmount,
  };
});

const calculateCashAdvanceTotal = computed(() => {
  if (!Array.isArray(cashAdvances.value)) {
    return 0;
  }

  let totalSum = 0;

  cashAdvances.value.forEach((cashAdvances) => {
    const amount = parseFloat(cashAdvances.payment_per_payroll);
    console.log("amount cash advance", amount);
    if (!isNaN(amount)) {
      totalSum += Math.round(amount * 100);
    }
  });

  return (totalSum / 100).toFixed(2);
});

const calculateEmployeeChargesTotal = computed(() => {
  if (!Array.isArray(employeeCharges.value)) {
    return 0;
  }

  let totalSum = 0;

  employeeCharges.value.forEach((employeeCharges) => {
    const amount = parseFloat(employeeCharges.charges_amount);
    console.log("amount employee charges", amount);
    if (!isNaN(amount)) {
      totalSum += Math.round(amount * 100);
    }
  });
  return (totalSum / 100).toFixed(2);
});

// const allCreditProducts = computed(() => {
//   if (!credits.value || !Array(credits.value.credit_records)) {
//     return []; // Return an empty array if data isn't ready
//   }

//   // use flatMap to flatten the array of arrays into a single array
//   return credits.value.credit_records.flatMap((creditRecord) => {
//     // Ensure products exists and is an array, otherwise return an empty array
//     return Array.isArray(creditRecord.products) ? creditRecord.products : [];
//   });
// });

// The `creditTotal` ref is now only needed if you want to store the value specificcally emitted by the dialog
// For the peimary display, `calculatedCreditTotal` is more direct.
// If you want the dialog's emitted value to *ooverrid* or *specifically* effect the display, keep creditTotal ref
// and display creditTotal. If the list in the dialog is the *same* as the credits from the store, this ref might be redundant.
const creditTotalFromDialog = ref(0); // Renamed for clarity, if you decide to keep it for dialog-specific updates
const uniformTotalFromDialog = ref(0);

const fetchCreditsPerCutOff = async () => {
  await creditsStore.fetchCreditsPerCutOff(
    props.dtrFrom,
    props.dtrTo,
    employeeID
  );
  // Optional: If you want to initialize creditTotalFromDialog with the initial calculated total
  // creditTotalFromDialog.value = calculatedCreditTotal.value;
};
onMounted(fetchCreditsPerCutOff);

const fetchUniformsDeduction = async () => {
  await uniformStore.fetchUniformForDeduction(employeeID);
  console.log("uniforms data", uniformsData.value);
};
onMounted(fetchUniformsDeduction);

const fetchCashAdvance = async () => {
  await cashAdvanceStore.fetchCashAdvanceForDeduction(employeeID);
  console.log("cash advances datasss", cashAdvances.value);
};
onMounted(fetchCashAdvance);

const fetchEmployeeCharges = async () => {
  const dataToBeSent = {
    employeeID: employeeID,
    fromDate: props.dtrFrom,
    toDate: props.dtrTo,
  };

  await employeeChargesStore.fetchEmployeeCharges(dataToBeSent);
  console.log("employee charges data", employeeCharges.value);
};
onMounted(fetchEmployeeCharges);

const handleEmployeeCredit = (credits) => {
  $q.dialog({
    component: CreditList,
    componentProps: {
      creditList: credits,
    },
    on: {
      "update:total": (total) => {
        console.log("Total credit amount received from dialog:", total);
        creditTotalFromDialog.value = total; // Update this ref if you're using it
      },
    },
  });
};

const handleEmployeeUniforms = (uniforms) => {
  $q.dialog({
    component: UniformList,
    componentProps: {
      uniformList: uniforms,
    },
    on: {
      "update:total": (total) => {
        console.log("Total credit amount received from dialog:", total);
        uniformTotalFromDialog.value = total;
      },
    },
  });
};

const handleEmployeeCashAdvance = (cashAdvances) => {
  $q.dialog({
    component: CashAdvanceList,
    componentProps: {
      cashAdvanceList: cashAdvances,
    },
  });
};

const handleEmployeeCharges = (charges) => {
  $q.dialog({
    component: EmployeeCharges,
    componentProps: {
      chargesAmountList: charges,
    },
  });
};

const formatCurrency = (value) => {
  const number = parseFloat(value || 0);
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(number);
};
</script>

<style lang="scss" scoped>
.summary-card {
  border-radius: 16px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
  background: linear-gradient(145deg, #ffffff, #f7f7f7);
  overflow: hidden;
}

@media (max-width: 767px) {
  .summary-card {
    padding: 24px;
  }
  .q-separator {
    margin: 20px 0;
  }
}

.text-h6 {
  font-size: 1.15rem;
}

.text-grey-9 {
  color: #333;
  letter-spacing: -0.02em;
}

.my-custom-outline-btn {
  border: 2px solid var(--q-primary); // Use primary color for border
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--q-primary); // Fill with primary color on hover
    color: white !important; // Change text to white on hover
  }
}

.text-body2 {
  /* For all general labels */
  font-size: 0.7rem; /* Smaller then default body1 */
}

.text-body2 span {
  /* For actual values */
  font-size: 0.7rem; /* Slightly larger than label for emphasis, but still smaller overall */
}

.text-h6 span {
  /* For the "" */
  font-size: 1rem;
}

.text-grey-8 {
  color: #555;
  font-weight: 500;
}
</style>
