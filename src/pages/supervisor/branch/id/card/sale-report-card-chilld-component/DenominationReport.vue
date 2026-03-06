<template>
  <div class="denomination-container">
    <!-- Main Card -->
    <q-card class="denomination-card">
      <!-- Simple Header -->
      <q-card-section class="q-pa-md">
        <div class="row items-center">
          <div class="header-icon">
            <q-icon name="payments" size="20px" color="primary" />
          </div>
          <div class="q-ml-sm">
            <div class="text-weight-medium text-grey-8">Cash Denomination</div>
            <div class="text-caption text-grey-5">
              {{ formatDate(reportDate) }}
            </div>
          </div>
          <q-space />
          <q-btn
            flat
            dense
            icon="more_vert"
            size="sm"
            color="grey-6"
            @click="handleDenominationDialog"
          >
            <q-tooltip>View Details</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>

      <!-- Total Amount - Clean and Bold -->
      <q-card-section class="q-pt-none q-px-md q-pb-sm">
        <div class="text-caption text-grey-5 q-mb-xs">Total Cash</div>
        <div class="total-amount">{{ formatPrice(totalDenomination) }}</div>
      </q-card-section>

      <!-- Simple Stats Row -->
      <q-card-section class="q-px-md q-py-sm">
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <div class="stat-box">
              <div class="row items-center">
                <div class="stat-dot bg-primary"></div>
                <span class="stat-label">Bills</span>
              </div>
              <div class="stat-number">{{ totalBillsCount }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="stat-box">
              <div class="row items-center">
                <div class="stat-dot bg-secondary"></div>
                <span class="stat-label">Coins</span>
              </div>
              <div class="stat-number">
                {{ totalCoinsCount }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- Denomination Lists - Show All for Transparency -->
      <q-card-section class="q-px-md q-py-sm">
        <!-- Bills Section - Show All Denominations -->
        <div class="section-label q-mb-sm">
          <q-icon name="money" size="18px" color="primary" />
          <span class="q-ml-xs text-weight-medium text-grey-8">Bills</span>
          <span class="text-caption text-grey-5 q-ml-sm"
            >(All denominations)</span
          >
        </div>

        <div class="denom-list">
          <!-- Map through all bills, not just active ones -->
          <div
            v-for="bill in allBills"
            :key="bill.key"
            class="denom-row"
            :class="{ 'zero-value': (denominationData[bill.key] || 0) === 0 }"
          >
            <div class="row items-center justify-between">
              <div class="row items-center">
                <div class="denom-badge" :class="getBillBadgeClass(bill.key)">
                  ₱{{ bill.value }}
                </div>
                <span class="denom-count q-ml-sm">
                  {{ denominationData[bill.key] || 0 }} pcs
                </span>
              </div>
              <div
                class="denom-amount"
                :class="{
                  'text-grey-4': (denominationData[bill.key] || 0) === 0,
                }"
              >
                {{
                  formatPrice((denominationData[bill.key] || 0) * bill.value)
                }}
              </div>
            </div>
          </div>

          <!-- Bills Subtotal -->
          <div class="section-total row justify-between items-center q-mt-sm">
            <span class="text-grey-6">Bills Subtotal</span>
            <span class="text-weight-medium text-primary">{{
              formatPrice(totalBills)
            }}</span>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-px-md q-py-sm">
        <!-- Coins Section - Show All Denominations -->
        <div class="section-label q-mb-sm">
          <q-icon name="paid" size="18px" color="secondary" />
          <span class="q-ml-xs text-weight-medium text-grey-8">Coins</span>
          <span class="text-caption text-grey-5 q-ml-sm"
            >(All denominations)</span
          >
        </div>

        <div class="denom-list">
          <!-- Map through all coins, not just active ones -->
          <div
            v-for="coin in allCoins"
            :key="coin.key"
            class="denom-row"
            :class="{ 'zero-value': (denominationData[coin.key] || 0) === 0 }"
          >
            <div class="row items-center justify-between">
              <div class="row items-center">
                <div class="denom-badge" :class="getCoinBadgeClass(coin.key)">
                  {{ coin.label }}
                </div>
                <span class="denom-count q-ml-sm">
                  {{ denominationData[coin.key] || 0 }} pcs
                </span>
              </div>
              <div
                class="denom-amount"
                :class="{
                  'text-grey-4': (denominationData[coin.key] || 0) === 0,
                }"
              >
                {{
                  formatPrice((denominationData[coin.key] || 0) * coin.value)
                }}
              </div>
            </div>
          </div>

          <!-- Coins Subtotal -->
          <div class="section-total row justify-between items-center q-mt-sm">
            <span class="text-grey-6">Coins Subtotal</span>
            <span class="text-weight-medium text-secondary">{{
              formatPrice(totalCoins)
            }}</span>
          </div>
        </div>
      </q-card-section>

      <!-- Grand Total -->
      <q-card-section class="q-px-md q-py-md">
        <div class="grand-total row justify-between items-center">
          <span class="text-weight-medium text-grey-8">Grand Total</span>
          <span class="grand-total-amount">{{
            formatPrice(totalDenomination)
          }}</span>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import DenominationReport from "./DenominationReport.vue";
import { computed } from "vue";

const { formatDate, formatPrice, formatTimeAgo } = typographyFormat();

const props = defineProps(["sales_Reports", "reportDate"]);

const $q = useQuasar();

// All bills - complete list for transparency
const allBills = [
  { key: "oneThousandBills", value: 1000, label: "₱1000" },
  { key: "fiveHundredBills", value: 500, label: "₱500" },
  { key: "twoHundredBills", value: 200, label: "₱200" },
  { key: "oneHundredBills", value: 100, label: "₱100" },
  { key: "fiftyBills", value: 50, label: "₱50" },
  { key: "twentyBills", value: 20, label: "₱20" },
];

// All coins - complete list for transparency
const allCoins = [
  { key: "twentyCoins", value: 20, label: "₱20" },
  { key: "tenCoins", value: 10, label: "₱10" },
  { key: "fiveCoins", value: 5, label: "₱5" },
  { key: "oneCoins", value: 1, label: "₱1" },
  { key: "twentyFiveCents", value: 0.25, label: "₱0.25" },
];

// Get denomination data
const denominationData = computed(() => {
  const reports = props.sales_Reports[0]?.denomination_reports;
  return reports && reports.length > 0 ? reports[0] : {};
});

// Check if has any denominations (for footer display)
const hasDenomination = computed(() => {
  return (
    allBills.some((bill) => (denominationData.value[bill.key] || 0) > 0) ||
    allCoins.some((coin) => (denominationData.value[coin.key] || 0) > 0)
  );
});

// Calculate totals using all denominations
const totalDenomination = computed(() => {
  const data = denominationData.value;
  return (
    (data.oneThousandBills || 0) * 1000 +
    (data.fiveHundredBills || 0) * 500 +
    (data.twoHundredBills || 0) * 200 +
    (data.oneHundredBills || 0) * 100 +
    (data.fiftyBills || 0) * 50 +
    (data.twentyBills || 0) * 20 +
    (data.twentyCoins || 0) * 20 +
    (data.tenCoins || 0) * 10 +
    (data.fiveCoins || 0) * 5 +
    (data.oneCoins || 0) * 1 +
    (data.twentyFiveCents || 0) * 0.25
  );
});

const totalBills = computed(() => {
  const data = denominationData.value;
  return allBills.reduce(
    (sum, bill) => sum + (data[bill.key] || 0) * bill.value,
    0
  );
});

const totalCoins = computed(() => {
  const data = denominationData.value;
  return allCoins.reduce(
    (sum, coin) => sum + (data[coin.key] || 0) * coin.value,
    0
  );
});

const totalBillsCount = computed(() => {
  const data = denominationData.value;
  return allBills.reduce((sum, bill) => sum + (data[bill.key] || 0), 0);
});

const totalCoinsCount = computed(() => {
  const data = denominationData.value;
  return allCoins.reduce((sum, coin) => sum + (data[coin.key] || 0), 0);
});

// Dynamic badge classes based on denomination type
const getBillBadgeClass = (key) => {
  const value = denominationData.value[key] || 0;
  if (value === 0) return "bg-grey-2 text-grey-6";
  if (key.includes("Thousand")) return "bg-deep-purple-soft";
  if (key.includes("Hundred")) return "bg-indigo-soft";
  return "bg-primary-soft";
};

const getCoinBadgeClass = (key) => {
  const value = denominationData.value[key] || 0;
  if (value === 0) return "bg-grey-2 text-grey-6";
  if (key.includes("Twenty") && !key.includes("Five")) return "bg-pink-soft";
  if (key.includes("Cents")) return "bg-orange-soft";
  return "bg-secondary-soft";
};

// Dialog handler
const handleDenominationDialog = () => {
  $q.dialog({
    component: DenominationReport,
    componentProps: {
      reports: [denominationData.value],
      total: totalDenomination.value,
    },
  });
};
</script>

<style lang="scss" scoped>
.denomination-container {
  width: 100%;
  padding: 0;
}

.denomination-card {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.03);

  .header-icon {
    width: 36px;
    height: 36px;
    background: #f0f4ff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.total-amount {
  font-size: 2.2rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.stat-box {
  background: #f8fafc;
  padding: 12px;
  border-radius: 14px;

  .stat-dot {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin-right: 6px;

    &.bg-primary {
      background: #6366f1;
    }

    &.bg-secondary {
      background: #ec4899;
    }
  }

  .stat-label {
    font-size: 0.85rem;
    color: #64748b;
  }

  .stat-number {
    font-size: 1.4rem;
    font-weight: 600;
    color: #1e293b;
    margin-top: 4px;
  }
}

.section-label {
  display: flex;
  align-items: center;
  color: #334155;
}

.denom-list {
  background: #f8fafc;
  border-radius: 16px;
  padding: 12px;
}

.denom-row {
  padding: 8px 0;
  transition: opacity 0.2s;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  }

  &.zero-value {
    opacity: 0.7;
  }
}

.denom-badge {
  padding: 4px 10px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 60px;
  text-align: center;
  transition: all 0.2s;

  &.bg-primary-soft {
    background: #e0e7ff;
    color: #4f46e5;
  }

  &.bg-secondary-soft {
    background: #fce7f3;
    color: #db2777;
  }

  &.bg-deep-purple-soft {
    background: #ede7f6;
    color: #5e35b1;
  }

  &.bg-indigo-soft {
    background: #e8eaf6;
    color: #3949ab;
  }

  &.bg-pink-soft {
    background: #fce4ec;
    color: #c2185b;
  }

  &.bg-orange-soft {
    background: #fff3e0;
    color: #ef6c00;
  }

  &.bg-grey-2 {
    background: #eeeeee;
    color: #757575;
  }
}

.denom-count {
  font-size: 0.9rem;
  color: #475569;
}

.denom-amount {
  font-weight: 600;
  color: #1e293b;

  &.text-grey-4 {
    color: #bdbdbd;
  }
}

.section-total {
  padding-top: 8px;
  margin-top: 4px;
  border-top: 1px dashed #cbd5e1;
  font-size: 0.95rem;
}

.grand-total {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;

  .grand-total-amount {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1e293b;
  }
}

.footer {
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
  color: #94a3b8;
}

// Responsive
@media (max-width: 360px) {
  .total-amount {
    font-size: 1.8rem;
  }

  .stat-number {
    font-size: 1.2rem;
  }

  .denom-badge {
    min-width: 50px;
    font-size: 0.8rem;
  }

  .grand-total-amount {
    font-size: 1.1rem;
  }
}
</style>
