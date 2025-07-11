<template>
  <div class="row justify-between q-my-md" align="right">
    <div>
      <OvertimeButton />
    </div>
    <q-input
      v-model="filter"
      outlined
      dense
      flat
      label="Search"
      debounce="300"
      style="width: 300px"
    />
  </div>
  <div>
    <q-table
      :rows="dtrRows"
      :columns="dtrColumns"
      row-key="time_in"
      v-model:pagination="pagination"
      :rows-per-page-options="[3, 5, 10, 0]"
      :loading="loading"
      :filter="filter"
      @request="handleRequest"
    >
      <template v-slot:body-cell-position="props">
        <q-td :props="props">
          <q-chip
            outline
            square
            :text-color="
              helpers.getBadgePositionColor(props.row.employee?.position)
            "
            :color="helpers.getBadgePositionColor(props.row.employee?.position)"
            class="q-ma-xs"
            size="sm"
          >
            {{ props.row.employee?.position || "N/A" }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-shift_status="props">
        <q-td :props="props">
          <q-chip
            :label="props.row.shift_status || 'Regular Day'"
            :color="props.row.shift_status === 'half day' ? 'orange' : 'green'"
            text-color="white"
            dense
            square
            class="text-capitalize"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-time_in="props">
        <q-td :props="props">
          <q-badge v-if="props.row.time_in" outline color="positive">
            {{ helpers.formatTime(props.row.time_in) }}
          </q-badge>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-time_out="props">
        <q-td :props="props">
          <q-badge v-if="props.row.time_out" outline color="purple-12">
            {{ helpers.formatTime(props.row.time_out) }}
          </q-badge>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-lunch_break_start="props">
        <q-td :props="props">
          <q-badge v-if="props.row.lunch_break_start" outline color="amber-7">
            {{ helpers.formatTime(props.row.lunch_break_start) }}
          </q-badge>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-lunch_break_end="props">
        <q-td :props="props">
          <q-badge v-if="props.row.lunch_break_end" outline color="amber-4">
            {{ helpers.formatTime(props.row.lunch_break_end) }}
          </q-badge>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-break_start="props">
        <q-td :props="props">
          <q-badge v-if="props.row.break_start" outline color="blue-7">
            {{ helpers.formatTime(props.row.break_start) }}
          </q-badge>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-break_end="props">
        <q-td :props="props">
          <q-badge v-if="props.row.break_end" outline color="blue-4">
            {{ helpers.formatTime(props.row.break_end) }}
          </q-badge>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-break="props">
        <q-td :props="props">
          <template v-if="props.row.break_start && props.row.break_end">
            <q-badge
              outline
              :color="
                helpers.getBreakColor(
                  props.row.break_start,
                  props.row.break_end
                )
              "
              class="q-ma-xs"
              size="md"
            >
              <q-icon
                :name="
                  helpers.getBreakHoursIcon(
                    props.row.break_start,
                    props.row.break_end
                  )
                "
                size="xs"
                class="q-mr-xs"
              />
              {{
                `${
                  helpers.calculateTotalWorkingHours(
                    props.row.break_start,
                    props.row.break_end
                  ).hours
                } Hrs : ${
                  helpers.calculateTotalWorkingHours(
                    props.row.break_start,
                    props.row.break_end
                  ).minutes
                } Min`
              }}
            </q-badge>
          </template>
          <span v-else> - - - </span>
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
                helpers.getLunchBreakColor(
                  props.row.lunch_break_start,
                  props.row.lunch_break_end
                )
              "
              class="q-ma-xs"
              size="md"
            >
              <q-icon
                :name="
                  helpers.getLunchBreakIcon(
                    props.row.lunch_break_start,
                    props.row.lunch_break_end
                  )
                "
                size="xs"
                class="q-mr-xs"
              />
              {{
                `${
                  helpers.calculateTotalWorkingHours(
                    props.row.lunch_break_start,
                    props.row.lunch_break_end
                  ).hours
                } Hrs : ${
                  helpers.calculateTotalWorkingHours(
                    props.row.lunch_break_start,
                    props.row.lunch_break_end
                  ).minutes
                } Min`
              }}
            </q-badge>
          </template>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-total_working_hours="props">
        <q-td :props="props">
          <template v-if="props.row.time_in && props.row.time_out">
            <q-badge
              outline
              :color="
                helpers.getWorkHoursColor(props.row.time_in, props.row.time_out)
              "
              class="q-ma-xs"
              size="md"
            >
              <q-icon
                :name="
                  helpers.getWorkHoursIcon(
                    props.row.time_in,
                    props.row.time_out
                  )
                "
                size="xs"
                class="q-mr-xs"
              />
              {{
                `${
                  helpers.calculateTotalWorkingHours(
                    props.row.time_in,
                    props.row.time_out
                  ).hours
                } Hrs : ${
                  helpers.calculateTotalWorkingHours(
                    props.row.time_in,
                    props.row.time_out
                  ).minutes
                } Min`
              }}
            </q-badge>
          </template>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-ot_status="props">
        <q-td :props="props" class="row">
          <q-chip
            v-if="props.row.ot_status === 'approved'"
            size="sm"
            color="green-1"
            text-color="green-8"
            rounded
            icon="check_circle"
            :label="helpers.capitalize(props.row.ot_status)"
          />
          <q-chip
            v-else-if="props.row.ot_status === 'declined'"
            size="sm"
            color="red-2"
            text-color="red-14"
            rounded
            icon="cancel"
            :label="helpers.capitalize(props.row.ot_status)"
          />
          <span v-else-if="!props.row.ot_status"> - - - </span>
          <div v-else class="q-gutter-x-sm">
            <DeclineOTButton :decline="props.row" />
            <ApproveOTButton :approve="props.row" />
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-overtime_reason="props">
        <q-td :props="props">
          <span v-if="props.row.overtime_reason">
            {{ helpers.truncateText(props.row.overtime_reason, 15) }}
            <q-tooltip
              v-if="props.row.overtime_reason.length > 15"
              class="bg-blue-grey-10 text-white text-subtitle1"
              :offset="[10, 10]"
            >
              {{ props.row.overtime_reason }}
            </q-tooltip>
          </span>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-declined_reason="props">
        <q-td :props="props">
          <span v-if="props.row.declined_reason">
            {{ helpers.truncateText(props.row.declined_reason, 15) }}
            <q-tooltip
              v-if="props.row.declined_reason.length > 15"
              class="bg-blue-grey-10 text-white text-subtitle1"
              :offset="[10, 10]"
            >
              {{ props.row.declined_reason }}
            </q-tooltip>
          </span>
          <span v-else> - - - </span>
        </q-td>
      </template>

      <template v-slot:body-cell-schedule_in="props">
        <q-td :props="props">
          <div :class="{ 'editable-cell': props.row.schedule_in }">
            {{ props.row.schedule_in || "N/A" }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Schedule In
            </q-tooltip>
          </div>

          <q-popup-edit
            @update:model-value="
              (val) => updateEmployeeScheduleIn(props.row, val)
            "
            v-model="props.row.schedule_in"
            buttons
            title="Edit Employee Schedule In"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              :model-value="scope.value"
              @update:model-value="scope.value = $event"
              dense
              autofocus
              mask="##:## AA"
              :rules="[validateTimeFormat]"
              hint="Format: 01:00 AM/PM"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-schedule_out="props">
        <q-td :props="props">
          <div :class="{ 'editable-cell': props.row.schedule_out }">
            {{ props.row.schedule_out || "N/A" }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Schedule Out
            </q-tooltip>
          </div>

          <q-popup-edit
            @update:model-value="
              (val) => updateEmployeeScheduleOut(props.row, val)
            "
            v-model="props.row.schedule_out"
            buttons
            title="Edit Employee Schedule Out"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              :model-value="scope.value"
              @update:model-value="scope.value = $event"
              dense
              autofocus
              mask="##:## AA"
              :rules="[validateTimeFormat]"
              hint="Format: 01:00 AM/PM"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <EditDTR :edit="props" />
          </div>
        </q-td>
      </template>

      <template #loading>
        <q-inner-loading showing>
          <q-spinner-ios size="50px" color="grey-10" />
        </q-inner-loading>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useDTRStore } from "stores/dtr";
import OvertimeButton from "./OvertimeButton.vue";
import EditDTR from "./EditDTR.vue";
import DeclineOTButton from "./DeclineOTButton.vue";
import ApproveOTButton from "./ApproveOTButton.vue";
import { useAttendanceHelpers } from "src/composables/attendance/useAttendanceHelpers";

// Initialize attendance helpers
const helpers = useAttendanceHelpers();

// Reactive variables
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});
const filter = ref("");
const loading = ref(false);

const dtrStore = useDTRStore();
const dtrData = computed(() => dtrStore.dtrs);
const dtrRows = ref([]);

// Fetch data on component mount
onMounted(async () => {
  await reloadTableData();
});

const validateTimeFormat = (val) => {
  // Regex to match "HH:MM AM/PM" format.
  // HH: 01-12
  // MM: 00-59
  // AM/PM: AM or PM
  const timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
  return (
    timeRegex.test(val) || "Time format must be HH:MM AM/PM (e.g., 01:00 AM)"
  );
};

const updateEmployeeScheduleIn = async (data, val) => {
  console.log("updateEmployeeScheduleIn composables", data, val);

  loading.value = true;
  try {
    const employeeScheduleIn = {
      id: data.id,
      schedule_in: val,
    };
    console.log("employeeScheduleIn", employeeScheduleIn);
    await dtrStore.updateDtrScheduleIn(employeeScheduleIn);
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

const updateEmployeeScheduleOut = async (data, val) => {
  console.log("updateEmployeeScheduleOut composables", data, val);

  loading.value = true;

  try {
    const employeeScheduleOut = {
      id: data.id,
      schedule_out: val,
    };

    console.log("employeeScheduleOut", employeeScheduleOut);
    await dtrStore.updateDtrSheduleOut(employeeScheduleOut);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

/**
 * Fetches and reloads the DTR table data based on pagination and filter.
 * @param {number} page - The current page number.
 * @param {number} rowsPerPage - The number of rows per page.
 * @param {string} search - The search string.
 */
const reloadTableData = async (page = 0, rowsPerPage = 5, search = "") => {
  try {
    loading.value = true;
    await dtrStore.fetchDTR(page, rowsPerPage, search);
    const { data, current_page, per_page, total } = dtrData.value;
    dtrRows.value = data;
    console.log("dtrRows.value", dtrRows.value);
    pagination.value = {
      page: current_page,
      rowsPerPage: per_page,
      rowsNumber: total,
    };
  } catch (error) {
    console.error("Error fetching DTR data:", error);
    // Optionally show a Quasar notification here
  } finally {
    loading.value = false;
  }
};

// Column definitions for the q-table
const dtrColumns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => helpers.formatFullname(row.employee),
    style: "position: sticky; left: 0; background: white; z-index: 1;",
    headerStyle: "position: sticky; left: 0; background: white; z-index: 2;",
  },
  {
    name: "position",
    required: true,
    label: "Position",
    align: "center",
    field: (row) => row.employee?.position || "N/A",
  },
  {
    name: "where_in",
    required: true,
    label: "Where IN",
    align: "center",
    field: (row) => row.device_in_reference_name || "N/A",
  },
  {
    name: "where_out",
    required: true,
    label: "Where OUT",
    align: "center",
    field: (row) => row.device_out_reference_name || "N/A",
  },
  {
    name: "shift_status",
    required: true,
    label: "Shift Status",
    align: "center",
    field: (row) => row.shift_status || "Regular Day",
    format: (val) => {
      const status = val || "Regular Day";
      let color = "grey-4";

      if (status === "Half Day") color = "orange";
      else if (status === "Regular Day") color = "green";

      return `<q-chip color="${color}" text-color="white" dense>${status}</q-chip>`;
    },
    sortable: true,
  },
  {
    name: "date_in",
    required: true,
    label: "Date In",
    align: "center",
    field: "time_in",
    format: helpers.formatDate,
  },
  {
    name: "date_out",
    required: true,
    label: "Date Out",
    align: "center",
    field: "time_out",
    format: helpers.formatDate,
  },
  {
    name: "time_in",
    required: true,
    label: "Time In",
    align: "center",
    field: "time_in",
  },
  {
    name: "time_out",
    required: true,
    label: "Time Out",
    align: "center",
    field: "time_out",
    format: helpers.formatTime,
  },
  {
    name: "lunch_break_start",
    required: true,
    label: "Lunch Break Start",
    align: "center",
    field: "lunch_break_start",
    format: helpers.formatTime,
  },
  {
    name: "lunch_break_end",
    required: true,
    label: "Lunch Break End",
    align: "center",
    field: "lunch_break_end",
    format: helpers.formatTime,
  },
  {
    name: "break_start",
    required: true,
    label: "Break Start",
    align: "center",
    field: "break_start",
    format: helpers.formatTime,
  },
  {
    name: "break_end",
    required: true,
    label: "Break End",
    align: "center",
    field: "break_end",
    format: helpers.formatTime,
  },
  {
    name: "break",
    required: true,
    label: "Total Break",
    align: "center",
    field: (row) => {
      const { hours, minutes } = helpers.calculateTotalWorkingHours(
        row.break_start,
        row.break_end
      );
      return `${hours}h ${minutes}m`;
    },
  },
  {
    name: "lunch_break",
    required: true,
    label: "Total Lunch Break",
    align: "center",
    field: (row) => {
      const { hours, minutes } = helpers.calculateTotalWorkingHours(
        row.lunch_break_start,
        row.lunch_break_end
      );
      return `${hours}h ${minutes}m`;
    },
  },
  {
    name: "total_working_hours",
    required: true,
    label: "Work Hours",
    align: "center",
    field: (row) => {
      const { hours, minutes } = helpers.calculateTotalWorkingHours(
        row.time_in,
        row.time_out
      );
      return `${hours}h ${minutes}m`;
    },
  },
  {
    name: "overtime_start",
    required: true,
    label: "Overtime Start",
    align: "center",
    field: "overtime_start",
    format: helpers.formatTime,
  },
  {
    name: "overtime_end",
    required: true,
    label: "Overtime End",
    align: "center",
    field: "overtime_end",
    format: helpers.formatTime,
  },
  {
    name: "total_overtime",
    required: true,
    label: "OT Total Hours",
    align: "center",
    field: (row) => {
      const { hours, minutes } = helpers.calculateTotalOvertimeHours(
        row.overtime_start,
        row.overtime_end
      );
      return `${hours}h ${minutes}m`;
    },
  },
  {
    name: "overtime_reason",
    required: true,
    label: "Overtime Reason",
    align: "justify",
    field: "overtime_reason",
    format: (val) => (val ? val : " - - - "),
  },
  {
    name: "declined_reason",
    label: "Declined Reason",
    field: "declined_reason",
    format: (val) => (val ? val : " - - - "),
    sortable: false,
  },
  {
    name: "ot_status",
    label: "OT Status",
    align: "center",
    field: (row) => row.ot_status,
    sortable: false,
  },
  {
    name: "approved_by",
    label: "Approved By",
    align: "center",
    field: (row) => helpers.formatFullname(row.approvedBy),
    sortable: false,
  },
  {
    name: "schedule_in",
    label: "Schedule In",
    align: "center",
    field: (row) => row.schedule_in,
  },
  {
    name: "schedule_out",
    label: "Schedule Out",
    align: "center",
    field: (row) => row.schedule_out,
  },
  // {
  //   name: "action",
  //   label: "Action",
  //   align: "right",
  // },
];

/**
 * Handles the @request event from q-table to manage pagination and filtering.
 * @param {object} props - The properties from the q-table request.
 */
const handleRequest = (props) => {
  reloadTableData(
    props.pagination.page,
    props.pagination.rowsPerPage,
    props.filter
  );
};

// Watch for changes in the filter and reload data
watch(filter, async (newVal) => {
  // Reset to the first page when filter changes to ensure consistent behavior
  pagination.value.page = 1;
  await reloadTableData(
    pagination.value.page,
    pagination.value.rowsPerPage,
    newVal
  );
});
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
.spinner-wrapper,
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

.gradient-btn {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white !important;
  transition: 0.3s ease;
}

.editable-cell {
  cursor: pointer;
  /* Optional: add a subtle underline to invite clicks */
  // border-bottom: 1px dashed #777;
  padding-bottom: 2px;
}

.gradient-icon {
  font-size: 24px; /* Adjust size as needed */
  background: linear-gradient(to right, #a0522d, #ff8833);
  -webkit-background-clip: text; /* For compatibility */
  background-clip: text;
  color: transparent; /* Make text fill transparent */
  display: inline-block; /* Ensure proper display */
}

.gradient-btn:hover {
  filter: brightness(1.1);
}
</style>
