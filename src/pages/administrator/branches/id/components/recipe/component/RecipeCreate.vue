<template>
  <q-btn
    outline
    class="text-dark q-pa-sm"
    push
    dense
    elevated
    icon="add_circle"
    label="Create Branch Recipe"
    @click="openDialog"
  />

  <q-dialog v-model="dialog">
    <q-card
      class="my-card"
      style="width: 400px; max-width: 500px; min-width: 100px"
    >
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Create Branch Recipe</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-mb-lg">
          <q-input
            v-model="searchQuery"
            @update:model-value="search"
            debounce="1000"
            outlined
            rounded
            placeholder="Search recipe"
            dense
          >
            <template v-slot:append>
              <div>
                <q-icon name="search" />
              </div>
            </template>
            <div v-if="searchQuery" class="custom-list z-top">
              <q-card>
                <q-list separator>
                  <q-item v-if="!recipesData?.length">
                    No record found.
                  </q-item>
                  <template v-else>
                    <q-item
                      @click="autofillRecipe(recipe)"
                      v-for="recipe in recipesData"
                      :key="recipe.id"
                      clickable
                    >
                      <q-item-section>
                        <q-item-label>{{
                          capitalizeFirstLetter(recipe.name)
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
        </div>
        <div class="q-mb-sm">
          <div>Recipe Name</div>
          <q-input
            v-model="addBranchRecipe.recipe_name"
            readonly
            dense
            outlined
          />
        </div>
        <div class="q-mb-lg">
          <div>Category</div>
          <q-input v-model="addBranchRecipe.category" readonly dense outlined />
        </div>

        <div>
          <q-input
            v-model="addBranchRecipe.target"
            outlined
            dense
            suffix=" / 1kg"
            type="number"
            label="Target Pcs"
            mask="##.##"
          />
          <!-- :rules="[
              (val) => (val && val.length > 0) || 'Target piece/s is required',
            ]" -->
        </div>
        <div>
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
            <!-- @new-value="createValue" @filter="filterBread"
            @filter-abort="abortFilterFn" -->
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="q-mt-md q-gutter-y-sm">
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
        <div class="q-mt-xl q-gutter-y-sm">
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
                v-model.number="selectedIngredients.quantity"
                outlined
                dense
                type="number"
                label="Quantity"
                :suffix="selectedIngredients?.name?.unit || ''"
                style="width: 115px"
                hint="Enter the quantity as a decimal"
                mask="##.##"
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
import { computed, reactive, ref, watch } from "vue";
import { useRecipeStore } from "src/stores/recipe";
import { useProductsStore } from "src/stores/product";
import { useRawMaterialsStore } from "src/stores/raw-material";
import { useRoute } from "vue-router";
import { Notify } from "quasar";
import { useBranchRecipeStore } from "src/stores/branch-recipe";

const route = useRoute();
const branchId = route.params.branch_id;
const recipeStore = useRecipeStore();
const recipesData = computed(() => recipeStore.recipes);
const branchRecipeStore = useBranchRecipeStore();
const breadProductStore = useProductsStore();
const ingredientsStore = useBranchRecipeStore();
const branchRecipeRows = computed(() => branchRecipeStore.branchRecipes);

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
const dismiss = () => {
  clearForm();
  dialog.value = false;
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const searchQuery = ref("");
const search = async () => {
  recipeStore.searchRecipe(searchQuery.value);
};

const isFormValid = computed(() => {
  return addBranchRecipe.target !== 0;
});

const autofillRecipe = (data) => {
  addBranchRecipe.recipe_id = data.id;
  addBranchRecipe.recipe_name = data.name;
  addBranchRecipe.category = data.category;
  searchQuery.value = "";
};

const addBranchRecipe = reactive({
  recipe_id: "",
  recipe_name: "",
  category: "",
  target: "",
  branches_id: route.params.branch_id,
});

const loading = ref(false);
const breadGroup = ref(null);
const breadOptions = ref([]);
const filterBreadOptions = ref(breadOptions.value);
const ingredientGroup = ref([]);
const ingredientOptions = ref([]);

const selectedIngredients = reactive({
  name: "",
  quantity: "",
});

const filterIngredientsOptions = ref(ingredientOptions.value);

const fetchBreadsData = async () => {
  const breads = await breadProductStore.fetchProductsByCategory("Bread");

  loading.value = false;
  breadOptions.value = breadProductStore.breads.map((val) => {
    return {
      label: val.name,
      value: val.id,
    };
  });
};
fetchBreadsData();

const fetchIngredientsData = async () => {
  const category = "Ingredients";
  const ingredient = await ingredientsStore.fetchBranchRawMaterials(
    category,
    branchId
  );
  loading.value = false;
  ingredientOptions.value = ingredientsStore.ingredients.map((val) => {
    return {
      label: val.raw_material_name,
      value: val.raw_material_id,
      unit: val.ingredient_unit,
    };
  });
};
fetchIngredientsData();

const clearData = () => {
  (selectedIngredients.name = ""), (selectedIngredients.quantity = "");
};

const createValue = (val, done) => {
  if (val.length > 2) {
    if (!breadOptions.value.includes(val)) {
      done(val, "add-unique");
    }
  }
};

const filterFn = (val, update) => {
  update(() => {
    if (val === "") {
      filterBreadOptions.value = breadOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterBreadOptions.value = breadOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const createValueIngredient = (val, done) => {
  if (val.length > 2) {
    if (!ingredientOptions.value.includes(val)) {
      done(val, "add-unique");
    }
  }
};
const filterIngredients = (val, update) => {
  update(() => {
    if (val === "") {
      filterIngredientsOptions.value = ingredientOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterIngredientsOptions.value = ingredientOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const addIngredients = () => {
  const data = ingredientGroup.value;

  function findObjectById(arr, id) {
    return arr.find((obj) => obj.ingredients_id == id);
  }
  const idToSearch = selectedIngredients.name.value;

  const foundObject = findObjectById(data, idToSearch);
  if (!foundObject) {
    ingredientGroup.value = [
      ...data,
      {
        ingredients_id: selectedIngredients.name.value,
        label: selectedIngredients.name.label,
        quantity: selectedIngredients.quantity,
        unit: selectedIngredients.name.unit,
      },
    ];
    clearData();
  } else {
    Notify.create({
      type: "negative",
      icon: "warning",
      message: "Ingredient already exist",
      timeout: 2000,
    });
    // alert("ingredient already exist!");
  }
};

const removeIngredient = (index) => {
  ingredientGroup.value.splice(index, 1);
};

watch(
  () => selectedIngredients.name,
  (newVal) => {
    if (newVal && newVal.unit) {
      selectedIngredients.unit = newVal.unit;
    } else {
      selectedIngredients.unit = "";
    }
  }
);

const clearRecipeData = () => {
  addBranchRecipe.recipe_id = "";
  addBranchRecipe.target = "";
  breadGroup.value = null;
  ingredientGroup.value = [];
  selectedIngredients.name = "";
  selectedIngredients.quantity = "";
};

const save = async () => {
  const newData = {
    recipe_id: addBranchRecipe.recipe_id,
    target: addBranchRecipe.target,
    status: "active",
    branch_id: addBranchRecipe.branches_id,
    breads: breadGroup.value.map((bread) => ({
      bread_id: bread.value,
    })),
    ingredients: ingredientGroup.value.map((ingredient) => ({
      ingredient_id: ingredient.ingredients_id,
      quantity: ingredient.quantity,
    })),
  };
  console.log("branchRecipe", newData);
  await branchRecipeStore.saveBranchRecipe(newData);
  branchRecipeRows.value = await branchRecipeStore.fetchBranchRecipes(branchId);
  clearRecipeData();
  dialog.value = false;
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
