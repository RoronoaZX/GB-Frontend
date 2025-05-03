<template>
  <div>
    <q-btn
      class="bg-gradient text-white q-pa-sm"
      icon="add_circle"
      label="Create All"
      @click="openDialog"
    />
    <q-dialog v-model="dialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center text-white bg-gradient">
          <div class="text-h6">Create Branch Raw Materials</div>
          <q-space />
          <q-btn icon="close" flat dense round v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-btn
            class="bg-gradient text-white q-pa-sm"
            icon="add_circle"
            label="Fetch All"
            @click="fetchAllBranchRawMaterials"
          />
        </q-card-section>
        <q-card-section>
          <q-list dense separator class="box">
            <q-item>
              <q-item-section>
                <q-item-label class="text-overline"> Code</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-overline"> Name</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-overline"> Category</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-overline">Unit</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-for="(ingredients, index) in rawMaterialsData"
              :key="index"
            >
              <q-item-section>
                <q-item-label class="text-subtitle1">
                  {{ ingredients.code }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle1" align="left">
                  {{ ingredients.name }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle1">
                  {{ ingredients.category }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-subtitle1">
                  {{ ingredients.unit }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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
            @click="createAllBranchRawMaterials"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { Loading, Notify } from "quasar";
import { useRawMaterialsStore } from "src/stores/raw-material";
import { useBranchRawMaterialsStore } from "src/stores/branch-rawMaterials";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const rawMaterialsStore = useRawMaterialsStore();
const rawMaterialsData = computed(() => rawMaterialsStore.rawMaterials);
const branchRawMaterialsStore = useBranchRawMaterialsStore();
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const fetchAllBranchRawMaterials = async () => {
  Loading.show();
  await rawMaterialsStore.fetchRawMaterials();
  const rawMaterialsList = rawMaterialsStore.rawMaterials;
  console.log("rawMaterials branch", rawMaterialsData.value);

  if (!rawMaterialsList.length) {
    Notify.create({
      type: "warning",
      message: "No raw materials found!",
    });
    return;
  }
  Loading.hide();
};

const dismiss = () => {
  rawMaterialsStore.rawMaterials = [];
  dialog.value = false;
};

const createAllBranchRawMaterials = async () => {
  console.log();
  try {
    const rawMaterialsToSave = rawMaterialsData.value.map((material) => ({
      ingredients_id: material.id,
      total_quantity: 0,
      branch_id: route.params.branch_id,
    }));
    console.log("rawMaterialsToSave", rawMaterialsToSave);
    await branchRawMaterialsStore.createMultipleBranchRawMaterials(
      rawMaterialsToSave
    );
    Notify.create({
      type: "positive",
      message: "All raw materials added to warehouse!",
    });

    dismiss();
  } catch (error) {
    console.error("Error adding all raw materials:", error);
    Notify.create({
      type: "negative",
      message: "Failed to add all raw materials!",
    });
  }
};
</script>
<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #1d2423, #00796b);
}
</style>
