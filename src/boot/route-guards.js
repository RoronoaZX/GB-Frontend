import { boot } from "quasar/wrappers";
import { api } from "./axios";
import { useBakerReportsStore } from "src/stores/baker-report";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useSupervisorStore } from "src/stores/supervisor";

export default boot(async ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    // console.log("Boot File - Role:", role);
    // console.log("Boot File - Token:", token);

    if (token) {
      try {
        const useBakersReport = useBakerReportsStore();
        const useSalesReport = useSalesReportsStore();
        const useSupervisor = useSupervisorStore();
        const user = await api.get("/api/profile");
        console.log("user:", user.data);
        useBakersReport.setUser(user.data);
        useSalesReport.setUser(user.data);
        useSupervisor.setUser(user.data);

        if (to.path === "/") {
          if (role === "Admin") {
            next("/admin/dashboard");
          } else if (role === "Baker") {
            next("/branch/baker");
          } else if (role === "Cashier") {
            next("/branch/sales_lady");
          } else {
            next();
          }
        } else {
          next();
        }
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message
        );
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        if (to.path !== "/") {
          next("/");
        } else {
          next();
        }
      }
    } else {
      if (to.path !== "/") {
        next("/");
      } else {
        next();
      }
    }
  });
});
