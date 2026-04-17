import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useHistoryLogsStore = defineStore("history-log", () => {
  const historyLog = ref(null);
  const historyLogs = ref([]);
  const pagination = ref({ page: 1, rowsPerPage: 15, rowsNumber: 0 });

  const fetchHistoryLogs = async (page = 1, perPage = 15, search = '') => {
    try {
      const response = await api.get("/api/history-logs", {
        params: { page, per_page: perPage, search }
      });

      if (response.data.data) {
          historyLogs.value = response.data.data;
          pagination.value = {
              page: response.data.current_page,
              rowsPerPage: response.data.per_page,
              rowsNumber: response.data.total
          };
      } else {
          historyLogs.value = response.data;
      }
    } catch (error) {
        console.error("Error fetch history log", error);
    }
  };

  return {
    historyLog,
    historyLogs,
    pagination,
    fetchHistoryLogs,
  };
});
