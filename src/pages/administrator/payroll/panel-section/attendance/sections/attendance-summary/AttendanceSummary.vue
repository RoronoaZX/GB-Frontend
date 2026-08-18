<template>
  <div class="q-my-md" align="right">
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
              <!-- :alt="altText" -->
              <img :src="imageUrl" @error="handleImageError" />
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
              <template v-slot:body-cell="props">
                <q-td :props="props">
                  <span class="text-overline">{{ props.value }}</span>
                </q-td>
              </template>
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
        <div class="row justify-between items-center text-white">
          <div class="row items-center q-gutter-sm">
            <q-icon name="schedule" size="22px" />
            <div class="text-subtitle1 text-weight-bold">Daily Time Record (DTR) Preview</div>
          </div>
          <div class="row items-center q-gutter-sm">
            <q-btn
              color="white"
              text-color="dark"
              dense
              unelevated
              size="sm"
              icon="print"
              label="Print"
              class="q-px-sm"
              @click="triggerPhysicalPrint"
            />
            <q-btn
              color="white"
              text-color="dark"
              dense
              unelevated
              size="sm"
              icon="download"
              label="Download PDF"
              class="q-px-sm"
              @click="triggerDownload"
            />
            <q-btn rounded flat dense icon="close" v-close-popup />
          </div>
        </div>
      </q-card-section>
      <div>
        <iframe :src="pdfUrl" width="100%" height="700px" />
      </div>
    </q-card>
  </q-dialog>

  <!-- PDF Download Password Confirmation Dialog -->
  <PasswordAuthDialog
    v-model="passwordConfirmDialog"
    :label="passwordConfirmTarget?.label"
    :description="passwordConfirmTarget?.description"
    v-model:password="passwordConfirmInput"
    v-model:showPassword="passwordConfirmShow"
    :loading="passwordConfirmLoading"
    @confirm="handlePasswordConfirmSubmit"
  />
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import EmployeeAttendanceDialog from "./EmployeeAttendanceDialog.vue";
import { useEmployeeStore } from "stores/employee";
import { useDTRStore } from "stores/dtr";
import { useUsersStore } from "stores/user";
import { usePasswordConfirm } from "src/composables/usePasswordConfirm";
import PasswordAuthDialog from "src/components/PasswordAuthDialog.vue";
import { date } from "quasar";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.default;

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const dtrStore = useDTRStore();
const usersStore = useUsersStore();

const {
  passwordConfirmDialog,
  passwordConfirmInput,
  passwordConfirmShow,
  passwordConfirmLoading,
  passwordConfirmTarget,
  promptPasswordConfirm,
  handlePasswordConfirmSubmit,
} = usePasswordConfirm();

const getPreparedSignatory = () => {
  const emp = usersStore.userData?.data?.employee;
  const user = usersStore.userData?.data || usersStore.userData;

  let fullName = "HR / PAYROLL OFFICER";
  if (emp) {
    const capitalize = (str) =>
      str
        ? str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")
        : "";
    const fn = emp.firstname ? capitalize(emp.firstname) : "";
    const mi = emp.middlename ? `${capitalize(emp.middlename).charAt(0)}.` : "";
    const ln = emp.lastname ? capitalize(emp.lastname) : "";
    fullName = `${fn} ${mi} ${ln}`.trim().toUpperCase() || "HR / PAYROLL OFFICER";
  } else if (user?.name) {
    fullName = user.name.toUpperCase();
  }

  let position = emp?.position || emp?.designation || user?.role || localStorage.getItem("role") || "Payroll Officer";

  return {
    name: fullName,
    position: position,
    generatedAt: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  };
};

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
let currentDocDefinition = null;

const triggerPhysicalPrint = () => {
  if (currentDocDefinition) {
    promptPasswordConfirm({
      label: `Daily Time Record (Print - ${employeeName.value || 'Employee'})`,
      description: "Please enter your admin password to authorize printing the confidential",
      onConfirm: () => {
        pdfMake.createPdf(currentDocDefinition).print();
      },
    });
  }
};

const triggerDownload = () => {
  if (currentDocDefinition) {
    promptPasswordConfirm({
      label: `Daily Time Record PDF (${employeeName.value || 'Employee'})`,
      description: "Please enter your admin password to authorize downloading the confidential",
      onConfirm: () => {
        const empSlug = (employeeName.value || "Employee").replace(/[^a-zA-Z0-9]/g, "_");
        const filename = `GB_DTR_${empSlug}_${startDate.value}_to_${endDate.value}.pdf`;
        pdfMake.createPdf(currentDocDefinition).download(filename);
      },
    });
  }
};

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
    /* console.log("Request Data:", requestData); */
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

  /* console.log("Calculated Start Date:", startDate); */
  /* console.log("Calculated End Date:", endDate); */

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
/* console.log("formattedStart", formattedStart); */

// Format the dates for display
const formattedStartDate = formatDateToCustomString(new Date(startDate));
const formattedEndDate = formatDateToCustomString(new Date(endDate));

const dtrRow = computed(() => {
  const data = dtrStore.dtrCutOffData;
  /* console.log("DTR Data", data); */

  // Capitalize first letter
  const capitalize = (text) => {
    if (!text) return " - - - ";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  // Helper function to format time differences as "09h:33m" or " - - - "
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
    const timeIn = entry.time_in;
    const timeOut = entry.time_out;
    const overtimeStart = entry.overtime_start;
    const overtimeEnd = entry.overtime_end;
    const otStatusRaw = entry.ot_status || " - - - ";
    const otStatus = capitalize(otStatusRaw); // Capitalize the overtime status

    // Calculate total working hours
    const totalWorkingHours = formatTimeDifference(timeIn, timeOut);

    // Calculate total overtime hours only if ot_status is "approved"
    const totalOvertime =
      otStatus.toLowerCase() === "approved"
        ? formatTimeDifference(overtimeStart, overtimeEnd)
        : " - - - ";

    // Calculate undertime if total working hours are less than standard work hours
    let undertime = " - - - ";
    const STANDARD_WORK_HOURS = 9;
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
      entry: index + 1,
      time_in: entry.time_in,
      time_out: entry.time_out,
      total_working_hours: totalWorkingHours,
      undertime,
      overtime: totalOvertime,
      ot_status: otStatus,
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

/* console.log("DTR ROW", dtrRow.value); */

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
  currentDocDefinition = generateDocDefinition(dtrRow);
  pdfMake.createPdf(currentDocDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    dialog.value = true;
  });
};

const generateDocDefinition = () => {
  const preparedSignatory = getPreparedSignatory();

  let totalWorkMinutes = 0;
  let totalOtMinutes = 0;
  let totalUnderMinutes = 0;
  let totalDaysLogged = 0;

  const tableBody = [
    [
      { text: "DAY", style: "tableHeader", alignment: "center" },
      { text: "TIME IN (ARRIVAL)", style: "tableHeader", alignment: "center" },
      { text: "TIME OUT (DEPARTURE)", style: "tableHeader", alignment: "center" },
      { text: "HOURS WORKED", style: "tableHeader", alignment: "center" },
      { text: "UNDERTIME", style: "tableHeader", alignment: "center" },
      { text: "OVERTIME", style: "tableHeader", alignment: "center" },
    ]
  ];

  dtrRow.value.forEach((entry) => {
    if (entry.time_in && entry.time_in !== " - - - ") {
      totalDaysLogged++;
    }
    if (entry.total_working_hours && entry.total_working_hours !== " - - - ") {
      const parts = entry.total_working_hours.split(" h : ");
      if (parts.length === 2) {
        totalWorkMinutes += parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      }
    }
    if (entry.overtime && entry.overtime !== " - - - ") {
      const parts = entry.overtime.split(" h : ");
      if (parts.length === 2) {
        totalOtMinutes += parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      }
    }
    if (entry.undertime && entry.undertime !== " - - - ") {
      const parts = entry.undertime.split(" h : ");
      if (parts.length === 2) {
        totalUnderMinutes += parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      }
    }

    tableBody.push([
      { text: entry.entry.toString(), style: "tableCell", alignment: "center" },
      { text: entry.time_in || " - - - ", style: "tableCell", alignment: "center" },
      { text: entry.time_out || " - - - ", style: "tableCell", alignment: "center" },
      { text: entry.total_working_hours || " - - - ", style: "tableCell", alignment: "center", bold: true },
      { text: entry.undertime || " - - - ", style: "tableCell", alignment: "center", color: entry.undertime && entry.undertime !== " - - - " ? "#dc2626" : "#475569" },
      { text: entry.overtime || " - - - ", style: "tableCell", alignment: "center", color: entry.overtime && entry.overtime !== " - - - " ? "#0d9488" : "#475569", bold: entry.overtime && entry.overtime !== " - - - " }
    ]);
  });

  const formatMinutesToHm = (totalMinutes) => {
    const h = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const m = String(totalMinutes % 60).padStart(2, "0");
    return `${h}h : ${m}m`;
  };

  // Grand totals row
  tableBody.push([
    { text: `TOTAL SUMMARY (${totalDaysLogged} DAYS LOGGED)`, colSpan: 3, style: "tableTotalHeader", alignment: "left" },
    {},
    {},
    { text: formatMinutesToHm(totalWorkMinutes), style: "tableTotalCell", alignment: "center" },
    { text: formatMinutesToHm(totalUnderMinutes), style: "tableTotalCell", alignment: "center", color: "#dc2626" },
    { text: formatMinutesToHm(totalOtMinutes), style: "tableTotalCell", alignment: "center", color: "#0d9488" }
  ]);

  return {
    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [35, 30, 35, 30],
    content: [
      // ── Header Banner ──
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#0f172a",
                stack: [
                  { text: "GB BAKESHOP • DAILY TIME RECORD", color: "#ffffff", fontSize: 13, bold: true, alignment: "center", margin: [0, 6, 0, 2] },
                  { text: "EMPLOYEE ATTENDANCE & SHIFT VERIFICATION LOG", color: "#38bdf8", fontSize: 7.5, bold: true, alignment: "center", margin: [0, 0, 0, 6] }
                ],
                border: [false, false, false, false]
              }
            ]
          ]
        },
        margin: [0, 0, 0, 10]
      },

      // ── Employee & Period Info Box ──
      {
        table: {
          widths: ["55%", "45%"],
          body: [
            [
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [8, 6, 8, 6],
                stack: [
                  {
                    columns: [
                      { text: "EMPLOYEE NAME:", width: 85, fontSize: 7.5, color: "#64748b", bold: true },
                      { text: (employeeName.value || "N/A").toUpperCase(), width: "*", fontSize: 8.5, bold: true, color: "#0f172a" }
                    ],
                    margin: [0, 0, 0, 3]
                  },
                  {
                    columns: [
                      { text: "POSITION / ROLE:", width: 85, fontSize: 7.5, color: "#64748b", bold: true },
                      { text: (employeePosition.value || "N/A").toUpperCase(), width: "*", fontSize: 8, bold: true, color: "#334155" }
                    ]
                  }
                ]
              },
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [8, 6, 8, 6],
                stack: [
                  {
                    columns: [
                      { text: "CUT-OFF PERIOD:", width: 80, fontSize: 7.5, color: "#64748b", bold: true },
                      { text: `${formatDateToCustomString(startDate.value)} to ${formatDateToCustomString(endDate.value)}`, width: "*", fontSize: 8, bold: true, color: "#0f172a" }
                    ],
                    margin: [0, 0, 0, 3]
                  },
                  {
                    columns: [
                      { text: "REGULAR SHIFT:", width: 80, fontSize: 7.5, color: "#64748b", bold: true },
                      { text: "8.0 Hours / Day Standard", width: "*", fontSize: 7.5, color: "#334155" }
                    ]
                  }
                ]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => "#cbd5e1",
          vLineColor: () => "#cbd5e1"
        },
        margin: [0, 0, 0, 10]
      },

      // ── Main Log Table ──
      {
        table: {
          headerRows: 1,
          widths: ["8%", "25%", "25%", "14%", "14%", "14%"],
          body: tableBody
        },
        layout: {
          fillColor: (rowIndex) => {
            if (rowIndex === 0) return "#1e293b";
            if (rowIndex === tableBody.length - 1) return "#f1f5f9";
            return rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff";
          },
          hLineWidth: (i, node) => (i === 0 || i === 1 || i === node.table.body.length - 1 || i === node.table.body.length) ? 1.2 : 0.5,
          vLineWidth: () => 0.5,
          vLineColor: () => "#cbd5e1",
          hLineColor: (i, node) => (i === 0 || i === 1 || i === node.table.body.length - 1 || i === node.table.body.length) ? "#475569" : "#e2e8f0",
          paddingLeft: () => 4,
          paddingRight: () => 4,
          paddingTop: () => 2.5,
          paddingBottom: () => 2.5
        },
        margin: [0, 0, 0, 10]
      },

      // ── Employee Official Certification Clause ──
      {
        unbreakable: true,
        stack: [
          {
            text: "I certify on my honor that the above is a true and correct report of the hours of work performed, record of which was made daily at the time of arrival and departure from workstation.",
            fontSize: 6.5,
            color: "#475569",
            italics: true,
            alignment: "center",
            margin: [20, 4, 20, 6]
          },
          {
            columns: [
              { width: "*", text: "" },
              {
                width: 240,
                stack: [
                  { text: (employeeName.value || "EMPLOYEE").toUpperCase(), fontSize: 8.5, bold: true, color: "#0f172a", alignment: "center", margin: [0, 4, 0, 1] },
                  { text: "________________________________________", color: "#94a3b8", alignment: "center", margin: [0, 0, 0, 2] },
                  { text: "Employee Signature Over Printed Name", fontSize: 6.5, color: "#64748b", italics: true, alignment: "center" }
                ]
              },
              { width: "*", text: "" }
            ],
            margin: [0, 0, 0, 12]
          }
        ]
      },

      // ── 3-Tier Signatory Section ──
      {
        unbreakable: true,
        table: {
          widths: ["33%", "34%", "33%"],
          body: [
            [
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [6, 6, 6, 6],
                stack: [
                  { text: "PREPARED BY:", fontSize: 7, bold: true, color: "#475569" },
                  { text: preparedSignatory.name, fontSize: 8, bold: true, color: "#0f172a", margin: [0, 8, 0, 1], alignment: "center" },
                  { text: "____________________________________", color: "#94a3b8", alignment: "center", margin: [0, 0, 0, 2] },
                  { text: "Signature Over Printed Name", fontSize: 6, color: "#64748b", italics: true, alignment: "center", margin: [0, 0, 0, 3] },
                  { text: `Position: ${preparedSignatory.position}`, fontSize: 6.5, color: "#334155", bold: true },
                  { text: `Date: ${preparedSignatory.generatedAt}`, fontSize: 6, color: "#64748b" }
                ]
              },
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [6, 6, 6, 6],
                stack: [
                  { text: "VERIFIED & CHECKED BY:", fontSize: 7, bold: true, color: "#475569" },
                  { text: " ", fontSize: 8, bold: true, color: "#0f172a", margin: [0, 8, 0, 1], alignment: "center" },
                  { text: "____________________________________", color: "#94a3b8", alignment: "center", margin: [0, 0, 0, 2] },
                  { text: "Signature Over Printed Name", fontSize: 6, color: "#64748b", italics: true, alignment: "center", margin: [0, 0, 0, 3] },
                  { text: "Position: ____________________", fontSize: 6.5, color: "#334155" },
                  { text: "Date: ________________________", fontSize: 6, color: "#64748b" }
                ]
              },
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [6, 6, 6, 6],
                stack: [
                  { text: "APPROVED BY:", fontSize: 7, bold: true, color: "#475569" },
                  { text: " ", fontSize: 8, bold: true, color: "#0f172a", margin: [0, 8, 0, 1], alignment: "center" },
                  { text: "____________________________________", color: "#94a3b8", alignment: "center", margin: [0, 0, 0, 2] },
                  { text: "Signature Over Printed Name", fontSize: 6, color: "#64748b", italics: true, alignment: "center", margin: [0, 0, 0, 3] },
                  { text: "Position: General Manager / Admin", fontSize: 6.5, color: "#334155" },
                  { text: "Date: ________________________", fontSize: 6, color: "#64748b" }
                ]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => "#cbd5e1",
          vLineColor: () => "#cbd5e1"
        },
        margin: [0, 5, 0, 0]
      }
    ],
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          { text: "GB Bakeshop Management System • Official Daily Time Record (CS Form 48)", style: "footerText", alignment: "left", margin: [35, 0, 0, 0] },
          { text: `Page ${currentPage.toString()} of ${pageCount.toString()}`, style: "footerText", alignment: "right", margin: [0, 0, 35, 0] }
        ]
      };
    },
    styles: {
      tableHeader: { fontSize: 6.5, bold: true, color: "#ffffff", fillColor: "#1e293b", margin: [3, 2, 3, 2] },
      tableCell: { fontSize: 6.5, margin: [3, 2, 3, 2] },
      tableTotalHeader: { fontSize: 7, bold: true, color: "#0f172a", margin: [3, 3, 3, 3] },
      tableTotalCell: { fontSize: 7, bold: true, color: "#0f172a", margin: [3, 3, 3, 3] },
      footerText: { fontSize: 6.5, color: "#64748b", italics: true }
    },
    defaultStyle: { font: "Roboto", fontSize: 8 }
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
    format: (val) => {
      if (!val) return "";
      const parts = val.split(", ");
      if (parts.length < 2) return val;
      return `${parts[0]}, ${parts[1]} || ${parts[2]}`;
    },
  },
  {
    name: "out",
    label: "OUT",
    align: "center", // Center the header
    field: "time_out",
    format: (val) => {
      if (!val) return "";
      const parts = val.split(", ");
      if (parts.length < 2) return val;
      return `${parts[0]}, ${parts[1]} || ${parts[2]}`;
    },
  },
  {
    name: "total_working_hours",
    label: "Total Hours",
    align: "center", // Center the header
    field: "total_working_hours",
  },
  {
    name: "undertime",
    label: "Undertime",
    field: "undertime",
    align: "center", // Center the header
  },
  {
    name: "overtime",
    label: "OT",
    field: "overtime",
    align: "center", // Center the header
  },
  {
    name: "ot_status",
    label: "OT Stat",
    field: "ot_status",
    align: "center", // Center the header
  },
];
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
// .full-height-table {
//   max-height: none;
// }
// .q-table td {
//   padding: 7px;
// }
.full-height-table .q-td,
.full-height-table .q-th {
  font-size: 9px !important; /* Force 9px font size */
  padding: 4px 6px !important; /* Reduce padding to make cells smaller */
  line-height: 1.2; /* Optional: tighter line spacing */
}

.full-height-table .text-overline {
  font-size: 10px !important; /* Ensure caption text also matches 9px */
}
</style>
