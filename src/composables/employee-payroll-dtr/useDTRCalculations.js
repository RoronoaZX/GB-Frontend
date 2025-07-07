import { computed, unref } from "vue";
import {
  formatMinutesToHoursMinutes,
  getTotalMinutesBetween,
} from "./timeUtils";

export default function useDTRCalculations(employeeDataRef) {
  const safeEmployeeData = computed(() => unref(employeeDataRef) || {});

  const requiredMinutes = computed(() => {
    const designation = safeEmployeeData.value?.designation;
    const totalHours = parseInt(designation?.total_working_hours || 0);
    return totalHours * 60;
  });

  const computeTotalWorkingHours = (row) => {
    const total = getTotalMinutesBetween(row.time_in, row.time_out);
    return formatMinutesToHoursMinutes(total);
  };

  const computeUndertime = (row) => {
    const total = getTotalMinutesBetween(row.time_in, row.time_out);
    const undertime = requiredMinutes.value - total;
    return formatMinutesToHoursMinutes(undertime > 0 ? undertime : 0);
  };

  const computeOvertime = (row) => {
    const total = getTotalMinutesBetween(row.time_in, row.time_out);
    const overtime = total - requiredMinutes.value;
    return formatMinutesToHoursMinutes(overtime > 0 ? overtime : 0);
  };

  return {
    computeTotalWorkingHours,
    computeUndertime,
    computeOvertime,
  };
}
