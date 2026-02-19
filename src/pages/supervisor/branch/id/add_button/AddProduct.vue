<template>
  <q-btn
    outline
    class="text-dark q-pa-sm"
    push
    dense
    elevated
    icon="add_circle"
    label="Create Branch Product"
    @click="open_create_bread_dialog"
  />

  <q-dialog v-model="dialog" persistent>
    <q-card
      class="my-card"
      style="width: 400px; max-width: 500px; min-width: 100px"
    >
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Create Branch Product</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>

      <q-card-section class="q-ma-md q-gutter-y-sm">
        <div class="q-mb-lg">
          <q-input
            @update:model-value="search"
            debounce="1000"
            outlined
            rounded
            placeholder="Search product"
            dense
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>

            <div v-if="searchQuery" class="custom-list z-top">
              <q-card>
                <q-list separator>
                  <q-item v-if="!productData?.length">
                    No record found.
                  </q-item>

                  <template v-else>
                    <q-item
                      @clikc="autofillProduct(product)"
                      v-for="product in productData"
                      :key="product.id"
                      clickable
                    >
                      <q-item-section>
                        <q-item-label>
                          {{ capitalizeFirstLetter(product.name) }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
        </div>

        <div>
          <div>Product Name</div>
          <q-input
            v-model="addNewBranchProductForm.product_name"
            readonly
            dense
            outlined
          />
        </div>

        <div>
          <div>Category</div>
          <q-input
            v-model="addNewBranchProductForm.category"
            readonly
            dense
            outlined
          />
        </div>

        <div class="row justify-between">
          <div>
            <div>Beginnings</div>
            <q-input
              v-model="addNewBranchProductForm.beginnings"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Total Quantity</div>
            <q-input
              v-model="addNewBranchProductForm.total_quantity"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
        </div>
        <div>
          <div>Price</div>
          <q-input
            v-model="addNewBranchProductForm.price"
            mask="#####"
            outlined
            dense
            style="width: 150px"
          />
        </div>
      </q-card-section>

      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" @click="dismiss" />
        <q-btn
          class="glossy"
          color="teal"
          label="Create"
          @click="save"
          :disable="!isFormValid"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { typographyFormat } from "src/composables/typography/typography-format";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useProductsStore } from "src/stores/product";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const { capitalizeFirstLetter } = typographyFormat();

const route = useRoute();
const productStore = useProductsStore();
const productData = computed(() => productStore.products);
const branchProducts = useBranchProductsStore();

const searchQuery = ref("");

const search = async () => {
  productStore.searchProducts(searchQuery.value);
};

const isFormValid = computed(() => {
  return (
    addNewBranchProductForm.price !== 0 &&
    addNewBranchProductForm.beginnings !== 0 &&
    addNewBranchProductForm.total_quantity !== 0
  );
});

const dialog = ref(false);

const open_create_bread_dialog = () => {
  dialog.value = true;
};

const dismiss = () => {
  clearForm();
  dialog.value = false;
};

const autofillProduct = (data) => {
  addNewBranchProductForm.product_id = data.id;
  addNewBranchProductForm.product_name = data.name;
  addNewBranchProductForm.category = data.category;
  searchQuery.value = "";
};

const addNewBranchProductForm = reactive({
  product_id: null,
  product_name: "",
  price: 0,
  beginnings: 0,
  total_quantity: 0,
  branches_id: route.params.branch_id,
});

const clearForm = () => {
  addNewBranchProductForm.product_id = "";
  addNewBranchProductForm.product_name = "";
  addNewBranchProductForm.category = "";
  addNewBranchProductForm.price = 0;
  addNewBranchProductForm.beginnings = 0;
  addNewBranchProductForm.total_quantity = 0;
};

const save = async () => {
  console.log("save");
};
</script>
