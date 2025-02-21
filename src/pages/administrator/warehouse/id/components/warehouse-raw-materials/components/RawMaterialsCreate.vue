<template>
  <q-btn
    class="bg-gradient text-white q-pa-sm"
    icon="add_circle"
    label="Create One"
    @click="open_create_bread_dialog"
  />
  <!-- style="background: #f43f5e" -->
  <q-dialog v-model="dialog" persistent>
    <q-card
      class="my-card"
      style="width: 400px; max-width: 500px; min-width: 100px"
    >
      <q-card-section class="row items-center text-white bg-gradient">
        <div class="text-h6">Create Warehouse Raw Materials</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-ma-md q-gutter-y-sm">
        <div class="q-mb-lg">
          <q-input
            v-model="searchQuery"
            @update:model-value="search"
            debounce="1000"
            outlined
            rounded
            placeholder="Search Raw Materials"
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
                  <q-item v-if="!rawMaterialsData?.length">
                    No record found.
                  </q-item>
                  <template v-else>
                    <q-item
                      @click="autoFillRawMaterials(rawMaterials)"
                      v-for="rawMaterials in rawMaterialsData"
                      :key="rawMaterials.id"
                      clickable
                    >
                      <q-item-section>
                        <q-item-label>{{ rawMaterials.name }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
        </div>
        <div>
          <div>Raw Materials Code</div>
          <q-input
            v-model="addWarehouseRawMaterials.raw_materials_code"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Raw Materials Name</div>
          <q-input
            v-model="addWarehouseRawMaterials.raw_materials_name"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Category</div>
          <q-input
            v-model="addWarehouseRawMaterials.category"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Quantity</div>
          <q-input
            v-model="addWarehouseRawMaterials.total_quantity"
            type="number"
            outlined
            :suffix="addWarehouseRawMaterials.unit || ''"
            dense
            :rules="[
              (val) => (val && val.length > 0) || 'Total quantity is required',
            ]"
          />
        </div>
      </q-card-section>
      <!-- <q-separator /> -->
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" @click="dismiss" />
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
</template>

<script setup>
import { Notify } from "quasar";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import { useRawMaterialsStore } from "src/stores/raw-material";
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const rawMaterialsStore = useRawMaterialsStore();
const rawMaterialsData = computed(() => rawMaterialsStore.rawMaterials);
const warehouseRawMaterials = useWarehouseRawMaterialsStore();

const searchQuery = ref("");
const search = async () => {
  rawMaterialsStore.searchRawMaterials(searchQuery.value);
};

const isFormValid = computed(() => {
  return addWarehouseRawMaterials.total_quantity !== "";
});

const dialog = ref(false);
const open_create_bread_dialog = () => {
  dialog.value = true;
};

const dismiss = () => {
  clearForm();
  dialog.value = false;
};

const autoFillRawMaterials = (data) => {
  addWarehouseRawMaterials.raw_material_id = data.id;
  addWarehouseRawMaterials.raw_materials_name = data.name;
  addWarehouseRawMaterials.raw_materials_code = data.code;
  addWarehouseRawMaterials.category = data.category;
  addWarehouseRawMaterials.unit = data.unit;
  searchQuery.value = "";
};
const addWarehouseRawMaterials = reactive({
  raw_material_id: "",
  raw_materials_name: "",
  raw_materials_code: "",
  total_quantity: "",
  category: "",
  unit: "",
  warehouse_id: route.params.warehouse_id,
});

const clearForm = () => {
  (addWarehouseRawMaterials.raw_material_id = ""),
    (addWarehouseRawMaterials.raw_materials_name = ""),
    (addWarehouseRawMaterials.raw_materials_code = ""),
    (addWarehouseRawMaterials.total_quantity = ""),
    (addWarehouseRawMaterials.raw_material_id = "");
  addWarehouseRawMaterials.category = "";
  addWarehouseRawMaterials.unit = "";
};

const save = async () => {
  try {
    const { product_name, ...data } = addWarehouseRawMaterials;
    await warehouseRawMaterials.createWarehouseRawMaterials(data);
    console.log("data to send", data);
    // clearForm();
    dialog.value = false;
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped>
.bg-gradient {
  // background: linear-gradient(45deg, #4caf50, #8bc34a);
  background: linear-gradient(45deg, #ff5722, #ff9800);
}
</style>
