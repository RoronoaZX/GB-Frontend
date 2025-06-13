// import { boot } from "quasar/wrappers";
// import { api } from "./axios";
// import { useBakerReportsStore } from "src/stores/baker-report";
// import { useSalesReportsStore } from "src/stores/sales-report";
// import { useSupervisorStore } from "src/stores/supervisor";
// import { useCakeMakerReportStore } from "src/stores/cake-maker-report";
// import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
// // import { useLoadingBarStore } from "src/stores/loading";
// import { Loading } from "quasar";

// // const loadingBarStore = useLoadingBarStore();

// export default boot(async ({ router }) => {
//   router.beforeEach(async (to, from, next) => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     // const uuid = localStorage.getItem("uuid");
//     // console.log("Boot File - Role:", role);
//     // console.log("Boot File - Token:", token);
//     Loading.value = true;
//     if (token) {
//       try {
//         // Loading.show();
//         // this.$refs.bar.start();
//         // loadingBarStore.start(); // Start the loading bar
//         const useBakersReport = useBakerReportsStore();
//         const useSalesReport = useSalesReportsStore();
//         const useSupervisor = useSupervisorStore();
//         const useCakeMakerReport = useCakeMakerReportStore();
//         const useWarehouseRawMaterials = useWarehouseRawMaterialsStore();

//     if (token && uuid) {
//       try {
//         // Make API call with the UUID in the header
//         const user = await api.get("/api/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,  // Include the token in the header
//             "Device-UUID": uuid, // Add the UUID in the header
//           }
//         });

//         console.log("userss:", user.data);
//         const deviceData = user.data.device;
//         console.log("device:", deviceData);

//         useBakersReport.setUser(user.data);
//         useSalesReport.setUser(user.data);
//         useSupervisor.setUser(user.data);
//         useCakeMakerReport.setUser(user.data);
//         useWarehouseRawMaterials.setUser(user.data);

//         if (to.path === "/") {
//           if (role === "Admin") {
//             next("/admin/dashboard");
//           } else if (role === "Baker") {
//             next("/branch/baker");
//           } else if (role === "Cake Maker") {
//             next("/branch/cake_maker");
//           } else if (role === "Cashier") {
//             next("/branch/sales_lady/products");
//           } else {
//             next();
//           }
//         } else {
//           next();
//         }
//       } catch (error) {
//         console.error(
//           "Error fetching user profile:",
//           error.response?.data || error.message
//         );
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//         if (to.path !== "/") {
//           next("/");
//         } else {
//           next();
//         }
//       } finally {
//         // Loading.hide();
//         // this.$refs.bar.stop();
//         // loadingBarStore.stop();
//       }
//     } else {
//       if (to.path !== "/") {
//         next("/");
//       } else {
//         next();
//       }
//     }
//     Loading.value = false;
//   });
// });
import { boot } from "quasar/wrappers";
import { api } from "./axios";
import { useUsersStore } from "src/stores/user";
import { useBakerReportsStore } from "src/stores/baker-report";
import { useWarehousesStore } from "src/stores/warehouse";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useSupervisorStore } from "src/stores/supervisor";
import { useCakeMakerReportStore } from "src/stores/cake-maker-report";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import { useDTRStore } from "src/stores/dtr";
import { Loading } from "quasar";

export default boot(async ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const uuid = localStorage.getItem("uuid"); // Retrieve UUID from localStorage

    Loading.value = true;

    if (token && uuid) {
      try {
        // Make API call with the UUID in the header
        const user = await api.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
            "Device-UUID": uuid, // Add the UUID in the header
          },
        });

        console.log("userss:", user.data);
        const deviceData = user.data.device;
        console.log("device:", deviceData);

        // Set user data to stores
        useUsersStore().setUser(user.data);
        useBakerReportsStore().setUser(user.data);
        useWarehousesStore().setUser(user.data);
        useSalesReportsStore().setUser(user.data);
        useSupervisorStore().setUser(user.data);
        useCakeMakerReportStore().setUser(user.data);
        useWarehouseRawMaterialsStore().setUser(user.data);
        useDTRStore().setUser(user.data);

        // Role-based routing
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
        Loading.value = false;
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
