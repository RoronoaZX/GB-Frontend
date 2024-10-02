<template>
  <div class="text-h6 q-mt-sm" align="center">Ingredients List</div>
  <div class="q-mt-lg">
    <q-field readonly outlined>
      <template v-slot:control>
        <q-list dense separator>
          <q-item
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index"
            class="q-pa-xs justify-between"
          >
            <q-item-section>
              <div class="ingredient-name">
                {{ ingredient.code }}
              </div>
            </q-item-section>
            <q-item-section side class="text-right">
              <div class="ingredient-quantity">
                {{ ingredient.quantity }}
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
</template>

<script setup>
import { useBakerReportsStore } from "src/stores/baker-report";
import { ref, computed } from "vue";

const bakerReportStore = useBakerReportsStore();
const recipe = computed(() => bakerReportStore.recipes);
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
