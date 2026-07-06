<template>
  <q-card class="widget-card" flat bordered>
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div>
          <div class="text-h6 text-weight-bold text-dark row items-center">
            <q-icon name="event" class="q-mr-sm text-orange-8" size="24px" />
            Upcoming Holidays
          </div>
          <div class="text-caption text-grey-6 q-mt-xs">
            Holidays for <span class="text-weight-bold text-orange-8">{{ currentMonthName }} {{ currentYear }}</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <!-- Scrollable Holiday List -->
    <q-card-section class="col q-pt-sm q-pb-md">
      <div v-if="loading" class="q-gutter-sm">
        <q-card v-for="n in 3" :key="n" flat class="q-pa-md bg-grey-1" style="border-radius: 12px;">
          <q-skeleton type="text" width="60%" height="16px" />
          <q-skeleton type="text" width="40%" height="12px" class="q-mt-xs" />
        </q-card>
      </div>
      <div v-else-if="holidaysList.length === 0" class="flex flex-center column" style="height: 250px;">
        <q-icon name="upcoming" size="64px" color="grey-4" />
        <div class="text-subtitle1 text-weight-bold text-grey-6 q-mt-md">No holidays this month</div>
        <div class="text-caption text-grey-5">Everything is regular operational days</div>
      </div>
      <div v-else class="vertical-scroll-container">
        <div 
          v-for="(holiday, index) in holidaysList" 
          :key="index" 
          class="metric-list-item row items-center justify-between q-pa-sm q-mb-sm"
          :class="getHolidayClass(holiday.type)"
        >
          <div class="row items-center col-grow">
            <div class="list-icon-wrapper q-mr-md" :class="getIconBgClass(holiday.type)">
              <q-icon name="celebration" size="18px" />
            </div>
            <div>
              <div class="text-subtitle2 text-weight-bold text-grey-8 ellipsis" style="max-width: 200px">
                {{ holiday.name }}
              </div>
              <div class="text-caption text-grey-5">
                {{ formatHolidayDate(holiday.date) }} • {{ getDayOfWeek(holiday.date) }}
              </div>
            </div>
          </div>
          <div class="row items-center q-pr-sm">
            <q-badge rounded :color="getBadgeColor(holiday.type)" :text-color="getBadgeTextColor(holiday.type)" class="text-weight-bold">
              {{ holiday.type }}
            </q-badge>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useHolidaysStore } from "src/stores/holidays";
import { computed, onMounted, ref } from "vue";

const holidaysStore = useHolidaysStore();
const loading = ref(true);
const holidaysList = ref([]);

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;

const currentMonthName = computed(() => {
  return today.toLocaleString("en-US", { month: "long" });
});

onMounted(async () => {
  await fetchHolidays();
});

const fetchHolidays = async () => {
  loading.value = true;
  try {
    await holidaysStore.fetchHolidays({ year: currentYear, month: currentMonth });
    holidaysList.value = holidaysStore.holidays || [];
  } catch (error) {
    /* console.log(error); */
  } finally {
    loading.value = false;
  }
};

const formatHolidayDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const getDayOfWeek = (dateStr) => {
  const dateObj = new Date(dateStr);
  return dateObj.toLocaleDateString("en-US", { weekday: "long" });
};

const getHolidayClass = (type) => {
  return type === "Regular Holiday" ? "regular-item" : "special-item";
};

const getIconBgClass = (type) => {
  return type === "Regular Holiday" ? "bg-red-1 text-red-8" : "bg-amber-1 text-amber-8";
};

const getBadgeColor = (type) => {
  return type === "Regular Holiday" ? "red-1" : "amber-1";
};

const getBadgeTextColor = (type) => {
  return type === "Regular Holiday" ? "red-9" : "amber-9";
};
</script>

<style lang="scss" scoped>
.widget-card {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
  height: 400px;
  display: flex;
  flex-direction: column;
}

.vertical-scroll-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 4px;
  height: 290px;
  
  /* Styling custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
    &:hover {
      background: #94a3b8;
    }
  }
}

.metric-list-item {
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;

  .list-icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &.regular-item {
    border-left: 4px solid #c62828;
  }

  &.special-item {
    border-left: 4px solid #f9a825;
  }

  .bg-red-1 {
    background: #ffebee;
  }

  .bg-amber-1 {
    background: #fffde7;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    border-color: rgba(226, 232, 240, 1);
    background: #fafafa;
  }
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
