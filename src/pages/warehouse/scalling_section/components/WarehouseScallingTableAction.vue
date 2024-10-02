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
  <q-dialog v-model="brancheScallingDialog">
    <!-- style="width: 1000px; max-width: 90vw;" -->
    <q-card class="my-card">
      <q-card-section
        class="row justify-between"
        style="background-color: #ef4444"
      >
        <div class="text-h6 text-white">
          <q-icon name="fa-solid fa-store" />
          Branch 1
        </div>
        <div class="text-white">
          <q-btn flat round dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          Scalling
          <q-icon name="scale" />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-x-sm">
          <div>
            <div class="q-my-sm">Recipe Name</div>
            <q-input
              v-model="addScaleForm.breadGroupName"
              placeholder="Search..."
              outlined
              dense
              style="width: 320px; max-width: 350px; min-width: 20px"
            >
              <template v-slot:append>
                <div>
                  <q-icon name="search" />
                </div>
              </template>
            </q-input>
          </div>
          <div>
            <div class="q-my-sm">Amount</div>
            <q-input
              v-model="addScaleForm.ingredientAmount"
              type="number"
              outlined
              dense
              style="width: 80px; max-width: 150px; min-width: none"
            />
          </div>
          <div>
            <div class="q-my-sm">Unit</div>
            <q-select
              v-model="addScaleForm.unit"
              :options="ingredientsUnitOptions"
              outlined
              dense
              style="width: 90px; max-width: 100px; min-width: none"
            />
          </div>
          <div class="q-mt-sm">
            <q-btn size="sm" outline dense icon="add" color="purple" />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Cancel" v-close-popup />
        <q-btn class="glossy" color="teal" label="Create" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";

const brancheScallingDialog = ref();
const ingredientsUnitOptions = ["Grams", "kgs", "Pcs"];
const open_branch_scalling_dialog = () => {
  brancheScallingDialog.value = true;
};
const addScaleForm = reactive({
  breadGroupName: "",
  breadGroupAmount: "",
  unit: "",
});
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
</style>
