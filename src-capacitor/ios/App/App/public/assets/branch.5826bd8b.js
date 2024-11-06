import { d as defineStore, n as ref, g as computed, N as Notify, P as Plugin } from "./index.9b9dbcba.js";
import { u as useWarehousesStore } from "./warehouse.d9befe34.js";
import { api } from "./axios.91431b0b.js";
const useBranchesStore = defineStore("branches", () => {
  const branch = ref(null);
  const branches = ref([]);
  const warehousesStore = useWarehousesStore();
  const warehouses = computed(() => warehousesStore.warehouses);
  console.log("warehouses", warehouses.value);
  const fetchBranches = async () => {
    const response = await api.get("/api/branches");
    branches.value = response.data.map((branch2) => {
      const data = { ...branch2 };
      const warehouse = warehouses.value.find(
        (warehouse2) => warehouse2.id === data.warehouse_id
      );
      data.warehouse = warehouse ? warehouse.name : "No Warehouse";
      return data;
    });
  };
  const fetchBranchesById = async (id) => {
    const response = await api.get(`/api/branches/${id}`);
    branch.value = response.data;
  };
  const createBranches = async (data) => {
    try {
      const response = await api.post("/api/branches", data);
      const warehouse = warehouses.value.find(
        (item) => item.id === data.warehouse_id
      );
      const newBranch = {
        ...response.data,
        warehouse: warehouse ? warehouse.name : "No Warehouse"
      };
      console.log("create branch", newBranch);
      branches.value.unshift(newBranch);
      Notify.create({
        type: "positive",
        message: "Branch created successfully",
        timeout: 1e3,
        position: "top"
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to create branch",
        position: "top"
      });
    } finally {
      Plugin.hide();
    }
  };
  const updateBranches = async (id, data) => {
    Plugin.show();
    try {
      await api.put(`/api/branches/${id}`, data);
      const index = branches.value.findIndex((item) => item.id === id);
      if (index > -1) {
        branches.value[index] = {
          ...branches.value[index],
          ...data,
          waarehouse: warehouses.value.find(
            (item) => item.id === data.warehouse_id
          )
        };
      }
      Notify.create({
        type: "positive",
        message: "Branch updated successfully",
        position: "top"
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to update branch",
        position: "top"
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
        message: "Branch successfully delete",
        position: "top"
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to delete branch",
        position: "top"
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
    fetchBranches,
    createBranches,
    updateBranches,
    deleteBranches,
    fetchWarehouseName,
    fetchBranchesById
  };
});
export { useBranchesStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLjU4MjZiZDhiLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL2JyYW5jaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVdhcmVob3VzZXNTdG9yZSB9IGZyb20gXCIuL3dhcmVob3VzZVwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VCcmFuY2hlc1N0b3JlID0gZGVmaW5lU3RvcmUoXCJicmFuY2hlc1wiLCAoKSA9PiB7XG4gIGNvbnN0IGJyYW5jaCA9IHJlZihudWxsKTtcbiAgY29uc3QgYnJhbmNoZXMgPSByZWYoW10pO1xuXG4gIGNvbnN0IHdhcmVob3VzZXNTdG9yZSA9IHVzZVdhcmVob3VzZXNTdG9yZSgpO1xuICBjb25zdCB3YXJlaG91c2VzID0gY29tcHV0ZWQoKCkgPT4gd2FyZWhvdXNlc1N0b3JlLndhcmVob3VzZXMpO1xuICBjb25zb2xlLmxvZyhcIndhcmVob3VzZXNcIiwgd2FyZWhvdXNlcy52YWx1ZSk7XG5cbiAgY29uc3QgZmV0Y2hCcmFuY2hlcyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoXCIvYXBpL2JyYW5jaGVzXCIpO1xuICAgIGJyYW5jaGVzLnZhbHVlID0gcmVzcG9uc2UuZGF0YS5tYXAoKGJyYW5jaCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHsgLi4uYnJhbmNoIH07XG4gICAgICBjb25zdCB3YXJlaG91c2UgPSB3YXJlaG91c2VzLnZhbHVlLmZpbmQoXG4gICAgICAgICh3YXJlaG91c2UpID0+IHdhcmVob3VzZS5pZCA9PT0gZGF0YS53YXJlaG91c2VfaWRcbiAgICAgICk7XG4gICAgICBkYXRhLndhcmVob3VzZSA9IHdhcmVob3VzZSA/IHdhcmVob3VzZS5uYW1lIDogXCJObyBXYXJlaG91c2VcIjtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGZldGNoQnJhbmNoZXNCeUlkID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL2JyYW5jaGVzLyR7aWR9YCk7XG4gICAgYnJhbmNoLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVCcmFuY2hlcyA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL2JyYW5jaGVzXCIsIGRhdGEpO1xuICAgICAgY29uc3Qgd2FyZWhvdXNlID0gd2FyZWhvdXNlcy52YWx1ZS5maW5kKFxuICAgICAgICAoaXRlbSkgPT4gaXRlbS5pZCA9PT0gZGF0YS53YXJlaG91c2VfaWRcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IG5ld0JyYW5jaCA9IHtcbiAgICAgICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgd2FyZWhvdXNlOiB3YXJlaG91c2UgPyB3YXJlaG91c2UubmFtZSA6IFwiTm8gV2FyZWhvdXNlXCIsXG4gICAgICB9O1xuICAgICAgY29uc29sZS5sb2coXCJjcmVhdGUgYnJhbmNoXCIsIG5ld0JyYW5jaCk7XG4gICAgICBicmFuY2hlcy52YWx1ZS51bnNoaWZ0KG5ld0JyYW5jaCk7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkJyYW5jaCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICB0aW1lb3V0OiAxMDAwLFxuICAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBpY29uOiBcImVycm9yXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGNyZWF0ZSBicmFuY2hcIixcbiAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZUJyYW5jaGVzID0gYXN5bmMgKGlkLCBkYXRhKSA9PiB7XG4gICAgTG9hZGluZy5zaG93KCk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGFwaS5wdXQoYC9hcGkvYnJhbmNoZXMvJHtpZH1gLCBkYXRhKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gYnJhbmNoZXMudmFsdWUuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBpZCk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBicmFuY2hlcy52YWx1ZVtpbmRleF0gPSB7XG4gICAgICAgICAgLi4uYnJhbmNoZXMudmFsdWVbaW5kZXhdLFxuICAgICAgICAgIC4uLmRhdGEsXG5cbiAgICAgICAgICB3YWFyZWhvdXNlOiB3YXJlaG91c2VzLnZhbHVlLmZpbmQoXG4gICAgICAgICAgICAoaXRlbSkgPT4gaXRlbS5pZCA9PT0gZGF0YS53YXJlaG91c2VfaWRcbiAgICAgICAgICApLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJCcmFuY2ggdXBkYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgICAgaWNvbjogXCJlcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byB1cGRhdGUgYnJhbmNoXCIsXG4gICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIExvYWRpbmcuaGlkZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkZWxldGVCcmFuY2hlcyA9IGFzeW5jIChpZCkgPT4ge1xuICAgIExvYWRpbmcuc2hvdygpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBhcGkuZGVsZXRlKGAvYXBpL2JyYW5jaGVzLyR7aWR9YCk7XG4gICAgICBicmFuY2hlcy52YWx1ZSA9IGJyYW5jaGVzLnZhbHVlLmZpbHRlcigoYnJhbmNoKSA9PiBicmFuY2guaWQgIT09IGlkKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiQnJhbmNoIHN1Y2Nlc3NmdWxseSBkZWxldGVcIixcbiAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgICAgaWNvbjogXCJlcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBkZWxldGUgYnJhbmNoXCIsXG4gICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIExvYWRpbmcuaGlkZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmZXRjaFdhcmVob3VzZU5hbWUgPSBhc3luYyAod2FyZWhvdXNlX2lkKSA9PiB7XG4gICAgTG9hZGluZy5zaG93KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL2FwaS9icmFuY2hlcy8ke3dhcmVob3VzZV9pZH1gKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLm5hbWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBicmFuY2gsXG4gICAgYnJhbmNoZXMsXG4gICAgZmV0Y2hCcmFuY2hlcyxcbiAgICBjcmVhdGVCcmFuY2hlcyxcbiAgICB1cGRhdGVCcmFuY2hlcyxcbiAgICBkZWxldGVCcmFuY2hlcyxcbiAgICBmZXRjaFdhcmVob3VzZU5hbWUsXG4gICAgZmV0Y2hCcmFuY2hlc0J5SWQsXG4gIH07XG59KTtcbiJdLCJuYW1lcyI6WyJicmFuY2giLCJ3YXJlaG91c2UiLCJMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7QUFNWSxNQUFDLG1CQUFtQixZQUFZLFlBQVksTUFBTTtBQUM1RCxRQUFNLFNBQVMsSUFBSSxJQUFJO0FBQ3ZCLFFBQU0sV0FBVyxJQUFJLENBQUEsQ0FBRTtBQUV2QixRQUFNLGtCQUFrQjtBQUN4QixRQUFNLGFBQWEsU0FBUyxNQUFNLGdCQUFnQixVQUFVO0FBQzVELFVBQVEsSUFBSSxjQUFjLFdBQVcsS0FBSztBQUUxQyxRQUFNLGdCQUFnQixZQUFZO0FBQ2hDLFVBQU0sV0FBVyxNQUFNLElBQUksSUFBSSxlQUFlO0FBQzlDLGFBQVMsUUFBUSxTQUFTLEtBQUssSUFBSSxDQUFDQSxZQUFXO0FBQzdDLFlBQU0sT0FBTyxFQUFFLEdBQUdBO0FBQ2xCLFlBQU0sWUFBWSxXQUFXLE1BQU07QUFBQSxRQUNqQyxDQUFDQyxlQUFjQSxXQUFVLE9BQU8sS0FBSztBQUFBLE1BQzdDO0FBQ00sV0FBSyxZQUFZLFlBQVksVUFBVSxPQUFPO0FBQzlDLGFBQU87QUFBQSxJQUNiLENBQUs7QUFBQSxFQUNMO0FBRUUsUUFBTSxvQkFBb0IsT0FBTyxPQUFPO0FBQ3RDLFVBQU0sV0FBVyxNQUFNLElBQUksSUFBSSxpQkFB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
