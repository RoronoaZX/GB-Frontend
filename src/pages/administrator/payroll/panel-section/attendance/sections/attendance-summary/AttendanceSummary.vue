<template>
  <div class="q-mb-md" align="right">
    <q-input
      v-model="searchKeyword"
      @update:model-value="search"
      debounce="500"
      outlined
      dense
      flat
      label="Search"
      style="width: 300px"
    >
      <template v-slot:append>
        <div>
          <q-icon name="search" />
        </div>
      </template>
      <div v-if="searchKeyword" class="custom-list z-top">
        <q-card>
          <q-list separator>
            <q-item v-if="!employees?.length"> No record found. </q-item>
            <template v-else>
              <q-item
                v-for="employee in employees"
                :key="employee.id"
                clickable
                @click="selectEmployee(employee)"
              >
                <q-item-section>
                  {{ formatFullname(employee) }}
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-card>
      </div>
    </q-input>
  </div>
  <div>
    <q-card bordered dense flat class="q-pa-md">
      <div class="row">
        <div class="col-3 q-ma-lg" align="center">
          <div class="q-pa-lg">
            <q-avatar size="150px" color="grey-2">
              <img :src="imageUrl" :alt="altText" @error="handleImageError" />
            </q-avatar>
          </div>
          <div class="row q-mt-lg" align="left">
            <div class="col-3">
              <div>Name:</div>
              <div>Position:</div>
              <div>Age:</div>
            </div>
            <div class="col-9">
              <div>{{ employeeName }}</div>
              <div>{{ employeePosition }}</div>
              <div>{{ employeeAge }}</div>
            </div>
          </div>
        </div>
        <q-separator vertical />
        <div class="col-8 q-ml-lg">
          <div class="row justify-between">
            <div>From: {{ formatDateToCustomString(startDate) }}</div>
            <div>To: {{ formatDateToCustomString(endDate) }}</div>
          </div>
          <div class="row justify-between q-mt-md">
            <div>
              <div class="row">
                <q-btn
                  padding="sm md"
                  size="sm"
                  dense
                  flat
                  label="prev"
                  icon="arrow_back_ios_new"
                  @click="onPrev"
                />
                <q-separator vertical />
                <q-btn padding="sm md" size="sm" dense flat @click="onCurrent"
                  >CURRENT</q-btn
                >
                <q-separator vertical />
                <q-btn
                  padding="sm md"
                  size="sm"
                  dense
                  flat
                  label="next"
                  icon="arrow_forward_ios"
                  @click="onNext"
                />
              </div>
            </div>
            <div>
              <q-btn
                padding="sm md"
                size="sm"
                icon="print"
                dense
                label="PRINT"
                class="gradient-btn text-white"
                @click="openDialog"
              />
            </div>
          </div>
          <div class="q-my-md">
            <q-table
              flat
              bordered
              separator="cell"
              :rows="dtrRow"
              :columns="columns"
              row-key="entry"
              class="full-height-table"
              v-model:pagination="pagination"
              hide-bottom
            >
            </q-table>
          </div>
        </div>
      </div>
    </q-card>
  </div>

  <q-dialog
    v-model="dialog"
    full-height
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 820px; max-width: 80vw">
      <q-card-section class="gradient-btn">
        <div class="row justify-between text-h6 text-white">
          <div>🗓️ Daily Time Record</div>
          <div>
            <q-btn rounded flat dense icon="arrow_forward_ios" v-close-popup>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <div>
        <iframe :src="pdfUrl" width="100%" height="700px" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import EmployeeAttendanceDialog from "./EmployeeAttendanceDialog.vue";
import { useEmployeeStore } from "stores/employee";
import { useDTRStore } from "stores/dtr";
import { date } from "quasar";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fontes";
pdfMake.vfs = pdfFonts.default;

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const dtrStore = useDTRStore();

// console.log("Table dtr data", dtr.value);
const imageUrl = ref("https://cdn.quasar.dev/img/boy-avatar.png"); // Default image URL
const searchKeyword = ref("");
const employeeId = ref(null);
const selectedEmployeeId = ref(null);
const startDate = ref("");
const endDate = ref("");
const employeeName = ref("");
const employeePosition = ref("");
const employeeAge = ref("");
const STANDARD_WORK_HOURS = 8;
const dialog = ref(false);
const pdfUrl = ref("");

// const generateDocDefinition = ()

const isCardVisible = ref(false);

const handleImageError = () => {
  // Handle image loading error by updating the image URL
  imageUrl.value = "https://cdn.quasar.dev/img/boy-avatar.png"; // Default image URL
};

const pagination = ref({
  rowsPerPage: 0,
});

const search = async () => {
  if (searchKeyword.value.trim()) {
    await employeeStore.searchEmployee(searchKeyword.value);
  }
};

const selectEmployee = async (employee) => {
  searchKeyword.value = "";
  employeeName.value = formatFullname(employee);
  employeePosition.value = employee.position || "Unknown"; // Assuming position field exists in employee data
  employeeAge.value = calculateAge(employee.birthdate);

  selectedEmployeeId.value = employee.id; // Assuming employee.id is your employee ID

  const formattedDate = date.formatDate(new Date(), "YYYY-MM-DD"); // Get the current date formatted as 'YYYY-MM-DD'

  if (formattedDate) {
    const { startDate: newStartDate, endDate: newEndDate } =
      getDTRPeriod(formattedDate); // Get the DTR period
    startDate.value = newStartDate; // Update startDate with the new value
    endDate.value = newEndDate; // Update endDate with the new value

    const requestData = {
      employee_id: selectedEmployeeId.value,
      start_date: startDate.value,
      end_date: endDate.value,
    };

    await dtrStore.fetchDTRRange(requestData);
    console.log("Request Data:", requestData);
  } else {
    console.error("Failed to format the current date");
  }
};

const calculateAge = (birthdate) => {
  if (!birthdate) return "N/A";
  const birthDateObj = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }
  return age;
};

const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid date"; // Check if the date is valid
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

// Function to initialize the current 15-day range
const initializeDateRange = () => {
  const formattedDate = date.formatDate(new Date(), "YYYY-MM-DD");
  const { startDate: newStartDate, endDate: newEndDate } =
    getDTRPeriod(formattedDate);
  startDate.value = newStartDate;
  endDate.value = newEndDate;
};

const getDTRPeriod = (formattedDate) => {
  if (!formattedDate) {
    console.error("Invalid formatted date:", formattedDate);
    return { startDate: null, endDate: null };
  }

  const day = parseInt(formattedDate.slice(8, 10), 10); // Extract the day part
  let startDate, endDate;

  if (day >= 11 && day <= 25) {
    // Period: 11th - 25th of the current month
    startDate = `${formattedDate.slice(0, 7)}-11`;
    endDate = `${formattedDate.slice(0, 7)}-25`;
  } else {
    // Period: 26th of the current month - 10th of the next month
    const month =
      day >= 26
        ? formattedDate.slice(5, 7)
        : (parseInt(formattedDate.slice(5, 7), 10) - 1)
            .toString()
            .padStart(2, "0");
    const nextMonth =
      day >= 26
        ? (parseInt(formattedDate.slice(5, 7), 10) + 1)
            .toString()
            .padStart(2, "0")
        : formattedDate.slice(5, 7);

    startDate = `${formattedDate.slice(0, 4)}-${month}-26`;
    endDate = `${formattedDate.slice(0, 4)}-${nextMonth}-10`;
  }

  console.log("Calculated Start Date:", startDate);
  console.log("Calculated End Date:", endDate);

  return { startDate, endDate };
};

const formatDateToCustomString = (dateString) => {
  const date = new Date(dateString); // Convert the date string to a Date object
  if (isNaN(date.getTime())) return " - - - "; // Check if the date is valid

  // Get the month as a short name
  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(",", "");

  // Replace the month with the desired format
  const [month, day, year] = formattedDate.split(" ");
  return `${month}. ${day}, ${year}`; // Reformat to the desired output
};

const formattedStart = formatDateToCustomString(startDate.value);
console.log("formattedStart", formattedStart);

// Format the dates for display
const formattedStartDate = formatDateToCustomString(new Date(startDate));
const formattedEndDate = formatDateToCustomString(new Date(endDate));

const dtrRow = computed(() => {
  const data = dtrStore.dtrCutOffData;

  // Helper function to format time differences as "09h:33m" or "-----"
  const formatTimeDifference = (startTime, endTime) => {
    if (!startTime || !endTime) return " - - - ";

    const start = new Date(startTime);
    const end = new Date(endTime);

    // Check if the times are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return " - - - ";

    const diffInMillis = end - start;
    if (diffInMillis <= 0) return " - - - ";

    const totalMinutes = Math.floor(diffInMillis / (1000 * 60));
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");

    return `${hours} h : ${minutes} m`;
  };

  return data.map((entry, index) => {
    const timeIn = entry.time_in; // Assuming `time_in` is a string
    const timeOut = entry.time_out; // Assuming `time_out` is a string
    const overtimeStart = entry.overtime_start; // Assuming `overtime_start` is a string
    const overtimeEnd = entry.overtime_end; // Assuming `overtime_end` is a string

    // Calculate total working hours
    const totalWorkingHours = formatTimeDifference(timeIn, timeOut);

    // Calculate total overtime hours
    const totalOvertime = formatTimeDifference(overtimeStart, overtimeEnd);

    // Calculate undertime if total working hours are less than standard work hours
    let undertime = " - - - ";
    const STANDARD_WORK_HOURS = 8; // Assuming a standard of 8 hours
    if (totalWorkingHours !== " - - - ") {
      const [hoursStr, minutesStr] = totalWorkingHours.split(" h : ");
      const totalHours = parseInt(hoursStr, 10) + parseInt(minutesStr, 10) / 60;
      if (totalHours < STANDARD_WORK_HOURS) {
        const diffInMinutes = (STANDARD_WORK_HOURS - totalHours) * 60;
        const undertimeHours = String(Math.floor(diffInMinutes / 60)).padStart(
          2,
          "0"
        );
        const undertimeMinutes = String(
          Math.floor(diffInMinutes % 60)
        ).padStart(2, "0");
        undertime = `${undertimeHours} h : ${undertimeMinutes} m`;
      }
    }

    return {
      entry: index + 1, // This represents the number of days
      time_in: entry.time_in, // Use actual time_in value
      time_out: entry.time_out, // Use actual time_out value
      total_working_hours: totalWorkingHours, // Format total hours as "09h:33m" or "-----"
      undertime, // Formatted as "09h:33m" or "-----"
      overtime: totalOvertime, // Formatted as "09h:33m" or "-----"
    };
  });
});

// Fetch DTR data for the selected employee within the current date range
const fetchDTRData = async () => {
  if (selectedEmployeeId.value && startDate.value && endDate.value) {
    await dtrStore.fetchDTRRange({
      employee_id: selectedEmployeeId.value,
      start_date: startDate.value,
      end_date: endDate.value,
    });
  }
};

console.log("DTR ROW", dtrRow.value);

// "Prev" Button Action: Move to the previous 15-day range
const onPrev = () => {
  const prevDate = new Date(startDate.value);
  prevDate.setDate(prevDate.getDate() - 15); // Shift by 15 days back
  const { startDate: newStartDate, endDate: newEndDate } = getDTRPeriod(
    date.formatDate(prevDate, "YYYY-MM-DD")
  );
  startDate.value = newStartDate;
  endDate.value = newEndDate;
  fetchDTRData();
};

// "Next" Button Action: Move to the next 15-day range
const onNext = () => {
  const nextDate = new Date(endDate.value);
  nextDate.setDate(nextDate.getDate() + 1); // Shift to the start of the next period
  const { startDate: newStartDate, endDate: newEndDate } = getDTRPeriod(
    date.formatDate(nextDate, "YYYY-MM-DD")
  );
  startDate.value = newStartDate;
  endDate.value = newEndDate;
  fetchDTRData();
};

// "Current" Button Action: Reset to the current 15-day period
const onCurrent = () => {
  initializeDateRange();
  fetchDTRData();
};

// Initialize the date range when the component loads
initializeDateRange();

const openDialog = (dtrRow) => {
  const docDefinition = generateDocDefinition(dtrRow);
  pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    dialog.value = true;
  });
};

const generateDocDefinition = () => {
  return {
    pageMargins: [40, 40, -10, 40],
    content: [
      { text: "Daily Time Record", style: "header" },
      {
        text: [
          { text: "From: ", bold: false, fontSize: 8 },
          {
            text: ` ${formatDateToCustomString(startDate.value)}`,
            bold: true,
            decoration: "underline",
            fontSize: 10,
          },
        ],
        margin: [0, 0, 0, 3],
      },
      {
        text: [
          { text: "To: ", bold: false, fontSize: 8 },
          {
            text: `     ${formatDateToCustomString(endDate.value)}`,
            bold: true,
            decoration: "underline",
            fontSize: 10,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            text: [
              { text: "Employee Name:", bold: false, fontSize: 8 },
              {
                text: `  ${employeeName.value}`,
                bold: true,
                decoration: "underline",
                fontSize: 10,
              },
            ],
          },
          {
            text: [
              { text: "Position:", bold: false, fontSize: 8 },
              {
                text: `  ${employeePosition.value}`,
                bold: true,
                decoration: "underline",
                fontSize: 10,
              },
            ],
          },
          {
            text: [
              { text: "Age:", bold: false, fontSize: 8 },
              {
                text: `  ${employeeAge.value}`,
                bold: true,
                decoration: "underline",
                fontSize: 10,
              },
            ],
          },
        ],
        margin: [0, 0, 0, 10],
      },

      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "Number of Days", bold: true },
              { text: "Time In", bold: true, alignment: "center" },
              { text: "Time Out", bold: true, alignment: "center" },
              { text: "Total Working Hours", bold: true },
              { text: "Undertime", bold: true },
              { text: "Overtime", bold: true },
            ],
            ...dtrRow.value.map((entry) => [
              { text: entry.entry, alignment: "center" },
              { text: entry.time_in || " - - - ", alignment: "center" },
              { text: entry.time_out || " - - - ", alignment: "center" },
              {
                text: entry.total_working_hours || " - - - ",
                alignment: "center",
              },
              { text: entry.undertime || " - - - ", alignment: "center" },
              { text: entry.overtime || " - - - ", alignment: "center" },
            ]),
          ],
        },
        layout: {
          hLineWidth: function (i, node) {
            return i === 0 || i === node.table.body.length ? 1 : 0.5;
          },
          vLineWidth: function (i, node) {
            return 0.5;
          },
          hLineColor: function (i, node) {
            return i === 0 || i === node.table.body.length ? "black" : "#ccc";
          },
          vLineColor: function (i, node) {
            return "#ccc";
          },
        },
      },
    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
        alignment: "center",
        margin: [0, 5, 0, 10],
      },
      tableHeader: { bold: true, fontSize: 13, color: "black" },
    },
    defaultStyle: { fontSize: 9 },
  };
};

// const printDTR = () => {
//   const docDefinition = generateDocDefinition();
//   pdfMake.createPdf(docDefinition).open();
// };

const columns = [
  {
    name: "number_of_days",
    required: true,
    label: "NOD",
    align: "center", // Center the header
    field: (row) => row.entry,
    format: (val) => `${val}`,
  },
  {
    name: "in",
    align: "center", // Center the header
    label: "IN",
    field: "time_in",
  },
  {
    name: "out",
    label: "OUT",
    align: "center", // Center the header
    field: "time_out",
  },
  {
    name: "total_working_hours",
    label: "Total Working Hours",
    align: "center", // Center the header
    field: "total_working_hours",
  },
  {
    name: "overtime",
    label: "Overtime",
    field: "overtime",
    align: "center", // Center the header
  },
  {
    name: "undertime",
    label: "Undertime",
    field: "undertime",
    align: "center", // Center the header
  },
];
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
.full-height-table {
  max-height: none;
}
.q-table td {
  padding: 7px;
}
</style>
