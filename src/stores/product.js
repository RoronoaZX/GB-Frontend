import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  const product = ref(null);
  const products = ref([]);
  const breads = ref([]);

  const searchProducts = async (searchQuery) => {
    const response = await api.get(`/api/search-products`, {
      params: { keyword: searchQuery },
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
        timeout: 1000,
      });
    }
  };

  const createProducts = async (data) => {
    Loading.show();
    try {
      const response = await api.post("/api/products", data);
      console.log("data", response.data);
      if (response.data.message === "Product saved successfully") {
        fetchProducts();
        const product = products.value.find((item) => item.id === data.id);
        products.value.unshift(response.data);
        Notify.create({
          type: "positive",
          message: "Product created successfully",
        });
      } else if (response.data.message === "The product already exists.") {
        Notify.create({
          type: "warning",
          message: "The product already exists.",
          // position: "top",
        });
      }
    } catch (error) {
      console.log("erroe", error);
    } finally {
      Loading.hide();
    }
  };

  const updateProducts = async (id, data) => {
    Loading.show();
    const response = await api.put(`/api/products/${id}`, data);
    const updatedProduct = products.value.findIndex(
      (product) => product.id === id
    );
    if (updatedProduct !== -1) {
      products.value[updatedProduct] = response.data;
    }
    Notify.create({
      type: "positive",
      message: "Product updated successfully",
      timeout: 1000,
    });

    Loading.hide();
  };

  const deleteProducts = async (id) => {
    Loading.show();
    const response = await api.delete(`/api/products/${id}`);
    products.value = products.value.filter((product) => product.id !== id);
    Notify.create({
      type: "negative",
      icon: "warning",
      message: `Product successfully deleted`,
      timeout: 1000,
    });
    Loading.hide();
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
    fetchProductsByCategory,
  };
});
