import { d as defineStore, n as ref, P as Plugin, N as Notify } from "./index.c8e2405b.js";
import { api } from "./axios.aa1bce92.js";
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
    try {
      const response = await api.post("/api/raw-materials", data);
      if (response.data.message === "Raw Materials saved successfully") {
        rawMaterials.value.unshift(response.data.rawMaterials);
        Notify.create({
          type: "positive",
          message: "Raw Materials successfully created",
          timeout: 1e3
        });
      } else if (response.data.message === "The RawMaterials name or code already exists.") {
        Notify.create({
          type: "warning",
          message: "The RawMaterials name or code already exists."
        });
      }
    } catch (error) {
      console.log(error);
      Notify.create({
        type: "negative",
        message: "An error occurred while saving the raw materials."
      });
    } finally {
      Plugin.hide();
    }
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
      timeout: 1e3
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
      type: "positive",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3LW1hdGVyaWFsLmQ3M2ViMDBjLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL3Jhdy1tYXRlcmlhbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgTG9hZGluZywgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VSYXdNYXRlcmlhbHNTdG9yZSA9IGRlZmluZVN0b3JlKFwicmF3TWF0ZXJpYWxzXCIsICgpID0+IHtcbiAgY29uc3QgcmF3TWF0ZXJpYWwgPSByZWYobnVsbCk7XG4gIGNvbnN0IHJhd01hdGVyaWFscyA9IHJlZihbXSk7XG4gIGNvbnN0IGluZ3JlZGllbnRzID0gcmVmKFtdKTtcblxuICBjb25zdCBzZWFyY2hSYXdNYXRlcmlhbHMgPSBhc3luYyAoc2VhcmNoUXVlcnkpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9hcGkvc2VhcmNoLXJhd01hdGVyaWFsc2AsIHtcbiAgICAgIHBhcmFtczogeyBrZXl3b3JkOiBzZWFyY2hRdWVyeSB9LFxuICAgIH0pO1xuICAgIHJhd01hdGVyaWFscy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggcmF3ZSBtYXRlcmlhbHNcIiwgcmVzcG9uc2UuZGF0YSk7XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hSYXdNYXRlcmlhbHMgPSBhc3luYyAoKSA9PiB7XG4gICAgLy8gTG9hZGluZy5zaG93KCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9yYXctbWF0ZXJpYWxzXCIpO1xuICAgIHJhd01hdGVyaWFscy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgLy8gTG9hZGluZy5oaWRlKCk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUmF3TWF0ZXJpYWxzID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFwiL2FwaS9yYXctbWF0ZXJpYWxzXCIsIGRhdGEpO1xuXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YS5tZXNzYWdlID09PSBcIlJhdyBNYXRlcmlhbHMgc2F2ZWQgc3VjY2Vzc2Z1bGx5XCIpIHtcbiAgICAgICAgLy8gY29uc3QgcmF3TWF0ZXJpYWxzID0gcmF3TWF0ZXJpYWxzLnZhbHVlLmZpbmQoKGl0ZW0pID0+aXRlbS5pZCA9PT0gZGF0YS5pZClcbiAgICAgICAgcmF3TWF0ZXJpYWxzLnZhbHVlLnVuc2hpZnQocmVzcG9uc2UuZGF0YS5yYXdNYXRlcmlhbHMpO1xuICAgICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJSYXcgTWF0ZXJpYWxzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXCIsXG4gICAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgICAgICAvLyBwb3N0aW9uOiBcInRvcFwiLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHJlc3BvbnNlLmRhdGEubWVzc2FnZSA9PT1cbiAgICAgICAgXCJUaGUgUmF3TWF0ZXJpYWxzIG5hbWUgb3IgY29kZSBhbHJlYWR5IGV4aXN0cy5cIlxuICAgICAgKSB7XG4gICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIFJhd01hdGVyaWFscyBuYW1lIG9yIGNvZGUgYWxyZWFkeSBleGlzdHMuXCIsXG4gICAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNhdmluZyB0aGUgcmF3IG1hdGVyaWFscy5cIixcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVJhd01hdGVyaWFscyA9IGFzeW5jIChpZCwgZGF0YSkgPT4ge1xuICAgIExvYWRpbmcuc2hvdygpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KGAvYXBpL3Jhdy1tYXRlcmlhbHMvJHtpZH1gLCBkYXRhKTtcbiAgICBjb25zdCB1cGRhdGVkUmF3TWF0ZXJpYWwgPSByYXdNYXRlcmlhbHMudmFsdWUuZmluZEluZGV4KFxuICAgICAgKHJhd01hdGVyaWFsKSA9PiByYXdNYXRlcmlhbC5pZCA9PT0gaWRcbiAgICApO1xuICAgIGlmICh1cGRhdGVkUmF3TWF0ZXJpYWwgIT09IC0xKSB7XG4gICAgICByYXdNYXRlcmlhbHMudmFsdWVbdXBkYXRlZFJhd01hdGVyaWFsXSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfVxuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgbWVzc2FnZTogXCJSYXcgTWF0ZXJpYWxzIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICB0aW1lb3V0OiAxMDAwLFxuICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgfSk7XG5cbiAgICBMb2FkaW5nLmhpZGUoKTtcbiAgfTtcblxuICBjb25zdCBkZWxldGVSYXdNYXRlcmlhbHMgPSBhc3luYyAoaWQpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5kZWxldGUoYC9hcGkvcmF3LW1hdGVyaWFscy8ke2lkfWApO1xuICAgIHJhd01hdGVyaWFscy52YWx1ZSA9IHJhd01hdGVyaWFscy52YWx1ZS5maWx0ZXIoXG4gICAgICAocmF3TWF0ZXJpYWwpID0+IHJhd01hdGVyaWFsLmlkICE9PSBpZFxuICAgICk7XG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICBpY29uOiBcIndhcm5pbmdcIixcbiAgICAgIG1lc3NhZ2U6IGBSYXcgTWF0ZXJpYWxzIHN1Y2Nlc3NmdWxseSBkZWxldGVkYCxcbiAgICAgIHRpbWVvdXQ6IDEwMDAsXG4gICAgfSk7XG4gICAgTG9hZGluZy5oaWRlKCk7XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hJbmdyZWRpZW50cyA9IGFzeW5jIChjYXRlZ29yeSkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvaW5ncmVkaWVudHNcIiwgY2F0ZWdvcnkpO1xuICAgIGluZ3JlZGllbnRzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJhd01hdGVyaWFsLFxuICAgIHJhd01hdGVyaWFscyxcbiAgICBpbmdyZWRpZW50cyxcbiAgICBzZWFyY2hSYXdNYXRlcmlhbHMsXG4gICAgY3JlYXRlUmF3TWF0ZXJpYWxzLFxuICAgIGZldGNoUmF3TWF0ZXJpYWxzLFxuICAgIHVwZGF0ZVJhd01hdGVyaWFscyxcbiAgICBkZWxldGVSYXdNYXRlcmlhbHMsXG4gICAgZmV0Y2hJbmdyZWRpZW50cyxcbiAgfTtcbn0pO1xuIl0sIm5hbWVzIjpbIkxvYWRpbmciLCJyYXdNYXRlcmlhbCJdLCJtYXBwaW5ncyI6Ijs7QUFLWSxNQUFDLHVCQUF1QixZQUFZLGdCQUFnQixNQUFNO0FBQ3BFLFFBQU0sY0FBYyxJQUFJLElBQUk7QUFDNUIsUUFBTSxlQUFlLElBQUksQ0FB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
