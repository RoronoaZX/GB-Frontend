<template>
  <q-btn
    @click="openEditForm"
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
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
        <div class="text-h5 q-mr-md">🥖 Edit Product</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>

      <q-separator class="separator-gradient" />

      <q-card-section class="q-px-xl q-pt-none q-pb-lg">
        <div class="q-mt-lg q-animated q-animate-bounce">
          <!-- <div>Name of Bread</div> -->
          <q-input
            class="text-capitalize"
            v-model="editProductForm.name"
            outlined
            dense
            label="Product name"
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div class="q-mt-md q-animated q-animate-bounce">
          <!-- <div>Category</div> -->
          <q-select
            v-model="editProductForm.category"
            input-debounce="0"
            :options="category"
            stack-label
            outlined
            dense
            label="Category"
            :rules="[(val) => val && val.length > 0]"
            hide-dropdown-icon
          />
        </div>
      </q-card-section>
      <!-- <q-separator /> -->
      <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Save"
          @click="saveEditedProduct"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { useProductsStore } from "src/stores/product";
import { ref, reactive } from "vue";

const productStore = useProductsStore();
const props = defineProps(["edit"]);
const category = ["Bread", "Selecta", "Softdrinks"];
const dialog = ref(false);

const editProductForm = reactive({
  name: "",
  category: null,
});

const openEditForm = () => {
  Object.assign(editProductForm, props.edit.row);
  dialog.value = true;
};

const saveEditedProduct = async () => {
  try {
    const updatedProducts = { ...props.edit.row, ...editProductForm };
    await productStore.updateProducts(props.edit.row.id, updatedProducts);
    dialog.value = false;
  } catch (error) {
    console.log("Failed to update ingredients:", error);
  }
};

// const saveEditedProduct = async () => {
//   try {
//     const originalProduct = props.edit.row;
//     const updatedProduct = {
//       id: originalProduct.id,
//       name: editProductForm.name,
//       category: editProductForm.category,
//     };
//     const changedFields = [];
//     if (originalProduct.name !== updatedProduct.name) {
//       changedFields.push(
//         `Name: ${originalProduct.name} to ${updatedProduct.name}`
//       );
//     }
//     if (originalProduct.category !== updatedProduct.category) {
//       changedFields.push(
//         `Category: ${originalProduct.category} to ${updatedProduct.category}`
//       );
//     }
//     const response = await productStore.update(
//       originalProduct.id,
//       updatedProduct
//     );
//     Notify.create({
//       type: "warning",
//       icon: "check",
//       message: `${originalProduct.name} ${originalProduct.category} successfully updated!`,
//       position: "top",
//     });
//     dialog.value = false;
//     if (response.status === 2000) {
//       console.log("Product updated successfully:", response.data);
//     } else {
//       console.log("Failed to update product:", response);
//     }
//   } catch (error) {}
// };
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
