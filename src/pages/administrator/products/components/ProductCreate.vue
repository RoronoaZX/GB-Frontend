<template>
  <div>
    <q-btn
      class="q-pa-sm btn-add"
      outline
      dense
      elevated
      icon="add_circle"
      label="Add Product"
      @click="openDialog"
      style="background-color: #ef4444"
      size="md"
      color="dark"
    />
  </div>
  <div>
    <q-dialog
      v-model="dialog"
      persistent
      transition-show="jump-up"
      transition-hide="jump-down"
    >
      <q-card
        class="my-card q-pa-none"
        style="
          width: 420px;
          border-radius: 16px;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        "
      >
        <q-card-section
          class="row items-center q-px-md q-py-sm bg-gradient text-white"
        >
          <div class="text-h5 q-mr-md">🥖 Add Product</div>
          <q-space />
          <q-btn icon="close" flat dense round v-close-popup />
        </q-card-section>

        <q-separator class="separator-gradient" />

        <q-card-section class="q-px-xl q-pt-none q-pb-lg">
          <div class="q-mt-lg q-animated q-animate-bounce">
            <q-input
              class="text-capitalize"
              v-model="addNewProductForm.name"
              outlined
              dense
              label="Product Name"
              :rules="[
                (val) => (val && val.length > 0) || 'Product name is reuired',
              ]"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <!-- <div>Category</div> -->
            <q-select
              v-model="addNewProductForm.category"
              input-debounce="0"
              :options="category"
              stack-label
              outlined
              dense
              label="Category"
              :rules="[
                (val) => (val && val.length > 0) || 'Category is required',
              ]"
              hide-dropdown-icon
              behavior="menu"
            />
          </div>
        </q-card-section>
        <!-- <q-separator /> -->
        <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
          <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
          <q-btn
            class="glossy"
            color="teal"
            label="Create"
            @click="createProducts"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Notify } from "quasar";
import { useProductsStore } from "src/stores/product";

const productsStore = useProductsStore();
const category = ["Bread", "Selecta", "Softdrinks"];
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const addNewProductForm = reactive({
  name: "",
  category: null,
});

const createProducts = async () => {
  try {
    await productsStore.createProducts({ ...addNewProductForm });

    dialog.value = false;
    console.log("Products Data", addNewProductForm);
    resetFormData();
  } catch (error) {
    console.log("Error saving product:", error);
    // Notify.create({
    //   type: "negative",
    //   message: "Failed to save product:" + error.message,
    // });
  }
};

const resetFormData = () => {
  addNewProductForm.name = "";
  addNewProductForm.category = "";
};
</script>

<style scoped>
.my-card {
  background: #ffffff;
  animation: fadeIn 0.3s ease;
}

.btn-add {
  background: linear-gradient(45deg, #000000, #000000);
  color: #fff;
  font-weight: bold;
}

.bg-gradient {
  background: linear-gradient(135deg, #00bfa5, #00796b);
}

.separator-gradient {
  background: linear-gradient(90deg, #00bfa5, #00796b);
}

.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-cancel {
  background: linear-gradient(45deg, #ef5350, #e53935);
  color: #fff;
  font-weight: bold;
}

.btn-create {
  background: linear-gradient(45deg, #66bb6a, #43a047);
  color: #fff;
  font-weight: bold;
}

.q-animate-bounce {
  animation: bounceIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
