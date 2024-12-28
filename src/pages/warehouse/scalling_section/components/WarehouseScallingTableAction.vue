<template>
  <q-btn
    color="accent"
    icon="scale"
    size="md"
    flat
    round
    dense
    @click="open_branch_scalling_dialog"
  >
    <q-tooltip class="bg-accent" :delay="200">Scale</q-tooltip>
  </q-btn>
  <q-dialog
    v-model="brancheScallingDialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <!-- style="width: 1000px; max-width: 90vw;" -->
    <q-card class="my-card">
      <q-card-section
        class="row justify-between"
        style="background-color: #ef4444"
      >
        <div class="text-h6 text-white">
          <q-icon name="fa-solid fa-store" />
          {{ branch.name }}
        </div>
        <div class="text-white">
          <q-btn flat round dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          Scaling
          <q-icon name="scale" />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-mb-md">
          <q-input
            v-model="searchQuery"
            @update:model-value="search"
            placeholder="Search Recipe..."
            debounce="1000"
            outlined
            dense
          >
            <!-- style="width: 450px" -->
            <template v-slot:append>
              <div>
                <q-icon name="search" />
              </div>
            </template>
            <div v-if="searchQuery" class="custom-list z-top">
              <q-card>
                <q-list separator>
                  <q-item v-if="!branchRecipe?.length">
                    No Record Found
                  </q-item>
                  <template v-else>
                    <q-item
                      v-for="branchRecipe in branchRecipe"
                      :key="branchRecipe.id"
                      clickable
                      @click="autoFillRawMaterials(branchRecipe)"
                    >
                      <q-item-section>
                        <q-item-label>{{ branchRecipe.name }}</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label side>{{
                          branchRecipe.category
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
        </div>
        <div v-if="recipeName && ingredientsGroup">
          <div class="row justify-between">
            <div class="col-3">
              <div class="text-subtitle1 q-ml-sm">{{ recipeName }}</div>
              <div class="q-mt-md">
                <q-input
                  v-model="addScaleForm.kilo"
                  type="number"
                  outlined
                  label="Kilo"
                  dense
                />
              </div>
              <div class="q-mt-sm">
                <q-btn
                  padding="sm lg"
                  size="sm"
                  outline
                  dense
                  icon="add"
                  color="purple"
                  @click="addScaleIngredientsToStore"
                />
              </div>
            </div>
            <div class="col-7">
              <div align="center">Ingredients List</div>
              <div>
                <q-list dense separator class="box">
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-overline"
                        >Raw Materials Name</q-item-label
                      >
                    </q-item-section>
                    <q-item-section> </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-overline"
                        >Quantity</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item
                    v-for="ingredient in scaledIngredientsGroup"
                    :key="ingredient.id"
                  >
                    <q-item-section>
                      <q-item-label>{{
                        ingredient.ingredient_name
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section> </q-item-section>
                    <q-item-section side>
                      <q-item-label>{{ ingredient.quantity }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <RawMaterialsCard />
      </q-card-section>
      <q-separator />
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Cancel" v-close-popup />
        <q-btn class="glossy" color="teal" label="Create" />
        <!-- @click="addScaleIngredientsToStore" -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import RawMaterialsCard from "./RawMaterialsCard.vue";

const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();
const branchRecipe = computed(() => warehouseRawMaterialsStore.branchRecipe);
const ingredientsGroup = ref([]);
const recipeName = ref("");
const recipe_id = ref("");
const recipe_category = ref("");
const props = defineProps({
  branch: Object,
});
const branch_id = props.branch.id;
const maximizedToggle = ref(true);
console.log("branch", props.branch);

const search = async () => {
  console.log("searchQuery.value", searchQuery.value);
  console.log("branch_id", branch_id);
  warehouseRawMaterialsStore.searchBranchRecipe(searchQuery.value, branch_id);
};

const brancheScallingDialog = ref();
const ingredientsUnitOptions = ["Grams", "kgs", "Pcs"];
const open_branch_scalling_dialog = () => {
  brancheScallingDialog.value = true;
};
const searchQuery = ref("");

const autoFillRawMaterials = (data) => {
  console.log("data", data);
  searchQuery.value = "";
  recipe_id.value = data.recipe_id;
  recipeName.value = data.name;
  recipe_category.value = data.category;
  ingredientsGroup.value = data.ingredients;
};

const addScaleForm = reactive({
  kilo: "",
});

// Computed property for real-time scaling
const scaledIngredientsGroup = computed(() => {
  if (!addScaleForm.kilo || addScaleForm.kilo <= 0) {
    return ingredientsGroup.value;
  }
  return ingredientsGroup.value.map((ingredient) => ({
    ...ingredient,
    quantity: (ingredient.quantity * addScaleForm.kilo).toFixed(2), // Scale quantity and format to 2 decimal places
  }));
});

const addScaleIngredientsToStore = async () => {
  const scaledIngredients = {
    branch_id,
    kilo: addScaleForm.kilo,
    recipe_id: recipe_id.value,
    recipeName: recipeName.value,
    recipe_category: recipe_category.value,
    ingredients: scaledIngredientsGroup.value,
  };
  await warehouseRawMaterialsStore.setReport(scaledIngredients);
  console.log("scaledIngredients", scaledIngredients);
  addScaleForm.kilo = "";
  recipe_id.value = "";
  recipeName.value = "";
  recipe_category.value = "";
  ingredientsGroup.value = [];
};
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  max-width: 100%;
}
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
