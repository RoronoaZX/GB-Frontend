import { d as defineStore, n as ref, P as Plugin, N as Notify } from "./index.9b9dbcba.js";
import { api } from "./axios.91431b0b.js";
const useRecipeStore = defineStore("recipes", () => {
  const recipe = ref(null);
  const recipes = ref([]);
  const fetchRecipes = async () => {
    const response = await api.get("/api/recipes");
    recipes.value = response.data;
  };
  const createRecipe = async (data) => {
    try {
      Plugin.show();
      const response = await api.post("/api/recipes", data);
      const newRecipe = {
        ...response.data,
        bread_groups: data.bread_groups || [],
        ingredient_groups: data.ingredient_groups || []
      };
      recipes.value.unshift(newRecipe);
    } catch (error) {
      console.error("User Error message: ", error);
    } finally {
      Plugin.hide();
    }
  };
  const deleteRecipe = async (id) => {
    Plugin.show();
    try {
      const response = await api.delete(`/api/recipes/${id}`);
      recipes.value = recipes.value.filter((recipe2) => recipe2.id !== id);
      Notify.create({
        type: "negative",
        icon: "warning",
        message: "Recipe succesfully deleted",
        timeout: 1e3,
        position: "top-right"
      });
    } catch (error) {
      Notify.create({
        message: `Failed to delete item: ${error.message}`,
        type: "negative",
        position: "top-right"
      });
    } finally {
      Plugin.hide();
    }
  };
  const searchRecipe = async (searchQuery) => {
    const response = await api.get(`/api/search-recipes`, {
      params: { keyword: searchQuery }
    });
    recipes.value = response.data;
    console.log("recipe:", response.data);
  };
  return {
    recipe,
    recipes,
    fetchRecipes,
    createRecipe,
    deleteRecipe,
    searchRecipe
  };
});
export { useRecipeStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjaXBlLjc4MTY0Y2VlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL3JlY2lwZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuaW1wb3J0IHsgTG9hZGluZywgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuXG5leHBvcnQgY29uc3QgdXNlUmVjaXBlU3RvcmUgPSBkZWZpbmVTdG9yZShcInJlY2lwZXNcIiwgKCkgPT4ge1xuICBjb25zdCByZWNpcGUgPSByZWYobnVsbCk7XG4gIGNvbnN0IHJlY2lwZXMgPSByZWYoW10pO1xuXG4gIGNvbnN0IGZldGNoUmVjaXBlcyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoXCIvYXBpL3JlY2lwZXNcIik7XG4gICAgcmVjaXBlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUmVjaXBlID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICB0cnkge1xuICAgICAgTG9hZGluZy5zaG93KCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFwiL2FwaS9yZWNpcGVzXCIsIGRhdGEpO1xuXG4gICAgICBjb25zdCBuZXdSZWNpcGUgPSB7XG4gICAgICAgIC4uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgIGJyZWFkX2dyb3VwczogZGF0YS5icmVhZF9ncm91cHMgfHwgW10sXG4gICAgICAgIGluZ3JlZGllbnRfZ3JvdXBzOiBkYXRhLmluZ3JlZGllbnRfZ3JvdXBzIHx8IFtdLFxuICAgICAgfTtcbiAgICAgIHJlY2lwZXMudmFsdWUudW5zaGlmdChuZXdSZWNpcGUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVXNlciBFcnJvciBtZXNzYWdlOiBcIiwgZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlUmVjaXBlID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgTG9hZGluZy5zaG93KCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZGVsZXRlKGAvYXBpL3JlY2lwZXMvJHtpZH1gKTtcbiAgICAgIHJlY2lwZXMudmFsdWUgPSByZWNpcGVzLnZhbHVlLmZpbHRlcigocmVjaXBlKSA9PiByZWNpcGUuaWQgIT09IGlkKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIGljb246IFwid2FybmluZ1wiLFxuICAgICAgICBtZXNzYWdlOiBcIlJlY2lwZSBzdWNjZXNmdWxseSBkZWxldGVkXCIsXG4gICAgICAgIHRpbWVvdXQ6IDEwMDAsXG4gICAgICAgIHBvc2l0aW9uOiBcInRvcC1yaWdodFwiLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICBtZXNzYWdlOiBgRmFpbGVkIHRvIGRlbGV0ZSBpdGVtOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBwb3NpdGlvbjogXCJ0b3AtcmlnaHRcIixcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2VhcmNoUmVjaXBlID0gYXN5bmMgKHNlYXJjaFF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL3NlYXJjaC1yZWNpcGVzYCwge1xuICAgICAgcGFyYW1zOiB7IGtleXdvcmQ6IHNlYXJjaFF1ZXJ5IH0sXG4gICAgfSk7XG4gICAgcmVjaXBlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgY29uc29sZS5sb2coXCJyZWNpcGU6XCIsIHJlc3BvbnNlLmRhdGEpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVjaXBlLFxuICAgIHJlY2lwZXMsXG4gICAgZmV0Y2hSZWNpcGVzLFxuICAgIGNyZWF0ZVJlY2lwZSxcbiAgICBkZWxldGVSZWNpcGUsXG4gICAgc2VhcmNoUmVjaXBlLFxuICB9O1xufSk7XG4iXSwibmFtZXMiOlsiTG9hZGluZyIsInJlY2lwZSJdLCJtYXBwaW5ncyI6Ijs7QUFLWSxNQUFDLGlCQUFpQixZQUFZLFdBQVcsTUFBTTtBQUN6RCxRQUFNLFNBQVMsSUFBSSxJQUFJO0FBQ3ZCLFFBQU0sVUFBVSxJQUFJLENBQUEsQ0FBRTtBQUV0QixRQUFNLGVBQWUsWUFBWTtBQUMvQixVQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksY0FBYztBQUM3QyxZQUFRLFFBQVEsU0FBUztBQUFBLEVBQzdCO0FBRUUsUUFBTSxlQUFlLE9BQU8sU0FBUztBQUNuQyxRQUFJO0FBQ0ZBLGFBQVEsS0FBSTtBQUNaLFlBQU0sV0FBVyxNQUFNLElBQUksS0FBSyxnQkFBZ0IsSUFBSTtBQUVwRCxZQUFNLFlBQVk7QUFBQSxRQUNoQixHQUFHLFNBQVM7QUFBQSxRQUNaLGNBQWMsS0FBSyxnQkFBZ0IsQ0FBRTtBQUFBLFFBQ3JDLG1CQUFtQixLQUFLLHFCQUFxQixDQUFFO0FBQUEsTUFDdkQ7QUFDTSxjQUFRLE1BQU0sUUFBUSxTQUFTO0FBQUEsSUFDaEMsU0FBUSxPQUFQO0FBQ0EsY0FBUSxNQUFNLHdCQUF3QixLQUFLO0FBQUEsSUFDakQsVUFBYztBQUNSQSxhQUFRLEtBQUk7QUFBQSxJQUNiO0FBQUEsRUFDTDtBQUVFLFFBQU0sZUFBZSxPQUFPLE9BQU87QUFDakNBLFdBQVEsS0FBSTtBQUVaLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxJQUFJLE9BQU8sZ0JBQWdCLElBQUk7QUFDdEQsY0FBUSxRQUFRLFFBQVEsTUFBTSxPQUFPLENBQUNDLFlBQVdBLFFBQU8sT0FBTyxFQUFFO0FBQ2pFLGFBQU8sT0FBTztBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFFBQ1QsVUFBVTtBQUFBLE1BQ2xCLENBQU87QUFBQSxJQUNGLFNBQVEsT0FBUDtBQUNBLGFBQU8sT0FBTztBQUFBLFFBQ1osU0FBUywwQkFBMEIsTUFBTTtBQUFBLFFBQ3pDLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxNQUNsQixDQUFPO0FBQUEsSUFDUCxVQUFjO0FBQ1JELGFBQVEsS0FBSTtBQUFBLElBQ2I7QUFBQSxFQUNMO0FBRUUsUUFBTSxlQUFlLE9BQU8sZ0JBQWdCO0FBQzFDLFVBQU0sV0FBVyxNQUFNLElBQUksSUFBSSx1QkFBdUI7QUFBQSxNQUNwRCxRQUFRLEVBQUUsU0FBUyxZQUFhO0FBQUEsSUFDdEMsQ0FBSztBQUNELFlBQVEsUUFBUSxTQUFTO0FBQ3pCLFlBQVEsSUFBSSxXQUFXLFNBQVMsSUFBSTtBQUFBLEVBQ3hDO0FBRUUsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFDQSxDQUFDOzsifQ==
