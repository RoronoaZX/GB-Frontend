<template>
  <q-btn
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
    @click="openDialog"
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
  <q-dialog v-model="dialog" persistent>
    <q-card class="my-card" style="width: 400px">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Add Recipe</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div>
          <div>Recipe Name</div>
          <q-input
            v-model="editRecipe.name"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div>Target Pcs</div>
          <q-input
            v-model="editRecipe.target"
            suffix=" / 1kg"
            outlined
            mask="###"
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div class="q-mt-lg">
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
            @new-value="createValue"
            @filter="filterFn"
          >
            <!-- @new-value="createValue"
            @filter="filterBread"
            @filter-abort="abortFilterFn" -->
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="q-mt-lg q-gutter-y-md">
          <div class="row justify-between">
            <div>
              <div>Ingredients</div>
              <q-input
                v-model="searchQuery"
                @update:model-value="search"
                debounce="3000"
                outlined
                dense
              >
                <template v-slot:append>
                  <div>
                    <q-icon name="search" />
                  </div>
                </template>
              </q-input>
            </div>
            <div>
              <div>Quantity</div>
              <q-input outlined mask="###" dense style="width: 100px" />
            </div>
          </div>
          <div class="q-mt-sm" align="right">
            <q-btn
              size="sm"
              outline
              dense
              icon="add"
              color="purple"
              @click="addIngredients"
            />
          </div>
          <div>
            <q-field outlined readonly dense label="Ingredients List">
              <template v-slot:control>
                <div
                  v-for="(ingredient, index) in ingredientsList"
                  :key="index"
                >
                  {{ ingredient.name }} - {{ ingredient.quantity }}
                </div>
              </template>
            </q-field>
          </div>
        </div>
        <q-card-actions class="row q-ma-md" align="right">
          <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
          <q-btn class="glossy" color="teal" label="Create" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";

const dialog = ref(false);
const ingredientsUnitOptions = ["Grams", "Pcs"];
const openDialog = () => {
  dialog.value = true;
};
const breadGroup = ref(null);

const editRecipe = reactive({
  name: "",
  unit: null,
});
</script>
