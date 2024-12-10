<template>
  <div class="row justify-center">
    <div>
      <div>
        <div class="text-h6 q-ma-sm">
          {{ capitalizeFirstLetter(recipeName) }}
        </div>
      </div>
      <div class="row q-gutter-sm">
        <div>
          Target Pcs
          <div>
            <q-field
              readonly
              outlined
              type="number"
              dense
              :label="recipe?.target || 0"
              style="width: 100px; max-width: 300px; min-width: 50px"
            />
          </div>
        </div>
        <div>
          Actual Target
          <div>
            <q-field
              readonly
              outlined
              dense
              :label="bakersReport.actual_target"
              style="width: 100px; max-width: 300px; min-width: 50px"
            />
          </div>
        </div>
      </div>
      <div class="row q-mt-sm q-gutter-sm">
        <div>
          Short
          <div>
            <q-field
              readonly
              outlined
              type="number"
              dense
              :label="bakersReport.short"
              style="width: 100px; max-width: 300px; min-width: 50px"
            />
          </div>
        </div>
        <div>
          Over
          <div>
            <q-field
              readonly
              outlined
              dense
              :label="bakersReport.over"
              style="width: 100px; max-width: 300px; min-width: 50px"
            />
          </div>
        </div>
      </div>
      <div class="q-mb-md">
        <div class="q-mt-sm">Kilo</div>
        <div>
          <q-input
            outlined
            dense
            v-model="bakersReport.kilo"
            type="number"
            placeholder="kgs"
            style="width: 210px; max-width: 300px; min-width: 50px"
          />
        </div>
      </div>
      <div class="q-mt-md q-gutter-md">
        <div v-if="bakersReport.breads.length">
          <div v-for="(bread, index) in bakersReport.breads" :key="bread.id">
            <div>{{ bread.bread_name }}</div>
            <div>
              <q-input
                outlined
                v-model="bakersReport.breads[index].value"
                dense
                type="number"
                placeholder="Pcs"
                style="width: 210px; max-width: 300px; min-width: 50px"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="q-mt-sm"></div>
      <q-btn
        outline
        dense
        size="md"
        icon="add"
        label="Report"
        class="text-purple"
        @click="autoFillReport"
      />
    </div>
    <div>
      <div class="text-h6 q-mt-sm" align="center">Ingredients List</div>
      <div class="q-mt-lg">
        <q-field
          readonly
          outlined
          style="width: 400px; max-width: 450px; min-width: 100px"
        >
          <template v-slot:control>
            <q-list dense separator>
              <q-item
                v-for="(ingredient, index) in multipliedIngredients"
                :key="index"
                class="q-pa-xs justify-between"
              >
                <q-item-section>
                  <q-item-label class="ingredient-name">
                    {{ ingredient.code }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side class="text-right">
                  <div class="ingredient-quantity">
                    {{ ingredient.multipliedQuantity.toFixed(2) }}
                  </div>
                </q-item-section>
                <q-item-section side class="text-right">
                  <div class="ingredient-quantity">
                    {{ ingredient.unit }}
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-field>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive, watch } from "vue";
import { useBakerReportsStore } from "src/stores/baker-report";

const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
// console.log("erw:", userData);
const recipe = computed(() => bakerReportStore.recipes);
console.log("erwe:", recipe.value);

const recipeName = computed(() => {
  const name = recipe.value?.name ?? "Recipe Name";
  const category = recipe.value?.category ?? "Category";
  return `${name} - ${category}`;
});

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const bakersReport = reactive({
  user_id: null,
  branch_id: null,
  branch_recipe_id: null,
  recipe_name: "",
  recipe_category: "",
  kilo: "",
  short: 0,
  over: 0,
  target: 0,
  actual_target: 0,
  breads: [],
});

const updateActualTarget = () => {
  const kilo = parseFloat(bakersReport.kilo);
  const target = parseFloat(recipe.value?.target);
  if (!isNaN(kilo) && !isNaN(target)) {
    bakersReport.actual_target = kilo * target;
  } else {
    bakersReport.actual_target = 0;
  }
};

const calculateShortAndOver = () => {
  const totalBreadPcs = bakersReport.breads.reduce(
    (total, bread) => total + (parseFloat(bread.value) || 0),
    0
  );
  const difference = totalBreadPcs - bakersReport.actual_target;

  if (difference > 0) {
    bakersReport.over = difference;
    bakersReport.short = 0;
  } else if (difference < 0) {
    bakersReport.short = Math.abs(difference);
    bakersReport.over = 0;
  } else {
    bakersReport.short = 0;
    bakersReport.over = 0;
  }
};

const autoFillReport = () => {
  bakersReport.user_id = userData.value?.data.id || "";
  bakersReport.branch_id = userData.value?.employee?.branch_id || "";
  bakersReport.branch_recipe_id = recipe.value?.id || "";
  bakersReport.recipe_name = recipe.value?.name || "";
  bakersReport.target = recipe.value?.target || "";
  bakersReport.recipe_category = recipe.value?.category || "";
  const reportData = {
    user_id: bakersReport.user_id,
    branch_id: bakersReport.branch_id,
    branch_recipe_id: bakersReport.branch_recipe_id,
    recipe_name: bakersReport.recipe_name,
    recipe_category: bakersReport.recipe_category,
    status: "pending",
    kilo: bakersReport.kilo,
    short: bakersReport.short,
    over: bakersReport.over,
    target: bakersReport.target,
    actual_target: bakersReport.actual_target,
    breads: bakersReport.breads.map((bread) => ({
      bread_id: bread.id,
      bread_name: bread.bread_name,
      bread_production: parseInt(bread.value, 10),
    })),
    ingredients: multipliedIngredients.value.map((ingredient) => ({
      ingredients_id: ingredient.raw_materials_id,
      code: ingredient.code,
      quantity: ingredient.multipliedQuantity,
      unit: ingredient.unit,
    })),
  };

  console.log("reportssss dATA:", reportData);
  bakerReportStore.setReport(reportData);
  console.log("Report data set to store:", bakerReportStore.reports);
  resetReportForm();
};

const resetReportForm = () => {
  recipe.value = "";
  recipeName.value = "";
  bakersReport.recipe_name = "";
  bakersReport.kilo = "";
  bakersReport.short = 0;
  bakersReport.over = 0;
  bakersReport.target = 0;
  bakersReport.actual_target = 0;
  bakersReport.breads =
    recipe.value?.bread_groups?.map((group) => ({
      id: group.product_id,
      bread_name: group.bread_name,
      value: "", // Initialize value as an empty string
    })) || [];
};

const multipliedIngredients = computed(() => {
  const kilo = parseInt(bakersReport.kilo) || 1;
  return (recipe.value?.ingredients || []).map((ingredient) => {
    const quantity = parseInt(ingredient.quantity);
    const multipliedQuantity =
      !isNaN(kilo) && !isNaN(quantity) ? kilo * quantity : 0;
    return {
      ...ingredient,
      multipliedQuantity,
    };
  });
});

watch(
  () => bakersReport.kilo,
  () => {
    updateActualTarget();
    calculateShortAndOver();
  }
);

watch(
  () => recipe.value?.ingredients,
  () => {
    calculateShortAndOver();
  },
  { deep: true }
);

watch(
  () => bakersReport.breads.map((bread) => bread.value),
  calculateShortAndOver,
  { deep: true }
);

watch(
  () => recipe.value?.bread_groups,
  () => {
    bakersReport.breads =
      recipe.value?.bread_groups.map((group) => ({
        id: group.product_id,
        bread_name: group.bread_name,
        value: "",
      })) || [];
    calculateShortAndOver();
  }
);
</script>

<style lang="scss" scoped>
.q-field {
  width: 100%;
}

.q-item-section {
  flex: 1;
}

.ingredient-name {
  font-weight: bold;
}

.ingredient-quantity {
  text-align: right;
}
</style>
