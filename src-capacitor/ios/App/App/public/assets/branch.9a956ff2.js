import { d as defineStore, n as ref, g as computed, N as Notify, P as Plugin } from "./index.c8e2405b.js";
import { u as useWarehousesStore } from "./warehouse.f8473ccb.js";
import { api } from "./axios.aa1bce92.js";
import { u as useEmployeeStore } from "./employee.08e2bc37.js";
const useBranchesStore = defineStore("branches", () => {
  const branch = ref(null);
  const branches = ref([]);
  const employeeStore = useEmployeeStore();
  computed(() => employeeStore.employees);
  const warehousesStore = useWarehousesStore();
  const warehouses = computed(() => warehousesStore.warehouses);
  console.log("warehouses", warehouses.value);
  const search = async (keyword) => {
    try {
      console.log("Searching for branch with keyword:", keyword);
      const response = await api.post(`/api/search-branch?keyword=${keyword}`);
      console.log("Search branch:", response);
      if (response && response.data && response.data.length > 0) {
        console.log("Search Results:", response.data);
        branch.value = response.data;
      } else {
        console.log("No employees found or empty response");
        branch.value = [];
      }
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };
  const fetchBranches = async () => {
    const response = await api.get("/api/branches");
    branches.value = response.data;
    console.log("response", response.data);
  };
  const fetchBranchesById = async (id) => {
    const response = await api.get(`/api/branches/${id}`);
    branch.value = response.data;
  };
  const fetchBranchWithEmployee = async () => {
    const response = await api.get(`/api/fetchBranchWithEmployee`);
    branches.value = response.data;
  };
  const createBranches = async (data) => {
    console.log("Data parameters being sent:", data);
    try {
      const response = await api.post("/api/branches", data);
      console.log("create branch", response.data);
      branches.value.unshift(response.data);
      fetchBranches();
      Notify.create({
        type: "positive",
        message: "Branch created successfully",
        timeout: 1e3
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to create branch"
      });
    }
  };
  const updateBranches = async (id, data) => {
    Plugin.show();
    try {
      const response = await api.put(`/api/branches/${id}`, data);
      branches.value = response.data;
      fetchBranches();
      Notify.create({
        type: "positive",
        message: "Branch updated successfully"
      });
    } catch (error) {
      console.log("updateBranches", error);
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to update branch"
      });
    } finally {
      Plugin.hide();
    }
  };
  const deleteBranches = async (id) => {
    Plugin.show();
    try {
      await api.delete(`/api/branches/${id}`);
      branches.value = branches.value.filter((branch2) => branch2.id !== id);
      Notify.create({
        type: "positive",
        message: "Branch successfully delete"
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to delete branch"
      });
    } finally {
      Plugin.hide();
    }
  };
  const fetchWarehouseName = async (warehouse_id) => {
    Plugin.show();
    try {
      const response = await api.get(`/api/branches/${warehouse_id}`);
      return response.data.name;
    } catch (error) {
      return null;
    } finally {
      Plugin.hide();
    }
  };
  return {
    branch,
    branches,
    search,
    fetchBranches,
    createBranches,
    updateBranches,
    deleteBranches,
    fetchWarehouseName,
    fetchBranchesById,
    fetchBranchWithEmployee
  };
});
export { useBranchesStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLjlhOTU2ZmYyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL2JyYW5jaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVdhcmVob3VzZXNTdG9yZSB9IGZyb20gXCIuL3dhcmVob3VzZVwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VFbXBsb3llZVN0b3JlIH0gZnJvbSBcIi4vZW1wbG95ZWVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZUJyYW5jaGVzU3RvcmUgPSBkZWZpbmVTdG9yZShcImJyYW5jaGVzXCIsICgpID0+IHtcbiAgY29uc3QgYnJhbmNoID0gcmVmKG51bGwpO1xuICBjb25zdCBicmFuY2hlcyA9IHJlZihbXSk7XG5cbiAgY29uc3QgZW1wbG95ZWVTdG9yZSA9IHVzZUVtcGxveWVlU3RvcmUoKTtcbiAgY29uc3QgZW1wbG95ZWVzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVTdG9yZS5lbXBsb3llZXMpO1xuICBjb25zdCB3YXJlaG91c2VzU3RvcmUgPSB1c2VXYXJlaG91c2VzU3RvcmUoKTtcbiAgY29uc3Qgd2FyZWhvdXNlcyA9IGNvbXB1dGVkKCgpID0+IHdhcmVob3VzZXNTdG9yZS53YXJlaG91c2VzKTtcbiAgY29uc29sZS5sb2coXCJ3YXJlaG91c2VzXCIsIHdhcmVob3VzZXMudmFsdWUpO1xuXG4gIGNvbnN0IHNlYXJjaCA9IGFzeW5jIChrZXl3b3JkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIGZvciBicmFuY2ggd2l0aCBrZXl3b3JkOlwiLCBrZXl3b3JkKTtcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChgL2FwaS9zZWFyY2gtYnJhbmNoP2tleXdvcmQ9JHtrZXl3b3JkfWApO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCBicmFuY2g6XCIsIHJlc3BvbnNlKTtcblxuICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIFJlc3VsdHM6XCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICBicmFuY2gudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBlbXBsb3llZXMgZm91bmQgb3IgZW1wdHkgcmVzcG9uc2VcIik7XG4gICAgICAgIGJyYW5jaC52YWx1ZSA9IFtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VhcmNoaW5nIGVtcGxveWVlOlwiLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZldGNoQnJhbmNoZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9icmFuY2hlc1wiKTtcbiAgICBicmFuY2hlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgY29uc29sZS5sb2coXCJyZXNwb25zZVwiLCByZXNwb25zZS5kYXRhKTtcblxuICAgIC8vIGJyYW5jaGVzLnZhbHVlID0gcmVzcG9uc2UuZGF0YS5tYXAoKGJyYW5jaCkgPT4ge1xuICAgIC8vICAgY29uc3QgZGF0YSA9IHsgLi4uYnJhbmNoIH07XG4gICAgLy8gICBjb25zdCB3YXJlaG91c2UgPSB3YXJlaG91c2VzLnZhbHVlLmZpbmQoXG4gICAgLy8gICAgICh3YXJlaG91c2UpID0+IHdhcmVob3VzZS5pZCA9PT0gZGF0YS53YXJlaG91c2VfaWRcbiAgICAvLyAgICk7XG5cbiAgICAvLyAgIGRhdGEud2FyZWhvdXNlID0gd2FyZWhvdXNlID8gd2FyZWhvdXNlLm5hbWUgOiBcIk5vIFdhcmVob3VzZVwiO1xuXG4gICAgLy8gICBjb25zdCBlbXBsb3llZSA9IGVtcGxveWVlcy52YWx1ZS5maW5kKFxuICAgIC8vICAgICAoZW1wbG95ZWUpID0+IGVtcGxveWVlLmlkID09PSBkYXRhLmVtcGxveWVlX2lkXG4gICAgLy8gICApO1xuICAgIC8vICAgZGF0YS5lbXBsb3llZSA9IGVtcGxveWVlXG4gICAgLy8gICAgID8gYCR7ZW1wbG95ZWUuZmlyc3RuYW1lfSAke2VtcGxveWVlLmxhc3RuYW1lfWBcbiAgICAvLyAgICAgOiBcIk5vIEVtcGxveWVlIEFzc2lnbmVkXCI7XG5cbiAgICAvLyAgIHJldHVybiBkYXRhO1xuICAgIC8vIH0pO1xuICB9O1xuXG4gIGNvbnN0IGZldGNoQnJhbmNoZXNCeUlkID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL2JyYW5jaGVzLyR7aWR9YCk7XG4gICAgYnJhbmNoLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgfTtcblxuICBjb25zdCBmZXRjaEJyYW5jaFdpdGhFbXBsb3llZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9hcGkvZmV0Y2hCcmFuY2hXaXRoRW1wbG95ZWVgKTtcbiAgICBicmFuY2hlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQnJhbmNoZXMgPSBhc3luYyAoZGF0YSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiRGF0YSBwYXJhbWV0ZXJzIGJlaW5nIHNlbnQ6XCIsIGRhdGEpO1xuICAgIC8vIExvYWRpbmcuc2hvdygpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFwiL2FwaS9icmFuY2hlc1wiLCBkYXRhKTtcbiAgICAgIC8vIGNvbnN0IHdhcmVob3VzZSA9IHdhcmVob3VzZXMudmFsdWUuZmluZChcbiAgICAgIC8vICAgKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGRhdGEud2FyZWhvdXNlX2lkXG4gICAgICAvLyApO1xuICAgICAgLy8gY29uc3QgZW1wbG95ZWUgPSBlbXBsb3llZXMudmFsdWUuZmluZChcbiAgICAgIC8vICAgKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGRhdGEuZW1wbG95ZWVfaWRcbiAgICAgIC8vICk7XG5cbiAgICAgIC8vIGNvbnN0IG5ld0JyYW5jaCA9IHtcbiAgICAgIC8vICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgIC8vICAgd2FyZWhvdXNlOiB3YXJlaG91c2UgPyB3YXJlaG91c2UubmFtZSA6IFwiTm8gV2FyZWhvdXNlXCIsXG4gICAgICAvLyAgIGVtcGxveWVlOiBlbXBsb3llZVxuICAgICAgLy8gICAgID8gYCR7ZW1wbG95ZWUuZmlyc3RuYW1lfSAke2VtcGxveWVlLmxhc3RuYW1lfWBcbiAgICAgIC8vICAgICA6IFwiTm8gRW1wbG95ZWUgQXNzaWduZWRcIixcbiAgICAgIC8vIH07XG4gICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZSBicmFuY2hcIiwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICBicmFuY2hlcy52YWx1ZS51bnNoaWZ0KHJlc3BvbnNlLmRhdGEpO1xuICAgICAgZmV0Y2hCcmFuY2hlcygpO1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJCcmFuY2ggY3JlYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgICAgaWNvbjogXCJlcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBjcmVhdGUgYnJhbmNoXCIsXG4gICAgICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZUJyYW5jaGVzID0gYXN5bmMgKGlkLCBkYXRhKSA9PiB7XG4gICAgTG9hZGluZy5zaG93KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChgL2FwaS9icmFuY2hlcy8ke2lkfWAsIGRhdGEpO1xuXG4gICAgICBicmFuY2hlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBmZXRjaEJyYW5jaGVzKCk7XG4gICAgICAvLyBjb25zdCBpbmRleCA9IGJyYW5jaGVzLnZhbHVlLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWQpO1xuICAgICAgLy8gaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIC8vICAgYnJhbmNoZXMudmFsdWVbaW5kZXhdID0ge1xuICAgICAgLy8gICAgIC4uLmJyYW5jaGVzLnZhbHVlW2luZGV4XSxcbiAgICAgIC8vICAgICAuLi5yZXNwb25zZS5kYXRhLFxuXG4gICAgICAvLyAgICAgd2FyZWhvdXNlOiB3YXJlaG91c2VzLnZhbHVlLmZpbmQoXG4gICAgICAvLyAgICAgICAoaXRlbSkgPT4gaXRlbS5pZCA9PT0gZGF0YS53YXJlaG91c2VfaWRcbiAgICAgIC8vICAgICApLFxuICAgICAgLy8gICB9O1xuICAgICAgLy8gfVxuXG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkJyYW5jaCB1cGRhdGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInVwZGF0ZUJyYW5jaGVzXCIsIGVycm9yKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIGljb246IFwiZXJyb3JcIixcbiAgICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gdXBkYXRlIGJyYW5jaFwiLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlQnJhbmNoZXMgPSBhc3luYyAoaWQpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgYXBpLmRlbGV0ZShgL2FwaS9icmFuY2hlcy8ke2lkfWApO1xuICAgICAgYnJhbmNoZXMudmFsdWUgPSBicmFuY2hlcy52YWx1ZS5maWx0ZXIoKGJyYW5jaCkgPT4gYnJhbmNoLmlkICE9PSBpZCk7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkJyYW5jaCBzdWNjZXNzZnVsbHkgZGVsZXRlXCIsXG4gICAgICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIGljb246IFwiZXJyb3JcIixcbiAgICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gZGVsZXRlIGJyYW5jaFwiLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hXYXJlaG91c2VOYW1lID0gYXN5bmMgKHdhcmVob3VzZV9pZCkgPT4ge1xuICAgIExvYWRpbmcuc2hvdygpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9hcGkvYnJhbmNoZXMvJHt3YXJlaG91c2VfaWR9YCk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5uYW1lO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYnJhbmNoLFxuICAgIGJyYW5jaGVzLFxuICAgIHNlYXJjaCxcbiAgICBmZXRjaEJyYW5jaGVzLFxuICAgIGNyZWF0ZUJyYW5jaGVzLFxuICAgIHVwZGF0ZUJyYW5jaGVzLFxuICAgIGRlbGV0ZUJyYW5jaGVzLFxuICAgIGZldGNoV2FyZWhvdXNlTmFtZSxcbiAgICBmZXRjaEJyYW5jaGVzQnlJZCxcbiAgICBmZXRjaEJyYW5jaFdpdGhFbXBsb3llZSxcbiAgfTtcbn0pO1xuIl0sIm5hbWVzIjpbIkxvYWRpbmciLCJicmFuY2giXSwibWFwcGluZ3MiOiI7Ozs7QUFPWSxNQUFDLG1CQUFtQixZQUFZLFlBQVksTUFBTTtBQUM1RCxRQUFNLFNBQVMsSUFBSSxJQUFJO0FBQ3ZCLFFBQU0sV0FBVyxJQUFJLENBQUEsQ0FBRTtBQUV2QixRQUFNLGdCQUFnQjtBQUNKLFdBQVMsTUFBTSxjQUFjLFNBQVM7QUFDeEQsUUFBTSxrQkFBa0I7QUFDeEIsUUFBTSxhQUFhLFNBQVMsTUFBTSxnQkFBZ0IsVUFBVTtBQUM1RCxVQUFRLElBQUksY0FBYyxXQUFXLEtBQUs7QUFFMUMsUUFBTSxTQUFTLE9BQU8sWUFBWTtBQUNoQyxRQUFJO0FBQ0YsY0FBUSxJQUFJLHNDQUFzQyxPQUFPO0FBRXpELFlBQU0sV0FBVyxNQUFNLElBQUksS0FBSyw4QkFBOEIsU0FBUztBQUV2RSxjQUFRLElBQUksa0JBQWtCLFFBQVE7QUFFdEMsVUFBSSxZQUFZLFNBQVMsUUFBUSxTQUFTLEtBQUssU0FB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
