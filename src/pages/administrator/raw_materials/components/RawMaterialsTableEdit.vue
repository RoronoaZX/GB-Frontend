<template>
  <q-btn
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
    @click="openEditForm"
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
  <q-dialog
    v-model="editRawMaterialsDialog"
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
        <div class="text-h5 q-mr-md">🛠️ Edit Raw Materials</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup class="text-white" />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div class="q-animated q-animate-bounce">
          <div class="q-my-sm">Raw Materials Name</div>
          <q-input v-model="editRawMaterialsForm.name" outlined dense />
        </div>
        <div class="q-animated q-animate-bounce">
          <div class="q-my-sm">Raw Materials Code</div>
          <q-input
            v-model="editRawMaterialsForm.code"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
            mask="##-AAAAAAAAAAAAAAAAAAAAA"
            placeholder="00-SAMPLE"
          />
        </div>
        <div class="q-animated q-animate-bounce">
          <div class="q-my-sm">Category</div>
          <div class="q-mt-md">
            <q-select
              v-model="editRawMaterialsForm.category"
              :options="rawMaterialsCategory"
              hide-dropdown-icon
              outlined
              dense
              behavior="menu"
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
        </div>
        <div class="q-animated q-animate-bounce">
          <div class="q-my-sm">Unit</div>
          <div class="q-mt-md">
            <q-select
              v-model="editRawMaterialsForm.unit"
              :options="ingredientsUnitOptions"
              hide-dropdown-icon
              outlined
              dense
              behavior="menu"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn
          class="btn-cancel glossy"
          color="negative"
          label="Cancel"
          v-close-popup
        />
        <q-btn
          class="btn-create glossy"
          color="positive"
          label="Save"
          :loading="loading"
          @click="saveEditedIngredient"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRawMaterialsStore } from "src/stores/raw-material";
import { Notify } from "quasar";

const rawMaterialsStore = useRawMaterialsStore();
const editRawMaterialsDialog = ref(false);
const rawMaterialsCategory = ["Ingredients", "Packaging Materials"];
const ingredientsUnitOptions = ["Grams", "Pcs"];

const props = defineProps(["edit"]);

const editRawMaterialsForm = reactive({
  name: "",
  code: "",
  category: null,
  unit: null,
});

const openEditForm = () => {
  const editRawMaterials = Object.assign(editRawMaterialsForm, props.edit.row);
  editRawMaterialsDialog.value = true;
  console.log("editRawMaterials", editRawMaterials);
};

const saveEditedIngredient = async () => {
  try {
    const updatedRawMaterials = { ...props.edit.row, ...editRawMaterialsForm };
    await rawMaterialsStore.updateRawMaterials(
      props.edit.row.id,
      updatedRawMaterials
    );
    editRawMaterialsDialog.value = false;
  } catch (error) {
    console.error("Failed to update ingredient:", error);
  }
};
</script>
<style scoped>
.my-card {
  background: #ffffff;
  animation: fadeIn 0.3s ease;
}

.btn-add {
  background: linear-gradient(45deg, #42a5f5, #478ed1);
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
