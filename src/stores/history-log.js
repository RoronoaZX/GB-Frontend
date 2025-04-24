import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useHistoryLogsStore = defineStore("history-log", () => {
  const historyLog = ref(null);
  const historyLogs = ref([]);

  const fetchHistoryLogs = async () => {
    const response = await api.get("/api/history-logs");
    historyLogs.value = response.data;
  };

  return {
    historyLog,
    historyLogs,
    fetchHistoryLogs,
  };
});
