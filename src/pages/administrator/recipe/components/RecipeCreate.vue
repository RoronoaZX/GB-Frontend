<template>
  <q-btn
    class="text-dark q-pa-sm"
    outline
    dense
    elevated
    icon="add_circle"
    label="Add Recipe"
    @click="openAddRecipe"
    style="background-color: #ef4444"
  />
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
        <div class="text-h5 q-mr-md">📜 Add Recipe</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-mx-md">
        <div class="q-mt-md q-animated q-animate-bounce">
          <q-input
            class="text-capitalize"
            v-model="recipe.name"
            outlined
            dense
            label="Recipe Name"
            :rules="[
              (val) => (val && val.length > 0) || 'Recipe name is required',
            ]"
          />
        </div>
        <div class="q-mt-md q-animated q-animate-bounce">
          <q-select
            v-model="recipe.category"
            :options="category"
            hide-dropdown-icon
            outlined
            dense
            behavior="menu"
            label="Category"
            :rules="[
              (val) => (val && val.length > 0) || 'Category is required',
            ]"
          />
        </div>
        <q-card-actions
          class="row q-mt-md q-px-lg q-py-sm q-pt-none"
          align="right"
        >
          <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
          <q-btn
            class="glossy"
            color="teal"
            label="Create"
            @click="saveRecipe"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { useRecipeStore } from "src/stores/recipe";
import { Notify } from "quasar";

const recipeRows = computed(() => recipeStore.recipes);
const recipeStore = useRecipeStore();
const dialog = ref(false);
const openAddRecipe = () => {
  dialog.value = true;
};
const category = ["Dough", "Filling"];
const loading = ref(false);
const recipe = reactive({
  name: "",
  category: "",
});

const saveRecipe = async () => {
  console.log("Recipe", recipe);
  try {
    loading.value = true;
    await recipeStore.createRecipe(recipe);
    loading.value = false;
    dialog.value = false;
    clearRecipeData();
    recipeRows.value = await recipeStore.fetchRecipes();
  } catch (error) {
    loading.value = false;
  }
};

const clearRecipeData = () => {
  recipe.name = "";
  recipe.category = "";

  dialog.value = false;
};
</script>
<style>
.q-chip {
  color: #000000;
}
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
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
