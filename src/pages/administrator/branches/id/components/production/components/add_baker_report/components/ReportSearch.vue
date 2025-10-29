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
                <q-item-label side>{{
                  capitalizeFirstLetter(branchRecipe?.category) || ""
                }}</q-item-label>
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
import { useRoute } from "vue-router";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter } = typographyFormat();

const route = useRoute();
const bakerReports = useBakerReportsStore();
const searchQuery = ref("");
const bakerReportStore = useBakerReportsStore();
const branchRecipeStore = useBranchRecipeStore();
const userData = computed(() => bakerReportStore.user);
console.log("erw:", userData.value);
const branhRecipes = computed(() => branchRecipeStore.branchRecipe);
const branch_id = route.params.branch_id;
console.log("branch_id", branch_id);
const search = async () => {
  branchRecipeStore.searchBranchRecipe(searchQuery.value, branch_id);
  console.log("searchQuery.value", searchQuery.value);
  console.log("branch_id", branch_id);
  console.log("branchRecipe", branchRecipe.value);
};
// watch(searchQuery, (newQuery) => {
//
const autoFillRecipe = (recipe) => {
  console.log("branch recipe", recipe);
  bakerReports.setRecipe(recipe);
  searchQuery.value = "";
};

console.log("recipessss", branhRecipes.value);
</script>

<style lang="scss" scoped></style>
