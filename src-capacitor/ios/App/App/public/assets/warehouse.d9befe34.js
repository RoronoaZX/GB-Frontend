import { d as defineStore, n as ref, N as Notify, P as Plugin } from "./index.9b9dbcba.js";
import { api } from "./axios.91431b0b.js";
const useWarehousesStore = defineStore("warehouses", () => {
  const warehouse = ref(null);
  const warehouses = ref([]);
  const fetchWarehouses = async () => {
    try {
      const response = await api.get("/api/warehouses");
      warehouses.value = response.data;
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to fetch warehouse",
        setTimeout: 1e3
      });
    } finally {
    }
  };
  const createWarehouses = async (data) => {
    Plugin.show();
    try {
      const response = await api.post("/api/warehouses", data);
      warehouses.value.unshift(response.data);
      Notify.create({
        type: "positive",
        message: "Warehouse created successfully",
        setTimeout: 1e3,
        position: "top"
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to create warehouse",
        setTimeout: 1e3,
        position: "top"
      });
    } finally {
      Plugin.hide();
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
        setTimeout: 1e3,
        position: "top"
      });
    } catch (error) {
      Notify.create({
        tyoe: "negative",
        message: "Failed to update warehouse",
        setTimeout: 1e3,
        position: "top"
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
        message: "Warehouse deleted successfully",
        position: "top"
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to delete warehouse",
        position: "top"
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
    deleteWarehouse
  };
});
export { useWarehousesStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyZWhvdXNlLmQ5YmVmZTM0LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL3dhcmVob3VzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgTG9hZGluZywgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VXYXJlaG91c2VzU3RvcmUgPSBkZWZpbmVTdG9yZShcIndhcmVob3VzZXNcIiwgKCkgPT4ge1xuICBjb25zdCB3YXJlaG91c2UgPSByZWYobnVsbCk7XG4gIGNvbnN0IHdhcmVob3VzZXMgPSByZWYoW10pO1xuXG4gIGNvbnN0IGZldGNoV2FyZWhvdXNlcyA9IGFzeW5jICgpID0+IHtcbiAgICAvLyBMb2FkaW5nLnNob3coKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS93YXJlaG91c2VzXCIpO1xuICAgICAgd2FyZWhvdXNlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGZldGNoIHdhcmVob3VzZVwiLFxuICAgICAgICBzZXRUaW1lb3V0OiAxMDAwLFxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIC8vIExvYWRpbmcuaGlkZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVXYXJlaG91c2VzID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChcIi9hcGkvd2FyZWhvdXNlc1wiLCBkYXRhKTtcbiAgICAgIHdhcmVob3VzZXMudmFsdWUudW5zaGlmdChyZXNwb25zZS5kYXRhKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiV2FyZWhvdXNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgIHNldFRpbWVvdXQ6IDEwMDAsXG4gICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGNyZWF0ZSB3YXJlaG91c2VcIixcbiAgICAgICAgc2V0VGltZW91dDogMTAwMCxcbiAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVdhcmVob3VzZXMgPSBhc3luYyAoaWQsIGRhdGEpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KGAvYXBpL3dhcmVob3VzZXMvJHtpZH1gLCBkYXRhKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gd2FyZWhvdXNlcy52YWx1ZS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgd2FyZWhvdXNlcy52YWx1ZVtpbmRleF0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgfVxuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJXYXJlaG91c2UgdXBkYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgc2V0VGltZW91dDogMTAwMCxcbiAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5b2U6IFwibmVnYXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gdXBkYXRlIHdhcmVob3VzZVwiLFxuICAgICAgICBzZXRUaW1lb3V0OiAxMDAwLFxuICAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlV2FyZWhvdXNlID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgTG9hZGluZy5zaG93KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmRlbGV0ZShgL2FwaS93YXJlaG91c2VzLyR7aWR9YCk7XG4gICAgICB3YXJlaG91c2VzLnZhbHVlID0gd2FyZWhvdXNlcy52YWx1ZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IGlkKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiV2FyZWhvdXNlIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGRlbGV0ZSB3YXJlaG91c2VcIixcbiAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgd2FyZWhvdXNlLFxuICAgIHdhcmVob3VzZXMsXG4gICAgZmV0Y2hXYXJlaG91c2VzLFxuICAgIGNyZWF0ZVdhcmVob3VzZXMsXG4gICAgdXBkYXRlV2FyZWhvdXNlcyxcbiAgICBkZWxldGVXYXJlaG91c2UsXG4gIH07XG59KTtcbiJdLCJuYW1lcyI6WyJMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOztBQUtZLE1BQUMscUJBQXFCLFlBQVksY0FBYyxNQUFNO0FBQ2hFLFFBQU0sWUFBWSxJQUFJLElBQUk7QUFDMUIsUUFBTSxhQUFhLElBQUksQ0FBQSxDQUFFO0FBRXpCLFFBQU0sa0JBQWtCLFlBQVk7QUFFbEMsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLElBQUksSUFBSSxpQkFBaUI7QUFDaEQsaUJBQVcsUUFBUSxTQUFTO0FBQUEsSUFDN0IsU0FBUSxPQUFQO0FBQ0EsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsTUFDcEIsQ0FBTztBQUFBLElBQ1AsVUFBYztBQUFBLElBRVQ7QUFBQSxFQUNMO0FBRUUsUUFBTSxtQkFBbUIsT0FBTyxTQUFTO0FBQ3ZDQSxXQUFRLEtBQUk7QUFDWixRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sSUFBSSxLQUFLLG1CQUFtQixJQUFJO0FBQ3ZELGlCQUFXLE1BQU0sUUFBUSxTQUFTLElBQUk7QUFDdEMsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsUUFDWixVQUFVO0FBQUEsTUFDbEIsQ0FBTztBQUFBLElBQ0YsU0FBUSxPQUFQO0FBQ0EsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsUUFDWixVQUFVO0FBQUEsTUFDbEIsQ0FBTztBQUFBLElBQ1AsVUFBYztBQUNSQSxhQUFRLEtBQUk7QUFBQSxJQUNiO0FBQUEsRUFDTDtBQUVFLFFBQU0sbUJBQW1CLE9BQU8sSUFBSSxTQUFTO0FBQzNDQSxXQUFRLEtBQUk7QUFDWixRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sSUFBSSxJQUFJLG1CQUFtQixNQUFNLElBQUk7QUFDNUQsWUFBTSxRQUFRLFdBQVcsTUFBTSxVQUFVLENBQUMsU0FBUyxLQUFLLE9BQU8sRUFBRTtBQUNqRSxVQUFJLFVBQVUsSUFBSTtBQUNoQixtQkFBVyxNQUFNLFNBQVMsU0FBUztBQUFBLE1BQ3BDO0FBQ0QsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsUUFDWixVQUFVO0FBQUEsTUFDbEIsQ0FBTztBQUFBLElBQ0YsU0FBUSxPQUFQO0FBQ0EsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsUUFDWixVQUFVO0FBQUEsTUFDbEIsQ0FBTztBQUFBLElBQ1AsVUFBYztBQUNSQSxhQUFRLEtBQUk7QUFBQSxJQUNiO0FBQUEsRUFDTDtBQUVFLFFBQU0sa0JBQWtCLE9BQU8sT0FBTztBQUNwQ0EsV0FBUSxLQUFJO0FBQ1osUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLElBQUksT0FBTyxtQkFBbUIsSUFBSTtBQUN6RCxpQkFBVyxRQUFRLFdBQVcsTUFBTSxPQUFPLENBQUMsU0FBUyxLQUFLLE9BQU8sRUFBRTtBQUNuRSxhQUFPLE9BQU87QUFBQSxRQUNaLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFVBQVU7QUFBQSxNQUNsQixDQUFPO0FBQUEsSUFDRixTQUFRLE9BQVA7QUFDQSxhQUFPLE9BQU87QUFBQSxRQUNaLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFVBQVU7QUFBQSxNQUNsQixDQUFPO0FBQUEsSUFDUCxVQUFjO0FBQ1JBLGFBQVEsS0FBSTtBQUFBLElBQ2I7QUFBQSxFQUNMO0FBRUUsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFDQSxDQUFDOzsifQ==
