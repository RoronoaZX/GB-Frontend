import { b as boot, P as Plugin } from "./index.c8e2405b.js";
import { api } from "./axios.aa1bce92.js";
import { u as useBakerReportsStore } from "./baker-report.4c6e60f9.js";
import { u as useSalesReportsStore } from "./sales-report.c65bf2b1.js";
import { u as useSupervisorStore } from "./supervisor.cad69364.js";
var routeGuards = boot(async ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    var _a;
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    Plugin.value = true;
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
          ((_a = error.response) == null ? void 0 : _a.data) || error.message
        );
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        if (to.path !== "/") {
          next("/");
        } else {
          next();
        }
      } finally {
      }
    } else {
      if (to.path !== "/") {
        next("/");
      } else {
        next();
      }
    }
    Plugin.value = false;
  });
});
export { routeGuards as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUtZ3VhcmRzLjI2N2VkOTJjLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm9vdC9yb3V0ZS1ndWFyZHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vdCB9IGZyb20gXCJxdWFzYXIvd3JhcHBlcnNcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCIuL2F4aW9zXCI7XG5pbXBvcnQgeyB1c2VCYWtlclJlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Jha2VyLXJlcG9ydFwiO1xuaW1wb3J0IHsgdXNlU2FsZXNSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9zYWxlcy1yZXBvcnRcIjtcbmltcG9ydCB7IHVzZVN1cGVydmlzb3JTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3N1cGVydmlzb3JcIjtcbi8vIGltcG9ydCB7IHVzZUxvYWRpbmdCYXJTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2xvYWRpbmdcIjtcbmltcG9ydCB7IExvYWRpbmcgfSBmcm9tIFwicXVhc2FyXCI7XG5cbi8vIGNvbnN0IGxvYWRpbmdCYXJTdG9yZSA9IHVzZUxvYWRpbmdCYXJTdG9yZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBib290KGFzeW5jICh7IHJvdXRlciB9KSA9PiB7XG4gIHJvdXRlci5iZWZvcmVFYWNoKGFzeW5jICh0bywgZnJvbSwgbmV4dCkgPT4ge1xuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKTtcbiAgICBjb25zdCByb2xlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJyb2xlXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQm9vdCBGaWxlIC0gUm9sZTpcIiwgcm9sZSk7XG4gICAgLy8gY29uc29sZS5sb2coXCJCb290IEZpbGUgLSBUb2tlbjpcIiwgdG9rZW4pO1xuICAgIExvYWRpbmcudmFsdWUgPSB0cnVlO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gTG9hZGluZy5zaG93KCk7XG4gICAgICAgIC8vIHRoaXMuJHJlZnMuYmFyLnN0YXJ0KCk7XG4gICAgICAgIC8vIGxvYWRpbmdCYXJTdG9yZS5zdGFydCgpOyAvLyBTdGFydCB0aGUgbG9hZGluZyBiYXJcbiAgICAgICAgY29uc3QgdXNlQmFrZXJzUmVwb3J0ID0gdXNlQmFrZXJSZXBvcnRzU3RvcmUoKTtcbiAgICAgICAgY29uc3QgdXNlU2FsZXNSZXBvcnQgPSB1c2VTYWxlc1JlcG9ydHNTdG9yZSgpO1xuICAgICAgICBjb25zdCB1c2VTdXBlcnZpc29yID0gdXNlU3VwZXJ2aXNvclN0b3JlKCk7XG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGFwaS5nZXQoXCIvYXBpL3Byb2ZpbGVcIik7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyOlwiLCB1c2VyLmRhdGEpO1xuICAgICAgICB1c2VCYWtlcnNSZXBvcnQuc2V0VXNlcih1c2VyLmRhdGEpO1xuICAgICAgICB1c2VTYWxlc1JlcG9ydC5zZXRVc2VyKHVzZXIuZGF0YSk7XG4gICAgICAgIHVzZVN1cGVydmlzb3Iuc2V0VXNlcih1c2VyLmRhdGEpO1xuXG4gICAgICAgIGlmICh0by5wYXRoID09PSBcIi9cIikge1xuICAgICAgICAgIGlmIChyb2xlID09PSBcIkFkbWluXCIpIHtcbiAgICAgICAgICAgIG5leHQoXCIvYWRtaW4vZGFzaGJvYXJkXCIpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocm9sZSA9PT0gXCJCYWtlclwiKSB7XG4gICAgICAgICAgICBuZXh0KFwiL2JyYW5jaC9iYWtlclwiKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJvbGUgPT09IFwiQ2FzaGllclwiKSB7XG4gICAgICAgICAgICBuZXh0KFwiL2JyYW5jaC9zYWxlc19sYWR5L3Byb2R1Y3RzXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkVycm9yIGZldGNoaW5nIHVzZXIgcHJvZmlsZTpcIixcbiAgICAgICAgICBlcnJvci5yZXNwb25zZT8uZGF0YSB8fCBlcnJvci5tZXNzYWdlXG4gICAgICAgICk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidG9rZW5cIik7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwicm9sZVwiKTtcbiAgICAgICAgaWYgKHRvLnBhdGggIT09IFwiL1wiKSB7XG4gICAgICAgICAgbmV4dChcIi9cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICAvLyBMb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgLy8gdGhpcy4kcmVmcy5iYXIuc3RvcCgpO1xuICAgICAgICAvLyBsb2FkaW5nQmFyU3RvcmUuc3RvcCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG8ucGF0aCAhPT0gXCIvXCIpIHtcbiAgICAgICAgbmV4dChcIi9cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIExvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6WyJMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7OztBQVVBLElBQUEsY0FBZSxLQUFLLE9BQU8sRUFBRSxhQUFhO0FBQ3hDLFNBQU8sV0FBVyxPQUFPLElBQUksTUFBTSxTQUFTOztBQUMxQyxVQUFNLFFBQVEsYUFBYSxRQUFRLE9BQU87QUFDMUMsVUFBTSxPQUFPLGFBQWEsUUFBUSxNQUFNO0FBR3hDQSxXQUFRLFFBQVE7QUFDaEIsUUFBSSxPQUFPO0FBQ1QsVUFBSTtBQUlGLGNBQU0sa0JBQWtCO0FBQ3hCLGNBQU0saUJBQWlCO0FBQ3ZCLGNBQU0sZ0JBQWdCO0FBRXRCLGNBQU0sT0FBTyxNQUFNLElBQUksSUFBSSxjQUFjO0FBRXpDLGdCQUFRLElBQUksU0FBUyxLQUFLLElBQUk7QUFDOUIsd0JBQWdCLFFBQVEsS0FBSyxJQUFJO0FBQ2pDLHVCQUFlLFFBQVEsS0FBSyxJQUFJO0FBQ2hDLHNCQUFjLFFBQVEsS0FBSyxJQUFJO0FBRS9CLFlBQUksR0FBRyxTQUFTLEtBQUs7QUFDbkIsY0FBSSxTQUFTLFNBQVM7QUFDcEIsaUJBQUssa0JBQWtCO0FBQUEsVUFDbkMsV0FBcUIsU0FBUyxTQUFTO0FBQzNCLGlCQUFLLGVBQWU7QUFBQSxVQUNoQyxXQUFxQixTQUFTLFdBQVc7QUFDN0IsaUJBQUssNkJBQTZCO0FBQUEsVUFDOUMsT0FBaUI7QUFDTDtVQUNEO0FBQUEsUUFDWCxPQUFlO0FBQ0w7UUFDRDtBQUFBLE1BQ0YsU0FBUSxPQUFQO0FBQ0EsZ0JBQVE7QUFBQSxVQUNOO0FBQUEsWUFDQSxXQUFNLGFBQU4sbUJBQWdCLFNBQVEsTUFBTTtBQUFBLFFBQ3hDO0FBQ1EscUJBQWEsV0FBVyxPQUFPO0FBQy9CLHFCQUFhLFdBQVcsTUFBTTtBQUM5QixZQUFJLEdBQUcsU0FBUyxLQUFLO0FBQ25CLGVBQUssR0FBRztBQUFBLFFBQ2xCLE9BQWU7QUFDTDtRQUNEO0FBQUEsTUFDVCxVQUFnQjtBQUFBLE1BSVQ7QUFBQSxJQUNQLE9BQVc7QUFDTCxVQUFJLEdBQUcsU0FBUyxLQUFLO0FBQ25CLGFBQUssR0FBRztBQUFBLE1BQ2hCLE9BQWE7QUFDTDtNQUNEO0FBQUEsSUFDRjtBQUNEQSxXQUFRLFFBQVE7QUFBQSxFQUNwQixDQUFHO0FBQ0gsQ0FBQzs7In0=
