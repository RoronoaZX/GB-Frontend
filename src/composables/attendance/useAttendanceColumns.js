import { useAttendanceHelpers } from "./useAttendanceHelpers";

export function useAttendanceColumns() {
  const helpers = useAttendanceHelpers();

  return [
    {
      name: "name",
      required: true,
      label: "Name",
      align: "left",
      field: (row) => helpers.formatFullname(row.employee),
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
      label: "Total Lunch break",
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
      name: "action",
      label: "Action",
      align: "right",
    },
  ];
}
