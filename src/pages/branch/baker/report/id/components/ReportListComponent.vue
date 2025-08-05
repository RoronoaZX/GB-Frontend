<template>
  <div v-if="bakerReport.length > 0" class="text-h6 q-mb-md" align="center">
    Report List
  </div>
  <div v-if="bakerReport.length > 0" class="row wrap justify-center">
    <div>
      <q-virtual-scroll
        :items="bakerReport"
        scroll-target="body"
        virtual-scroll-horizontal
        class="my-virtual-scroll"
      >
        <template v-slot="{ item: report, index }">
          <q-card flat bordered class="q-gutter-sm my-card" :key="index">
            <q-card-section>
              <div class="row justify-between q-gutter-x-md">
                <div class="row items-center">
                  <q-icon name="assignment" color="primary" />
                  <div class="text-subtitle1 q-ml-sm">
                    {{ capitalizeFirstLetter(report.recipe_name) }} -
                    {{ report.recipe_category }}
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
            <q-card-section>
              <div class="content-section">
                <div class="q-mt-xs row justify-between">
                  <div>Kilo</div>
                  <div>{{ report.kilo }} kgs</div>
                </div>
                <div class="q-mt-xs row justify-between">
                  <div>Short</div>
                  <div>{{ report.short }} pcs</div>
                </div>
                <div class="q-mt-xs row justify-between">
                  <div>Over</div>
                  <div>{{ report.over }} pcs</div>
                </div>
                <div class="q-mt-xs row justify-between">
                  <div>Actual Target</div>
                  <div>{{ report.actual_target }} pcs</div>
                </div>

                <q-expansion-item
                  :key="'breads-' + index"
                  label="Breads"
                  dense
                  class=""
                >
                  <ul class="q-pl-md">
                    <li
                      v-for="(bread, breadIndex) in report.breads"
                      :key="'bread-' + breadIndex"
                      class="q-my-sm"
                    >
                      <div class="row justify-between">
                        <div>{{ bread.bread_name }}</div>
                        <div>{{ bread.bread_production }}</div>
                      </div>
                    </li>
                  </ul>
                </q-expansion-item>
                <q-expansion-item
                  :key="'ingredients-' + index"
                  label="Ingredients"
                  dense
                  class=""
                >
                  <ul class="q-pl-md">
                    <li
                      v-for="(
                        ingredient, ingredientIndex
                      ) in report.ingredients"
                      :key="'ingredient-' + ingredientIndex"
                      class="q-my-sm"
                    >
                      <div class="row justify-between">
                        <div>
                          {{ ingredient.code }}
                        </div>
                        <div>
                          {{ ingredient.quantity }}
                          {{ ingredient.unit }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </q-expansion-item>
              </div>
            </q-card-section>
          </q-card>
        </template>
      </q-virtual-scroll>
    </div>
  </div>
  <div v-else class="flex flex-center column q-pa-md" style="min-height: 250px">
    <q-icon
      name="sentiment_very_dissatisfied"
      color="grey-5"
      size="80px"
      class="q-md-sm"
    />
    <div class="text-h6 text-grey-7 q-mb-xs">No reports list</div>
    <div class="text-subtitle2 text-grey-6 text-center">
      Type a report to see it here
    </div>
  </div>

  <!-- v-if="bakerReportStore.reports > 0" -->
</template>

<script setup>
import { useBakerReportsStore } from "src/stores/baker-report";
import { computed } from "vue";

const bakerReportStore = useBakerReportsStore();
const bakerReport = computed(() => bakerReportStore.reports);

console.log("bakers report:", bakerReport.value);
const removeReports = (index) => {
  bakerReportStore.removeReport(index);
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
</script>

<style scoped>
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
