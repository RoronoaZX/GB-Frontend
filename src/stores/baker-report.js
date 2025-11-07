import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref, computed } from "vue";

export const useBakerReportsStore = defineStore("bakerReportsStore", () => {
  /* ✅ STATE */
  const recipes = ref({});
  const reportToView = ref([]);
  const reports = ref([]);
  const rawmaterials = ref([]);
  const employeeInShift = ref([]);
  const user = ref({});

  const bakerReport = ref({
    data: [],
    pagination: {
      total: 0,
      per_page: 3,
      current_page: 1,
      last_page: 1,
      from: 0,
      to: 0,
    },
  });

  /* ✅ ACTIONS */

  const setRecipe = (data) => {
    recipes.value = data;
  };

  const setReport = (report) => {
    reports.value.push(report);
  };

  const removeReport = (index) => {
    reports.value.splice(index, 1);
  };

  const setUser = (data) => {
    user.value = data;
  };

  const clearData = () => {
    recipes.value = {};
    reports.value = [];
  };

  const fetchBranchRawMaterials = async (branchId) => {
    const response = await api.get(`/api/branch/${branchId}/rawMaterials`);
    rawmaterials.value = response.data;
  };

  const fetchBakerReport = async (
    userId,
    page = 1,
    per_page = 5,
    search = ""
  ) => {
    console.log("userId", userId);
    console.log("page", page);
    console.log("per_page", per_page);
    console.log("search", search);
    try {
      const response = await api.get(`/api/branch/${userId}/bakerReport`, {
        params: { page, per_page: per_page, search: search },
      });

      bakerReport.value.data = response.data;
      console.log("response.data report response", response.data);
      bakerReport.value.pagination = response.data.pagination;
      console.log("bakerReport.value.pagination", bakerReport.value.pagination);

      return response.data;
    } catch (error) {
      console.error("Error fetching baker reports:", error);
    }
  };

  const fetchAllReports = async () => {
    const response = await api.get("/api/initial-baker-report");
    reportToView.value = response.data;
  };

  const fetchDoughReports = async (branchId) => {
    const response = await api.get(`/api/branch/${branchId}/bakerDoughReport`);
    reports.value = response.data;
  };

  const adminAddRecipebakerReport = async (data) => {
    try {
      await api.post("/api/admin-create-admin-insert-recipe-baker-report", {
        reports: data,
      });
      Notify.create({
        type: "positive",
        message: "Report successfully sent",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const adminBakerCreateReports = async (data) => {
    try {
      await api.post("/api/admin-create-baker-report", {
        reports: data,
      });

      Notify.create({
        type: "positive",
        message: "Report successfully sent",
      });

      reports.value = [];
    } catch (error) {
      console.log(error);
    }
  };

  const createReports = async () => {
    try {
      Loading.show();
      await api.post("/api/initial-baker-report", {
        reports: reports.value,
        employee_in_shift: employeeInShift.value,
        overall_kilo: overallKilo.value,
        total_employees: totalEmployeesInShift.value,
      });

      console.log("Reports to be saved reports:", reports.value);
      console.log(
        "Reports to be saved employeeInShift:",
        employeeInShift.value
      );
      console.log("Reports to be saved overallKilo:", overallKilo.value);
      console.log(
        "Reports to be saved totalEmployeesInShift:",
        totalEmployeesInShift.value
      );

      Notify.create({
        type: "positive",
        message: "Report successfully sent",
      });

      reports.value = [];
      employeeInShift.value = [];
    } catch (error) {
      console.error("Error saving report:", error);
      Notify.create({
        type: "negative",
        message: error.response?.data?.message || "ERROR",
      });
    } finally {
      Loading.hide();
    }
  };

  const confirmReport = async (id) => {
    try {
      const res = await api.post(`/api/confirm-initial-baker-report/${id}`);

      if (res.status === 200) {
        const index = reports.value.findIndex((r) => r.id === id);
        if (index !== -1) reports.value.splice(index, 1);
      }

      return res.data;
    } catch (error) {
      console.error("Error confirming report:", error);
      throw error;
    }
  };

  const declineReport = async (id, remark) => {
    try {
      const res = await api.post(`/api/decline-initial-baker-report/${id}`, {
        remark,
      });

      if (res.status === 200) {
        const index = reports.value.findIndex((r) => r.id === id);
        if (index !== -1) reports.value.splice(index, 1);
      }

      return res.data;
    } catch (error) {
      console.error("Error declining report:", error);
    }
  };

  /* ✅ GETTERS (computed) */
  const overallKilo = computed(() =>
    reports.value.reduce((sum, r) => sum + (parseFloat(r.kilo) || 0), 0)
  );

  const totalEmployeesInShift = computed(() => employeeInShift.value.length);

  /* ✅ RETURN ALL */
  return {
    recipes,
    reportToView,
    reports,
    rawmaterials,
    employeeInShift,
    user,
    bakerReport,

    setRecipe,
    setReport,
    removeReport,
    setUser,
    clearData,
    fetchBranchRawMaterials,
    fetchBakerReport,
    fetchAllReports,
    fetchDoughReports,
    adminAddRecipebakerReport,
    adminBakerCreateReports,
    createReports,
    confirmReport,
    declineReport,

    overallKilo,
    totalEmployeesInShift,
  };
});

// import { defineStore } from "pinia";
// import { Loading, Notify } from "quasar";
// import { api } from "src/boot/axios";

// export const useBakerReportsStore = defineStore("bakerReportsStore", {
//   state: () => ({
//     recipes: {},
//     reportToView: [],
//     reports: [],
//     rawmaterials: [],
//     employeeInShift: [],
//     user: {},
//   }),
//   // could also be defined as
//   // state: () => ({ count: 0 })
//   actions: {
//     setRecipe(recipes) {
//       this.recipes = recipes;
//     },
//     setReport(report) {
//       const res = this.reports.push(report);

//       // this.recipes = [];
//     },
//     removeReport(index) {
//       this.reports.splice(index, 1);
//     },
//     setUser(user) {
//       this.user = user;
//     },
//     clearData() {
//       this.recipes = {};
//       this.reports = [];
//     },

//     async fetchBranchRawMaterials(branchId) {
//       const response = await api.get(`/api/branch/${branchId}/rawMaterials`);
//       this.rawmaterials = response.data;
//     },

//     async fetchBakerReport(userId, page, rowsNumber) {
//       try {
//         const response = await api.get(
//           `/api/branch/${userId}/bakerReport` + window.location.search,
//           {
//             params: {
//               page,
//               per_page: rowsNumber,
//             },
//           }
//         );

//         // Update the store/state with paginated response data
//         // this.reportToView = response.data.data;
//         return response.data; // Return the full response for use in the component
//       } catch (error) {
//         console.error("Error fetching baker reports:", error);
//       }
//     },

//     async fetchAllReports() {
//       const response = await api.get("/api/initial-baker-report");
//       this.reportToView = response.data;
//     },

//     async fetchDoughReports(branchId) {
//       const response = await api.get(
//         `/api/branch/${branchId}/bakerDoughReport`
//       );
//       console.log("====================================");
//       console.log("response", response.data);
//       console.log("====================================");
//       this.reports = response.data;
//     },

//     async adminAddRecipebakerReport(data) {
//       console.log("data admin send RecipebakerReport adding ", data);
//       try {
//         const response = await api.post(
//           "/api/admin-create-admin-insert-recipe-baker-report",
//           {
//             reports: data,
//           }
//         );
//         Notify.create({
//           type: "positive",
//           message: "Report successfully send",
//           timeout: 1000,
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     },

//     async adminBakerCreateReports(data) {
//       console.log("data admin send", data);
//       try {
//         console.log("data admin to send:", this.reports);
//         const response = await api.post("/api/admin-create-baker-report", {
//           reports: data,
//         });
//         Notify.create({
//           type: "positive",
//           message: "Report successfully send",
//           timeout: 1000,
//         });

//         // console.log("Reports to be saved:", this.reports);
//         this.reports = [];
//       } catch (error) {
//         console.log(error);
//       }
//     },

//     async createReports() {
//       console.log("data to send:", this.reports);
//       console.log("employeeInShift", this.employeeInShift);
//       console.log("overallkilo:", this.overallKilo);
//       try {
//         console.log("data to send:", this.reports);

//         Loading.show();
//         const response = await api.post("/api/initial-baker-report", {
//           reports: this.reports,
//           employee_in_shift: this.employeeInShift,
//           overall_kilo: this.overallKilo,
//           total_employees: this.totalEmployeesInShift,
//         });
//         Notify.create({
//           type: "positive",
//           message: "Report successfully send",
//           timeout: 1000,
//         });
//         console.log("Reports to be saved reports:", this.reports);
//         console.log(
//           "Reports to be saved employeeInShift:",
//           this.employeeInShift
//         );
//         this.reports = [];
//         this.employeeInShift = [];
//         this.overallKilo = 0;
//         this.totalEmployeesInShift = 0;
//       } catch (error) {
//         console.error("Error saving report:", error);
//         Notify.create({
//           type: "negative",
//           message: error.response.data.message || "ERROR",
//           timeout: 1000,
//         });
//       } finally {
//         Loading.hide();
//       }
//     },

//     async confirmReport(id) {
//       try {
//         const res = await api.post(`/api/confirm-initial-baker-report/${id}`);
//         console.log("Confirming report with ID:", id);
//         if (res.status === 200) {
//           const index = this.reports.findIndex((report) => report.id === id);

//           if (index !== -1) {
//             this.reports.splice(index, 1);
//           }
//         }
//         return res.data; // Return the response data
//       } catch (error) {
//         console.error("Error confirming report:", error);
//         throw error;
//       }
//     },
//     async declineReport(id, remark) {
//       try {
//         const res = await api.post(`/api/decline-initial-baker-report/${id}`, {
//           remark,
//         });

//         if (res.status === 200) {
//           const index = this.reports.findIndex((report) => report.id === id);

//           if (index !== -1) {
//             this.reports.splice(index, 1);
//           }
//         }
//         return res.data;
//       } catch (error) {
//         console.error("Error declining report:", error);
//       }
//     },
//   },

//   getters: {
//     overallKilo(state) {
//       return state.reports.reduce((acc, report) => {
//         const kiloValue = parseFloat(report.kilo) || 0;
//         return acc + kiloValue;
//       }, 0);
//     },

//     totalEmployeesInShift(state) {
//       return state.employeeInShift.length;
//     },
//   },
// });
