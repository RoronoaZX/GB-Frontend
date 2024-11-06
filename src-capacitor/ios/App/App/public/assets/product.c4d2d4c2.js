import { d as defineStore, n as ref, N as Notify, P as Plugin } from "./index.9b9dbcba.js";
import { api } from "./axios.91431b0b.js";
const useProductsStore = defineStore("products", () => {
  const product = ref(null);
  const products = ref([]);
  const breads = ref([]);
  const searchProducts = async (searchQuery) => {
    const response = await api.get(`/api/search-products`, {
      params: { keyword: searchQuery }
    });
    products.value = response.data;
    console.log("searched products", response.data);
  };
  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products");
      products.value = response.data;
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to fetch product",
        timeout: 1e3
      });
    }
  };
  const createProducts = async (data) => {
    Plugin.show();
    const response = await api.post("/api/products", data);
    products.value.unshift(response.data);
    Notify.create({
      type: "positive",
      message: "Product created successfully"
    });
    Plugin.hide();
  };
  const updateProducts = async (id, data) => {
    Plugin.show();
    const response = await api.put(`/api/products/${id}`, data);
    const updatedProduct = products.value.findIndex(
      (product2) => product2.id === id
    );
    if (updatedProduct !== -1) {
      products.value[updatedProduct] = response.data;
    }
    Notify.create({
      type: "positive",
      message: "Product updated successfully",
      timeout: 1e3
    });
    Plugin.hide();
  };
  const deleteProducts = async (id) => {
    Plugin.show();
    await api.delete(`/api/products/${id}`);
    products.value = products.value.filter((product2) => product2.id !== id);
    Notify.create({
      type: "negative",
      icon: "warning",
      message: `Product successfully deleted`,
      timeout: 1e3
    });
    Plugin.hide();
  };
  const fetchProductsByCategory = async (category) => {
    const response = await api.get("/api/bread-products", category);
    breads.value = response.data;
  };
  return {
    product,
    products,
    breads,
    searchProducts,
    fetchProducts,
    createProducts,
    updateProducts,
    deleteProducts,
    fetchProductsByCategory
  };
});
export { useProductsStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5jNGQyZDRjMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3Jlcy9wcm9kdWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZVByb2R1Y3RzU3RvcmUgPSBkZWZpbmVTdG9yZShcInByb2R1Y3RzXCIsICgpID0+IHtcbiAgY29uc3QgcHJvZHVjdCA9IHJlZihudWxsKTtcbiAgY29uc3QgcHJvZHVjdHMgPSByZWYoW10pO1xuICBjb25zdCBicmVhZHMgPSByZWYoW10pO1xuXG4gIGNvbnN0IHNlYXJjaFByb2R1Y3RzID0gYXN5bmMgKHNlYXJjaFF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL3NlYXJjaC1wcm9kdWN0c2AsIHtcbiAgICAgIHBhcmFtczogeyBrZXl3b3JkOiBzZWFyY2hRdWVyeSB9LFxuICAgIH0pO1xuICAgIHByb2R1Y3RzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgICBjb25zb2xlLmxvZyhcInNlYXJjaGVkIHByb2R1Y3RzXCIsIHJlc3BvbnNlLmRhdGEpO1xuICB9O1xuXG4gIGNvbnN0IGZldGNoUHJvZHVjdHMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvcHJvZHVjdHNcIik7XG4gICAgICBwcm9kdWN0cy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGZldGNoIHByb2R1Y3RcIixcbiAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVQcm9kdWN0cyA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgTG9hZGluZy5zaG93KCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChcIi9hcGkvcHJvZHVjdHNcIiwgZGF0YSk7XG4gICAgcHJvZHVjdHMudmFsdWUudW5zaGlmdChyZXNwb25zZS5kYXRhKTtcbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgIG1lc3NhZ2U6IFwiUHJvZHVjdCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgIH0pO1xuICAgIExvYWRpbmcuaGlkZSgpO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVByb2R1Y3RzID0gYXN5bmMgKGlkLCBkYXRhKSA9PiB7XG4gICAgTG9hZGluZy5zaG93KCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KGAvYXBpL3Byb2R1Y3RzLyR7aWR9YCwgZGF0YSk7XG4gICAgY29uc3QgdXBkYXRlZFByb2R1Y3QgPSBwcm9kdWN0cy52YWx1ZS5maW5kSW5kZXgoXG4gICAgICAocHJvZHVjdCkgPT4gcHJvZHVjdC5pZCA9PT0gaWRcbiAgICApO1xuICAgIGlmICh1cGRhdGVkUHJvZHVjdCAhPT0gLTEpIHtcbiAgICAgIHByb2R1Y3RzLnZhbHVlW3VwZGF0ZWRQcm9kdWN0XSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfVxuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgbWVzc2FnZTogXCJQcm9kdWN0IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICB0aW1lb3V0OiAxMDAwLFxuICAgIH0pO1xuXG4gICAgTG9hZGluZy5oaWRlKCk7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlUHJvZHVjdHMgPSBhc3luYyAoaWQpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5kZWxldGUoYC9hcGkvcHJvZHVjdHMvJHtpZH1gKTtcbiAgICBwcm9kdWN0cy52YWx1ZSA9IHByb2R1Y3RzLnZhbHVlLmZpbHRlcigocHJvZHVjdCkgPT4gcHJvZHVjdC5pZCAhPT0gaWQpO1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgaWNvbjogXCJ3YXJuaW5nXCIsXG4gICAgICBtZXNzYWdlOiBgUHJvZHVjdCBzdWNjZXNzZnVsbHkgZGVsZXRlZGAsXG4gICAgICB0aW1lb3V0OiAxMDAwLFxuICAgIH0pO1xuICAgIExvYWRpbmcuaGlkZSgpO1xuICB9O1xuXG4gIGNvbnN0IGZldGNoUHJvZHVjdHNCeUNhdGVnb3J5ID0gYXN5bmMgKGNhdGVnb3J5KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9icmVhZC1wcm9kdWN0c1wiLCBjYXRlZ29yeSk7XG4gICAgYnJlYWRzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHByb2R1Y3QsXG4gICAgcHJvZHVjdHMsXG4gICAgYnJlYWRzLFxuICAgIHNlYXJjaFByb2R1Y3RzLFxuICAgIGZldGNoUHJvZHVjdHMsXG4gICAgY3JlYXRlUHJvZHVjdHMsXG4gICAgdXBkYXRlUHJvZHVjdHMsXG4gICAgZGVsZXRlUHJvZHVjdHMsXG4gICAgZmV0Y2hQcm9kdWN0c0J5Q2F0ZWdvcnksXG4gIH07XG59KTtcbiJdLCJuYW1lcyI6WyJMb2FkaW5nIiwicHJvZHVjdCJdLCJtYXBwaW5ncyI6Ijs7QUFLWSxNQUFDLG1CQUFtQixZQUFZLFlBQVksTUFBTTtBQUM1RCxRQUFNLFVBQVUsSUFBSSxJQUFJO0FBQ3hCLFFBQU0sV0FBVyxJQUFJLENBQUEsQ0FBRTtBQUN2QixRQUFNLFNBQVMsSUFBSSxDQUFBLENBQUU7QUFFckIsUUFBTSxpQkFBaUIsT0FBTyxnQkFBZ0I7QUFDNUMsVUFBTSxXQUFXLE1BQU0sSUFBSSxJQUFJLHdCQUF3QjtBQUFBLE1BQ3JELFFBQVEsRUFBRSxTQUFTLFlBQWE7QUFBQSxJQUN0QyxDQUFLO0FBQ0QsYUFBUyxRQUFRLFNBQVM7QUFDMUIsWUFBUSxJQUFJLHFCQUFxQixTQUFTLElBQUk7QUFBQSxFQUNsRDtBQUVFLFFBQU0sZ0JBQWdCLFlBQVk7QUFDaEMsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLElBQUksSUFBSSxlQUFlO0FBQzlDLGVBQVMsUUFBUSxTQUFTO0FBQUEsSUFDM0IsU0FBUSxPQUFQO0FBQ0EsYUFBTyxPQUFPO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsTUFDakIsQ0FBTztBQUFBLElBQ0Y7QUFBQSxFQUNMO0FBRUUsUUFBTSxpQkFBaUIsT0FBTyxTQUFTO0FBQ3JDQSxXQUFRLEtBQUk7QUFDWixVQUFNLFdBQVcsTUFBTSxJQUFJLEtBQUssaUJBQWlCLElBQUk7QUFDckQsYUFBUyxNQUFNLFFBQVEsU0FBUyxJQUFJO0FBQ3BDLFdBQU8sT0FBTztBQUFBLE1BQ1osTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ2YsQ0FBSztBQUNEQSxXQUFRLEtBQUk7QUFBQSxFQUNoQjtBQUVFLFFBQU0saUJBQWlCLE9BQU8sSUFBSSxTQUFTO0FBQ3pDQSxXQUFRLEtBQUk7QUFDWixVQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksaUJBQWlCLE1BQU0sSUFBSTtBQUMxRCxVQUFNLGlCQUFpQixTQUFTLE1BQU07QUFBQSxNQUNwQyxDQUFDQyxhQUFZQSxTQUFRLE9BQU87QUFBQSxJQUNsQztBQUNJLFFBQUksbUJBQW1CLElBQUk7QUFDekIsZUFBUyxNQUFNLGtCQUFrQixTQUFTO0FBQUEsSUFDM0M7QUFDRCxXQUFPLE9BQU87QUFBQSxNQUNaLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxJQUNmLENBQUs7QUFFREQsV0FBUSxLQUFJO0FBQUEsRUFDaEI7QUFFRSxRQUFNLGlCQUFpQixPQUFPLE9BQU87QUFDbkNBLFdBQVEsS0FBSTtBQUNLLFVBQU0sSUFBSSxPQUFPLGlCQUFpQixJQUFJO0FBQ3ZELGFBQVMsUUFBUSxTQUFTLE1BQU0sT0FBTyxDQUFDQyxhQUFZQSxTQUFRLE9BQU8sRUFBRTtBQUNyRSxXQUFPLE9BQU87QUFBQSxNQUNaLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxJQUNmLENBQUs7QUFDREQsV0FBUSxLQUFJO0FBQUEsRUFDaEI7QUFFRSxRQUFNLDBCQUEwQixPQUFPLGFBQWE7QUFDbEQsVUFBTSxXQUFXLE1BQU0sSUFBSSxJQUFJLHVCQUF1QixRQUFRO0FBQzlELFdBQU8sUUFBUSxTQUFTO0FBQUEsRUFDNUI7QUFFRSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQUNBLENBQUM7OyJ9
