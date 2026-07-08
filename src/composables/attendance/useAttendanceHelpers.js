import { ref } from "vue";

export function useAttendanceHelpers() {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const formatFullname = (row) => {
    const firstname = row?.firstname ? capitalize(row.firstname) : "- ";
    const middlename = row?.middlename
      ? capitalize(row.middlename).charAt(0) + "."
      : "-";
    const lastname = row?.lastname ? capitalize(row.lastname) : " -";
    return `${firstname} ${middlename} ${lastname}`.trim();
  };

  const formatDate = (dateTime) => {
    if (!dateTime) return " - - -";
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return " - - -";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateTime) => {
    if (!dateTime) return " - - -";
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return " - - -";
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${amPm}`;
  };

  const calculateTotalWorkingHours = (timeIn, timeOut) => {
    if (!timeIn || !timeOut) return { hours: 0, minutes: 0 };
    const start = new Date(timeIn);
    const end = new Date(timeOut);
    if (isNaN(start.getTime()) || isNaN(end.getTime()))
      return { hours: 0, minutes: 0 };
    const diffInMillis = end - start;
    const totalMinutes = Math.floor(diffInMillis / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  const calculateTotalOvertimeHours = (timeIn, timeOut) => {
    if (!timeIn || !timeOut) return { hours: 0, minutes: 0 };
    const start = new Date(timeIn);
    const end = new Date(timeOut);
    if (isNaN(start.getTime()) || isNaN(end.getTime()))
      return { hours: 0, minutes: 0 };
    const diffInMillis = end - start;
    const totalMinutes = Math.floor(diffInMillis / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  const getLunchBreakColor = (timeIn, timeOut) => {
    const { hours, minutes } = calculateTotalWorkingHours(timeIn, timeOut);
    if (hours > 1 || minutes > 0) return "green-7";
    return "blue-grey-9";
  };

  const getLunchBreakIcon = (timeIn, timeOut) => {
    const { hours, minutes } = calculateTotalWorkingHours(timeIn, timeOut);
    if (hours > 1 || minutes > 0) return "check_circle";
    return "access_time";
  };

  const getBreakColor = (timeIn, timeOut) => {
    const { hours, minutes } = calculateTotalWorkingHours(timeIn, timeOut);
    if (hours > 0 || minutes > 15) return "pink-13";
    return "green-7";
  };

  const getBreakHoursIcon = (timeIn, timeOut) => {
    const { hours, minutes } = calculateTotalWorkingHours(timeIn, timeOut);
    if (hours > 0 || minutes > 15) return "access_time";
    return "check_circle";
  };

  const getWorkHoursColor = (timeIn, timeOut) => {
    const { hours, minutes } = calculateTotalWorkingHours(timeIn, timeOut);
    if (hours > 9 || (hours === 9 && minutes > 0)) return "blue-grey-9";
    if (hours >= 8) return "green-7";
    return "pink-13";
  };

  const getWorkHoursIcon = (timeIn, timeOut) => {
    const { hours, minutes } = calculateTotalWorkingHours(timeIn, timeOut);
    if (hours >= 9 || (hours === 9 && minutes > 0)) return "alarm_on";
    if (hours >= 8) return "check_circle";
    return "access_time";
  };

  const getBadgePositionColor = (role) => {
    switch (role) {
      case "Super Admin":
        return "blue-10";
      case "Admin":
        return "purple-10";
      case "Supervisor":
        return "teal-7";
      case "Scaler":
        return "green-8";
      case "Lamesador":
        return "orange-5";
      case "Hornero":
        return "red-6";
      case "Baker":
        return "brown";
      case "Cake Maker":
        return "brown-4";
      case "Cashier":
        return "green-5";
      case "Sales Clerk":
        return "blue-5";
      case "Utility":
        return "grey-7";
      case "Not Yet Assigned":
        return "grey-4";
      default:
        return "grey-4";
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  /**
   * Returns true if the employee clocked in more than 1 minute after their scheduled time.
   * Compares time_in (full datetime string) against scheduleIn (e.g. "08:00 AM").
   */
  const isLateArrival = (timeIn, scheduleIn) => {
    if (!timeIn || !scheduleIn) return false;
    const clockIn = new Date(timeIn);
    if (isNaN(clockIn.getTime())) return false;

    // Parse schedule string like "08:00 AM"
    const match = scheduleIn.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return false;

    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const meridiem = match[3].toUpperCase();
    if (meridiem === "PM" && h !== 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;

    const scheduled = new Date(clockIn);
    scheduled.setHours(h, m, 0, 0);

    return clockIn - scheduled > 60 * 1000; // more than 1 min late
  };

  /**
   * Returns the number of minutes late (positive = late, 0 if on time or early).
   */
  const getLatenessMinutes = (timeIn, scheduleIn) => {
    if (!timeIn || !scheduleIn) return 0;
    const clockIn = new Date(timeIn);
    if (isNaN(clockIn.getTime())) return 0;

    const match = scheduleIn.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return 0;

    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const meridiem = match[3].toUpperCase();
    if (meridiem === "PM" && h !== 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;

    const scheduled = new Date(clockIn);
    scheduled.setHours(h, m, 0, 0);

    const diffMs = clockIn - scheduled;
    return diffMs > 0 ? Math.floor(diffMs / 60000) : 0;
  };

  /**
   * Returns true if a DTR record has a time_in but is missing time_out (incomplete log).
   */
  const isIncompleteDTR = (row) => {
    return !!row.time_in && !row.time_out;
  };

  return {
    capitalize,
    formatFullname,
    formatDate,
    formatTime,
    calculateTotalWorkingHours,
    calculateTotalOvertimeHours,
    getLunchBreakColor,
    getLunchBreakIcon,
    getBreakColor,
    getBreakHoursIcon,
    getWorkHoursColor,
    getWorkHoursIcon,
    getBadgePositionColor,
    truncateText,
    isLateArrival,
    getLatenessMinutes,
    isIncompleteDTR,
  };
}
