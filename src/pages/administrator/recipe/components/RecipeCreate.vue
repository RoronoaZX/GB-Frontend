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
        <!-- <div class="q-mt-md q-animated q-animate-bounce">
          <div>Target Pcs</div>
          <q-input
            v-model="recipe.target"
            suffix=" / 1kg"
            outlined
            type="number"
            dense
            label="Target Piece/s"
            :rules="[
              (val) => (val && val.length > 0) || 'Target piece/s is required',
            ]"
          />
        </div> -->
        <div class="q-mt-md q-animated q-animate-bounce">
          <!-- <div class="q-my-sm">Category</div> -->
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
        <!-- <div class="q-mt-md q-animated q-animate-bounce">
          <div>Breads</div>
          <q-select
            v-model="breadGroup"
            use-input
            use-chips
            chips-color="primary"
            multiple
            input-debounce="0"
            :options="filterBreadOptions"
            behavior="menu"
            hide-dropdown-icon
            outlined
            dense
            label="Bread/s"
            @new-value="createValue"
            @filter="filterFn"
            :rules="[(val) => (val && val.length > 0) || 'Bread is required']"
          >
            @new-value="createValue"
            @filter="filterBread"
            @filter-abort="abortFilterFn"
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div> -->
        <!-- <div class="q-mt-md q-gutter-y-sm q-animated q-animate-bounce">
          <div class="text-weight-thin">Ingredients List</div>
          <div>
            <q-list dense separator class="box">
              <q-item
                v-for="(ingredient, index) in ingredientGroup"
                :key="index"
              >
                <q-item-section>
                  <q-item-label>{{ ingredient.label }}</q-item-label>
                </q-item-section>
                <q-item-section
                  >{{ ingredient.quantity }}
                  {{ ingredient.unit }}</q-item-section
                >
                <q-item-section side>
                  <q-btn
                    @click="removeIngredient(index)"
                    color="grey-10"
                    icon="backspace"
                    dense
                    flat
                    round
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="q-mt-xl q-gutter-y-sm q-animated q-animate-bounce">
          <div class="row justify-between">
            <div>
              <div align="center">Ingredients</div>
              <q-select
                v-model="selectedIngredients.name"
                debounce="3000"
                outlined
                chips-color="primary"
                :options="filterIngredientsOptions"
                dense
                label="Ingredients"
                behavior="menu"
                use-input
                hide-dropdown-icon
                @filter="filterIngredients"
                style="width: 215px; max-width: 450px; min-width: 80px"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div>
              <div align="center">Quantity</div>
              <q-input
                v-model="selectedIngredients.quantity"
                outlined
                mask="#####"
                dense
                label="Quantity"
                :suffix="selectedIngredients.name.unit || ''"
                style="width: 115px"
              />
            </div>
          </div>
          <form @keyup.enter.prevent="addIngredients">
            <div align="right">
              <q-btn
                padding="xs md"
                type="button"
                size="sm"
                outline
                dense
                label="add"
                icon="add"
                color="purple"
                @click="addIngredients"
              />
            </div>
          </form>
        </div> -->
        <!-- <q-separator class="q-my-lg"></q-separator> -->
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
// import { useProductsStore } from "src/stores/product";
// import { useRawMaterialsStore } from "src/stores/raw-material";
import { ref, reactive, watch, computed } from "vue";
import { useRecipeStore } from "src/stores/recipe";
import { Notify } from "quasar";
const recipeRows = computed(() => recipeStore.recipes);

// const breadProductStore = useProductsStore();
// const ingredientsStore = useRawMaterialsStore();
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

// const breadGroup = ref(null);
// const breadOptions = ref([]);
// const filterBreadOptions = ref(breadOptions.value);
// const ingredientGroup = ref([]);
// const ingredientOptions = ref([]);
// const selectedIngredients = reactive({
//   name: "",
//   quantity: "",
// });
// const filterIngredientsOptions = ref(ingredientOptions.value);

// const fetchBreadsData = async () => {
//   const breads = await breadProductStore.fetchProductsByCategory("Bread");

//   loading.value = false;
//   breadOptions.value = breadProductStore.breads.map((val) => {
//     return {
//       label: val.name,
//       value: val.id,
//     };
//   });
// };
// fetchBreadsData();

// const fetchIngredientsData = async () => {
//   const ingredient = await ingredientsStore.fetchIngredients("Ingredients");
//   loading.value = false;
//   ingredientOptions.value = ingredientsStore.ingredients.map((val) => {
//     return {
//       label: val.name,
//       value: val.id,
//       unit: val.unit,
//     };
//   });
// };
// fetchIngredientsData();

// const clearData = () => {
//   (selectedIngredients.name = ""), (selectedIngredients.quantity = "");
// };

// const createValue = (val, done) => {
//   if (val.length > 2) {
//     if (!breadOptions.value.includes(val)) {
//       done(val, "add-unique");
//     }
//   }
// };

// const filterFn = (val, update) => {
//   update(() => {
//     if (val === "") {
//       filterBreadOptions.value = breadOptions.value;
//     } else {
//       const needle = val.toLowerCase();
//       filterBreadOptions.value = breadOptions.value.filter(
//         (v) => v.label.toLowerCase().indexOf(needle) > -1
//       );
//     }
//   });
// };

// const createValueIngredient = (val, done) => {
//   if (val.length > 2) {
//     if (!ingredientOptions.value.includes(val)) {
//       done(val, "add-unique");
//     }
//   }
// };
// const filterIngredients = (val, update) => {
//   update(() => {
//     if (val === "") {
//       filterIngredientsOptions.value = ingredientOptions.value;
//     } else {
//       const needle = val.toLowerCase();
//       filterIngredientsOptions.value = ingredientOptions.value.filter(
//         (v) => v.label.toLowerCase().indexOf(needle) > -1
//       );
//     }
//   });
// };

const saveRecipe = async () => {
  // const newData = {
  //   name: recipe.name,
  //   target: recipe.target,
  //   category: recipe.category,
  //   status: "Active",
  //   breads: breadGroup.value.map((bread) => ({
  //     bread_id: bread.value,
  //   })),
  //   ingredients: ingredientGroup.value.map((ingredient) => ({
  //     ingredient_id: ingredient.ingredients_id,
  //     quantity: ingredient.quantity,
  //   })),
  // };

  console.log("Recipe", recipe);
  try {
    loading.value = true;
    await recipeStore.createRecipe(recipe);
    loading.value = false;
    dialog.value = false;
    Notify.create({
      type: "positive",
      message: "Recipe created successfully",
      // position: "top",
    });
    clearRecipeData();
    // await reloadTableData();
    recipeRows.value = await recipeStore.fetchRecipes();
  } catch (error) {
    loading.value = false;
    // Notify.create({
    //   type: "negative",
    //   message: "Error creating recipe",
    // });
  }
};

const clearRecipeData = () => {
  recipe.name = "";
  recipe.category = "";
  // recipe.target = "";
  // breadGroup.value = null;
  // ingredientGroup.value = [];
  // selectedIngredients.name = "";
  // selectedIngredients.quantity = "";

  dialog.value = false;
};

// const addIngredients = () => {
//   const data = ingredientGroup.value;

//   function findObjectById(arr, id) {
//     return arr.find((obj) => obj.ingredients_id == id);
//   }
//   const idToSearch = selectedIngredients.name.value;

//   const foundObject = findObjectById(data, idToSearch);
//   if (!foundObject) {
//     ingredientGroup.value = [
//       ...data,
//       {
//         ingredients_id: selectedIngredients.name.value,
//         label: selectedIngredients.name.label,
//         quantity: selectedIngredients.quantity,
//         unit: selectedIngredients.name.unit,
//       },
//     ];
//     clearData();
//   } else {
//     Notify.create({
//       type: "negative",
//       icon: "warning",
//       message: "Ingredient already exist",
//       timeout: 2000,
//     });
//     // alert("ingredient already exist!");
//   }
// };

// const removeIngredient = (index) => {
//   ingredientGroup.value.splice(index, 1);
// };

// watch(
//   () => selectedIngredients.name,
//   (newVal) => {
//     if (newVal && newVal.unit) {
//       selectedIngredients.unit = newVal.unit;
//     } else {
//       selectedIngredients.unit = "";
//     }
//   }
// );
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
