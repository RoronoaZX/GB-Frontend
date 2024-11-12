import { d as defineStore, n as ref, N as Notify, P as Plugin } from "./index.c8e2405b.js";
import { api } from "./axios.aa1bce92.js";
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
      console.log("====================================");
      console.log("products.value ", products.value);
      console.log("====================================");
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
    try {
      const response = await api.post("/api/products", data);
      console.log("data", response.data);
      if (response.data.message === "Product saved successfully") {
        fetchProducts();
        const product2 = products.value.find((item) => item.id === data.id);
        products.value.unshift(response.data);
        Notify.create({
          type: "positive",
          message: "Product created successfully"
        });
      } else if (response.data.message === "The product already exists.") {
        Notify.create({
          type: "warning",
          message: "The product already exists."
        });
      }
    } catch (error) {
      console.log("erroe", error);
    } finally {
      Plugin.hide();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5kMDFkMjQxZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3Jlcy9wcm9kdWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZVByb2R1Y3RzU3RvcmUgPSBkZWZpbmVTdG9yZShcInByb2R1Y3RzXCIsICgpID0+IHtcbiAgY29uc3QgcHJvZHVjdCA9IHJlZihudWxsKTtcbiAgY29uc3QgcHJvZHVjdHMgPSByZWYoW10pO1xuICBjb25zdCBicmVhZHMgPSByZWYoW10pO1xuXG4gIGNvbnN0IHNlYXJjaFByb2R1Y3RzID0gYXN5bmMgKHNlYXJjaFF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL3NlYXJjaC1wcm9kdWN0c2AsIHtcbiAgICAgIHBhcmFtczogeyBrZXl3b3JkOiBzZWFyY2hRdWVyeSB9LFxuICAgIH0pO1xuICAgIHByb2R1Y3RzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgICBjb25zb2xlLmxvZyhcInNlYXJjaGVkIHByb2R1Y3RzXCIsIHJlc3BvbnNlLmRhdGEpO1xuICB9O1xuXG4gIGNvbnN0IGZldGNoUHJvZHVjdHMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvcHJvZHVjdHNcIik7XG4gICAgICBwcm9kdWN0cy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwicHJvZHVjdHMudmFsdWUgXCIsIHByb2R1Y3RzLnZhbHVlKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBmZXRjaCBwcm9kdWN0XCIsXG4gICAgICAgIHRpbWVvdXQ6IDEwMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUHJvZHVjdHMgPSBhc3luYyAoZGF0YSkgPT4ge1xuICAgIExvYWRpbmcuc2hvdygpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFwiL2FwaS9wcm9kdWN0c1wiLCBkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiZGF0YVwiLCByZXNwb25zZS5kYXRhKTtcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLm1lc3NhZ2UgPT09IFwiUHJvZHVjdCBzYXZlZCBzdWNjZXNzZnVsbHlcIikge1xuICAgICAgICBmZXRjaFByb2R1Y3RzKCk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBwcm9kdWN0cy52YWx1ZS5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSBkYXRhLmlkKTtcbiAgICAgICAgcHJvZHVjdHMudmFsdWUudW5zaGlmdChyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUHJvZHVjdCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuZGF0YS5tZXNzYWdlID09PSBcIlRoZSBwcm9kdWN0IGFscmVhZHkgZXhpc3RzLlwiKSB7XG4gICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHByb2R1Y3QgYWxyZWFkeSBleGlzdHMuXCIsXG4gICAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9lXCIsIGVycm9yKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVByb2R1Y3RzID0gYXN5bmMgKGlkLCBkYXRhKSA9PiB7XG4gICAgTG9hZGluZy5zaG93KCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KGAvYXBpL3Byb2R1Y3RzLyR7aWR9YCwgZGF0YSk7XG4gICAgY29uc3QgdXBkYXRlZFByb2R1Y3QgPSBwcm9kdWN0cy52YWx1ZS5maW5kSW5kZXgoXG4gICAgICAocHJvZHVjdCkgPT4gcHJvZHVjdC5pZCA9PT0gaWRcbiAgICApO1xuICAgIGlmICh1cGRhdGVkUHJvZHVjdCAhPT0gLTEpIHtcbiAgICAgIHByb2R1Y3RzLnZhbHVlW3VwZGF0ZWRQcm9kdWN0XSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfVxuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgbWVzc2FnZTogXCJQcm9kdWN0IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICB0aW1lb3V0OiAxMDAwLFxuICAgIH0pO1xuXG4gICAgTG9hZGluZy5oaWRlKCk7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlUHJvZHVjdHMgPSBhc3luYyAoaWQpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5kZWxldGUoYC9hcGkvcHJvZHVjdHMvJHtpZH1gKTtcbiAgICBwcm9kdWN0cy52YWx1ZSA9IHByb2R1Y3RzLnZhbHVlLmZpbHRlcigocHJvZHVjdCkgPT4gcHJvZHVjdC5pZCAhPT0gaWQpO1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgaWNvbjogXCJ3YXJuaW5nXCIsXG4gICAgICBtZXNzYWdlOiBgUHJvZHVjdCBzdWNjZXNzZnVsbHkgZGVsZXRlZGAsXG4gICAgICB0aW1lb3V0OiAxMDAwLFxuICAgIH0pO1xuICAgIExvYWRpbmcuaGlkZSgpO1xuICB9O1xuXG4gIGNvbnN0IGZldGNoUHJvZHVjdHNCeUNhdGVnb3J5ID0gYXN5bmMgKGNhdGVnb3J5KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9icmVhZC1wcm9kdWN0c1wiLCBjYXRlZ29yeSk7XG4gICAgYnJlYWRzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHByb2R1Y3QsXG4gICAgcHJvZHVjdHMsXG4gICAgYnJlYWRzLFxuICAgIHNlYXJjaFByb2R1Y3RzLFxuICAgIGZldGNoUHJvZHVjdHMsXG4gICAgY3JlYXRlUHJvZHVjdHMsXG4gICAgdXBkYXRlUHJvZHVjdHMsXG4gICAgZGVsZXRlUHJvZHVjdHMsXG4gICAgZmV0Y2hQcm9kdWN0c0J5Q2F0ZWdvcnksXG4gIH07XG59KTtcbiJdLCJuYW1lcyI6WyJMb2FkaW5nIiwicHJvZHVjdCJdLCJtYXBwaW5ncyI6Ijs7QUFLWSxNQUFDLG1CQUFtQixZQUFZLFlBQVksTUFBTTtBQUM1RCxRQUFNLFVBQVUsSUFBSSxJQUFJO0FBQ3hCLFFBQU0sV0FBVyxJQUFJLENBQUEsQ0FBRTtBQUN2QixRQUFNLFNBQVMsSUFBSSxDQUFBLENBQUU7QUFFckIsUUFBTSxpQkFBaUIsT0FBTyxnQkFBZ0I7QUFDNUMsVUFBTSxXQUFXLE1BQU0sSUFBSSxJQUFJLHdCQUF3QjtBQUFBLE1BQ3JELFFBQVEsRUFBRSxTQUFTLFlBQWE7QUFBQSxJQUN0QyxDQUFL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
