import { d as defineStore, n as ref, P as Plugin, N as Notify } from "./index.c8e2405b.js";
import { api } from "./axios.aa1bce92.js";
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
      if (response.data.message === "Recipe saved successfully") {
        recipes.value.unshift(response.data.recipe);
        Notify.create({
          type: "positive",
          message: "Recipe successfully created",
          timeout: 1e3
        });
      } else if (response.data.message === "Recipe already exist") {
        Notify.create({
          type: "warning",
          message: "Recipe already exists."
        });
      }
    } catch (error) {
      console.error("User Error message: ", error);
      Notify.create({
        type: "negative",
        message: "An error occurred while saving the recipe."
      });
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
        type: "positive",
        icon: "warning",
        message: "Recipe succesfully deleted",
        timeout: 1e3
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjaXBlLjI0MzdiY2VkLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL3JlY2lwZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuaW1wb3J0IHsgTG9hZGluZywgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuXG5leHBvcnQgY29uc3QgdXNlUmVjaXBlU3RvcmUgPSBkZWZpbmVTdG9yZShcInJlY2lwZXNcIiwgKCkgPT4ge1xuICBjb25zdCByZWNpcGUgPSByZWYobnVsbCk7XG4gIGNvbnN0IHJlY2lwZXMgPSByZWYoW10pO1xuXG4gIGNvbnN0IGZldGNoUmVjaXBlcyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoXCIvYXBpL3JlY2lwZXNcIik7XG4gICAgcmVjaXBlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUmVjaXBlID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICB0cnkge1xuICAgICAgTG9hZGluZy5zaG93KCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFwiL2FwaS9yZWNpcGVzXCIsIGRhdGEpO1xuXG4gICAgICAvLyBjb25zdCBuZXdSZWNpcGUgPSB7XG4gICAgICAvLyAgIC4uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAvLyAgIGJyZWFkX2dyb3VwczogZGF0YS5icmVhZF9ncm91cHMgfHwgW10sXG4gICAgICAvLyAgIGluZ3JlZGllbnRfZ3JvdXBzOiBkYXRhLmluZ3JlZGllbnRfZ3JvdXBzIHx8IFtdLFxuICAgICAgLy8gfTtcblxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEubWVzc2FnZSA9PT0gXCJSZWNpcGUgc2F2ZWQgc3VjY2Vzc2Z1bGx5XCIpIHtcbiAgICAgICAgcmVjaXBlcy52YWx1ZS51bnNoaWZ0KHJlc3BvbnNlLmRhdGEucmVjaXBlKTtcbiAgICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUmVjaXBlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXCIsXG4gICAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmRhdGEubWVzc2FnZSA9PT0gXCJSZWNpcGUgYWxyZWFkeSBleGlzdFwiKSB7XG4gICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUmVjaXBlIGFscmVhZHkgZXhpc3RzLlwiLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlVzZXIgRXJyb3IgbWVzc2FnZTogXCIsIGVycm9yKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgc2F2aW5nIHRoZSByZWNpcGUuXCIsXG4gICAgICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIExvYWRpbmcuaGlkZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkZWxldGVSZWNpcGUgPSBhc3luYyAoaWQpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5kZWxldGUoYC9hcGkvcmVjaXBlcy8ke2lkfWApO1xuICAgICAgcmVjaXBlcy52YWx1ZSA9IHJlY2lwZXMudmFsdWUuZmlsdGVyKChyZWNpcGUpID0+IHJlY2lwZS5pZCAhPT0gaWQpO1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgaWNvbjogXCJ3YXJuaW5nXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiUmVjaXBlIHN1Y2Nlc2Z1bGx5IGRlbGV0ZWRcIixcbiAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wLXJpZ2h0XCIsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIG1lc3NhZ2U6IGBGYWlsZWQgdG8gZGVsZXRlIGl0ZW06ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIHBvc2l0aW9uOiBcInRvcC1yaWdodFwiLFxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIExvYWRpbmcuaGlkZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZWFyY2hSZWNpcGUgPSBhc3luYyAoc2VhcmNoUXVlcnkpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9hcGkvc2VhcmNoLXJlY2lwZXNgLCB7XG4gICAgICBwYXJhbXM6IHsga2V5d29yZDogc2VhcmNoUXVlcnkgfSxcbiAgICB9KTtcbiAgICByZWNpcGVzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgICBjb25zb2xlLmxvZyhcInJlY2lwZTpcIiwgcmVzcG9uc2UuZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZWNpcGUsXG4gICAgcmVjaXBlcyxcbiAgICBmZXRjaFJlY2lwZXMsXG4gICAgY3JlYXRlUmVjaXBlLFxuICAgIGRlbGV0ZVJlY2lwZSxcbiAgICBzZWFyY2hSZWNpcGUsXG4gIH07XG59KTtcbiJdLCJuYW1lcyI6WyJMb2FkaW5nIiwicmVjaXBlIl0sIm1hcHBpbmdzIjoiOztBQUtZLE1BQUMsaUJBQWlCLFlBQVksV0FBVyxNQUFNO0FBQ3pELFFBQU0sU0FBUyxJQUFJLElBQUk7QUFDdkIsUUFBTSxVQUFVLElBQUksQ0FBQSxDQUFFO0FBRXRCLFFBQU0sZUFBZSxZQUFZO0FBQy9CLFVBQU0sV0FBVyxNQUFNLElBQUksSUFBSSxjQUFjO0FBQzdDLFlBQVEsUUFBUSxTQUFTO0FBQUEsRUFDN0I7QUFFRSxRQUFNLGVBQWUsT0FBTyxTQUFTO0FBQ25DLFFBQUk7QUFDRkEsYUFBUSxLQUFJO0FBQ1osWUFBTSxXQUFXLE1BQU0sSUFBSSxLQUFLLGdCQUFnQixJQUFJO0FBUXBELFVBQUksU0FBUyxLQUFLLFlBQVksNkJBQTZCO0FBQ3pELGdCQUFRLE1BQU0sUUFBUSxTQUFTLEtBQUssTUFBTTtBQUMxQyxlQUFPLE9BQU87QUFBQSxVQUNaLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxRQUNuQixDQUFTO0FBQUEsTUFDRixXQUFVLFNBQVMsS0FBSyxZQUFZLHdCQUF3QjtBQUMzRCxlQUFPLE9BQU87QUFBQSxVQUNaLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxRQUNuQixDQUFTO0FBQUEsTUFDRjtBQUFBLElBQ0YsU0FBUSxPQUFQO0FBQ0EsY0FBUSxNQUFNLHdCQUF3QixLQUFLO0FBQzNDLGFBQU8sT0FBTztBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BRWpCLENBQU87QUFBQSxJQUNQLFVBQWM7QUFDUkEsYUFBUSxLQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0w7QUFFRSxRQUFNLGVBQWUsT0FBTyxPQUFPO0FBQ2pDQSxXQUFRLEtBQUk7QUFFWixRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sSUFBSSxPQUFPLGdCQUFnQixJQUFJO0FBQ3RELGNBQVEsUUFBUSxRQUFRLE1BQU0sT0FBTyxDQUFDQyxZQUFXQSxRQUFPLE9BQU8sRUFBRTtBQUNqRSxhQUFPLE9BQU87QUFBQSxRQUNaLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxNQUVqQixDQUFPO0FBQUEsSUFDRixTQUFRLE9BQVA7QUFDQSxhQUFPLE9BQU87QUFBQSxRQUNaLFNBQVMsMEJBQTBCLE1BQU07QUFBQSxRQUN6QyxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsTUFDbEIsQ0FBTztBQUFBLElBQ1AsVUFBYztBQUNSRCxhQUFRLEtBQUk7QUFBQSxJQUNiO0FBQUEsRUFDTDtBQUVFLFFBQU0sZUFBZSxPQUFPLGdCQUFnQjtBQUMxQyxVQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksdUJBQXVCO0FBQUEsTUFDcEQsUUFBUSxFQUFFLFNBQVMsWUFBYTtBQUFBLElBQ3RDLENBQUs7QUFDRCxZQUFRLFFBQVEsU0FBUztBQUN6QixZQUFRLElBQUksV0FBVyxTQUFTLElBQUk7QUFBQSxFQUN4QztBQUVFLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBQ0EsQ0FBQzs7In0=
