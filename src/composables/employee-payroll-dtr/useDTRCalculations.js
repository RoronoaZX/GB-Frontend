// useDtrCalculations.js
export function parseTimeToDate(timeString, dateObj) {
  if (!timeString || !dateObj) return null;

  const match = timeString.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3]?.toUpperCase();

  if (ampm === "PM" && hours < 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  const newDate = new Date(dateObj);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
}

export function formatMinutesToHoursMinutes(minutes) {
  if (minutes < 0) return "0h 0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export function convertHoursMinutesToMinutes(hmString) {
  const match = hmString.match(/(\d+)h\s*(\d+)m/);
  return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0;
}

export function calculateTotals(dtrRows, designation) {
  let totalWorking = 0;
  let totalUndertime = 0;
  let totalOvertime = 0;

  dtrRows.forEach((row) => {
    const { time_in, time_out, ot_status, overtime_start, overtime_end } = row;

    if (time_in && time_out) {
      const inTime = new Date(time_in);
      const outTime = new Date(time_out);
      const scheduledIn = parseTimeToDate(designation.time_in, inTime);
      const scheduledOut = parseTimeToDate(designation.time_out, outTime);

      const effectiveIn = inTime > scheduledIn ? inTime : scheduledIn;
      const effectiveOut = outTime < scheduledOut ? outTime : scheduledOut;

      const expectedMinutes = (scheduledOut - scheduledIn - 3600000) / 60000;
      const actualMinutes =
        effectiveOut > effectiveIn
          ? (effectiveOut - effectiveIn - 3600000) / 60000
          : 0;

      totalWorking += Math.max(actualMinutes, 0);
      const undertime = expectedMinutes - actualMinutes;
      if (undertime > 0) totalUndertime += undertime;
    }

    if (ot_status === "approved" && overtime_start && overtime_end) {
      const otIn = new Date(overtime_start);
      const otOut = new Date(overtime_end);
      if (!isNaN(otIn) && !isNaN(otOut) && otOut > otIn) {
        totalOvertime += (otOut - otIn) / 60000;
      }
    }
  });

  return {
    totalWorking,
    totalUndertime,
    totalOvertime,
  };
}
