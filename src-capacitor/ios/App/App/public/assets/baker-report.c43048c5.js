import { d as defineStore, N as Notify } from "./index.9b9dbcba.js";
import { api } from "./axios.91431b0b.js";
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
        await this.fetchDoughReports();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFrZXItcmVwb3J0LmM0MzA0OGM1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL2Jha2VyLXJlcG9ydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuLy8gaW1wb3J0IHsgcmVhY3RpdmUgfSBmcm9tIFwidnVlXCI7XG5cbi8vIGV4cG9ydCBjb25zdCB1c2VCYWtlclJlcG9ydHNTdG9yZSA9IGRlZmluZVN0b3JlKFwiYmFrZXJSZXBvcnRzXCIsIGFzeW5jICgpID0+IHtcbi8vICAgY29uc3QgcmVjaXBlcyA9IHJlYWN0aXZlKHtcbi8vICAgICBuYW1lOiBcIlwiLFxuLy8gICAgIHRhcmdldFBjczogXCJcIixcbi8vICAgICBhY3R1YWxUYXJnZXQ6IFwiXCIsXG4vLyAgICAgc2hvcnQ6IFwiXCIsXG4vLyAgICAgb3ZlcjogXCJcIixcbi8vICAgICBraWxvOiBcIlwiLFxuLy8gICAgIGJyZWFkczogW10sXG4vLyAgIH0pO1xuXG4vLyAgIGNvbnN0IHNldFJlY2lwZSA9IGFzeW5jIChyZWNpcGVEYXRhKSA9PiB7XG4vLyAgICAgcmVjaXBlcyA9IHtcbi8vICAgICAgIC4uLnJlY2lwZXMsXG4vLyAgICAgICAuLi5yZWNpcGVEYXRhLFxuLy8gICAgICAgYnJlYWRzOiByZWNpcGVEYXRhLmJyZWFkIHx8IFtdLFxuLy8gICAgIH07XG4vLyAgIH07XG5cbi8vICAgcmV0dXJuIHtcbi8vICAgICByZWNpcGVzLFxuLy8gICAgIHNldFJlY2lwZSxcbi8vICAgfTtcbi8vIH0pO1xuXG5pbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VCYWtlclJlcG9ydHNTdG9yZSA9IGRlZmluZVN0b3JlKFwiYmFrZXJSZXBvcnRzU3RvcmVcIiwge1xuICBzdGF0ZTogKCkgPT4gKHtcbiAgICByZWNpcGVzOiB7fSxcbiAgICByZXBvcnRUb1ZpZXc6IFtdLFxuICAgIHJlcG9ydHM6IFtdLFxuICAgIHJhd21hdGVyaWFsczogW10sXG4gICAgdXNlcjoge30sXG4gIH0pLFxuICAvLyBjb3VsZCBhbHNvIGJlIGRlZmluZWQgYXNcbiAgLy8gc3RhdGU6ICgpID0+ICh7IGNvdW50OiAwIH0pXG4gIGFjdGlvbnM6IHtcbiAgICBzZXRSZWNpcGUocmVjaXBlcykge1xuICAgICAgdGhpcy5yZWNpcGVzID0gcmVjaXBlcztcbiAgICB9LFxuICAgIHNldFJlcG9ydChyZXBvcnQpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHRoaXMucmVwb3J0cy5wdXNoKHJlcG9ydCk7XG4gICAgfSxcbiAgICByZW1vdmVSZXBvcnQoaW5kZXgpIHtcbiAgICAgIHRoaXMucmVwb3J0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH0sXG4gICAgc2V0VXNlcih1c2VyKSB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgIH0sXG5cbiAgICBhc3luYyBmZXRjaEJyYW5jaFJhd01hdGVyaWFscyhicmFuY2hJZCkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL2JyYW5jaC8ke2JyYW5jaElkfS9yYXdNYXRlcmlhbHNgKTtcbiAgICAgIHRoaXMucmF3bWF0ZXJpYWxzID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9LFxuXG4gICAgYXN5bmMgZmV0Y2hCYWtlclJlcG9ydCh1c2VySWQpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL2FwaS9icmFuY2gvJHt1c2VySWR9L2Jha2VyUmVwb3J0YCk7XG4gICAgICB0aGlzLnJlcG9ydFRvVmlldyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSxcblxuICAgIGFzeW5jIGZldGNoQWxsUmVwb3J0cygpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvaW5pdGlhbC1iYWtlci1yZXBvcnRcIik7XG4gICAgICB0aGlzLnJlcG9ydFRvVmlldyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSxcblxuICAgIGFzeW5jIGZldGNoRG91Z2hSZXBvcnRzKGJyYW5jaElkKSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoXG4gICAgICAgIGAvYXBpL2JyYW5jaC8ke2JyYW5jaElkfS9iYWtlckRvdWdoUmVwb3J0YFxuICAgICAgKTtcbiAgICAgIHRoaXMucmVwb3J0cyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSxcblxuICAgIGFzeW5jIGNyZWF0ZVJlcG9ydHMoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRhdGEgdG8gc2VuZDpcIiwgdGhpcy5yZXBvcnRzKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChcImFwaS9pbml0aWFsLWJha2VyLXJlcG9ydFwiLCB7XG4gICAgICAgICAgcmVwb3J0czogdGhpcy5yZXBvcnRzLFxuICAgICAgICB9KTtcbiAgICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUmVwb3J0IHN1Y2Nlc3NmdWxseSBzZW5kXCIsXG4gICAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVwb3J0cyB0byBiZSBzYXZlZDpcIiwgdGhpcy5yZXBvcnRzKTtcbiAgICAgICAgdGhpcy5yZXBvcnRzID0gW107XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2F2aW5nIHJlcG9ydDpcIiwgZXJyb3IpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBjb25maXJtUmVwb3J0KGlkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdChgL2FwaS9jb25maXJtLWluaXRpYWwtYmFrZXItcmVwb3J0LyR7aWR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29uZmlybWluZyByZXBvcnQgd2l0aCBJRDpcIiwgaWQpO1xuICAgICAgICBhd2FpdCB0aGlzLmZldGNoRG91Z2hSZXBvcnRzKCk7IC8vIENhbGwgdGhlIG1ldGhvZCBhcyBhIGZ1bmN0aW9uXG4gICAgICAgIHJldHVybiByZXMuZGF0YTsgLy8gUmV0dXJuIHRoZSByZXNwb25zZSBkYXRhXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY29uZmlybWluZyByZXBvcnQ6XCIsIGVycm9yKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBkZWNsaW5lUmVwb3J0KGlkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBhcGkucG9zdChgL2FwaS9kZWNsaW5lLWluaXRpYWwtYmFrZXItcmVwb3J0LyR7aWR9YCk7XG4gICAgICAgIHRoaXMuZmV0Y2hEb3VnaFJlcG9ydHM7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVjbGluaW5nIHJlcG9ydDpcIiwgZXJyb3IpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdDWSxNQUFDLHVCQUF1QixZQUFZLHFCQUFxQjtBQUFBLEVBQ25FLE9BQU8sT0FBTztBQUFBLElBQ1osU0FBUyxDQUFFO0FBQUEsSUFDWCxjQUFjLENBQUU7QUFBQSxJQUNoQixTQUFTLENBQUU7QUFBQSxJQUNYLGNBQWMsQ0FBRTtBQUFBLElBQ2hCLE1BQU0sQ0FBRTtBQUFBLEVBQ1o7QUFBQSxFQUdFLFNBQVM7QUFBQSxJQUNQLFVBQVUsU0FBUztBQUNqQixXQUFLLFVBQVU7QUFBQSxJQUNoQjtBQUFBLElBQ0QsVUFBVSxRQUFRO0FBQ0osV0FBSyxRQUFRLEtBQUssTUFBTTtBQUFBLElBQ3JDO0FBQUEsSUFDRCxhQUFhLE9BQU87QUFDbEIsV0FBSyxRQUFRLE9BQU8sT0FBTyxDQUFDO0FBQUEsSUFDN0I7QUFBQSxJQUNELFFBQVEsTUFBTTtBQUNaLFdBQUssT0FBTztBQUFBLElBQ2I7QUFBQSxJQUVELE1BQU0sd0JBQXdCLFVBQVU7QUFDdEMsWUFBTSxXQUFXLE1BQU0sSUFBSSxJQUFJLGVBQWUsdUJBQXVCO0FBQ3JFLFdBQUssZUFBZSxTQUFTO0FBQUEsSUFDOUI7QUFBQSxJQUVELE1BQU0saUJBQWlCLFFBQVE7QUFDN0IsWUFBTSxXQUFXLE1BQU0sSUFBSSxJQUFJLGVBQWUsb0JBQW9CO0FBQ2xFLFdBQUssZUFBZSxTQUFTO0FBQUEsSUFDOUI7QUFBQSxJQUVELE1BQU0sa0JBQWtCO0FBQ3RCLFlBQU0sV0FBVyxNQUFNLElBQUksSUFBSSwyQkFBMkI7QUFDMUQsV0FBSyxlQUFlLFNBQVM7QUFBQSxJQUM5QjtBQUFBLElBRUQsTUFBTSxrQkFBa0IsVUFBVTtBQUNoQyxZQUFNLFdBQVcsTUFBTSxJQUFJO0FBQUEsUUFDekIsZUFBZTtBQUFBLE1BQ3ZCO0FBQ00sV0FBSyxVQUFVLFNBQVM7QUFBQSxJQUN6QjtBQUFBLElBRUQsTUFBTSxnQkFBZ0I7QUFDcEIsVUFBSTtBQUNGLGdCQUFRLElBQUksaUJBQWlCLEtBQUssT0FBTztBQUN6QyxjQUFNLFdBQVcsTUFBTSxJQUFJLEtBQUssNEJBQTRCO0FBQUEsVUFDMUQsU0FBUyxLQUFLO0FBQUEsUUFDeEIsQ0FBUztBQUNELGVBQU8sT0FBTztBQUFBLFVBQ1osTUFBTTtBQUFBLFVBQ04sU0FBUztBQUFBLFVBQ1QsU0FBUztBQUFBLFFBQ25CLENBQVM7QUFDRCxnQkFBUSxJQUFJLHdCQUF3QixLQUFLLE9BQU87QUFDaEQsYUFBSyxVQUFVO01BQ2hCLFNBQVEsT0FBUDtBQUNBLGdCQUFRLE1BQU0sd0JBQXdCLEtBQUs7QUFBQSxNQUM1QztBQUFBLElBQ0Y7QUFBQSxJQUVELE1BQU0sY0FBYyxJQUFJO0FBQ3RCLFVBQUk7QUFDRixjQUFNLE1BQU0sTUFBTSxJQUFJLEtBQUsscUNBQXFDLElBQUk7QUFDcEUsZ0JBQVEsSUFBSSw4QkFBOEIsRUFBRTtBQUM1QyxjQUFNLEtBQUs7QUFDWCxlQUFPLElBQUk7QUFBQSxNQUNaLFNBQVEsT0FBUDtBQUNBLGdCQUFRLE1BQU0sNEJBQTRCLEtBQUs7QUFDL0MsY0FBTTtBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUEsSUFDRCxNQUFNLGNBQWMsSUFBSTtBQUN0QixVQUFJO0FBQ0YsY0FBTSxJQUFJLEtBQUsscUNBQXFDLElBQUk7QUFDeEQsYUFBSztBQUFBLE1BQ04sU0FBUSxPQUFQO0FBQ0EsZ0JBQVEsTUFBTSwyQkFBMkIsS0FBSztBQUFBLE1BQy9DO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDSCxDQUFDOzsifQ==
