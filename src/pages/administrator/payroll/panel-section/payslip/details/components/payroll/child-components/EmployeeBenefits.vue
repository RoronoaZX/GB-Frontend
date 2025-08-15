<template>
  <q-slide-fade v-if="showBenefitsUI" appear>
    <q-card class="my-benefits-card q-my-lg q-pa-md">
      <q-card-section class="q-pt-md q-pb-none">
        <div class="row q-col-gutter-y-lg">
          <q-item class="col-12 q-px-md q-py-sm">
            <q-item-section avatar class="q-mr-md">
              <q-avatar size="sm" rounded class="q-ml-sm">
                <img src="../../../../../../../../../assets/ssslogov2.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle2 text-weight-medium text-dark">
                SSS (Social Security System) :
                <span class="benefit-amount">{{ benefits.sss || 0 }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="col-12 q-px-md q-py-sm">
            <q-item-section avatar class="q-mr-md">
              <q-avatar size="lg" square class="">
                <img src="../../../../../../../../../assets/pagibig_logo.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle2 text-weight-medium text-dark">
                HDMF / Pag-IBIG (Housing Fund) :
                <span class="benefit-amount"> {{ benefits.hdmf || 0 }} </span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="col-12 q-px-md q-py-sm">
            <q-item-section avatar class="q-mr-md">
              <q-avatar size="lg" rounded>
                <img
                  src="../../../../../../../../../assets/philhealth-removebg-preview.png"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle2 text-weight-medium text-dark">
                PHIC / PhilHealth (Health Insurance) :
                <span class="benefit-amount"> {{ benefits.phic || 0 }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>
    </q-card>
  </q-slide-fade>

  <div v-else class="q-pa-lg text-center text-grey-7">
    <q-icon name="info" size="md" class="q-mr-sm" color="info" />
    Benefits information is only available for cutoff periods from the 26th to
    the 10th of the following month.
  </div>
</template>

<script setup>
import { useEmployeeBenefitStore } from "src/stores/benefit";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(["dtrFrom", "dtrTo"]);
console.log("props", props.dtrTo, props.dtrFrom);

const emit = defineEmits(["update:total"]);

const employeeBenefitsStore = useEmployeeBenefitStore();
const benefits = computed(() => employeeBenefitsStore.benefits);

const route = useRoute();
const employeeID = route.params.employee_id;

// Computed property to control UI visibility
const showBenefitsUI = computed(() => {
  const dtrFromDate = new Date(props.dtrFrom);
  const dtrToDate = new Date(props.dtrTo);

  const isDtrFromCorrectDay = dtrFromDate.getDate() === 26;
  const isDtrToCorrectDay = dtrToDate.getDate() === 10;

  let isMonthSequenceCorrect = false;

  if (dtrFromDate.getMonth() === 11) {
    // If dtrFrom is Deccember (month 11), dtrTo must be January (month 0) of the next year
    if (
      dtrToDate.getMonth() === 0 &&
      dtrToDate.getFullYear() === dtrFromDate.getFullYear() + 1
    ) {
      isMonthSequenceCorrect = true;
    }
  } else {
    // For other months, dtrTo must be the next month in the same year
    if (
      dtrToDate.getMonth() === dtrFromDate.getMonth() + 1 &&
      dtrToDate.getFullYear() === dtrFromDate.getFullYear()
    ) {
      isMonthSequenceCorrect = true;
    }
  }

  return isDtrFromCorrectDay && isDtrToCorrectDay && isMonthSequenceCorrect;
});

const totalBenefits = computed(() => {
  // If the UI for benefits is not shown, return 0 for the total
  if (!showBenefitsUI.value) {
    return 0;
  }

  // Ensure that benefits.value.sss, hdmf, and phic are treated as numbers
  // and handle potential undefined/null b defaulting to 0
  const sss = Number(benefits.value.sss || 0);
  const hdmf = Number(benefits.value.hdmf || 0);
  const phic = Number(benefits.value.phic || 0);

  return sss + hdmf + phic;
});

watch(
  totalBenefits,
  () => {
    if (!showBenefitsUI.value) return;

    const sss = Number(benefits.value.sss || 0);
    const hdmf = Number(benefits.value.hdmf || 0);
    const phic = Number(benefits.value.phic || 0);

    emit("update:total", {
      total: sss + hdmf + phic,
      sss,
      hdmf,
      phic,
    });
  },
  { immediate: true }
);

const fetchEmployeeBenefits = async () => {
  const dtrFromDate = new Date(props.dtrFrom);
  const dtrToDate = new Date(props.dtrTo);

  const isDtrFromCorrectDay = dtrFromDate.getDate() === 26;
  const isDtrToCorrectDay = dtrToDate.getDate() === 10;

  let isMonthSequenceCorrect = false;

  // Check if dtrToDate is one month after dtrFromDate
  if (dtrFromDate.getMonth() === 11) {
    //if dtrfrom is December (month 11), dtrTo must be January (month 0) of the next year
    if (
      dtrToDate.getMonth() === 0 &&
      dtrToDate.getFullYear() === dtrFromDate.getFullYear() + 1
    ) {
      isMonthSequenceCorrect = true;
    }
  } else {
    // For other months, dtrTo must be the next month in the same year
    if (
      dtrToDate.getMonth() === dtrFromDate.getMonth() + 1 &&
      dtrToDate.getFullYear() === dtrFromDate.getFullYear()
    ) {
      isMonthSequenceCorrect = true;
    }
  }

  // Only perform fetch if the DTR date match the 26th and 10th cutoff pattern
  if (isDtrFromCorrectDay && isDtrToCorrectDay && isMonthSequenceCorrect) {
    await employeeBenefitsStore.fetchEmployeeBenefitsDeductions(employeeID);
    console.log("employee benefits", employeeBenefitsStore.benefits);
  } else {
    console.warn(
      "DTR dates do not match the required cutoff pattern (26th of a month to 10th of the next month). Fetching benefits skipped."
    );
  }
};
onMounted(fetchEmployeeBenefits);
</script>

<style lang="scss" scoped>
$primary-blue: #0267c5;
$secondary-blue: #0c3154;
$light-blue: #e6f3ff;
$gray-light: #f8f9fa;
$gray-medium: #e9ecef;
$text-dark: #343a40;
$text-medium: #6c757d;
$white: #ffffff;
$shadow-color: rgba(0, 0, 0, 0.15);

// Custom accent colors for totals
$accent-light: #e0f2f7;
$accent-dark: #004d40;

.list-container.compact-list {
  border: 1px solid $gray-medium;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.list-header.compact-list-header {
  background-color: $gray-light;
  font-weight: 600;
  color: $text-dark;
  padding: 10px 15px;
  font-size: 0.9em;
  letter-spacing: 0.2px;

  .q-item-section {
    padding: 0;
  }
}

.list-item.compact-list-item {
  padding: 8px 15px;
  border-bottom: 1px solid $gray-medium;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  font-family: "Open Sans", sans-serif;
  color: $text-medium;
  font-size: 0.85em;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: $light-blue;
    transform: translateX(3px);
  }

  .q-item-section {
    padding: 0;
  }
  .item-size {
    font-weight: 500;
  }
  .item-qty {
    font-weight: 400;
  }
  .item-price {
    font-weight: 500;
    color: $text-dark;
  }
}

.list-total.compact-list-total {
  background-color: $accent-light;
  padding: 12px 15px;
  font-weight: 700;
  color: $accent-dark;
  border-top: 1.5px solid $secondary-blue;
  font-size: 0.95em;

  .q-item-section {
    padding: 0;
  }
  .text-subtitle1 {
    letter-spacing: 0.3px;
  }
}

.my-benefits-card {
  border-radius: 16px; // Slightly more rounded
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); // Softer, more prominent shadow
  background-color: #fff;
  font-family: "Inter", "Roboto", sans-serif;
}

.benefit-label {
  font-size: 1rem;
  font-weight: 500;
  color: #2e2e2e;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.benefit-amount {
  font-weight: 700; // Semi-bold
  color: #004085; // A distinct color for the amounts
  // font-family: "Roboto Mono", monospace; // Example for monospaced numbers
  margin-left: 8px;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  font-weight: 600;
}

.total-label {
  font-size: 1.05rem;
  color: #495057;
}

.total-amount {
  font-size: 1.25rem;
  color: #0c3154;
  font-weight: 700;
}

// Ensure img within q-avatar scales correctly
.q-avatar img {
  object-fit: contain; // Ensures image fits without cropping
}
</style>
