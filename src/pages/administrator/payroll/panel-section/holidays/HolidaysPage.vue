<template>
  <q-page class="q-pa-md holidays-page-container" flat>
    <div class="q-mb-md">
      <HolidayButton
        :year="currentYear"
        :month="currentMonth"
        @click="openCreateDialog()"
      />
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card flat class="calendar-card">
          <q-card-section>
            <q-date
              v-model="selectedDate"
              v-model:year-month="currentYearMonth"
              minimal
              flat
              class="full-width"
              :dark="$q.dark.isActive"
              :text-color="$q.dark.isActive ? 'white' : 'dark'"
              @navigation="onCalendarNav"
              :events="events"
              :event-color="getEventColor"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-scroll-area style="height: 320px" class="q-pa-sm">
          <!-- Skeletal Loading State -->
          <div v-if="isLoading" class="q-gutter-sm">
            <q-card v-for="n in 3" :key="n" flat class="q-pa-md" style="border-radius: 8px; border-left: 5px solid #e2e8f0; background-color: #ffffff;">
              <div class="row items-center justify-between no-wrap">
                <div style="flex: 1">
                  <q-skeleton type="text" width="60%" height="20px" />
                  <q-skeleton type="text" width="45%" height="12px" class="q-mt-sm" />
                </div>
                <q-skeleton type="rect" width="32px" height="32px" style="border-radius: 50%;" />
              </div>
            </q-card>
          </div>
          <q-list v-else>
            <div
              v-if="holidaysData.length === 0"
              class="flex flex-center column q-pa-md"
              style="min-height: 250px"
            >
              <q-icon
                name="sentiment_very_dissatisfied"
                color="grey-5"
                size="80px"
                class="q-mb-sm"
              />
              <div class="text-h6 text-grey-7 q-mb-xs">
                No holidays for this month
              </div>
              <div class="text-subtitle2 text-grey-6 text-center">
                It looks like there are no holidays recorded for
                <br />
                {{ getMonthName(currentMonth) }} {{ currentYear }}.
                <br />
                You can try Browse other months or add a new holiday!
              </div>
              <q-btn
                label="Add New Holiday"
                color="primary"
                flat
                icon="add_circle_outline"
                class="q-mt-md"
                @click="openCreateDialog()"
              />
            </div>

            <q-card
              v-for="holiday in holidaysData"
              :key="holiday.id"
              :class="getHolidayClass(holiday.type)"
              class="q-mb-sm holiday-card"
              flat
            >
              <div class="text-grey-7 q-mx-sm" align="right">
                <q-btn icon="more_horiz" round flat dense>
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section
                          @click="openEditDialog(holiday)"
                          align="center"
                        >
                          Edit
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section
                          @click="openDeleteDialog(holiday)"
                          align="center"
                        >
                          Delete
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <q-item class="q-py-md items-center">
                <q-item-section side class="type-section">
                  <div class="text-weight-light">
                    {{ holiday.type }}
                  </div>
                </q-item-section>
                <q-separator vertical class="holiday-separator" />
                <q-item-section class="q-ml-md">
                  <q-item-label
                    class="text-grey-7 text-weight-bold date-info"
                    >{{ holiday.monthYear }}</q-item-label
                  >
                  <q-item-label caption class="day-of-week">{{
                    holiday.dayOfWeek
                  }}</q-item-label>
                </q-item-section>

                <q-separator vertical class="holiday-separator" />

                <q-item-section class="q-ml-sm">
                  <q-item-label
                    class="text-blue-grey-7 text-weight-bold date-name"
                  >
                    {{ holiday.name }}
                  </q-item-label>
                  <q-item-label caption class="text-grey-6 q-mt-xs">
                    <span v-if="holiday.scope === 'custom'">
                      <span v-if="holiday.branches && holiday.branches.length > 0">
                        <q-icon name="store" size="14px" class="q-mr-xs" />
                        Branches: {{ holiday.branches.map(b => b.name).join(', ') }}
                        <br v-if="holiday.warehouses && holiday.warehouses.length > 0" />
                      </span>
                      <span v-if="holiday.warehouses && holiday.warehouses.length > 0">
                        <q-icon name="warehouse" size="14px" class="q-mr-xs" />
                        Warehouses: {{ holiday.warehouses.map(w => w.name).join(', ') }}
                      </span>
                    </span>
                    <span v-else>
                      <q-icon name="public" size="14px" class="q-mr-xs" />
                      Nationwide
                    </span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
    <div>
      <HolidaysDialog
        ref="holidayDialogRef"
        :edit-mode="isEditMode"
        :holiday-to-edit="currentHoliday"
        :current-year="currentYear"
        :current-month="currentMonth"
        @refreshHolidays="fetchHolidays(currentYear, currentMonth)"
      />
      <DeleteHolidayDialog
        ref="deleteDialogRef"
        @refreshHolidays="fetchHolidays(currentYear, currentMonth)"
      />
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useHolidaysStore } from "src/stores/holidays";
import HolidaysDialog from "./HolidaysDialog.vue"; // Ensure this path is correct
import HolidayButton from "src/components/buttons/HolidayButton.vue"; // Ensure this path is correct

import DeleteHolidayDialog from "./HolidayDeleteDialog.vue";

const holidaysStore = useHolidaysStore();
const holidaysData = ref([]);
const isEditMode = ref(false);
const currentHoliday = ref(null);
const holidayDialogRef = ref(null);
const deleteDialogRef = ref(null);
const isLoading = ref(true);
const selectedDate = ref(new Date().toISOString().substr(0, 10));

const events = ref([]);

const today = new Date();
const currentYearMonth = ref(
  `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}`
);

const currentYear = computed(() => {
  if (!currentYearMonth.value) return new Date().getFullYear();
  return parseInt(currentYearMonth.value.split("/")[0], 10);
});

const currentMonth = computed(() => {
  if (!currentYearMonth.value) return new Date().getMonth() + 1;
  return parseInt(currentYearMonth.value.split("/")[1], 10);
});

const fetchHolidays = async (year, month) => {
  isLoading.value = true;
  try {
    await holidaysStore.fetchHolidays({ year, month });
    const holidays = holidaysStore.holidays.map((holiday) => {
      const date = new Date(holiday.date);

      if (isNaN(date.getTime())) {
        console.warn(
          `Invalid date encountered for holiday ID ${holiday.id}: ${holiday.date}`
        );
        return {
          ...holiday,
          date: holiday.date,
          monthYear: "Invalid Date",
          dayOfWeek: "Invalid Day",
        };
      }

      const formattedDate = date.toISOString().split("T")[0];
      const monthYear = date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });

      return {
        ...holiday,
        date: formattedDate,
        day: String(date.getDate()),
        monthYear,
        dayOfWeek,
      };
    });
    holidaysData.value = holidays;
    // Quasar events prop always uses YYYY/MM/DD format internally
    events.value = holidaysData.value.map((h) => h.date.replaceAll("-", "/"));
  } catch (error) {
    console.error("Error fetching holidays:", error);
  } finally {
    isLoading.value = false;
  }
};

const onCalendarNav = ({ year, month }) => {
  const formattedMonth = String(month).padStart(2, "0");
  currentYearMonth.value = `${year}/${formattedMonth}`;
  fetchHolidays(year, month); // Pass numbers directly
};

onMounted(() => {
  const [year, month] = currentYearMonth.value.split("/");
  fetchHolidays(parseInt(year), parseInt(month));
});

const openCreateDialog = () => {
  isEditMode.value = false;
  currentHoliday.value = null;
  holidayDialogRef.value.openDialog();
};

const openEditDialog = (holiday) => {
  isEditMode.value = true;
  currentHoliday.value = { ...holiday };
  holidayDialogRef.value.openDialog();
};

const openDeleteDialog = (holiday) => {
  deleteDialogRef.value.openDialog(holiday);
};

// Returns the class for the holiday cards on the right
const getHolidayClass = (type) => {
  return type === "Regular Holiday"
    ? "holiday--regular-card"
    : type === "Special (Non-Working) Holiday"
    ? "holiday--special-card"
    : "";
};

// Returns the class for the calendar day itself
// const getDayStyle = (dateStr) => {
//   // console.log('Checking dateStr:', dateStr); // Debugging
//   const holiday = holidaysData.value.find((h) => h.date === dateStr);
//   // if (holiday) { console.log('Found holiday for', dateStr, ':', holiday.name); } // Debugging
//   if (!holiday) return "";
//   return holiday.type === "Regular Holiday"
//     ? "holiday--regular-day"
//     : holiday.type === "Special (Non-Working) Holiday"
//     ? "holiday--special-day"
//     : "";
// };


const getEventColor = (dateStr) => {
  // dateStr from q-date is always YYYY/MM/DD
  if (!holidaysData.value) return "primary";
  const normalized = dateStr.replaceAll("/", "-");
  const holiday = holidaysData.value.find((h) => h && h.date === normalized);
  if (!holiday) return "primary";
  return holiday.type === "Regular Holiday" ? "red" : "orange";
};

const getDayHolidayType = (scope) => {
  if (!holidaysData.value || !scope) return null;
  const dateStr = `${scope.year}-${String(scope.month).padStart(2, '0')}-${String(scope.day).padStart(2, '0')}`;
  const holiday = holidaysData.value.find((h) => h && h.date === dateStr);
  return holiday ? holiday.type : null;
};

// Helper function to get month name for the "No Holidays" message
const getMonthName = (monthNumber) => {
  const date = new Date(currentYear.value, monthNumber - 1, 1);
  return date.toLocaleString("en-US", { month: "long" });
};
</script>

<style lang="scss">
/* --- Global Styles & Resets (Keep as is, or adjust if needed) --- */
/* Your .q-page class background-color: #f7f9fc; is defined in the template, which is fine. */

/* --- Calendar Card Container Styles --- */
.calendar-card {
  background-color: #e6f4ea; // Light green background for the calendar card itself
  border-radius: 20px;
  max-width: 500px; // Optional: Set a max-width if you don't want it to get too wide on very large screens
  margin: 0 auto; // Center the card if it's less than 100% width
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); // Add a subtle shadow for depth

  /* Styles for the q-date component living inside the calendar-card */
  .q-date__header,
  .q-date__navigation,
  .q-date__view {
    background-color: #e6f4ea; // Ensures q-date parts match the card background
  }

  /* --- Quasar's Default q-date day highlights --- */

  // Style for the 'today' marker
  .q-date__today {
    background-color: rgba(
      76,
      175,
      80,
      0.3
    ) !important; // Use !important to ensure override
    border-radius: 50%;
    color: inherit;
  }

  // Style for the 'selected' day marker
  .q-date__calendar-item--selected .q-date__day {
    background: #4caf50 !important; // Use !important to ensure override
    color: white !important;
    border-radius: 50%;
    font-weight: bold;
  }

  // Style the event indicators as round dots under numbers
  .q-date__event {
    width: 6px !important;
    height: 6px !important;
    border-radius: 50% !important;
    bottom: 1px !important;
    display: inline-block !important;
  }
}

/* --- Holiday List Card Item Styles (individual holiday cards inside q-list) --- */
.holiday-card {
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  color: #333; // Default text color for holiday cards
  // Reduced top/bottom margin for more vertical space
  margin-bottom: 6px; // Reduced from q-mb-sm (8px) to 6px, or even 4px if needed
  padding: 0px; // Remove padding from the q-card itself
  border-radius: 8px; // Keep border-radius

  // Specific colors for Regular Holiday Cards
  &.holiday--regular-card {
    background-color: #e9dff9; /* Light purple, matching the image */
    border-left: 5px solid #9c27b0; /* Darker purple line */
  }

  // Specific colors for Special Holiday Cards
  &.holiday--special-card {
    background-color: #ffe0b2; /* Light orange, matching the image */
    border-left: 5px solid #ff9800; /* Darker orange line */
  }

  // Styles for the q-item *inside* the holiday card
  .q-item {
    padding: 8px 16px; // Reduced vertical padding (q-py-md was 16px, now 8px)
    min-height: unset; // Remove default min-height if it's too tall
  }

  // Reduce vertical padding in item sections
  .q-item__section {
    padding-top: 4px;
    padding-bottom: 4px;
  }
}

/* --- CALENDAR DAY HIGHLIGHTING (MAIN FOCUS) --- */

/* Base style for all highlighted holiday days on the calendar */
.q-date__day.flex.flex-center {
  &.holiday--regular-day,
  &.holiday--special-day {
    border-radius: 50%; /* Make it a circle */
    position: relative;
    overflow: hidden; /* Ensures content stays within the circle */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px; /* Adjust based on your q-date day size if needed */
    height: 36px; /* Adjust based on your q-date day size if needed */
    // Ensure the day number text is visible over the background
    .q-date__day-content {
      position: relative; // Needed for z-index
      z-index: 2; // Above the background
    }
  }

  // Apply specific background colors to Regular Holiday dates
  &.holiday--regular-day {
    position: relative;
  }

  // Apply specific background colors to Special Holiday dates
  &.holiday--special-day {
    position: relative;
  }
}

.calendar-holiday-dot {
  width: 8px;
  height: 3px;
  border-radius: 2px;
  display: inline-block;
}

.regular-dot {
  background-color: #e11d48 !important; /* Red */
}

.special-dot {
  background-color: #d97706 !important; /* Amber/Orange */
}

/* --- Interaction Overrides for Holiday Days --- */

// If a holiday day is 'today', apply a border to indicate it's today, but keep holiday background
.q-date__calendar-item--today .q-date__day {
  &.holiday--regular-day,
  &.holiday--special-day {
    border: 2px solid #5a5a5a !important; /* A subtle dark border for 'today' */
    background-color: inherit; // Use the holiday background from the class above
    color: inherit; // Use the holiday text color from the class above
  }
  // Ensure default today background is transparent if not a holiday
  &:not(.holiday--regular-day):not(.holiday--special-day) {
    background-color: rgba(
      76,
      175,
      80,
      0.3
    ) !important; // Apply default 'today' highlight if not a holiday
    border: none !important;
  }
}

// If a holiday day is 'selected', apply the selected style, but consider holiday background
.q-date__calendar-item--selected .q-date__day {
  &.holiday--regular-day,
  &.holiday--special-day {
    background-color: #4caf50 !important; // Override with selected color
    color: white !important; // Text for selected color
    border: none !important;
  }
  // Ensure default selected background is applied if not a holiday
  &:not(.holiday--regular-day):not(.holiday--special-day) {
    background-color: #4caf50 !important; // Apply default selected highlight if not a holiday
    color: white !important;
    border: none !important;
  }
}

/* --- Holiday Card Content Specific Styles (Adjusted for density) --- */
.type-section {
  min-width: 80px; // Slightly reduced min-width if space is tight
  text-align: left;
  padding-left: 10px; // Reduced left padding
  padding-right: 5px; // Added a small right padding
  .text-weight-light {
    font-size: 0.8em; // Slightly smaller font size
    opacity: 0.9;
    white-space: nowrap;
    text-transform: uppercase;
  }
}

/* Regular Holidays */
.holiday--regular-day {
  /* Use !important to override Quasar's default day styling */
  background-color: #ffebee !important; /* Light Red/Pink */
  color: #c62828 !important; /* Dark Red text */
  font-weight: bold;
  border-radius: 5px;
}

/* Special Holidays */
.holiday--special-day {
  background-color: #fffde7 !important; /* Light Yellow/Amber */
  color: #f9a825 !important; /* Dark Amber text */
  font-weight: bold;
  border-radius: 5px;
}

/* Ensure the selected day retains its style but looks 'active' */
.q-date__day--active.holiday--regular-day {
  background-color: #c62828 !important;
  color: #fff !important;
}

.q-date__day--active.holiday--special-day {
  background-color: #f9a825 !important;
  color: #000 !important;
}

/* --- Card List Styles (for consistency) --- */

.holiday--regular-card {
  border-left: 5px solid #c62828; /* Red left border */
  background-color: #f7f9fc;
  
  .type-section {
    color: #c62828;
    font-weight: bold;
  }
}

.holiday--special-card {
  border-left: 5px solid #f9a825; /* Amber left border */
  background-color: #f7f9fc;
  
  .type-section {
    color: #ef6c00;
    font-weight: bold;
  }
}

.holiday-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02);
}

.holiday-separator {
  background-color: rgba(0, 0, 0, 0.12);
  margin: 0 5px; // Reduced horizontal margin
}

.date-info {
  font-size: 1em; // Slightly smaller font size
  font-weight: bold;
  line-height: 1.2; // Adjusted line height
}

.day-of-week {
  font-size: 0.75em; // Slightly smaller font size
  opacity: 0.9;
}

.date-name {
  font-size: 1em; // Slightly smaller font size
  white-space: normal;
  line-height: 1.2; // Adjusted line height
  font-weight: bold;
}

// Scoped dark mode overrides for the calendar days and list cards
body.body--dark {
  .holiday--regular-day {
    background-color: rgba(239, 68, 68, 0.2) !important;
    color: #f87171 !important;
    border: 1px solid rgba(239, 68, 68, 0.3) !important;
  }
  
  .holiday--special-day {
    background-color: rgba(245, 158, 11, 0.2) !important;
    color: #fbbf24 !important;
    border: 1px solid rgba(245, 158, 11, 0.3) !important;
  }

  .holiday--regular-card {
    border-left-color: #ef4444 !important;
    .type-section {
      color: #f87171 !important;
    }
    .date-name {
      color: #cbd5e1 !important;
    }
  }

  .holiday--special-card {
    border-left-color: #f59e0b !important;
    .type-section {
      color: #fbbf24 !important;
    }
    .date-name {
      color: #cbd5e1 !important;
    }
  }

  .holiday-separator {
    background-color: rgba(255, 255, 255, 0.15) !important;
  }
}
</style>
