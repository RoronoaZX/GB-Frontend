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
                <!-- <q-item-section>
                  <q-item-label class="text-overline">Unit</q-item-label>
                </q-item-section> -->
                <q-item-section side>
                  <!-- for the remove button -->
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
                <q-item-section>
                  <q-item-label class="text-caption justify-between">
                    {{ rawMaterials.quantity }} {{ rawMaterials.unit.value }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    @click="removeIngredient(index)"
                    color="grey-10"
                    icon="backspace"
                    dense
                    flat
                    round
                  />
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
            debounce="100"
            outlined
            chips-color="primary"
            :options="filterRawMaterialsOptions"
            dense
            label="Raw Materials"
            behavior="menu"
            use-input
            hide-dropdown-icon
            @filter="filterRawMaterials"
          >
            <!-- :suffix="selectedRawMaterials.suffix" -->
            <!-- style="width: 320px; max-width: 350px; min-width: 20px" -->
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="row q-gutter-y-lg justify-between">
          <div>
            <div class="q-my-sm" align="center">Quantity</div>
            <q-input
              v-model="selectedRawMaterials.quantity"
              type="number"
              outlined
              dense
              style="width: 300px; max-width: 250px; min-width: none"
            />
          </div>
          <div>
            <div class="q-my-sm" align="center">Unit</div>
            <q-select
              v-model="selectedRawMaterials.unit"
              :options="unitOptions"
              outlined
              behavior="menu"
              dense
              style="width: 350px; max-width: 250px; min-width: none"
            />
          </div>
        </div>
        <form @keyup.enter.prevent="addRawMaterials">
          <div class="q-mt-sm" align="right">
            <q-btn
              padding="sm lg"
              outline
              dense
              icon="add"
              color="purple"
              @click="addRawMaterials"
            />
          </div>
        </form>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row q-ma-md q-mt-xl" align="left">
        <q-btn class="glossy" color="grey-9" label="Cancel" v-close-popup />
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
//i fetching certain warehouse raw materials data

import { ref, reactive, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import { Loading, Notify } from "quasar";

const route = useRoute();
const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();
const userData = computed(() => warehouseRawMaterialsStore.user);
// const warehouseId = route.params.warehouse_id;
console.log("userData", userData.value);
const warehouseId = userData.value?.device?.reference_id || "";
console.log("warehouseId", warehouseId);
const employeeId = userData.value?.data?.employee?.id || "";
console.log("employeeId", employeeId);
const addIngredientsDialog = ref(false);
const warehouseRawMaterialsRows = computed(
  () => warehouseRawMaterialsStore.warehouseRawMaterials
);

const open_add_ingredients_dialog = () => {
  addIngredientsDialog.value = true;
};
const loading = ref(false);
const rawMaterialsGroups = ref([]);
const rawMaterialsOptions = ref([]);

const selectedRawMaterials = reactive({
  name: "",
  quantity: "",
  unit: "",
});

const isFormValid = computed(() => {
  return rawMaterialsGroups.value.length > 0;
});

const unitOptions = [
  { label: "Sack (25 kg each)", value: "sack" },
  { label: "Kilo", value: "kilo" },
  { label: "Gram", value: "gram" },
  { label: "Pieces", value: "pcs" },
];

const filterRawMaterialsOptions = ref(rawMaterialsOptions.value);

const fetchWarehouseRawMaterials = async () => {
  try {
    loading.value = true; // Start loading
    const warehouse_id = warehouseId;
    const warehouseRawMaterials =
      await warehouseRawMaterialsStore.fetchWarehouseRawMaterials(warehouse_id);

    console.log("warehouseRawMaterials", warehouseRawMaterials);
    rawMaterialsOptions.value =
      warehouseRawMaterialsStore.warehouseRawMaterials.map((val) => ({
        label: val.raw_materials.name,
        value: val.raw_materials.id,
        suffix: val.raw_materials.unit,
      }));

    filterRawMaterialsOptions.value = rawMaterialsOptions.value;
  } catch (error) {
    console.error("Error fetching warehouse raw materials:", error);
  } finally {
    loading.value = false; // Stop loading
  }
};
fetchWarehouseRawMaterials(warehouseId);

const clearData = () => {
  (selectedRawMaterials.name = ""),
    (selectedRawMaterials.quantity = ""),
    (selectedRawMaterials.unit = "");
};

const filterRawMaterials = (val, update) => {
  update(() => {
    if (val === "") {
      // When the input is empty, show all options
      filterRawMaterialsOptions.value = rawMaterialsOptions.value;
    } else {
      const needle = val.toLowerCase();
      // Filter options based on the input value
      filterRawMaterialsOptions.value = rawMaterialsOptions.value.filter(
        (v) => v.label.toLowerCase().includes(needle) // Corrected condition
      );
    }
  });
};

const addRawMaterials = () => {
  console.log("clickckck");
  const data = rawMaterialsGroups.value;

  function findObjectById(arr, id) {
    return arr.find((obj) => obj.raw_material_id == id);
  }
  const idToSearch = selectedRawMaterials.name.value;

  const foundObject = findObjectById(data, idToSearch);

  if (!foundObject) {
    rawMaterialsGroups.value = [
      ...data,
      {
        raw_material_id: selectedRawMaterials.name.value,
        label: selectedRawMaterials.name.label,
        quantity: selectedRawMaterials.quantity,
        unit: selectedRawMaterials.unit,
      },
    ];
    clearData();
  }
};

const removeIngredient = (index) => {
  rawMaterialsGroups.value.splice(index, 1);
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
});

const clearAddSupplierForm = () => {
  addSupplierForm.companyName = "";
  addSupplierForm.supplierName = "";
  rawMaterialsGroups.value = [];
};

const convertToGrams = (rawMaterials) => {
  return rawMaterials.map((item) => {
    let convertedQuantity = item.quantity;

    if (item.unit.value === "sack") {
      // 1 sack = 25 kg = 25,000 grams
      convertedQuantity = item.quantity * 25000;
    } else if (item.unit.value === "kilo") {
      // 1 kg = 1,000 grams
      convertedQuantity = item.quantity * 1000;
    } else if (item.unit.value === "gram") {
      // Already in grams, no conversion needed
      convertedQuantity = item.quantity;
    }

    // Other units like pieces can remain unchanged
    return {
      ...item,
      convertedQuantity, // Add converted quantity for clarity
      unit: { ...item.unit, value: "gram" }, // Update unit to grams
    };
  });
};

const save = async () => {
  const rawMaterialsConverted = convertToGrams(rawMaterialsGroups.value);
  try {
    Loading.show();
    const newData = {
      employee_id: employeeId,
      warehouse_id: warehouseId,
      supplier_company_name: addSupplierForm.companyName,
      supplier_name: addSupplierForm.supplierName,
      raw_materials: rawMaterialsConverted.map((item) => ({
        raw_material_id: item.raw_material_id,
        quantity: item.convertedQuantity, // Use the converted quantity
        unit: item.unit.value, // Always save as grams
      })),
    };
    console.log("new data", newData);
    await warehouseRawMaterialsStore.warehouseAddSupply(newData);
    warehouseRawMaterialsRows.value =
      await warehouseRawMaterialsStore.fetchWarehouseRawMaterials(warehouseId);
    clearData();
    clearAddSupplierForm();
    addIngredientsDialog.value = false;
    Notify.create({
      message: "Supply added successfully",
      color: "positive",
    });
  } catch (error) {
    Notify.create({
      message: "Error adding supply",
      color: "negative",
    });
    console.error("Error adding supply:", error);
  } finally {
    Loading.hide();
  }
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
