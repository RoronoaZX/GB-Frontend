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
    try {
      Loading.show();
      const response = await api.post("/api/products", data);
      console.log("data", response.data);
      fetchProducts();
      Notify.create({
        type: "positive",
        message: "Product created successfully",
      });
    } catch (error) {
      console.log("erroe", error);
      if (error.response.data.message === "The name has already been taken.") {
        Notify.create({
          type: "warning",
          icon: "warning",
          message: "The name has already been taken.",
          setTimeout: 5000,
        });
      } else {
        Notify.create({
          type: "negative",
          icon: "error",
          message:
            error.response?.data?.message || "The name has already been taken.",
          setTimeout: 5000,
        });
      }
    } finally {
      Loading.hide();
    }
  };

  // const updateProducts = async (id, data) => {
  //   console.log("id", id);
  //   console.log("data", data);

  //   try {
  //     Loading.show();
  //     const response = await api.put(`/api/products/${id}`, data);
  //     console.log("response product", response.data);

  //     const updatedProduct = response.data;

  //     const index = products.value.findIndex((item) => item.id === id);
  //     if (index !== -1) {
  //       products.value[index] = {
  //         ...products.value[index],
  //         ...updatedProduct,
  //       };
  //     }
  //     Notify.create({
  //       type: "positive",
  //       message: "Product updated successfully",
  //       timeout: 1000,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response.data.message === "The name has already been taken.") {
  //       Notify.create({
  //         type: "warning",
  //         icon: "warning",
  //         message: error.response.data.message || "ERROR",
  //         timeout: 1000,
  //       });
  //     } else {
  //       Notify.create({
  //         type: "negative",
  //         icon: "error",
  //         message: error.response.data.message || "ERROR",
  //       });
  //     }
  //   } finally {
  //     Loading.hide();
  //   }
  // };

  const updatedProducts = async (data) => {
    console.log("datsssa", data);

    try {
      const response = await api.patch(`/api/update-products`, data);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
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
    // updateProducts,
    updatedProducts,
    deleteProducts,
    fetchProductsByCategory,
  };
});
