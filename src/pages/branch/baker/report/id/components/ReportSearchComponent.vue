<template>
  <q-input
    v-model="searchQuery"
    @update:model-value="search"
    debounce="1000"
    outlined
    rounded
    placeholder="Search Recipe"
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
          <q-item v-if="!branhRecipes?.length"> No record found. </q-item>
          <template v-else>
            <q-item
              @click="autoFillRecipe(branchRecipe)"
              v-for="branchRecipe in branhRecipes"
              :key="branchRecipe.id"
              clickable
            >
              <q-item-section>
                <q-item-label>{{
                  capitalizeFirstLetter(branchRecipe?.name)
                }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label side>{{ branchRecipe?.category }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-card>
    </div>
  </q-input>
</template>

<script setup>
import { ref, watch, computed, reactive } from "vue";
import { useBranchRecipeStore } from "src/stores/branch-recipe";
import { useBakerReportsStore } from "src/stores/baker-report";

const bakerReports = useBakerReportsStore();
const searchQuery = ref("");
const bakerReportStore = useBakerReportsStore();
const branchRecipeStore = useBranchRecipeStore();
const userData = computed(() => bakerReportStore.user);
console.log("erw:", userData.value);
const branhRecipes = computed(() => branchRecipeStore.branchRecipe);
const branch_id = userData.value?.employee?.branch_id || "";
console.log("branch_id", branch_id);

const search = async () => {
  branchRecipeStore.searchBranchRecipe(searchQuery.value, branch_id);
  console.log("searchQuery.value", searchQuery.value);
  console.log("branch_id", branch_id);
};
// watch(searchQuery, (newQuery) => {
//
const autoFillRecipe = (recipe) => {
  console.log("branch recipe", recipe);
  bakerReports.setRecipe(recipe);
  searchQuery.value = "";
};
const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

console.log("recipessss", branhRecipes.value);
</script>

<style lang="scss" scoped>
// .custom-list {
//   position: absolute;
//   width: 100%;
//   background-color: white;
//   max-height: 300px;
//   overflow-y: auto;
//   box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
//   border-radius: 8px;
//   margin-top: 4px;
// }
</style>
