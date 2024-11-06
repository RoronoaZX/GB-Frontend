<template>
  <div class="row justify-between q-mb-md" align="right">
    <div>
      <OvertimeButton />
    </div>
    <SearchDTR />
  </div>
  <div>
    <q-table
      :rows="dtrRows"
      :columns="dtrColumns"
      row-key="time_in"
      class="sticky-header"
      hide-bottom
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:body-cell-time_in="props">
        <q-td :props="props">
          <template v-if="props.row.time_in">
            <q-badge outline color="positive">
              {{ formatTime(props.row.time_in) }}
            </q-badge>
            <!-- <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Time In
            </q-tooltip>
            <q-pop-edit
              v-model="props.row.time_in"
              auto-save
              @submit="updateTimeIn(props.row)"
              v-slot="scope"
            >
              <q-input
                v-model="props.row.time_in"
                dense
                autofocus
                type="datetime-local"
                @keyup.enter="scope?.set ? scope.set() : null"
              />
            </q-pop-edit> -->
          </template>
          <template v-else>
            <span> - - - </span>
          </template>
        </q-td>
      </template>

      <template v-slot:body-cell-time_out="props">
        <q-td :props="props">
          <template v-if="props.row.time_out">
            <q-badge outline color="purple-12">
              {{ formatTime(props.row.time_out) }}
            </q-badge>
          </template>
          <template v-else>
            <span> - - - </span>
          </template>
        </q-td>
      </template>
      <template v-slot:body-cell-lunch_break_start="props">
        <q-td :props="props">
          <template v-if="props.row.lunch_break_start">
            <q-badge outline color="amber-7">{{
              formatTime(props.row.lunch_break_start)
            }}</q-badge>
          </template>
          <template v-else>
            <span> - - - </span>
          </template>
        </q-td>
      </template>
      <template v-slot:body-cell-lunch_break_end="props">
        <q-td :props="props">
          <template v-if="props.row.lunch_break_end">
            <q-badge outline color="amber-4">{{
              formatTime(props.row.lunch_break_end)
            }}</q-badge>
          </template>
          <template v-else>
            <span> - - - </span>
          </template>
        </q-td>
      </template>
      <template v-slot:body-cell-break_start="props">
        <q-td :props="props">
          <template v-if="props.row.break_start">
            <q-badge outline color="blue-7">{{
              formatTime(props.row.break_start)
            }}</q-badge>
          </template>
          <template v-else>
            <span> - - - </span>
          </template>
        </q-td>
      </template>
      <template v-slot:body-cell-break_end="props">
        <q-td :props="props">
          <template v-if="props.row.break_end">
            <q-badge outline color="blue-4">{{
              formatTime(props.row.break_end)
            }}</q-badge>
          </template>
          <template v-else>
            <span> - - - </span>
          </template>
        </q-td>
      </template>
      <template v-slot:body-cell-break="props">
        <q-td :props="props">
          <template v-if="props.row.break_start && props.row.break_end">
            <q-badge
              outline
              :color="getBreakColor(props.row.break_start, props.row.break_end)"
              class="q-ma-xs"
              size="md"
            >
              <q-icon
                :name="
                  getBreakHoursIcon(props.row.break_start, props.row.break_end)
                "
                size="xs"
                class="q-mr-xs"
              />
              {{
                `${
                  calculateTotalWorkingHours(
                    props.row.break_start,
                    props.row.break_end
                  ).hours
                } Hrs : ${
                  calculateTotalWorkingHours(
                    props.row.break_start,
                    props.row.break_end
                  ).minutes
                } Min`
              }}
            </q-badge>
          </template>
          <template v-else>
            <span> - - - </span>
          </template>
        </q-td>
      </template>
      <template v-slot:body-cell-lunch_break="props">
        <q-td :props="props">
          <template
            v-if="props.row.lunch_break_start && props.row.lunch_break_end"
          >
            <q-badge
              outline
              :color="
                getLunchBreakColor(
                  props.row.lunch_break_start,
                  props.row.lunch_break_end
                )
              "
              class="q-ma-xs"
              size="md"
            >
              <q-icon
                :name="
                  getLunchBreakIcon(
                    props.row.lunch_break_start,
                    props.row.lunch_break_end
                  )
                "
                size="xs"
                class="q-mr-xs"
              />
              {{
                `${
                  calculateTotalWorkingHours(
                    props.row.lunch_break_start,
                    props.row.lunch_break_end
                  ).hours
                } Hrs : ${
                  calculateTotalWorkingHours(
                    props.row.lunch_break_start,
                    props.row.lunch_break_end
                  ).minutes
                } Min`
              }}
            </q-badge>
          </template>
          <template v-else>
            <span> - - - </span>
          </template>
        </q-td>
      </template>
      <template v-slot:body-cell-total_working_hours="props">
        <q-td :props="props">
          <template v-if="props.row.time_in && props.row.time_out">
            <q-badge
              outline
              :color="getWorkHoursColor(props.row.time_in, props.row.time_out)"
              class="q-ma-xs"
              size="md"
            >
              <q-icon
                :name="getWorkHoursIcon(props.row.time_in, props.row.time_out)"
                size="xs"
                class="q-mr-xs"
              />
              {{
                `${
                  calculateTotalWorkingHours(
                    props.row.time_in,
                    props.row.time_out
                  ).hours
                } Hrs : ${
                  calculateTotalWorkingHours(
                    props.row.time_in,
                    props.row.time_out
                  ).minutes
                } Min`
              }}
            </q-badge>
          </template>
          <template v-else>
            <span> - - - </span>
          </template>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <EditDTR :edit="props" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useDTRStore } from "stores/dtr";
import OvertimeButton from "./OvertimeButton.vue";
import SearchDTR from "./SearchDTR.vue";
import EditDTR from "./EditDTR.vue";
import { api } from "src/boot/axios";

const pagination = ref({
  rowsPerPage: 0,
});
const dtrStore = useDTRStore();
// const dtrRows = ref([]);
const dtrRows = computed(() => dtrStore.dtrs);

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    // const data = await dtrStore.fetchDTR();
    // dtrRows.value = Array.isArray(data) ? data : [];
    dtrRows.value = await dtrStore.fetchDTR();
    console.log("dtrsss", dtrRows.value);
  } catch (error) {
    console.log("Error fetching DTR data:", error);
  }
};

const updateTimeIn = async (row) => {
  // try {
  //   const response = await api.put("/api/update-timeIn/" + data.id, {
  //     time_in: val,
  //   });
  //   if (response.status == 200) {
  //     const i = recipes.value.findIndex((item) => item.id == data.id);
  //     recipes.value[i] = val;
  //   }
  //   Notify.create({
  //     type: "positive",
  //     message: "Recipe name edited successfully",
  //     position: "top",
  //   });
  // } catch (error) {
  //   console.error("Error updating recipe name:", error);
  //   Notify.create({
  //     type: "negative",
  //     message: "Failed to edit recipe name",
  //     position: "top",
  //   });
  // }
  console.log("Updated time_in:", row.time_in);
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const formatDate = (dateTime) => {
  if (!dateTime) return " - - "; // Return a placeholder if the value is missing
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) return " - - ";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }); // Format as "Oct. 14, 2024"
};

// Function to format time
const formatTime = (dateTime) => {
  if (!dateTime) return " - - ";
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) return " - - ";

  // Format hours and minutes manually
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours equals 0, set to 12

  return `${hours}:${minutes} ${amPm}`; // e.g., "4:34 PM"
};

const calculateTotalWorkingHours = (timeIn, timeOut) => {
  if (!timeIn || !timeOut) return { hours: 0, minutes: 0 };

  const start = new Date(timeIn);
  const end = new Date(timeOut);

  // Check if the times are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime()))
    return { hours: 0, minutes: 0 };

  const diffInMillis = end - start; // Difference in milliseconds

  // Calculate total hours and minutes
  const totalMinutes = Math.floor(diffInMillis / (1000 * 60)); // Total minutes
  const hours = Math.floor(totalMinutes / 60); // Total hours
  const minutes = totalMinutes % 60; // Remaining minutes

  return { hours, minutes };
};

const calculateTotalOvertimeHours = (timeIn, timeOut) => {
  // Debugging: Log the input values
  console.log("Input timeIn:", timeIn);
  console.log("Input timeOut:", timeOut);

  if (!timeIn || !timeOut) return " - - - ";

  // Parse the input times
  const start = new Date(timeIn);
  const end = new Date(timeOut);

  // Debugging: Log the parsed start and end dates
  console.log("Parsed start date:", start);
  console.log("Parsed end date:", end);

  // Check if the parsed dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.log("Invalid date format detected");
    return " - - - ";
  }

  const diffInMillis = end - start; // Difference in milliseconds

  // Calculate total hours and minutes
  const totalMinutes = Math.floor(diffInMillis / (1000 * 60)); // Total minutes
  const hours = Math.floor(totalMinutes / 60); // Total hours
  const minutes = totalMinutes % 60; // Remaining minutes

  // Debugging: Log the calculated hours and minutes
  console.log("Calculated hours:", hours);
  console.log("Calculated minutes:", minutes);

  return `${hours}h ${minutes}m`;
};

// Function to determine badge color based on total work hours
const getLunchBreakColor = (timeIn, timeOut) => {
  const { hours, minutes } = calculateTotalWorkingHours(timeIn, timeOut);
  if (hours > 1 || minutes > 0) {
    return "green-7"; // Overtime
  } else {
    return "blue-grey-9"; // Short work hours
  }
};

const getLunchBreakIcon = (timeIn, timeOut) => {
  const { hours, minutes } = calculateTotalWorkingHours(timeIn, timeOut);
  if (hours > 1 || minutes > 0) {
    return "check_circle"; // Overtime
  } else {
    return "access_time"; // Short work hours
  }
};

const getBreakColor = (timeIn, timeOut) => {
  const { hours, minutes } = calculateTotalWorkingHours(timeIn, timeOut);
  if (hours > 0 || minutes > 15) {
    return "pink-13"; // Overtime
  } else {
    return "green-7"; // Short work hours
  }
};

// Function to determine the icon to display
const getBreakHoursIcon = (timeIn, timeOut) => {
  const { hours, minutes } = calculateTotalWorkingHours(timeIn, timeOut);
  if (hours > 0 || minutes > 15) {
    return "access_time"; // More than 15 minutes
  } else {
    return "check_circle"; // Less than 15 minutes
  }
};

const getWorkHoursColor = (timeIn, timeOut) => {
  const { hours } = calculateTotalWorkingHours(timeIn, timeOut);
  if (hours > 9 || (hours === 9 && minutes > 0)) {
    return "blue-grey-9"; // Overtime
  } else if (hours >= 8) {
    return "green-7"; // Regular work hours
  } else {
    return "pink-13"; // Short work hours
  }
};

// Function to determine the icon to display
const getWorkHoursIcon = (timeIn, timeOut) => {
  const hours = calculateTotalWorkingHours(timeIn, timeOut);
  if (hours >= 9 || (hours === 9 && minutes > 0)) {
    return "alarm_on"; // Icon for overtime
  } else if (hours >= 8) {
    return "check_circle"; // Icon for regular work hours
  } else {
    return "access_time"; // Icon for short work hours
  }
};

const dtrColumns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => formatFullname(row.employee),
  },
  // {
  //   name: "branch",
  //   required: true,
  //   label: "Branch Designation",
  //   align: "left",
  //   field: (row) =>
  //     row.employee && row.employee.branch ? row.employee.branch.name : "N/A",
  // },
  // {
  //   name: "position",
  //   required: true,
  //   label: "Position",
  //   align: "center",
  //   field: (row) =>
  //     row.employee && row.employee ? row.employee.position : "N/A",
  // },
  {
    name: "date_in",
    required: true,
    label: "Date In",
    align: "center",
    field: "time_in",
    format: (val) => formatDate(val), // Format the date
  },
  {
    name: "date_out",
    required: true,
    label: "Date Out",
    align: "center",
    field: "time_out",
    format: (val) => formatDate(val),
  },
  {
    name: "time_in",
    required: true,
    label: "Time In",
    align: "center",
    field: "time_in",
    // format: (val) => formatTime(val),
  },
  {
    name: "time_out",
    required: true,
    label: "Time Out",
    align: "center",
    field: "time_out",
    format: (val) => formatTime(val),
  },
  {
    name: "lunch_break_start",
    required: true,
    label: "Lunch Break Start",
    align: "center",
    field: "lunch_break_start",
    format: (val) => formatTime(val),
  },
  {
    name: "lunch_break_end",
    required: true,
    label: "Lunch Break End",
    align: "center",
    field: "lunch_break_end",
    format: (val) => formatTime(val),
  },
  {
    name: "break_start",
    required: true,
    label: "Break Start",
    align: "center",
    field: "break_start",
    format: (val) => formatTime(val),
  },
  {
    name: "break_end",
    required: true,
    label: "Break End",
    align: "center",
    field: "break_end",
    format: (val) => formatTime(val),
  },
  {
    name: "break",
    required: true,
    label: "Total Break",
    align: "center",
    field: (row) => {
      const { hours, minutes } = calculateTotalWorkingHours(
        row.break_start,
        row.break_end
      );
      return `${hours}h ${minutes}m`; // Format the output
    },
  },
  {
    name: "lunch_break",
    required: true,
    label: "Total Lunch break",
    align: "center",
    field: (row) => {
      const { hours, minutes } = calculateTotalWorkingHours(
        row.lunch_break_start,
        row.lunch_break_end
      );
      return `${hours}h ${minutes}m`; // Format the output
    },
  },
  {
    name: "total_working_hours",
    required: true,
    label: "Work Hours",
    align: "center",
    field: (row) => {
      const { hours, minutes } = calculateTotalWorkingHours(
        row.time_in,
        row.time_out
      );
      return `${hours}h ${minutes}m`; // Format the output as a string
    },
  },
  {
    name: "overtime_start",
    required: true,
    label: "Overtime Start",
    align: "center",
    field: "overtime_start",
    format: (val) => formatTime(val),
  },
  {
    name: "overtime_end",
    required: true,
    label: "Overtime End",
    align: "center",
    field: "overtime_end",
    format: (val) => formatTime(val),
  },
  {
    name: "total_overtime",
    required: true,
    label: "OT Total Hours",
    align: "center",
    field: (row) => {
      const result = calculateTotalOvertimeHours(
        row.overtime_start,
        row.overtime_end
      );

      // Check if the result is a string (indicating an error message)
      if (typeof result === "string") {
        return result; // Return " - - - " or the error message
      }

      // Destructure hours and minutes if the result is an object
      const { hours, minutes } = result;
      return `${hours}h ${minutes}m`; // Format the output as a string
    },
  },
  {
    name: "action",
    label: "Action",
    align: "center",
  },
];
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 1rem;
  border-radius: 8px;
}

.absolute-full {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-container {
  max-height: 400px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}
</style>
