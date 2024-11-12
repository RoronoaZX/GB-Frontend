import { d as defineStore, N as Notify } from "./index.c8e2405b.js";
import { api } from "./axios.aa1bce92.js";
const useBakerReportsStore = defineStore("bakerReportsStore", {
  state: () => ({
    recipes: {},
    reportToView: [],
    reports: [],
    rawmaterials: [],
    user: {}
  }),
  actions: {
    setRecipe(recipes) {
      this.recipes = recipes;
    },
    setReport(report) {
      this.reports.push(report);
    },
    removeReport(index) {
      this.reports.splice(index, 1);
    },
    setUser(user) {
      this.user = user;
    },
    clearData() {
      this.recipes = {};
      this.reports = [];
    },
    async fetchBranchRawMaterials(branchId) {
      const response = await api.get(`/api/branch/${branchId}/rawMaterials`);
      this.rawmaterials = response.data;
    },
    async fetchBakerReport(userId) {
      const response = await api.get(`/api/branch/${userId}/bakerReport`);
      this.reportToView = response.data;
    },
    async fetchAllReports() {
      const response = await api.get("/api/initial-baker-report");
      this.reportToView = response.data;
    },
    async fetchDoughReports(branchId) {
      const response = await api.get(
        `/api/branch/${branchId}/bakerDoughReport`
      );
      console.log("====================================");
      console.log("response", response.data);
      console.log("====================================");
      this.reports = response.data;
    },
    async createReports() {
      try {
        console.log("data to send:", this.reports);
        const response = await api.post("api/initial-baker-report", {
          reports: this.reports
        });
        Notify.create({
          type: "positive",
          message: "Report successfully send",
          timeout: 1e3
        });
        console.log("Reports to be saved:", this.reports);
        this.reports = [];
      } catch (error) {
        console.error("Error saving report:", error);
      }
    },
    async confirmReport(id) {
      try {
        const res = await api.post(`/api/confirm-initial-baker-report/${id}`);
        console.log("Confirming report with ID:", id);
        this.fetchDoughReports();
        return res.data;
      } catch (error) {
        console.error("Error confirming report:", error);
        throw error;
      }
    },
    async declineReport(id) {
      try {
        await api.post(`/api/decline-initial-baker-report/${id}`);
        this.fetchDoughReports;
      } catch (error) {
        console.error("Error declining report:", error);
      }
    }
  }
});
export { useBakerReportsStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFrZXItcmVwb3J0LjRjNmU2MGY5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL2Jha2VyLXJlcG9ydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuLy8gaW1wb3J0IHsgcmVhY3RpdmUgfSBmcm9tIFwidnVlXCI7XG5cbi8vIGV4cG9ydCBjb25zdCB1c2VCYWtlclJlcG9ydHNTdG9yZSA9IGRlZmluZVN0b3JlKFwiYmFrZXJSZXBvcnRzXCIsIGFzeW5jICgpID0+IHtcbi8vICAgY29uc3QgcmVjaXBlcyA9IHJlYWN0aXZlKHtcbi8vICAgICBuYW1lOiBcIlwiLFxuLy8gICAgIHRhcmdldFBjczogXCJcIixcbi8vICAgICBhY3R1YWxUYXJnZXQ6IFwiXCIsXG4vLyAgICAgc2hvcnQ6IFwiXCIsXG4vLyAgICAgb3ZlcjogXCJcIixcbi8vICAgICBraWxvOiBcIlwiLFxuLy8gICAgIGJyZWFkczogW10sXG4vLyAgIH0pO1xuXG4vLyAgIGNvbnN0IHNldFJlY2lwZSA9IGFzeW5jIChyZWNpcGVEYXRhKSA9PiB7XG4vLyAgICAgcmVjaXBlcyA9IHtcbi8vICAgICAgIC4uLnJlY2lwZXMsXG4vLyAgICAgICAuLi5yZWNpcGVEYXRhLFxuLy8gICAgICAgYnJlYWRzOiByZWNpcGVEYXRhLmJyZWFkIHx8IFtdLFxuLy8gICAgIH07XG4vLyAgIH07XG5cbi8vICAgcmV0dXJuIHtcbi8vICAgICByZWNpcGVzLFxuLy8gICAgIHNldFJlY2lwZSxcbi8vICAgfTtcbi8vIH0pO1xuXG5pbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VCYWtlclJlcG9ydHNTdG9yZSA9IGRlZmluZVN0b3JlKFwiYmFrZXJSZXBvcnRzU3RvcmVcIiwge1xuICBzdGF0ZTogKCkgPT4gKHtcbiAgICByZWNpcGVzOiB7fSxcbiAgICByZXBvcnRUb1ZpZXc6IFtdLFxuICAgIHJlcG9ydHM6IFtdLFxuICAgIHJhd21hdGVyaWFsczogW10sXG4gICAgdXNlcjoge30sXG4gIH0pLFxuICAvLyBjb3VsZCBhbHNvIGJlIGRlZmluZWQgYXNcbiAgLy8gc3RhdGU6ICgpID0+ICh7IGNvdW50OiAwIH0pXG4gIGFjdGlvbnM6IHtcbiAgICBzZXRSZWNpcGUocmVjaXBlcykge1xuICAgICAgdGhpcy5yZWNpcGVzID0gcmVjaXBlcztcbiAgICB9LFxuICAgIHNldFJlcG9ydChyZXBvcnQpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHRoaXMucmVwb3J0cy5wdXNoKHJlcG9ydCk7XG4gICAgICAvLyB0aGlzLnJlY2lwZXMgPSBbXTtcbiAgICB9LFxuICAgIHJlbW92ZVJlcG9ydChpbmRleCkge1xuICAgICAgdGhpcy5yZXBvcnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfSxcbiAgICBzZXRVc2VyKHVzZXIpIHtcbiAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgfSxcbiAgICBjbGVhckRhdGEoKSB7XG4gICAgICB0aGlzLnJlY2lwZXMgPSB7fTtcbiAgICAgIHRoaXMucmVwb3J0cyA9IFtdO1xuICAgIH0sXG5cbiAgICBhc3luYyBmZXRjaEJyYW5jaFJhd01hdGVyaWFscyhicmFuY2hJZCkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL2JyYW5jaC8ke2JyYW5jaElkfS9yYXdNYXRlcmlhbHNgKTtcbiAgICAgIHRoaXMucmF3bWF0ZXJpYWxzID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9LFxuXG4gICAgYXN5bmMgZmV0Y2hCYWtlclJlcG9ydCh1c2VySWQpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL2FwaS9icmFuY2gvJHt1c2VySWR9L2Jha2VyUmVwb3J0YCk7XG4gICAgICB0aGlzLnJlcG9ydFRvVmlldyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSxcblxuICAgIGFzeW5jIGZldGNoQWxsUmVwb3J0cygpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvaW5pdGlhbC1iYWtlci1yZXBvcnRcIik7XG4gICAgICB0aGlzLnJlcG9ydFRvVmlldyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSxcblxuICAgIGFzeW5jIGZldGNoRG91Z2hSZXBvcnRzKGJyYW5jaElkKSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoXG4gICAgICAgIGAvYXBpL2JyYW5jaC8ke2JyYW5jaElkfS9iYWtlckRvdWdoUmVwb3J0YFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xuICAgICAgY29uc29sZS5sb2coXCJyZXNwb25zZVwiLCByZXNwb25zZS5kYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xuICAgICAgdGhpcy5yZXBvcnRzID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9LFxuXG4gICAgYXN5bmMgY3JlYXRlUmVwb3J0cygpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YSB0byBzZW5kOlwiLCB0aGlzLnJlcG9ydHMpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFwiYXBpL2luaXRpYWwtYmFrZXItcmVwb3J0XCIsIHtcbiAgICAgICAgICByZXBvcnRzOiB0aGlzLnJlcG9ydHMsXG4gICAgICAgIH0pO1xuICAgICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJSZXBvcnQgc3VjY2Vzc2Z1bGx5IHNlbmRcIixcbiAgICAgICAgICB0aW1lb3V0OiAxMDAwLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXBvcnRzIHRvIGJlIHNhdmVkOlwiLCB0aGlzLnJlcG9ydHMpO1xuICAgICAgICB0aGlzLnJlcG9ydHMgPSBbXTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzYXZpbmcgcmVwb3J0OlwiLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGNvbmZpcm1SZXBvcnQoaWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KGAvYXBpL2NvbmZpcm0taW5pdGlhbC1iYWtlci1yZXBvcnQvJHtpZH1gKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25maXJtaW5nIHJlcG9ydCB3aXRoIElEOlwiLCBpZCk7XG4gICAgICAgIHRoaXMuZmV0Y2hEb3VnaFJlcG9ydHMoKTsgLy8gQ2FsbCB0aGUgbWV0aG9kIGFzIGEgZnVuY3Rpb25cbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhOyAvLyBSZXR1cm4gdGhlIHJlc3BvbnNlIGRhdGFcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjb25maXJtaW5nIHJlcG9ydDpcIiwgZXJyb3IpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGRlY2xpbmVSZXBvcnQoaWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGFwaS5wb3N0KGAvYXBpL2RlY2xpbmUtaW5pdGlhbC1iYWtlci1yZXBvcnQvJHtpZH1gKTtcbiAgICAgICAgdGhpcy5mZXRjaERvdWdoUmVwb3J0cztcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWNsaW5pbmcgcmVwb3J0OlwiLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSxcbiAgfSxc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
