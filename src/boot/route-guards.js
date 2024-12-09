import { boot } from "quasar/wrappers";
import { api } from "./axios";
import { useBakerReportsStore } from "src/stores/baker-report";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useSupervisorStore } from "src/stores/supervisor";
import { useCakeMakerReportStore } from "src/stores/cake-maker-report";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
// import { useLoadingBarStore } from "src/stores/loading";
import { Loading } from "quasar";

// const loadingBarStore = useLoadingBarStore();

export default boot(async ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    // const uuid = localStorage.getItem("uuid");
    // console.log("Boot File - Role:", role);
    // console.log("Boot File - Token:", token);
    Loading.value = true;
    if (token) {
      try {
        // Loading.show();
        // this.$refs.bar.start();
        // loadingBarStore.start(); // Start the loading bar
        const useBakersReport = useBakerReportsStore();
        const useSalesReport = useSalesReportsStore();
        const useSupervisor = useSupervisorStore();
        const useCakeMakerReport = useCakeMakerReportStore();
        const useWarehouseRawMaterials = useWarehouseRawMaterialsStore();

        const user = await api.get("/api/profile");

        console.log("userss:", user.data);
        const deviceData = user.data.device;
        console.log("device:", deviceData);

        useBakersReport.setUser(user.data);
        useSalesReport.setUser(user.data);
        useSupervisor.setUser(user.data);
        useCakeMakerReport.setUser(user.data);
        useWarehouseRawMaterials.setUser(user.data);

        if (to.path === "/") {
          if (role === "Admin") {
            next("/admin/dashboard");
          } else if (role === "Baker") {
            next("/branch/baker");
          } else if (role === "Cake Maker") {
            next("/branch/cake_maker");
          } else if (role === "Cashier") {
            next("/branch/sales_lady/products");
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
      } finally {
        // Loading.hide();
        // this.$refs.bar.stop();
        // loadingBarStore.stop();
      }
    } else {
      if (to.path !== "/") {
        next("/");
      } else {
        next();
      }
    }
    Loading.value = false;
  });
});
