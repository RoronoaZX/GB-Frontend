import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, computed } from "vue";
import { useProductsStore } from "./product";
import { Loading, Notify } from "quasar";

export const useBranchProductsStore = defineStore("branchProducts", () => {
  const branchProduct = ref(null);
  const branchProducts = ref([]);
  const branchId = ref([]);
  const sampleFetchPagination = ref([]);
  const totalFetch = ref(0);

  const productsStore = useProductsStore();
  const products = computed(() => productsStore.products);
  console.log("Branch PRoductssss:", products.value);

  const fetchBranchProducts = async (branchId) => {
    const response = await api.get(`/api/branches/${branchId}/products`);
    branchProducts.value = response.data;
  };

  // sample testing funciton for pagination

  const sampleFetchPaginationProducts = async ({
    page,
    rowsPerPage,
    branchId,
  }) => {
    console.log("Page:", page);
    console.log("RowsPerPage:", rowsPerPage);
    console.log("Branch ID:", branchId);
    try {
      const response = await api.get(
        `/api/sample-fetch-pagination-branch-products?page=${page}&rowsPerPage=${rowsPerPage}&branchId=${branchId}`
      );
      sampleFetchPagination.value = response.data.data;
      console.log("Sample Fetch Pagination:", response.data.data);
      totalFetch.value = response.data.total;
      console.log("Total Fetch:", response.data.total);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // New Search Function
  const searchBranchProducts = async ({ branches_id, query, category }) => {
    console.log("Branch ID:", branches_id);
    console.log("Query:", query);
    console.log("Category:", category);

    try {
      const response = await api.post("/api/search-branch-products", {
        branches_id,
        query,
        category,
      });

      branchProducts.value = response.data;
      console.log("Branch Products:", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const createBranchProducts = async (data) => {
    Loading.show();
    try {
      const { category, price } = data;
      const response = await api.post(`/api/branch-products`, data);

      if (response.data.message === "Branch product saved successfully") {
        const product = products.value.find(
          (item) => item.id === data.product_id
        );

        const newProduct = {
          ...response.data,
          category: category ? category : "No Category",
          price: price ? parseInt(price) : 0,
          product: product
            ? product
            : { name: "No Product", category: "Unknown" },
          total_quantity: data.total_quantity, // Ensure this field is set correctly
        };

        branchProducts.value.unshift(newProduct);
        Notify.create({
          type: "positive",
          message: "Branch product saved successfully",
          position: "top",
        });
      } else if (
        response.data.message === "The product already exists in this branch."
      ) {
        Notify.create({
          type: "warning",
          message: "The product already exists in this branch.",
          position: "top",
        });
      }
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "An error occurred while saving the branch product.",
        position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const updateBranchProductPrice = async (id) => {
    await api.put(`/api/update-branch-products/${id}`, { price: newPrice });
    const index = branchProducts.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      branchProducts.value[index].price = newPrice;
    }
  };

  const deleteBranchProducts = async (id) => {
    const response = await api.delete(`/api/branch-products/${id}`);
    branchProducts.value = branchProducts.value.filter(
      (branchProduct) => branchProduct.id !== id
    );
  };

  return {
    branchId,
    branchProduct,
    branchProducts,
    sampleFetchPagination,
    totalFetch,
    fetchBranchProducts,
    createBranchProducts,
    updateBranchProductPrice,
    deleteBranchProducts,
    searchBranchProducts,
    sampleFetchPaginationProducts,
  };
});
