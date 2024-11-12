import { d as defineStore, n as ref, P as Plugin, N as Notify } from "./index.c8e2405b.js";
import { api } from "./axios.aa1bce92.js";
const useBranchRecipeStore = defineStore("branchRecipe", () => {
  const branchRecipe = ref(null);
  const branchRecipes = ref([]);
  const fetchBranchRecipes = async (branchId) => {
    const response = await api.get(`/api/branches/${branchId}/recipes`);
    branchRecipes.value = response.data;
  };
  const saveBranchRecipe = async (data) => {
    console.log("saveBranchRecipeStore", data);
    Plugin.show();
    try {
      const response = await api.post("/api/branch-recipe", data);
      if (response.data.message === "Branch recipe saved successfully") {
        const branchRecipe2 = branchRecipes.value.find(
          (item) => item.id === data.recipe_id
        );
        branchRecipes.value = response.data;
        console.log("branchRecipes", response.data);
        Notify.create({
          type: "positive",
          message: "Branch product saved successfully",
          position: "top"
        });
      } else if (response.data.message === "The recipe already exists in this branch.") {
        Notify.create({
          type: "warning",
          message: "The product already exists in this branch.",
          position: "top"
        });
      }
      fetchBranchRecipes();
    } catch (error) {
      console.log("error", error);
    } finally {
      Plugin.hide();
    }
  };
  const deleteRecipe = async (id) => {
    Plugin.show();
    try {
      const response = await api.delete(`/api/branch-recipe/${id}`);
      branchRecipes.value = branchRecipes.value.filter(
        (recipe) => recipe.id !== id
      );
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
  const searchBranchRecipe = async (searchQuery, branchId) => {
    const response = await api.get(`/api/branch-recipe-search`, {
      params: {
        keyword: searchQuery,
        branch_id: branchId
      }
    });
    branchRecipe.value = response.data;
    console.log("branch recipe", response.data);
  };
  return {
    branchRecipe,
    branchRecipes,
    saveBranchRecipe,
    fetchBranchRecipes,
    deleteRecipe,
    searchBranchRecipe
  };
});
export { useBranchRecipeStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLXJlY2lwZS5jZTJhNDVlYy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3Jlcy9icmFuY2gtcmVjaXBlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZUJyYW5jaFJlY2lwZVN0b3JlID0gZGVmaW5lU3RvcmUoXCJicmFuY2hSZWNpcGVcIiwgKCkgPT4ge1xuICBjb25zdCBicmFuY2hSZWNpcGUgPSByZWYobnVsbCk7XG4gIGNvbnN0IGJyYW5jaFJlY2lwZXMgPSByZWYoW10pO1xuXG4gIGNvbnN0IGZldGNoQnJhbmNoUmVjaXBlcyA9IGFzeW5jIChicmFuY2hJZCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL2FwaS9icmFuY2hlcy8ke2JyYW5jaElkfS9yZWNpcGVzYCk7XG4gICAgYnJhbmNoUmVjaXBlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gIH07XG5cbiAgY29uc3Qgc2F2ZUJyYW5jaFJlY2lwZSA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJzYXZlQnJhbmNoUmVjaXBlU3RvcmVcIiwgZGF0YSk7XG4gICAgTG9hZGluZy5zaG93KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL2JyYW5jaC1yZWNpcGVcIiwgZGF0YSk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLm1lc3NhZ2UgPT09IFwiQnJhbmNoIHJlY2lwZSBzYXZlZCBzdWNjZXNzZnVsbHlcIikge1xuICAgICAgICBjb25zdCBicmFuY2hSZWNpcGUgPSBicmFuY2hSZWNpcGVzLnZhbHVlLmZpbmQoXG4gICAgICAgICAgKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGRhdGEucmVjaXBlX2lkXG4gICAgICAgICk7XG4gICAgICAgIGJyYW5jaFJlY2lwZXMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICBjb25zb2xlLmxvZyhcImJyYW5jaFJlY2lwZXNcIiwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgICBtZXNzYWdlOiBcIkJyYW5jaCBwcm9kdWN0IHNhdmVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHJlc3BvbnNlLmRhdGEubWVzc2FnZSA9PT0gXCJUaGUgcmVjaXBlIGFscmVhZHkgZXhpc3RzIGluIHRoaXMgYnJhbmNoLlwiXG4gICAgICApIHtcbiAgICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJUaGUgcHJvZHVjdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGlzIGJyYW5jaC5cIixcbiAgICAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZldGNoQnJhbmNoUmVjaXBlcygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIGVycm9yKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZVJlY2lwZSA9IGFzeW5jIChpZCkgPT4ge1xuICAgIExvYWRpbmcuc2hvdygpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmRlbGV0ZShgL2FwaS9icmFuY2gtcmVjaXBlLyR7aWR9YCk7XG4gICAgICBicmFuY2hSZWNpcGVzLnZhbHVlID0gYnJhbmNoUmVjaXBlcy52YWx1ZS5maWx0ZXIoXG4gICAgICAgIChyZWNpcGUpID0+IHJlY2lwZS5pZCAhPT0gaWRcbiAgICAgICk7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBpY29uOiBcIndhcm5pbmdcIixcbiAgICAgICAgbWVzc2FnZTogXCJSZWNpcGUgc3VjY2VzZnVsbHkgZGVsZXRlZFwiLFxuICAgICAgICB0aW1lb3V0OiAxMDAwLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3AtcmlnaHRcIixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgbWVzc2FnZTogYEZhaWxlZCB0byBkZWxldGUgaXRlbTogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgICAgcG9zaXRpb246IFwidG9wLXJpZ2h0XCIsXG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNlYXJjaEJyYW5jaFJlY2lwZSA9IGFzeW5jIChzZWFyY2hRdWVyeSwgYnJhbmNoSWQpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9hcGkvYnJhbmNoLXJlY2lwZS1zZWFyY2hgLCB7XG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAga2V5d29yZDogc2VhcmNoUXVlcnksXG4gICAgICAgIGJyYW5jaF9pZDogYnJhbmNoSWQsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGJyYW5jaFJlY2lwZS52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgY29uc29sZS5sb2coXCJicmFuY2ggcmVjaXBlXCIsIHJlc3BvbnNlLmRhdGEpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYnJhbmNoUmVjaXBlLFxuICAgIGJyYW5jaFJlY2lwZXMsXG4gICAgc2F2ZUJyYW5jaFJlY2lwZSxcbiAgICBmZXRjaEJyYW5jaFJlY2lwZXMsXG4gICAgZGVsZXRlUmVjaXBlLFxuICAgIHNlYXJjaEJyYW5jaFJlY2lwZSxcbiAgfTtcbn0pO1xuIl0sIm5hbWVzIjpbIkxvYWRpbmciLCJicmFuY2hSZWNpcGUiXSwibWFwcGluZ3MiOiI7O0FBS1ksTUFBQyx1QkFBdUIsWUFBWSxnQkFBZ0IsTUFBTTtBQUNwRSxRQUFNLGVBQWUsSUFBSSxJQUFJO0FBQzdCLFFBQU0sZ0JBQWdCLElBQUksQ0FBQSxDQUFFO0FBRTVCLFFBQU0scUJBQXFCLE9BQU8sYUFBYTtBQUM3QyxVQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksaUJBQWlCLGtCQUFrQjtBQUNsRSxrQkFBYyxRQUFRLFNBQVM7QUFBQSxFQUNuQztBQUVFLFFBQU0sbUJBQW1CLE9BQU8sU0FBUztBQUN2QyxZQUFRLElBQUkseUJBQXlCLElBQUk7QUFDekNBLFdBQVEsS0FBSTtBQUNaLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxJQUFJLEtBQUssc0JBQXNCLElBQUk7QUFFMUQsVUFBSSxTQUFTLEtBQUssWUFBWSxvQ0FBb0M7QUFDaEUsY0FBTUMsZ0JBQWUsY0FBYyxNQUFNO0FBQUEsVUFDdkMsQ0FBQyxTQUFTLEtBQUssT0FBTyxLQUFLO0FBQUEsUUFDckM7QUFDUSxzQkFBYyxRQUFRLFNBQVM7QUFDL0IsZ0JBQVEsSUFBSSxpQkFBaUIsU0FBUyxJQUFJO0FBQzFDLGVBQU8sT0FBTztBQUFBLFVBQ1osTUFBTTtBQUFBLFVBQ04sU0FBUztBQUFBLFVBQ1QsVUFBVTtBQUFBLFFBQ3BCLENBQVM7QUFBQSxNQUNULFdBQ1EsU0FBUyxLQUFLLFlBQVksNkNBQzFCO0FBQ0EsZUFBTyxPQUFPO0FBQUEsVUFDWixNQUFNO0FBQUEsVUFDTixTQUFTO0FBQUEsVUFDVCxVQUFVO0FBQUEsUUFDcEIsQ0FBUztBQUFBLE1BQ0Y7QUFFRDtJQUNELFNBQVEsT0FBUDtBQUNBLGNBQVEsSUFBSSxTQUFTLEtBQUs7QUFBQSxJQUNoQyxVQUFjO0FBQ1JELGFBQVEsS0FBSTtBQUFBLElBQ2I7QUFBQSxFQUNMO0FBRUUsUUFBTSxlQUFlLE9BQU8sT0FBTztBQUNqQ0EsV0FBUSxLQUFJO0FBRVosUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLElBQUksT0FBTyxzQkFBc0IsSUFBSTtBQUM1RCxvQkFBYyxRQUFRLGNBQWMsTUFBTTtBQUFBLFFBQ3hDLENBQUMsV0FBVyxPQUFPLE9BQU87QUFBQSxNQUNsQztBQUNNLGFBQU8sT0FBTztBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLE1BRWpCLENBQU87QUFBQSxJQUNGLFNBQVEsT0FBUDtBQUNBLGFBQU8sT0FBTztBQUFBLFFBQ1osU0FBUywwQkFBMEIsTUFBTTtBQUFBLFFBQ3pDLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxNQUNsQixDQUFPO0FBQUEsSUFDUCxVQUFjO0FBQ1JBLGFBQVEsS0FBSTtBQUFBLElBQ2I7QUFBQSxFQUNMO0FBRUUsUUFBTSxxQkFBcUIsT0FBTyxhQUFhLGFBQWE7QUFDMUQsVUFBTSxXQUFXLE1BQU0sSUFBSSxJQUFJLDZCQUE2QjtBQUFBLE1BQzFELFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxNQUNaO0FBQUEsSUFDUCxDQUFLO0FBQ0QsaUJBQWEsUUFBUSxTQUFTO0FBQzlCLFlBQVEsSUFBSSxpQkFBaUIsU0FBUyxJQUFJO0FBQUEsRUFDOUM7QUFFRSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQUNBLENBQUM7OyJ9
