import { d as defineStore, n as ref, N as Notify, P as Plugin } from "./index.c8e2405b.js";
import { api } from "./axios.aa1bce92.js";
const useWarehousesStore = defineStore("warehouses", () => {
  const warehouse = ref(null);
  const warehouses = ref([]);
  const fetchWarehouses = async () => {
    try {
      const response = await api.get("/api/warehouses");
      warehouses.value = response.data;
      console.log("response", response.data);
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to fetch warehouse",
        setTimeout: 1e3
      });
    } finally {
    }
  };
  const fetchWarehouseWithEmployee = async () => {
    const response = await api.get("/api/fetchWarehouseWithEmployee");
    warehouses.value = response.data;
  };
  const createWarehouses = async (data) => {
    console.log("Data parameters being sent:", data);
    try {
      const response = await api.post("/api/warehouses", data);
      console.log("Response from backend:", response.data);
      fetchWarehouses();
    } catch (error) {
      console.error(
        "Error creating warehouse:",
        error.response ? error.response.data : error.message
      );
      Notify.create({
        type: "negative",
        message: "Failed to create warehouse",
        setTimeout: 1e3
      });
    }
  };
  const updateWarehouses = async (id, data) => {
    Plugin.show();
    try {
      const response = await api.put(`/api/warehouses/${id}`, data);
      const index = warehouses.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        warehouses.value[index] = response.data;
      }
      Notify.create({
        type: "positive",
        message: "Warehouse updated successfully",
        setTimeout: 1e3
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to update warehouse",
        setTimeout: 1e3
      });
    } finally {
      Plugin.hide();
    }
  };
  const deleteWarehouse = async (id) => {
    Plugin.show();
    try {
      const response = await api.delete(`/api/warehouses/${id}`);
      warehouses.value = warehouses.value.filter((item) => item.id !== id);
      Notify.create({
        type: "positive",
        message: "Warehouse deleted successfully"
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to delete warehouse"
      });
    } finally {
      Plugin.hide();
    }
  };
  return {
    warehouse,
    warehouses,
    fetchWarehouses,
    createWarehouses,
    updateWarehouses,
    deleteWarehouse,
    fetchWarehouseWithEmployee
  };
});
export { useWarehousesStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyZWhvdXNlLmY4NDczY2NiLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL3dhcmVob3VzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgTG9hZGluZywgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VXYXJlaG91c2VzU3RvcmUgPSBkZWZpbmVTdG9yZShcIndhcmVob3VzZXNcIiwgKCkgPT4ge1xuICBjb25zdCB3YXJlaG91c2UgPSByZWYobnVsbCk7XG4gIGNvbnN0IHdhcmVob3VzZXMgPSByZWYoW10pO1xuXG4gIGNvbnN0IGZldGNoV2FyZWhvdXNlcyA9IGFzeW5jICgpID0+IHtcbiAgICAvLyBMb2FkaW5nLnNob3coKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS93YXJlaG91c2VzXCIpO1xuICAgICAgd2FyZWhvdXNlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBmZXRjaCB3YXJlaG91c2VcIixcbiAgICAgICAgc2V0VGltZW91dDogMTAwMCxcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hXYXJlaG91c2VXaXRoRW1wbG95ZWUgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9mZXRjaFdhcmVob3VzZVdpdGhFbXBsb3llZVwiKTtcbiAgICB3YXJlaG91c2VzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVXYXJlaG91c2VzID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICAvLyBMb2FkaW5nLnNob3coKTtcbiAgICBjb25zb2xlLmxvZyhcIkRhdGEgcGFyYW1ldGVycyBiZWluZyBzZW50OlwiLCBkYXRhKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChcIi9hcGkvd2FyZWhvdXNlc1wiLCBkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgZnJvbSBiYWNrZW5kOlwiLCByZXNwb25zZS5kYXRhKTtcbiAgICAgIGZldGNoV2FyZWhvdXNlcygpO1xuICAgICAgLy8gaWYgKHJlc3BvbnNlLmRhdGEubWVzc2FnZSA9PT0gXCJXYXJlaG91c2Ugc2F2ZSBzdWNjZXNzZnVsbHlcIikge1xuICAgICAgLy8gICB3YXJlaG91c2VzLnZhbHVlLnVuc2hpZnQocmVzcG9uc2UuZGF0YS53YXJlaG91c2UpO1xuICAgICAgLy8gICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIC8vICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAvLyAgICAgbWVzc2FnZTogXCJXYXJlaG91c2UgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgIC8vICAgICBzZXRUaW1lb3V0OiAxMDAwLFxuICAgICAgLy8gICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgLy8gICB9KTtcbiAgICAgIC8vIH0gZWxzZSBpZiAocmVzcG9uc2UuZGF0YS5tZXNzYWdlID09PSBcIldhcmVob3VzZSBhbHJlYWR5IGV4aXN0XCIpIHtcbiAgICAgIC8vICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAvLyAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXG4gICAgICAvLyAgICAgbWVzc2FnZTogXCJXYXJlaG91c2UgYWxyZWFkeSBleGlzdFwiLFxuICAgICAgLy8gICAgIHNldFRpbWVvdXQ6IDEwMDAsXG4gICAgICAvLyAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICAvLyAgIH0pO1xuICAgICAgLy8gfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBcIkVycm9yIGNyZWF0aW5nIHdhcmVob3VzZTpcIixcbiAgICAgICAgZXJyb3IucmVzcG9uc2UgPyBlcnJvci5yZXNwb25zZS5kYXRhIDogZXJyb3IubWVzc2FnZVxuICAgICAgKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGNyZWF0ZSB3YXJlaG91c2VcIixcbiAgICAgICAgc2V0VGltZW91dDogMTAwMCxcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlV2FyZWhvdXNlcyA9IGFzeW5jIChpZCwgZGF0YSkgPT4ge1xuICAgIExvYWRpbmcuc2hvdygpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoYC9hcGkvd2FyZWhvdXNlcy8ke2lkfWAsIGRhdGEpO1xuICAgICAgY29uc3QgaW5kZXggPSB3YXJlaG91c2VzLnZhbHVlLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWQpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB3YXJlaG91c2VzLnZhbHVlW2luZGV4XSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICB9XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIldhcmVob3VzZSB1cGRhdGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICBzZXRUaW1lb3V0OiAxMDAwLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byB1cGRhdGUgd2FyZWhvdXNlXCIsXG4gICAgICAgIHNldFRpbWVvdXQ6IDEwMDAsXG4gICAgICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIExvYWRpbmcuaGlkZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkZWxldGVXYXJlaG91c2UgPSBhc3luYyAoaWQpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZGVsZXRlKGAvYXBpL3dhcmVob3VzZXMvJHtpZH1gKTtcbiAgICAgIHdhcmVob3VzZXMudmFsdWUgPSB3YXJlaG91c2VzLnZhbHVlLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gaWQpO1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJXYXJlaG91c2UgZGVsZXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gZGVsZXRlIHdhcmVob3VzZVwiLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICB3YXJlaG91c2UsXG4gICAgd2FyZWhvdXNlcyxcbiAgICBmZXRjaFdhcmVob3VzZXMsXG4gICAgY3JlYXRlV2FyZWhvdXNlcyxcbiAgICB1cGRhdGVXYXJlaG91c2VzLFxuICAgIGRlbGV0ZVdhcmVob3VzZSxcbiAgICBmZXRjaFdhcmVob3VzZVdpdGhFbXBsb3llZSxcbiAgfTtcbn0pO1xuIl0sIm5hbWVzIjpbIkxvYWRpbmciXSwibWFwcGluZ3MiOiI7O0FBS1ksTUFBQyxxQkFBcUIsWUFBWSxjQUFjLE1BQU07QUFDaEUsUUFBTSxZQUFZLElBQUksSUFBSTtBQUMxQixRQUFNLGFBQWEsSUFBSSxDQUFBLENBQUU7QUFFekIsUUFBTSxrQkFBa0IsWUFBWTtBQUVsQyxRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sSUFBSSxJQUFJLGlCQUFpQjtBQUNoRCxpQkFBVyxRQUFRLFNBQVM7QUFDNUIsY0FBUSxJQUFJLFlBQVksU0FBUyxJQUFJO0FBQUEsSUFDdEMsU0FBUSxPQUFQO0FBQ0EsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsTUFDcEIsQ0FBTztBQUFBLElBQ1AsVUFBYztBQUFBLElBRVQ7QUFBQSxFQUNMO0FBRUUsUUFBTSw2QkFBNkIsWUFBWTtBQUM3QyxVQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksaUNBQWlDO0FBQ2hFLGVBQVcsUUFBUSxTQUFTO0FBQUEsRUFDaEM7QUFFRSxRQUFNLG1CQUFtQixPQUFPLFNBQVM7QUFFdkMsWUFBUSxJQUFJLCtCQUErQixJQUFJO0FBQy9DLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxJQUFJLEtBQUssbUJBQW1CLElBQUk7QUFDdkQsY0FBUSxJQUFJLDBCQUEwQixTQUFTLElBQUk7QUFDbkQ7SUFpQkQsU0FBUSxPQUFQO0FBQ0EsY0FBUTtBQUFBLFFBQ047QUFBQSxRQUNBLE1BQU0sV0FBVyxNQUFNLFNBQVMsT0FBTyxNQUFNO0FBQUEsTUFDckQ7QUFDTSxhQUFPLE9BQU87QUFBQSxRQUNaLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFlBQVk7QUFBQSxNQUVwQixDQUFPO0FBQUEsSUFDRjtBQUFBLEVBQ0w7QUFFRSxRQUFNLG1CQUFtQixPQUFPLElBQUksU0FBUztBQUMzQ0EsV0FBUSxLQUFJO0FBQ1osUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLElBQUksSUFBSSxtQkFBbUIsTUFBTSxJQUFJO0FBQzVELFlBQU0sUUFBUSxXQUFXLE1BQU0sVUFBVSxDQUFDLFNBQVMsS0FBSyxPQUFPLEVBQUU7QUFDakUsVUFBSSxVQUFVLElBQUk7QUFDaEIsbUJBQVcsTUFBTSxTQUFTLFNBQVM7QUFBQSxNQUNwQztBQUNELGFBQU8sT0FBTztBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsWUFBWTtBQUFBLE1BRXBCLENBQU87QUFBQSxJQUNGLFNBQVEsT0FBUDtBQUNBLGFBQU8sT0FBTztBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsWUFBWTtBQUFBLE1BRXBCLENBQU87QUFBQSxJQUNQLFVBQWM7QUFDUkEsYUFBUSxLQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0w7QUFFRSxRQUFNLGtCQUFrQixPQUFPLE9BQU87QUFDcENBLFdBQVEsS0FBSTtBQUNaLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxJQUFJLE9BQU8sbUJBQW1CLElBQUk7QUFDekQsaUJBQVcsUUFBUSxXQUFXLE1BQU0sT0FBTyxDQUFDLFNBQVMsS0FBSyxPQUFPLEVBQUU7QUFDbkUsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFFakIsQ0FBTztBQUFBLElBQ0YsU0FBUSxPQUFQO0FBQ0EsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFFakIsQ0FBTztBQUFBLElBQ1AsVUFBYztBQUNSQSxhQUFRLEtBQUk7QUFBQSxJQUNiO0FBQUEsRUFDTDtBQUVFLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQUNBLENBQUM7OyJ9
