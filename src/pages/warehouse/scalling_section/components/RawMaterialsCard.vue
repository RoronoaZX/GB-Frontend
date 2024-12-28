<template>
  <div class="text-h6" align="center">Report List</div>
  <div class="q-pa-md row wrap justify-center">
    <q-virtual-scroll
      :items="warehouseRawMaterialsReport"
      scroll-target="body"
      virtual-scroll-horizontal
      class="my-virtual-scroll"
    >
      <template v-slot="{ item: report, index }">
        <q-card flat bordered class="q-gutter-sm my-card" :key="index">
          <!-- {{ report }} -->
          <q-card-section>
            <div class="row justify-between q-gutter-x-md">
              <div class="row items-center">
                <q-icon name="assignment" color="primary" />
                <div class="text-subtitle1 q-ml-sm">
                  {{
                    capitalizeFirstLetter(report.recipeName) +
                    " - " +
                    report.recipe_category
                  }}
                </div>
              </div>
              <div>
                <q-btn
                  flat
                  round
                  icon="close"
                  @click="removeReports(index)"
                  class="text-negative close-btn"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="content-section">
            <div class="q-mt-xs row justify-between">
              <div>Kilos</div>
              <div>{{ report.kilo }} kgs</div>
            </div>
            <q-expansion-item
              :key="'ingredients-' + index"
              label="Ingredients"
              dense
            >
              <ul class="q-pl-md">
                <li
                  v-for="(ingredient, ingredientIndex) in report.ingredients"
                  :key="'ingredient-' + ingredientIndex"
                  class="q-my-sm"
                >
                  <div class="row justify-between">
                    <div>
                      {{ ingredient.ingredient_name }}
                    </div>
                    <div>
                      {{ ingredient.quantity }}
                      {{ ingredient.unit }}
                    </div>
                  </div>
                </li>
              </ul>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </template>
    </q-virtual-scroll>
  </div>
</template>

<script setup>
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import { computed } from "vue";

const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();
const warehouseRawMaterialsReport = computed(
  () => warehouseRawMaterialsStore.warehouseRawMaterialsReport
);

const removeReports = (index) => {
  warehouseRawMaterialsStore.removeReport(index);
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
</script>

<style lang="scss" scoped>
.my-card {
  width: auto;
  margin: 8px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.my-card:hover {
  transform: translateY(-5px);
}

.my-expansion-item {
  background-color: #f9f9f9;
  border-radius: 8px;
}

.content-section {
  font-size: 14px;
  color: #555;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 4px 0;
}

.row {
  font-weight: bold;
}

.my-virtual-scroll {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 16px;
}

.my-virtual-scroll .q-card {
  display: inline-block;
  white-space: normal;
}

.centered-content {
  text-align: center;
}
</style>
