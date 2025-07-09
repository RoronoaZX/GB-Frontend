import { ref, computed } from "vue";
import { date } from "quasar";

export function useDTR(dtrStore, selectedEmployeeId) {
  const startDate = ref("");
  const endDate = ref("");

  const STANDARD_WORK_HOURS = 9;

  const getDTRPeriod = (formattedDate) => {
    if (!formattedDate) return { startDate: null, endDate: null };

    const day = parseInt(formattedDate.slice(8, 10), 10);
    let startDate, endDate;

    if (day >= 11 && day <= 25) {
      startDate = `${formattedDate.slice(0, 7)}-11`;
      endDate = `${formattedDate.slice(0, 7)}-25`;
    } else {
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

    return { startDate, endDate };
  };

  const initializeDateRange = () => {
    const today = date.formatDate(new Date(), "YYYY-MM-DD");
    const range = getDTRPeriod(today);
    startDate.value = range.startDate;
    endDate.value = range.endDate;
  };

  const fetchDTRData = async () => {
    if (selectedEmployeeId.value && startDate.value && endDate.value) {
      await dtrStore.fetchDTRRange({
        employee_id: selectedEmployeeId.value,
        start_date: startDate.value,
        end_date: endDate.value,
      });
    }
  };

  const formatTimeDiff = (start, end) => {
    if (!start || !end) return " - - - ";
    const s = new Date(start),
      e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return " - - - ";
    const minutes = Math.floor((e - s) / 60000);
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    return `${h} h : ${m} m`;
  };

  const dtrRow = computed(() => {
    return dtrStore.dtrCutOffData.map((entry, index) => {
      const total = formatTimeDiff(entry.time_in, entry.time_out);
      const overtime =
        (entry.ot_status || "").toLowerCase() === "approved"
          ? formatTimeDiff(entry.overtime_start, entry.overtime_end)
          : " - - - ";

      let undertime = " - - - ";
      if (total !== " - - - ") {
        const [h, m] = total.split(" h : ");
        const worked = parseInt(h) + parseInt(m) / 60;
        if (worked < STANDARD_WORK_HOURS) {
          const diff = (STANDARD_WORK_HOURS - worked) * 60;
          undertime = `${String(Math.floor(diff / 60)).padStart(
            2,
            "0"
          )} h : ${String(Math.floor(diff % 60)).padStart(2, "0")} m`;
        }
      }

      return {
        entry: index + 1,
        time_in: entry.time_in,
        time_out: entry.time_out,
        total_working_hours: total,
        undertime,
        overtime,
        ot_status: capitalize(entry.ot_status),
      };
    });
  });

  const capitalize = (text) => {
    if (!text) return " - - - ";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return {
    startDate,
    endDate,
    initializeDateRange,
    getDTRPeriod,
    fetchDTRData,
    dtrRow,
  };
}
