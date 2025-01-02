<template>
  <q-btn
    class="q-pa-sm btn-add"
    outline
    dense
    elevated
    icon="add_circle"
    label="Add Raw Materials"
    @click="open_add_ingredients_dialog"
    size="md"
    color="dark"
  />

  <q-dialog
    v-model="createRawMaterialsDialog"
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
        <div class="text-h5 q-mr-md">🛠️ Add Raw Materials</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup class="text-white" />
      </q-card-section>

      <q-separator class="separator-gradient" />

      <q-card-section class="q-px-xl q-pt-none q-pb-lg">
        <q-form @submit.prevent="create">
          <div class="q-mt-lg q-animated q-animate-bounce">
            <q-input
              class="text-capitalize"
              v-model="addRawMaterialsForm.name"
              outlined
              dense
              label="Raw Materials Name"
              :rules="[(val) => (val && val.length > 0) || 'Name is required']"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <q-input
              v-model="addRawMaterialsForm.code"
              outlined
              dense
              label="Raw Materials Code"
              mask="##-AAAAAAAAAAAAAAAAAAAAA"
              placeholder="00-SAMPLE"
              :rules="[(val) => (val && val.length > 0) || 'Code is required']"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <q-select
              v-model="addRawMaterialsForm.category"
              :options="rawMaterialsCategory"
              label="Category"
              hide-dropdown-icon
              outlined
              dense
              behavior="menu"
              :rules="[
                (val) => (val && val.length > 0) || 'Category is required',
              ]"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <q-select
              v-model="addRawMaterialsForm.unit"
              :options="ingredientsUnitOptions"
              label="Unit"
              hide-dropdown-icon
              outlined
              dense
              behavior="menu"
              :rules="[(val) => (val && val.length > 0) || 'Unit is required']"
            />
          </div>
          <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
            <q-btn
              class="btn-cancel glossy"
              color="negative"
              label="Cancel"
              v-close-popup
            />
            <q-btn
              type="submit"
              class="btn-create glossy"
              color="positive"
              label="Create"
              :loading="loading"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRawMaterialsStore } from "src/stores/raw-material";

const rawMaterialStore = useRawMaterialsStore();
const createRawMaterialsDialog = ref(false);
const rawMaterialsCategory = ["Ingredients", "Packaging Materials"];
const ingredientsUnitOptions = ["Grams", "Pcs"];
const loading = ref(false);

const open_add_ingredients_dialog = () => {
  createRawMaterialsDialog.value = true;
};

const addRawMaterialsForm = reactive({
  name: "",
  code: "",
  category: null,
  unit: null,
});

const create = async () => {
  loading.value = true;
  try {
    const response = await rawMaterialStore.createRawMaterials(
      addRawMaterialsForm
    );
    console.log(response);

    createRawMaterialsDialog.value = false;
    resetCreateRawMaterials();
  } catch (error) {
    console.error(error);
    loading.value = false;
    createRawMaterialsDialog.value = true;
  } finally {
    loading.value = false;
  }
};

const resetCreateRawMaterials = () => {
  addRawMaterialsForm.name = "";
  addRawMaterialsForm.code = "";
  addRawMaterialsForm.category = null;
  addRawMaterialsForm.unit = null;
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
