<template>
  <q-page class="q-pa-md" style="background-color: #f7f9fc">
    <div class="q-mb-md">
      <HolidayButton
        :year="currentYear"
        :month="currentMonth"
        @click="openCreateDialog()"
      />
    </div>
    <div class="row justify-between">
      <div class="col-6 col-md-4">
        <q-card flat class="calendar-card">
          <q-card-section>
            <q-date
              v-model="selectedDate"
              v-model:year-month="currentYearMonth"
              minimal
              flat
              class="full-width"
              text-color="dark"
              @navigation="onCalendarNav"
            >
              <template #day="{ scope }">
                <div
                  class="q-date__day flex flex-center"
                  :class="
                    getDayStyle(
                      `${scope.year}-${String(scope.month).padStart(
                        2,
                        '0'
                      )}-${String(scope.day).padStart(2, '0')}`
                    )
                  "
                >
                  {{ scope.day }}
                </div>
              </template>
            </q-date>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-md-6">
        <q-scroll-area style="height: 320px">
          <q-list>
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
const selectedDate = ref(new Date().toISOString().substr(0, 10));

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
  // Pass only year and month as numbers, not formatted string
  await holidaysStore.fetchHolidays({ year, month });
  const rawHolidays = holidaysStore.holidays;

  const processedHolidays = rawHolidays.map((holiday) => {
    // Assuming holiday.date from your backend/store is a valid date string (e.g., "2025-04-01")
    const dateObj = new Date(holiday.date + "T00:00:00");

    if (isNaN(dateObj.getTime())) {
      console.warn(
        `Invalid date encountered for holiday ID ${holiday.id}: ${holiday.date}`
      );
      return {
        ...holiday,
        monthYear: "Invalid Date",
        dayOfWeek: "Invalid Day",
        // Crucial: Ensure 'date' property is a valid YYYY-MM-DD string for getDayStyle lookup
        date: holiday.date, // If your backend already provides YYYY-MM-DD, just use it
      };
    }

    const monthName = dateObj.toLocaleString("en-US", { month: "long" });
    const dayNum = dateObj.getDate();
    const yearNum = dateObj.getFullYear();
    const monthYearFormatted = `${monthName} ${dayNum}, ${yearNum}`;
    const dayOfWeekFormatted = dateObj.toLocaleString("en-US", {
      weekday: "long",
    });

    // THIS IS THE MOST IMPORTANT PART FOR THE CALENDAR HIGHLIGHTING:
    // Ensure the 'date' property is explicitly formatted as YYYY-MM-DD
    // in case your raw holiday object doesn't guarantee it or has a different format.
    const formattedDateForLookup = `${yearNum}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

    return {
      ...holiday, // Spread existing holiday properties
      date: formattedDateForLookup, // OVERWRITE or set the date in YYYY-MM-DD for lookup
      day: String(dayNum), // For card display (optional, if not already in raw holiday)
      monthYear: monthYearFormatted, // For card display
      dayOfWeek: dayOfWeekFormatted, // For card display
    };
  });
  holidaysData.value = processedHolidays;
  // console.log('Holidays data after fetch and processing:', holidaysData.value); // Debugging
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
const getDayStyle = (dateStr) => {
  // console.log('Checking dateStr:', dateStr); // Debugging
  const holiday = holidaysData.value.find((h) => h.date === dateStr);
  // if (holiday) { console.log('Found holiday for', dateStr, ':', holiday.name); } // Debugging
  if (!holiday) return "";
  return holiday.type === "Regular Holiday"
    ? "holiday--regular-day"
    : holiday.type === "Special (Non-Working) Holiday"
    ? "holiday--special-day"
    : "";
};
</script>

<style lang="scss">
/* --- Global Styles & Resets (Keep as is, or adjust if needed) --- */
/* Your .q-page class background-color: #f7f9fc; is defined in the template, which is fine. */

/* --- Calendar Card Container Styles --- */
.calendar-card {
  background-color: #e6f4ea; // Light green background for the calendar card itself
  border-radius: 20px;
  width: 500px; /* Adjust as needed */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); // Add a subtle shadow for depth
}

/* Styles for the q-date component living inside the calendar-card */
.calendar-card {
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
    ); // A light green highlight for today
    border-radius: 50%;
    // Ensure default text color for today if it's not a holiday
    color: inherit;
  }

  // Style for the 'selected' day marker
  .q-date__calendar-item--selected .q-date__day {
    background: #4caf50; // Quasar's primary green for selected day
    color: white;
    border-radius: 50%;
    font-weight: bold; // Make selected day bold
  }

  // Hide the default event dot if you're using full background highlights
  .q-date__event {
    display: none !important;
  }
}

/* --- Holiday List Card Styles (on the right side) --- */
.holiday-card {
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  color: #333; // Default text color for holiday cards

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
    background-color: #e9dff9 !important; /* EXACT light purple as the card */
    color: #4a148c !important; /* Darker purple text for contrast */
    font-weight: 600 !important; // Make text slightly bolder
  }

  // Apply specific background colors to Special Holiday dates
  &.holiday--special-day {
    background-color: #ffe0b2 !important; /* EXACT light orange as the card */
    color: #bf360c !important; /* Darker orange text for contrast */
    font-weight: 600 !important; // Make text slightly bolder
  }
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
    border: none !important; // Remove any specific holiday border when selected
  }
  // Ensure default selected background is applied if not a holiday
  &:not(.holiday--regular-day):not(.holiday--special-day) {
    background-color: #4caf50 !important; // Apply default selected highlight if not a holiday
    color: white !important;
    border: none !important;
  }
}

/* --- Holiday Card Content Specific Styles (Optional, for more fine-tuning) --- */
.type-section {
  min-width: 100px;
  text-align: left;
  padding-left: 20px;
  .text-weight-light {
    // Targeting the type text inside the card
    font-size: 0.85em;
    opacity: 0.9;
    white-space: nowrap;
    text-transform: uppercase; // Example: make type uppercase
  }
}

.holiday-separator {
  background-color: rgba(0, 0, 0, 0.12);
  margin: 0 10px;
}

.date-info {
  font-size: 1.1em;
  font-weight: bold; // Make date info bolder
}

.day-of-week {
  font-size: 0.85em;
  opacity: 0.9;
}

.date-name {
  font-size: 1.1em;
  white-space: normal;
  line-height: 1.3;
  font-weight: bold; // Make holiday name bolder
}
</style>

<!-- <style lang="scss">
/*
 * Calendar day highlighting rules are now GLOBAL but highly specific.
 * This ensures they apply to the q-date component without affecting other components.
 */
.q-date__day.holiday--regular-day {
  background: #e1bee7 !important; /* Light purple */
  border-radius: 50% !important;
  color: #4a148c !important; /* Darker purple text */
  font-weight: 500;
}

.q-date__day.holiday--special-day {
  background: #ffccbc !important; /* Light orange */
  border-radius: 50% !important;
  color: #bf360c !important; /* Darker orange text */
  font-weight: 500;
}

/* General page and card styles */
.calendar-card {
  background-color: #e6f4ea;
  border-radius: 20px;
  width: 500px; /* Adjust as needed */

  /* Styles for the calendar living inside this card */
  .q-date__header,
  .q-date__navigation,
  .q-date__view {
    background-color: #e6f4ea;
  }

  .q-date__today {
    background-color: rgba(76, 175, 80, 0.3);
    border-radius: 50%;
  }

  .q-date__calendar-item--selected {
    background: #4caf50;
    color: white;
    border-radius: 50%;
  }
}

/* Styles for the HOLIDAY LIST CARDS */
.holiday-card {
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  color: #333;
}
/* --- Holiday Card Styles (from your existing design) --- */
.holiday--regular-card {
  background-color: #e9dff9; /* Light purple from the image */
  border-left: 5px solid #9c27b0; /* Darker purple line */
  /* Add other styles like padding, border-radius, shadow if present in your cards */
  padding: 10px; /* Example, adjust as needed */
  border-radius: 8px; /* Example, adjust as needed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Example, adjust as needed */
}

.holiday--special-card {
  background-color: #ffe0b2; /* Light orange from the image */
  border-left: 5px solid #ff9800; /* Darker orange line */
  /* Add other styles like padding, border-radius, shadow if present in your cards */
  padding: 10px; /* Example, adjust as needed */
  border-radius: 8px; /* Example, adjust as needed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Example, adjust as needed */
}

/* --- Calendar Day Styles (to match card colors) --- */

/* Base style for holiday days to make them circular and position content */
.q-date__day.flex.flex-center.holiday--regular-day,
.q-date__day.flex.flex-center.holiday--special-day {
  border-radius: 50%; /* Make it a circle */
  position: relative;
  overflow: hidden; /* Ensures content stays within the circle if anything overflows */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; /* Adjust based on your q-date day size */
  height: 36px; /* Adjust based on your q-date day size */
}

/* Apply specific background colors to the calendar days */
.q-date__day.flex.flex-center.holiday--regular-day {
  background-color: #e9dff9 !important; /* Light purple, exactly like the card */
  color: #333; /* Default text color for better readability on light backgrounds */
}

.q-date__day.flex.flex-center.holiday--special-day {
  background-color: #ffe0b2 !important; /* Light orange, exactly like the card */
  color: #333; /* Default text color for better readability on light backgrounds */
}

/* --- Overrides for Quasar's default q-date styling --- */

/* Prevent the default Quasar highlight for the current day or selected day */
/* This is crucial to ensure YOUR holiday color shows through */
.q-date__calendar-item--today .q-date__day {
  background-color: transparent !important; /* Remove default green background for today */
  border: none !important; /* Remove any default border for today */
}

.q-date__calendar-item--selected .q-date__day {
  background-color: transparent !important; /* Remove default blue background for selected day */
  border: none !important; /* Remove any default border for selected day */
}

/* Re-apply the special border/highlight for the 'today' marker *if* it's a holiday,
   or just make sure the holiday background isn't lost.
   You might want a subtle border for today instead of a background. */
.q-date__calendar-item--today .holiday--regular-day,
.q-date__calendar-item--today .holiday--special-day {
  /* Keep the holiday background */
  /* Add a subtle border to indicate it's 'today' */
  border: 2px solid #5a5a5a; /* A subtle dark border for 'today' */
}

/* Make sure the number (scope.day) inside the colored circle is visible */
.q-date__day > div {
  z-index: 2; /* Ensure the day number is above the background color */
}

/* Optional: If q-date adds dots for events, hide them if you rely purely on background color */
.q-date__event {
  display: none !important; /* Hide the default event dot */
}

// /* Styles for the Holiday Cards on the right */
// .holiday--regular-card {
//   background-color: #e9dff9; /* Light purple, matching the image */
//   border-left: 5px solid #9c27b0; /* A darker purple for emphasis */
// }

// .holiday--special-card {
//   background-color: #ffe0b2; /* Light orange, matching the image */
//   border-left: 5px solid #ff9800; /* A darker orange for emphasis */
// }

// /* Styles for the Calendar Days */
// .holiday--regular-day {
//   background-color: #c9e6c9 !important; /* Light green for regular holidays in the calendar */
//   border-radius: 50%; /* Make it a circle */
//   position: relative;
//   z-index: 1; /* Ensure it's above other elements if any */
// }

// .holiday--special-day {
//   background-color: #ffd700 !important; /* Yellow for special holidays in the calendar */
//   border-radius: 50%; /* Make it a circle */
//   position: relative;
//   z-index: 1;
// }

// /* Optional: To make the current day marker visible over the holiday background */
// .q-date__event {
//   background-color: transparent !important; /* Prevents default dot if you want full circle highlight */
// }

// /* Adjust text color for better visibility on colored backgrounds */
// .holiday--regular-day .q-date__day-content,
// .holiday--special-day .q-date__day-content {
//   color: #333; /* Darker text for readability */
// }

// /* If the q-date component puts some other elements, you might need to override them. */
// /* For example, if there's an active/selected state that overrides your background */
// .q-date__calendar-item--selected .holiday--regular-day,
// .q-date__calendar-item--selected .holiday--special-day {
//   background-color: inherit !important; /* Or define a specific selected holiday color */
//   border: 2px solid blue; /* Example: border for selected holiday */
// }

// .holiday--regular-card {
//   background-color: #e1bee7;
// }

// .holiday--special-card {
//   background-color: #ffccbc;
// }

// /* Layout and typography for card content */
// .type-section {
//   min-width: 100px;
//   text-align: left;
//   padding-left: 20px;
//   .q-item-label {
//     font-size: 0.75em;
//     opacity: 0.8;
//     white-space: nowrap;
//   }
// }

// .holiday-separator {
//   background-color: rgba(0, 0, 0, 0.12);
//   margin: 0 10px;
// }

// .date-info {
//   font-size: 1.1em;
// }

// .day-of-week {
//   font-size: 0.85em;
//   opacity: 0.9;
// }

// .date-name {
//   font-size: 1.1em;
//   white-space: normal;
//   line-height: 1.3;
// }
</style> -->
