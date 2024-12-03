<template>
  <q-btn
    class="q-pa-sm"
    color="red"
    dense
    elevated
    icon="add_circle"
    label="Add Supply"
    @click="open_add_ingredients_dialog"
  />
  <q-dialog v-model="addIngredientsDialog">
    <q-card class="my-card" style="width: 900px">
      <q-card-section class="row items-center">
        <div class="text-h6">Add Supply</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-my-md q-mx-sm q-gutter-y-sm">
        <div>
          <div class="q-my-sm">Supplier's Company Name</div>
          <q-input v-model="addSupplierForm.companyName" outlined dense />
        </div>
        <div>
          <div class="q-my-sm">Supplier's Name</div>
          <q-input v-model="addSupplierForm.supplierName" outlined dense />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-gutter-x-sm">
          <div>
            <div class="q-my-sm">Raw Materials Name</div>
            <q-select
              v-model="selectedRawMaterials.name"
              debounce="3000"
              outlined
              chips-color="primary"
              :options="filterRawMaterialsOptions"
              dense
              label="Raw Materials"
              behavior="menu"
              use-input
              hide-dropdown-icon
              @filter="filterRawMaterials"
              style="width: 320px; max-width: 350px; min-width: 20px"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div>
            <div class="q-my-sm">Amount</div>
            <q-input
              v-model="addSupplierForm.ingredientAmount"
              type="number"
              outlined
              dense
              style="width: 80px; max-width: 150px; min-width: none"
            />
          </div>
          <div>
            <div class="q-my-sm">Unit</div>
            <q-select
              v-model="addSupplierForm.unit"
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
import { useRoute } from "vue-router";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";

const route = useRoute();
const warehouseId = route.params.warehouse_id;
const addIngredientsDialog = ref(false);
const ingredientsUnitOptions = ["Grams", "Kgs", "Pcs"];
const warehouseRawMaterials = useWarehouseRawMaterialsStore();
const open_add_ingredients_dialog = () => {
  addIngredientsDialog.value = true;
};
const loading = ref(false);
const rawMaterialsGroup = ref([]);
const rawMaterialsOptions = ref([]);

const selectedRawMaterials = reactive({
  name: "",
  quantity: "",
});

const filterRawMaterialsOptions = ref(rawMaterialsOptions.value);

const fetchRawMaterialsData = async (warehouseId) => {
  const rawMaterials = await warehouseRawMaterials.fetchWarehouseRawMaterials(
    warehouseId
  );
  rawMaterialsOptions.value = warehouseRawMaterials.warehouseRawMaterials.map(
    (val) => {
      return {
        label: val.name,
        value: val.id,
        unit: val.unit,
      };
    }
  );
};
fetchRawMaterialsData();

const filterRawMaterials = (val, update) => {
  update(() => {
    if (val === "") {
      filterRawMaterialsOptions.value = rawMaterialsOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterRawMaterialsOptions.value = rawMaterialsOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const addSupplierForm = reactive({
  companyName: "",
  supplierName: "",
  ingredientName: "",
  ingredientAmount: "",
  unit: null,
});
</script>
