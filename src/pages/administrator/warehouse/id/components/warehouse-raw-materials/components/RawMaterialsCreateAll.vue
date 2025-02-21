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
          <div class="text-h6">Create Warehouse Raw Materials</div>
          <q-space />
          <q-btn icon="close" flat dense round v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-btn
            class="bg-gradient text-white q-pa-sm"
            icon="add_circle"
            label="Fetch All"
            @click="fetchAllWarehouseRawMaterials"
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
          <!-- {{ rawMaterialsData }} -->
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
            @click="createAllRawMaterials"
          />
          <!-- :disable="!isFormValid" -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import { useRawMaterialsStore } from "src/stores/raw-material";
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { Loading, Notify } from "quasar";

const dialog = ref(false);
const openDialog = async () => {
  dialog.value = true;
};

const route = useRoute();
const rawMaterialsStore = useRawMaterialsStore();
const rawMaterialsData = computed(() => rawMaterialsStore.rawMaterials);
console.log("rawMaterialsData", rawMaterialsData.value);
const warehouseRawMaterials = useWarehouseRawMaterialsStore();

// Fetch all raw materials from the store
const fetchAllWarehouseRawMaterials = async () => {
  Loading.show();
  await rawMaterialsStore.fetchRawMaterials();
  const rawMaterialsList = rawMaterialsStore.rawMaterials;

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

const createAllRawMaterials = async () => {
  try {
    // Map each raw material to the warehouse format
    const materialsToSave = rawMaterialsData.value.map((material) => ({
      raw_material_id: material.id,
      // raw_materials_name: material.name,
      // raw_materials_code: material.code,
      // category: material.category,
      // unit: material.unit,
      total_quantity: 0, // Default value, can be changed
      warehouse_id: route.params.warehouse_id,
    }));

    // Send bulk request to save all materials
    await warehouseRawMaterials.createMultipleWarehouseRawMaterials(
      materialsToSave
    );
    console.log("materialsToSave", materialsToSave);

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
