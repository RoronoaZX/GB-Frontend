<template>
  <div class="profitability-leaderboard-container q-mb-md">
    <!-- Premium Header with Category Filter -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h6 text-weight-bold text-grey-9 row items-center">
          <q-icon name="insights" color="primary" class="q-mr-sm" size="sm" />
          Product Profitability Leaderboard
        </div>
        <div class="text-caption text-grey-6">
          Identifies your highest-margin heroes and low-margin items needing attention
        </div>
      </div>
      <div class="filter-wrapper">
        <q-select
          v-model="selectedCategory"
          :options="categoryOptions"
          dense
          outlined
          emit-value
          map-options
          bg-color="white"
          label="Filter Category"
          class="category-select"
          style="min-width: 180px;"
        >
          <template v-slot:prepend>
            <q-icon name="filter_list" color="grey-6" size="xs" />
          </template>
        </q-select>
      </div>
    </div>

    <!-- Leaderboards Grid -->
    <div class="row q-col-gutter-md">
      <!-- Top 5 Most Profitable -->
      <div class="col-12 col-md-6">
        <q-card flat bordered class="leaderboard-card top-leaders-card">
          <q-card-section class="row items-center q-pb-md header-border-positive">
            <q-avatar color="positive-transparent" text-color="positive" size="md" class="q-mr-md">
              <q-icon name="emoji_events" size="sm" />
            </q-avatar>
            <div>
              <div class="text-subtitle1 text-weight-bold text-positive">Top 5 Most Profitable</div>
              <div class="text-caption text-grey-6">Highest margin products</div>
            </div>
            <q-space />
            <q-chip outline color="positive" size="sm" class="text-weight-bold">
              HEROES
            </q-chip>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <q-list separator class="leaderboard-list" v-if="topFive.length > 0">
              <q-item v-for="(item, index) in topFive" :key="item.id" class="q-py-md item-hover-positive">
                <q-item-section avatar class="min-width-auto q-pr-md">
                  <div class="rank-badge rank-top" :class="'rank-' + (index + 1)">
                    {{ index + 1 }}
                  </div>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-bold text-dark text-capitalize">
                    {{ item.name }}
                  </q-item-label>
                  <q-item-label caption class="row items-center text-grey-6">
                    <q-chip size="xs" dense outline :color="getCategoryColor(item.category)" class="text-weight-bold q-mr-xs">
                      {{ item.category }}
                    </q-chip>
                    <span class="text-caption text-grey-5">• Price: ₱{{ Number(item.price).toFixed(2) }}</span>
                  </q-item-label>
                </q-item-section>

                <q-item-section side class="items-end">
                  <div class="text-weight-bolder text-positive text-h6 q-ma-none">
                    {{ Math.round(item.margin) }}%
                  </div>
                  <div style="width: 80px" class="q-mt-xs">
                    <q-linear-progress
                      :value="Math.max(0, item.margin) / 100"
                      color="positive"
                      size="6px"
                      rounded
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>

            <div v-else class="empty-leaderboard flex flex-center column q-pa-xl text-grey-5 animate-pulse-warning">
              <q-icon name="analytics" size="4em" class="q-mb-md" style="color: #cbd5e1" />
              <div class="text-weight-bold text-dark text-subtitle1">No Product Sales Mapped</div>
              <div class="text-caption text-center q-mt-xs" style="max-width: 280px">
                Adjust the date filters at the top of the page to load historical sales margins for this branch.
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Bottom 5 Least Profitable -->
      <div class="col-12 col-md-6">
        <q-card flat bordered class="leaderboard-card bottom-underperformers-card">
          <q-card-section class="row items-center q-pb-md header-border-negative">
            <q-avatar color="negative-transparent" text-color="negative" size="md" class="q-mr-md">
              <q-icon name="trending_down" size="sm" />
            </q-avatar>
            <div>
              <div class="text-subtitle1 text-weight-bold text-negative">Bottom 5 Least Profitable</div>
              <div class="text-caption text-grey-6">Lowest margin products</div>
            </div>
            <q-space />
            <q-chip outline color="negative" size="sm" class="text-weight-bold">
              CRITICAL
            </q-chip>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <q-list separator class="leaderboard-list" v-if="bottomFive.length > 0">
              <q-item v-for="(item, index) in bottomFive" :key="item.id" class="q-py-md item-hover-negative">
                <q-item-section avatar class="min-width-auto q-pr-md">
                  <div class="rank-badge rank-bottom" :class="'rank-' + (index + 1)">
                    {{ index + 1 }}
                  </div>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-bold text-dark text-capitalize">
                    {{ item.name }}
                  </q-item-label>
                  <q-item-label caption class="row items-center text-grey-6">
                    <q-chip size="xs" dense outline :color="getCategoryColor(item.category)" class="text-weight-bold q-mr-xs">
                      {{ item.category }}
                    </q-chip>
                    <span class="text-caption text-grey-5">• Price: ₱{{ Number(item.price).toFixed(2) }}</span>
                  </q-item-label>
                </q-item-section>

                <q-item-section side class="items-end">
                  <div
                    class="text-weight-bolder text-h6 q-ma-none"
                    :class="item.margin < 20 ? 'text-negative animate-pulse-warning' : 'text-warning'"
                  >
                    {{ Math.round(item.margin) }}%
                  </div>
                  <div style="width: 80px" class="q-mt-xs">
                    <q-linear-progress
                      :value="Math.max(0, item.margin) / 100"
                      :color="item.margin < 20 ? 'negative' : 'warning'"
                      size="6px"
                      rounded
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>

            <div v-else class="empty-leaderboard flex flex-center column q-pa-xl text-grey-5 animate-pulse-warning">
              <q-icon name="analytics" size="4em" class="q-mb-md" style="color: #cbd5e1" />
              <div class="text-weight-bold text-dark text-subtitle1">No Product Sales Mapped</div>
              <div class="text-caption text-center q-mt-xs" style="max-width: 280px">
                Adjust the date filters at the top of the page to load historical sales margins for this branch.
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  profitMargins: {
    type: Array,
    required: true,
    default: () => []
  }
});

const selectedCategory = ref("All");
const categoryOptions = ["All", "Bread", "Selecta", "Nestle", "Softdrinks", "Others"];

// Filter margins to exclude 0 production/sales and filter by category
const filteredMargins = computed(() => {
  let list = props.profitMargins.filter(
    (item) => item.production > 0 || item.total_sales_amount > 0
  );
  if (selectedCategory.value !== "All") {
    list = list.filter((item) => item.category === selectedCategory.value);
  }
  return list;
});

// Sort Descending (Highest Margin first)
const topFive = computed(() => {
  return [...filteredMargins.value]
    .sort((a, b) => b.margin - a.margin)
    .slice(0, 5);
});

// Sort Ascending (Lowest Margin first)
const bottomFive = computed(() => {
  return [...filteredMargins.value]
    .sort((a, b) => a.margin - b.margin)
    .slice(0, 5);
});

const getCategoryColor = (category) => {
  const map = {
    Bread: "brown",
    Selecta: "blue",
    Nestle: "orange",
    Softdrinks: "red",
    Others: "grey-7",
  };
  return map[category] || "primary";
};
</script>

<style scoped lang="scss">
.profitability-leaderboard-container {
  font-family: inherit;
}

.leaderboard-card {
  border-radius: 16px;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  border: 1px solid #e2e8f0;
  overflow: hidden;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
}

.header-border-positive {
  border-bottom: 2px solid #f0fdf4;
}

.header-border-negative {
  border-bottom: 2px solid #fef2f2;
}

.positive-transparent {
  background-color: rgba(34, 197, 94, 0.12);
}

.negative-transparent {
  background-color: rgba(239, 68, 68, 0.12);
}

.min-width-auto {
  min-width: unset;
}

.rank-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-weight: 800;
  font-size: 0.85rem;
}

.rank-top {
  background-color: #f1f5f9;
  color: #475569;

  &.rank-1 {
    background-color: #fef3c7;
    color: #d97706;
    border: 1px solid #fde68a;
  }
  &.rank-2 {
    background-color: #e2e8f0;
    color: #475569;
    border: 1px solid #cbd5e1;
  }
  &.rank-3 {
    background-color: #ffedd5;
    color: #ea580c;
    border: 1px solid #fed7aa;
  }
}

.rank-bottom {
  background-color: #f1f5f9;
  color: #475569;

  &.rank-1 {
    background-color: #fee2e2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }
  &.rank-2 {
    background-color: #ffedd5;
    color: #ea580c;
    border: 1px solid #fed7aa;
  }
  &.rank-3 {
    background-color: #fef3c7;
    color: #d97706;
    border: 1px solid #fde68a;
  }
}

.item-hover-positive {
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f0fdf4 !important;
  }
}

.item-hover-negative {
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #fef2f2 !important;
  }
}

.category-select {
  :deep(.q-field__control) {
    border-radius: 10px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
    &:before {
      border: none;
    }
    &:hover {
      border-color: #cbd5e1;
    }
  }
}

.empty-leaderboard {
  min-height: 250px;
}

@keyframes pulse-warning {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse-warning {
  animation: pulse-warning 2s infinite ease-in-out;
}
</style>
