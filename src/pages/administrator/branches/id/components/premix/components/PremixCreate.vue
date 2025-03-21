<template>
  <div>
    <q-btn
      outline
      class="text-dark q-pa-sm"
      push
      dense
      elevated
      icon="add_circle"
      label="Create Branch Premix"
      @click="open_dialog"
    />

    <q-dialog v-model="dialog" persistent>
      <q-card
        class="my-card"
        style="width: 400px; max-width: 500px; min-width: 100px"
      >
        <q-card-section
          class="row items-center text-white"
          style="background-color: #ef4444"
        >
          <div class="text-h6">Create Branch Premix</div>
          <q-space />
          <q-btn icon="close" flat dense round v-close-popup />
        </q-card-section>
        <q-card-section class="q-ma-md q-gutter-y-sm">
          <q-input
            v-model="searchQuery"
            @update:model-value="search"
            debounce="1000"
            outlined
            rounded
            placeholder="Search premix"
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
                  <q-item v-if="!branhRecipes?.length">
                    No record found.
                  </q-item>
                  <template v-else>
                    <q-item
                      @click="autofillRecipe(branchRecipe)"
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
                          branchRecipe?.category
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
          <div class="q-mb-sm">
            <div>Recipe Name</div>
            <q-input
              v-model="addBranchPremixRecipe.name"
              readonly
              dense
              outlined
            />
          </div>
          <div class="q-mb-lg">
            <div>Category</div>
            <q-input
              v-model="addBranchPremixRecipe.category"
              readonly
              dense
              outlined
            />
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <div>Quantity</div>
            <q-input
              v-model="addBranchPremixRecipe.available_stocks"
              dense
              outlined
              type="number"
              suffix="kg/s"
            />
          </div>
        </q-card-section>
        <q-card-actions class="row q-ma-md" align="right">
          <q-btn
            class="glossy"
            color="grey-9"
            label="Dismiss"
            @click="dismiss"
          />
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
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useBranchRecipeStore } from "src/stores/branch-recipe";
import { usePremixStore } from "/src/stores/premix";
import { useRoute } from "vue-router";

const route = useRoute();
const branchId = route.params.branch_id;
const branchRecipeStore = useBranchRecipeStore();
const branhRecipes = computed(() => branchRecipeStore.branchRecipe);
const premixStore = usePremixStore();
const premixData = computed(() => premixStore.premixes);

const dialog = ref(false);

const open_dialog = () => {
  dialog.value = true;
};

const searchQuery = ref("");
const search = async () => {
  branchRecipeStore.searchBranchRecipe(searchQuery.value, branchId);
  console.log("searchQuery.value", searchQuery.value);
  console.log("branchId", branchId);
};

const isFormValid = computed(() => {
  return addBranchPremixRecipe.available_stocks !== 0;
});

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const autofillRecipe = (data) => {
  addBranchPremixRecipe.branch_recipe_id = data.id;
  addBranchPremixRecipe.name = data.name;
  addBranchPremixRecipe.category = data.category;
  searchQuery.value = "";
};

const addBranchPremixRecipe = reactive({
  branch_recipe_id: "",
  name: "",
  category: "",
  available_stocks: "",
  branch_id: branchId,
  status: "active",
});

const save = async () => {
  console.log(addBranchPremixRecipe);
  await premixStore.savePremix(addBranchPremixRecipe);
};
</script>

<style lang="scss" scoped></style>
