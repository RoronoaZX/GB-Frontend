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
          <div
            v-for="(bread, index) in bakersReport.breads"
            :key="bread.id"
            class="q-my-md"
          >
            <div>
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
      </div>
      <div class="q-mt-sm"></div>
      <q-btn
        outline
        dense
        size="md"
        icon="add"
        label="Report"
        class="text-purple"
        :loading="isLoading"
        @click="autoFillReport"
      >
        <template v-slot:isLoading>
          <q-spinner size="20px" />
        </template>
      </q-btn>
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
                    {{ ingredient.multipliedQuantity }}
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
import { is, Loading, Notify } from "quasar";

const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
// console.log("erw:", userData);
const isLoading = ref(false);
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
  kilo: 0,
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
    const calculatedTarget = kilo * target;
    bakersReport.actual_target = Math.ceil(calculatedTarget);
  } else {
    bakersReport.actual_target = 0;
  }
};

// const calculateShortAndOver = () => {
//   const totalBreadPcs = bakersReport.breads.reduce(
//     (total, bread) => total + (parseFloat(bread.value) || 0),
//     0
//   );
//   const difference = totalBreadPcs - bakersReport.actual_target;

//   if (difference > 0) {
//     bakersReport.over = difference;
//     bakersReport.short = 0;
//   } else if (difference < 0) {
//     bakersReport.short = Math.abs(difference);
//     bakersReport.over = 0;
//   } else {
//     bakersReport.short = 0;
//     bakersReport.over = 0;
//   }
// };

const calculateShortAndOver = () => {
  const totalBreadPcs = bakersReport.breads.reduce(
    (total, bread) => total + (parseFloat(bread.value) || 0),
    0
  );

  const actualTarget = bakersReport.actual_target;

  // Adjust short and over based on comparison with actual_target
  if (totalBreadPcs === actualTarget) {
    bakersReport.short = 0;
    bakersReport.over = 0;
  } else if (totalBreadPcs > actualTarget) {
    bakersReport.over = totalBreadPcs - actualTarget;
    bakersReport.short = 0;
  } else if (totalBreadPcs < actualTarget) {
    bakersReport.short = actualTarget - totalBreadPcs;
    bakersReport.over = 0;
  }
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

const autoFillReport = () => {
  console.log("Report datasss:", bakersReport);

  isLoading.value = true;
  setTimeout(async () => {
    try {
      // const startTime = Date.now(); // Capture the start time
      bakersReport.user_id = userData.value?.data.id || "";
      bakersReport.branch_id = userData.value?.device?.branch_id || "";
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
          bread_production: parseInt(bread.value, 10) || 0,
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

      // const elapsedTime = Date.now() - startTime;
      // const remainingTime = Math.max(5000 - elapsedTime, 0); // Ensure at least 1 second

      // setTimeout(() => {
      //   isLoading.value = false; // Stop loading after 1 second
      // }, remainingTime);
      console.log("Report data set to store:", bakerReportStore.reports);
      Notify.create({
        message: `${recipeName.value} added to list`,
        type: "positive",
        position: "center",
        timeout: 500,
      });
      resetReportForm();
      bakerReportStore.recipes = {};
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      isLoading.value = false;
    }
  }, 1000);
};

const multipliedIngredients = computed(() => {
  const kilo = parseFloat(bakersReport.kilo) || 0; // Use parseFloat for decimal support
  return (recipe.value?.ingredients || []).map((ingredient) => {
    const quantity = parseFloat(ingredient.quantity) || 0; // Ensure quantity is parsed as a float
    const multipliedQuantity = kilo * quantity;

    // Format the multiplied quantity
    const formattedQuantity =
      multipliedQuantity % 1 === 0
        ? multipliedQuantity // Integer: display without decimal
        : parseFloat(multipliedQuantity.toFixed(2)); // Float: two decimal places

    return {
      ...ingredient,
      multipliedQuantity: formattedQuantity,
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
  {
    deep: true,
  }
);

watch(
  () => recipe.value?.bread_groups,
  () => {
    bakersReport.breads = Array.isArray(recipe.value?.bread_groups)
      ? recipe.value.bread_groups.map((group) => ({
          id: group.product_id,
          bread_name: group.bread_name,
          value: "",
        }))
      : []; // If undefined or not an array, fallback to an empty array

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
