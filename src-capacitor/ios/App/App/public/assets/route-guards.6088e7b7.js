import { b as boot } from "./index.9b9dbcba.js";
import { api } from "./axios.91431b0b.js";
import { u as useBakerReportsStore } from "./baker-report.c43048c5.js";
import { u as useSalesReportsStore } from "./sales-report.ac1d2f23.js";
var routeGuards = boot(async ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log("Boot File - Role:", role);
    if (token) {
      try {
        const useBakersReport = useBakerReportsStore();
        const useSalesReport = useSalesReportsStore();
        const user = await api.get("/api/profile");
        console.log("user:", user.data);
        useBakersReport.setUser(user.data);
        useSalesReport.setUser(user.data);
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
export { routeGuards as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUtZ3VhcmRzLjYwODhlN2I3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm9vdC9yb3V0ZS1ndWFyZHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vdCB9IGZyb20gXCJxdWFzYXIvd3JhcHBlcnNcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCIuL2F4aW9zXCI7XG5pbXBvcnQgeyB1c2VCYWtlclJlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Jha2VyLXJlcG9ydFwiO1xuaW1wb3J0IHsgdXNlU2FsZXNSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9zYWxlcy1yZXBvcnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgYm9vdChhc3luYyAoeyByb3V0ZXIgfSkgPT4ge1xuICByb3V0ZXIuYmVmb3JlRWFjaChhc3luYyAodG8sIGZyb20sIG5leHQpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIik7XG4gICAgY29uc3Qgcm9sZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicm9sZVwiKTtcbiAgICBjb25zb2xlLmxvZyhcIkJvb3QgRmlsZSAtIFJvbGU6XCIsIHJvbGUpO1xuXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VCYWtlcnNSZXBvcnQgPSB1c2VCYWtlclJlcG9ydHNTdG9yZSgpO1xuICAgICAgICBjb25zdCB1c2VTYWxlc1JlcG9ydCA9IHVzZVNhbGVzUmVwb3J0c1N0b3JlKCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9wcm9maWxlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInVzZXI6XCIsIHVzZXIuZGF0YSk7XG4gICAgICAgIHVzZUJha2Vyc1JlcG9ydC5zZXRVc2VyKHVzZXIuZGF0YSk7XG4gICAgICAgIHVzZVNhbGVzUmVwb3J0LnNldFVzZXIodXNlci5kYXRhKTtcblxuICAgICAgICBpZiAodG8ucGF0aCA9PT0gXCIvXCIpIHtcbiAgICAgICAgICBpZiAocm9sZSA9PT0gXCJBZG1pblwiKSB7XG4gICAgICAgICAgICBuZXh0KFwiL2FkbWluL2Rhc2hib2FyZFwiKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJvbGUgPT09IFwiQmFrZXJcIikge1xuICAgICAgICAgICAgbmV4dChcIi9icmFuY2gvYmFrZXJcIik7XG4gICAgICAgICAgfSBlbHNlIGlmIChyb2xlID09PSBcIkNhc2hpZXJcIikge1xuICAgICAgICAgICAgbmV4dChcIi9icmFuY2gvc2FsZXNfbGFkeVwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidG9rZW5cIik7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwicm9sZVwiKTtcbiAgICAgICAgaWYgKHRvLnBhdGggIT09IFwiL1wiKSB7XG4gICAgICAgICAgbmV4dChcIi9cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0by5wYXRoICE9PSBcIi9cIikge1xuICAgICAgICBuZXh0KFwiL1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLElBQUEsY0FBZSxLQUFLLE9BQU8sRUFBRSxhQUFhO0FBQ3hDLFNBQU8sV0FBVyxPQUFPLElBQUksTUFBTSxTQUFTO0FBQzFDLFVBQU0sUUFBUSxhQUFhLFFBQVEsT0FBTztBQUMxQyxVQUFNLE9BQU8sYUFBYSxRQUFRLE1BQU07QUFDeEMsWUFBUSxJQUFJLHFCQUFxQixJQUFJO0FBRXJDLFFBQUksT0FBTztBQUNULFVBQUk7QUFDRixjQUFNLGtCQUFrQjtBQUN4QixjQUFNLGlCQUFpQjtBQUN2QixjQUFNLE9BQU8sTUFBTSxJQUFJLElBQUksY0FBYztBQUN6QyxnQkFBUSxJQUFJLFNBQVMsS0FBSyxJQUFJO0FBQzlCLHdCQUFnQixRQUFRLEtBQUssSUFBSTtBQUNqQyx1QkFBZSxRQUFRLEtBQUssSUFBSTtBQUVoQyxZQUFJLEdBQUcsU0FBUyxLQUFLO0FBQ25CLGNBQUksU0FBUyxTQUFTO0FBQ3BCLGlCQUFLLGtCQUFrQjtBQUFBLFVBQ25DLFdBQXFCLFNBQVMsU0FBUztBQUMzQixpQkFBSyxlQUFlO0FBQUEsVUFDaEMsV0FBcUIsU0FBUyxXQUFXO0FBQzdCLGlCQUFLLG9CQUFvQjtBQUFBLFVBQ3JDLE9BQWlCO0FBQ0w7VUFDRDtBQUFBLFFBQ1gsT0FBZTtBQUNMO1FBQ0Q7QUFBQSxNQUNGLFNBQVEsT0FBUDtBQUNBLHFCQUFhLFdBQVcsT0FBTztBQUMvQixxQkFBYSxXQUFXLE1BQU07QUFDOUIsWUFBSSxHQUFHLFNBQVMsS0FBSztBQUNuQixlQUFLLEdBQUc7QUFBQSxRQUNsQixPQUFlO0FBQ0w7UUFDRDtBQUFBLE1BQ0Y7QUFBQSxJQUNQLE9BQVc7QUFDTCxVQUFJLEdBQUcsU0FBUyxLQUFLO0FBQ25CLGFBQUssR0FBRztBQUFBLE1BQ2hCLE9BQWE7QUFDTDtNQUNEO0FBQUEsSUFDRjtBQUFBLEVBQ0wsQ0FBRztBQUNILENBQUM7OyJ9
