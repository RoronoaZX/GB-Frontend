import { d as defineStore, n as ref, P as Plugin, N as Notify } from "./index.9b9dbcba.js";
import { api } from "./axios.91431b0b.js";
const useRawMaterialsStore = defineStore("rawMaterials", () => {
  const rawMaterial = ref(null);
  const rawMaterials = ref([]);
  const ingredients = ref([]);
  const searchRawMaterials = async (searchQuery) => {
    const response = await api.get(`/api/search-rawMaterials`, {
      params: { keyword: searchQuery }
    });
    rawMaterials.value = response.data;
    console.log("Search rawe materials", response.data);
  };
  const fetchRawMaterials = async () => {
    const response = await api.get("/api/raw-materials");
    rawMaterials.value = response.data;
  };
  const createRawMaterials = async (data) => {
    Plugin.show();
    const response = await api.post("/api/raw-materials", data);
    rawMaterials.value.unshift(response.data);
    Notify.create({
      type: "positive",
      message: "Raw Materials successfully created",
      timeout: 1e3,
      postion: "top"
    });
    Plugin.hide();
  };
  const updateRawMaterials = async (id, data) => {
    Plugin.show();
    const response = await api.put(`/api/raw-materials/${id}`, data);
    const updatedRawMaterial = rawMaterials.value.findIndex(
      (rawMaterial2) => rawMaterial2.id === id
    );
    if (updatedRawMaterial !== -1) {
      rawMaterials.value[updatedRawMaterial] = response.data;
    }
    Notify.create({
      type: "positive",
      message: "Raw Materials updated successfully",
      timeout: 1e3,
      position: "top"
    });
    Plugin.hide();
  };
  const deleteRawMaterials = async (id) => {
    Plugin.show();
    await api.delete(`/api/raw-materials/${id}`);
    rawMaterials.value = rawMaterials.value.filter(
      (rawMaterial2) => rawMaterial2.id !== id
    );
    Notify.create({
      type: "negative",
      icon: "warning",
      message: `Raw Materials successfully deleted`,
      timeout: 1e3
    });
    Plugin.hide();
  };
  const fetchIngredients = async (category) => {
    const response = await api.get("/api/ingredients", category);
    ingredients.value = response.data;
  };
  return {
    rawMaterial,
    rawMaterials,
    ingredients,
    searchRawMaterials,
    createRawMaterials,
    fetchRawMaterials,
    updateRawMaterials,
    deleteRawMaterials,
    fetchIngredients
  };
});
export { useRawMaterialsStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3LW1hdGVyaWFsLjdlZjM4MTc2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL3Jhdy1tYXRlcmlhbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgTG9hZGluZywgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VSYXdNYXRlcmlhbHNTdG9yZSA9IGRlZmluZVN0b3JlKFwicmF3TWF0ZXJpYWxzXCIsICgpID0+IHtcbiAgY29uc3QgcmF3TWF0ZXJpYWwgPSByZWYobnVsbCk7XG4gIGNvbnN0IHJhd01hdGVyaWFscyA9IHJlZihbXSk7XG4gIGNvbnN0IGluZ3JlZGllbnRzID0gcmVmKFtdKTtcblxuICBjb25zdCBzZWFyY2hSYXdNYXRlcmlhbHMgPSBhc3luYyAoc2VhcmNoUXVlcnkpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9hcGkvc2VhcmNoLXJhd01hdGVyaWFsc2AsIHtcbiAgICAgIHBhcmFtczogeyBrZXl3b3JkOiBzZWFyY2hRdWVyeSB9LFxuICAgIH0pO1xuICAgIHJhd01hdGVyaWFscy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggcmF3ZSBtYXRlcmlhbHNcIiwgcmVzcG9uc2UuZGF0YSk7XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hSYXdNYXRlcmlhbHMgPSBhc3luYyAoKSA9PiB7XG4gICAgLy8gTG9hZGluZy5zaG93KCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9yYXctbWF0ZXJpYWxzXCIpO1xuICAgIHJhd01hdGVyaWFscy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgLy8gTG9hZGluZy5oaWRlKCk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUmF3TWF0ZXJpYWxzID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL3Jhdy1tYXRlcmlhbHNcIiwgZGF0YSk7XG4gICAgcmF3TWF0ZXJpYWxzLnZhbHVlLnVuc2hpZnQocmVzcG9uc2UuZGF0YSk7XG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICBtZXNzYWdlOiBcIlJhdyBNYXRlcmlhbHMgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWRcIixcbiAgICAgIHRpbWVvdXQ6IDEwMDAsXG4gICAgICBwb3N0aW9uOiBcInRvcFwiLFxuICAgIH0pO1xuXG4gICAgTG9hZGluZy5oaWRlKCk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlUmF3TWF0ZXJpYWxzID0gYXN5bmMgKGlkLCBkYXRhKSA9PiB7XG4gICAgTG9hZGluZy5zaG93KCk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoYC9hcGkvcmF3LW1hdGVyaWFscy8ke2lkfWAsIGRhdGEpO1xuICAgIGNvbnN0IHVwZGF0ZWRSYXdNYXRlcmlhbCA9IHJhd01hdGVyaWFscy52YWx1ZS5maW5kSW5kZXgoXG4gICAgICAocmF3TWF0ZXJpYWwpID0+IHJhd01hdGVyaWFsLmlkID09PSBpZFxuICAgICk7XG4gICAgaWYgKHVwZGF0ZWRSYXdNYXRlcmlhbCAhPT0gLTEpIHtcbiAgICAgIHJhd01hdGVyaWFscy52YWx1ZVt1cGRhdGVkUmF3TWF0ZXJpYWxdID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9XG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICBtZXNzYWdlOiBcIlJhdyBNYXRlcmlhbHMgdXBkYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgIHRpbWVvdXQ6IDEwMDAsXG4gICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICB9KTtcblxuICAgIExvYWRpbmcuaGlkZSgpO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZVJhd01hdGVyaWFscyA9IGFzeW5jIChpZCkgPT4ge1xuICAgIExvYWRpbmcuc2hvdygpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmRlbGV0ZShgL2FwaS9yYXctbWF0ZXJpYWxzLyR7aWR9YCk7XG4gICAgcmF3TWF0ZXJpYWxzLnZhbHVlID0gcmF3TWF0ZXJpYWxzLnZhbHVlLmZpbHRlcihcbiAgICAgIChyYXdNYXRlcmlhbCkgPT4gcmF3TWF0ZXJpYWwuaWQgIT09IGlkXG4gICAgKTtcbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgIGljb246IFwid2FybmluZ1wiLFxuICAgICAgbWVzc2FnZTogYFJhdyBNYXRlcmlhbHMgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWRgLFxuICAgICAgdGltZW91dDogMTAwMCxcbiAgICB9KTtcbiAgICBMb2FkaW5nLmhpZGUoKTtcbiAgfTtcblxuICBjb25zdCBmZXRjaEluZ3JlZGllbnRzID0gYXN5bmMgKGNhdGVnb3J5KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9pbmdyZWRpZW50c1wiLCBjYXRlZ29yeSk7XG4gICAgaW5ncmVkaWVudHMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmF3TWF0ZXJpYWwsXG4gICAgcmF3TWF0ZXJpYWxzLFxuICAgIGluZ3JlZGllbnRzLFxuICAgIHNlYXJjaFJhd01hdGVyaWFscyxcbiAgICBjcmVhdGVSYXdNYXRlcmlhbHMsXG4gICAgZmV0Y2hSYXdNYXRlcmlhbHMsXG4gICAgdXBkYXRlUmF3TWF0ZXJpYWxzLFxuICAgIGRlbGV0ZVJhd01hdGVyaWFscyxcbiAgICBmZXRjaEluZ3JlZGllbnRzLFxuICB9O1xufSk7XG4iXSwibmFt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
