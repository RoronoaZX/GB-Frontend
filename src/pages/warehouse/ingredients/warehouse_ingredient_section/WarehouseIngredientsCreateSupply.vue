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
        <div class="q-mt-md q-gutter-y-sm">
          <!-- <div class="text-weight-meduim">Raw Materials List</div> -->
          <div>
            <q-list dense separator class="box">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-overline"
                    >Raw Materials Name</q-item-label
                  >
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-overline">Quantity</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <!-- Empty space for alignment with the delete button -->
                </q-item-section>
              </q-item>
              <q-item
                v-for="(rawMaterials, index) in rawMaterialsGroups"
                :key="index"
              >
                <q-item-section>
                  <q-item-label class="text-caption">
                    {{ capitalizeFirstLetter(rawMaterials.label) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-my-md">
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
            :suffix="selectedRawMaterials.suffix"
            hide-dropdown-icon
            @filter="filterRawMaterials"
          >
            <!-- style="width: 320px; max-width: 350px; min-width: 20px" -->
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="row q-gutter-x-sm q-gutter-y-lg">
          <div>
            <div class="q-my-sm" align="center">Amount</div>
            <q-input
              v-model="addSupplierForm.ingredientAmount"
              type="number"
              outlined
              dense
              style="width: 300px; max-width: 250px; min-width: none"
            />
          </div>
          <div>
            <div class="q-my-sm" align="center">Unit</div>
            <q-select
              v-model="addSupplierForm.unit"
              :options="unitOptions"
              outlined
              behavior="menu"
              dense
              style="width: 300px; max-width: 250px; min-width: none"
            />
          </div>
        </div>
        <div class="q-mt-sm">
          <q-btn size="sm" outline dense icon="add" color="purple" />
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
//i want to fetch the certain warehouse raw materials data

import { ref, reactive, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";

const route = useRoute();
const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();
const userData = computed(() => warehouseRawMaterialsStore.user);
// const warehouseId = route.params.warehouse_id;
console.log("userData", userData.value);
const warehouseId = userData.value?.employee?.warehouse_id || "";
console.log("warehouseId", warehouseId);
const addIngredientsDialog = ref(false);
const ingredientsUnitOptions = ["Grams", "Kgs", "Pcs"];

const open_add_ingredients_dialog = () => {
  addIngredientsDialog.value = true;
};
const loading = ref(false);
const rawMaterialsGroups = ref([]);
const rawMaterialsOptions = ref([]);

const selectedRawMaterials = reactive({
  name: "",
  quantity: "",
  suffix: "",
});

const unitOptions = [
  { label: "Sack (25 kg each)", value: "sack" },
  { label: "Kilo", value: "kilo" },
  { label: "Gram", value: "gram" },
];

const filterRawMaterialsOptions = ref(rawMaterialsOptions.value);

const fetchWarehouseRawMaterials = async () => {
  try {
    const warehouse_id = warehouseId;
    console.log("warehouse_id", warehouse_id);

    const warehouseRawMaterials =
      await warehouseRawMaterialsStore.fetchWarehouseRawMaterials(warehouse_id);
    loading.value = false;
    rawMaterialsOptions.value =
      warehouseRawMaterialsStore.warehouseRawMaterials.map((val) => {
        return {
          label: val.name,
          value: val.id,
          suffix: val.unit,
        };
      });
  } catch (error) {
    console.error("Error fetching warehouse raw materials:", error);
  }
};
fetchWarehouseRawMaterials();

const filterRawMaterials = (val, update) => {
  update(() => {
    if (val === "") {
      // When the input is empty, show all options
      filterRawMaterialsOptions.value = rawMaterialsOptions.value;
    } else {
      const needle = val.toLowerCase();
      // Filter options based on the input value
      filterRawMaterialsOptions.value = rawMaterialsOptions.value.filter(
        (v) => v.label.toLowerCase().includes(needle) // Match label text
      );
    }
  });
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const addSupplierForm = reactive({
  companyName: "",
  supplierName: "",
  ingredientName: "",
  ingredientAmount: "",
  unit: null,
});
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
