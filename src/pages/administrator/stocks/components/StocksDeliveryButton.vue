<template>
  <q-card
    flat
    class="bg-amber-4 q-pa-md rounded-borders-lg row items-center justify-center cursor-pointer custom-shadow-light"
    @click="openDialog"
    style="width: 300px"
  >
    <q-icon name="add_circle" size="md" color="white" class="q-mr-sm" />
    <div class="text-h6 text-weight-bold text-white">
      Create Stocks Delivery
    </div>
  </q-card>
  <div>
    <q-dialog v-model="dialog">
      <q-card style="width: 820px; max-width: 80vw">
        <q-card-section class="gradient-btn">
          <div class="row justify-between text-h6 text-white">
            <div>🚚 Deliver Stocks</div>
            <div>
              <q-btn icon="close" flat dense round v-close-popup />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-between">
            <div>
              <div>
                From:
                <q-select
                  v-model="from"
                  :options="fromOptions"
                  emit-value
                  map-options
                  label="Select Source"
                  outlined
                  dense
                  style="width: 200px"
                />
              </div>
              <div class="q-mt-md">
                <q-input
                  v-if="from === 'Supplier'"
                  v-model="deliveryStocks.supplier_name"
                  outlined
                  dense
                  label="Enter Supplier Company Name"
                  style="width: 350px"
                />
                <q-select
                  v-if="from === 'Warehouse'"
                  v-model="deliveryStocks.from"
                  outlined
                  dense
                  flat
                  use-input
                  clearable
                  input-debounce="0"
                  :options="filterWarehouseOptions"
                  emit-value
                  map-options
                  label="Search Warehouse"
                  @filter="filteredWarehouse"
                  @update:model-value="
                    (val) => {
                      const opt = filterWarehouseOptions.find(
                        (o) => o.value === val
                      );
                      deliveryStocks.from_name = opt?.label || '';
                    }
                  "
                  behavior="menu"
                  hide-dropdown-icon
                  style="width: 350px"
                />
                <q-select
                  v-if="from === 'Branch'"
                  v-model="deliveryStocks.from"
                  outlined
                  dense
                  flat
                  use-input
                  clearable
                  input-debounce="0"
                  :options="filterBranchOptions"
                  emit-value
                  map-options
                  label="Search Branch"
                  @filter="filteredBranches"
                  @update:model-value="
                    (val) => {
                      const opt = filterBranchOptions.find(
                        (o) => o.value === val
                      );
                      deliveryStocks.from_name = opt?.label || '';
                    }
                  "
                  behavior="menu"
                  hide-dropdown-icon
                  style="width: 350px"
                />
              </div>
            </div>
            <div>
              <div>
                To:
                <q-select
                  v-model="to"
                  :options="toOptions"
                  emit-value
                  map-options
                  label="Select Destination"
                  outlined
                  dense
                  style="width: 200px"
                />
                <!-- <div>
                  <q-radio
                    keep-color
                    v-model="to"
                    val="Warehouse"
                    label="Warehouse"
                    color="orange"
                  />
                  <q-radio
                    keep-color
                    v-model="to"
                    val="Branch"
                    label="Branch"
                    color="red"
                  />
                </div> -->
                <div class="q-mt-md">
                  <q-select
                    v-if="to === 'Warehouse'"
                    v-model="deliveryStocks.to"
                    outlined
                    flat
                    dense
                    use-input
                    clearable
                    input-debounce="0"
                    :options="filterWarehouseOptions"
                    label="Search Warehouse"
                    @filter="filteredWarehouse"
                    hide-dropdown-icon
                    behavior="menu"
                    style="width: 350px"
                  />
                  <q-select
                    v-if="to === 'Branch'"
                    v-model="deliveryStocks.to"
                    outlined
                    dense
                    flat
                    use-input
                    clearable
                    input-debounce="0"
                    :options="filterBranchOptions"
                    label="Search Branch"
                    @filter="filteredBranches"
                    behavior="menu"
                    hide-dropdown-icon
                    style="width: 350px"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator class="q-my-md" />
        <q-card-section>
          <div class="q-px-sm">
            <q-table
              :rows="rawMaterialsGroups"
              :columns="stagingColumns"
              row-key="raw_materials_id"
              flat
              bordered
              dense
              hide-bottom
              :pagination="{ rowsPerPage: 0 }"
              class="staging-table bg-grey-1"
            >
              <template v-slot:header="props">
                <q-tr :props="props" class="bg-primary text-white">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>

              <template v-slot:body-cell-quantity="props">
                <q-td :props="props">
                  <q-badge color="purple" label-color="white">
                    {{ props.value }}
                  </q-badge>
                </q-td>
              </template>

              <template v-slot:body-cell-total_amount="props">
                <q-td :props="props">
                  <q-badge color="teal" label-color="white">
                    {{ props.value }}
                  </q-badge>
                </q-td>
              </template>

              <template v-slot:body-cell-price_per_unit="props">
                <q-td :props="props"> ₱{{ props.value }} </q-td>
              </template>

              <template v-slot:body-cell-price_per_gram="props">
                <q-td :props="props" class="text-caption text-grey-7">
                  ₱{{ props.value.toFixed(4) }}
                </q-td>
              </template>

              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn
                    dense
                    flat
                    round
                    icon="delete_sweep"
                    color="negative"
                    size="sm"
                    @click="rawMaterialsGroups.splice(rawMaterialsGroups.indexOf(props.row), 1)"
                  >
                    <q-tooltip>Remove from list</q-tooltip>
                  </q-btn>
                </q-td>
              </template>

              <template v-slot:no-data>
                <div class="full-width row flex-center q-pa-md text-grey-6 italic">
                  <q-icon name="shopping_cart" size="sm" class="q-mr-sm" />
                  No items added yet. Use the form below to add items.
                </div>
              </template>
            </q-table>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-my-md">
            <div class="q-ma-sm">Raw Materials Name</div>
            <q-select
              v-model="selectedRawMaterials.name"
              debounce="100"
              outlined
              clearable
              chips-color="primary"
              :options="filterRawMaterialsOptions"
              dense
              label="Raw Materials"
              behavior="menu"
              use-input
              hide-dropdown-icon
              @filter="filterRawMaterials"
              @update:model-value="onRawMaterialSelected"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <div v-if="from !== 'Supplier' && selectedRawMaterials.name && selectedRawMaterials.name.available_at_source !== undefined" class="q-mt-xs">
              <q-chip dense outline color="primary" icon="inventory_2" size="11px" class="q-px-sm">
                Available at Source: 
                <span class="text-weight-bold q-ml-xs">
                  {{ formatSourceAvailability(selectedRawMaterials.name) }}
                </span>
              </q-chip>
            </div>
          </div>
          <div>
            <div>
              <q-select
                v-model="stocksCategory"
                :options="stocksCategoryOptions"
                emit-value
                map-options
                outlined
                behavior="menu"
                dense
                label="Select Category"
              />
            </div>

            <div v-if="selectedCategoryConfig" class="row q-mt-md q-gutter-md">
              <div
                v-for="field in selectedCategoryConfig.fields"
                :key="field.model"
              >
                <q-input
                  v-model.number="stocks[field.model]"
                  :label="field.label"
                  :type="field.type || 'text'"
                  :readonly="field.readonly || false"
                  :prefix="field.prefix || ''"
                  outlined
                  flat
                  dense
                  :style="{ width: field.width || '150px' }"
                />
              </div>
            </div>
          </div>
          <div class="q-mt-sm" align="right">
            <q-btn
              padding="sm lg"
              outline
              dense
              icon="add"
              color="purple"
              @click="addToList"
            />
          </div>
        </q-card-section>
        <q-separator class="q-my-md" />
        <q-card-actions align="right">
          <q-btn outline v-close-popup>Cancel</q-btn>
          <q-btn @click="save">Proceed</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useWarehousesStore } from "src/stores/warehouse";
import { useBranchesStore } from "src/stores/branch";
import { useRawMaterialsStore } from "src/stores/raw-material";
import { useStockDelivery } from "src/stores/stock-delivery";
import { useQuasar } from "quasar";
import { useUsersStore } from "src/stores/user";

const userStore = useUsersStore();
const userData = computed(() => userStore.userData);

/* console.log("producttable user data", userData.value); */

const employeeId = userData.value?.data?.employee?.id || "0";

const stocksDeliveryStore = useStockDelivery();
const branchesStore = useBranchesStore();
const branchOptions = ref([]);
const filterBranchOptions = ref(branchOptions.value);
const warehouseStore = useWarehousesStore();
const warehouseOptions = ref([]);
const filterWarehouseOptions = ref(warehouseOptions.value);
const rawMaterialsStore = useRawMaterialsStore();
const rawMaterialsGroups = ref([]);
const rawMaterialsOptions = ref([]);
const emit = defineEmits(["reFetchDelivery"]);

const isInternalChange = ref(false); // Flag to prevent watcher reset during auto-fill

const $q = useQuasar();

const selectedRawMaterials = reactive({
  name: "",
  quantity: "",
  unit: "",
});

const fromOptions = [
  { label: "Supplier", value: "Supplier" },
  { label: "Warehouse", value: "Warehouse" },
  { label: "Branch", value: "Branch" },
];

const toOptions = [
  { label: "Warehouse", value: "Warehouse" },
  { label: "Branch", value: "Branch" },
];

const isFormValid = computed(() => {
  return rawMaterialsGroups.value.length > 0;
});

const stocksCategory = ref("");

const stocksCategoryOptions = [
  { label: "Sack", value: "sack" },
  { label: "Can", value: "can" },
  { label: "Bottle", value: "bottle" },
  { label: "Box", value: "box" },
  { label: "Margarine Tub", value: "tub" },
  { label: "Gallon", value: "gallon" },
  { label: "Kilo", value: "kilo" },
  { label: "Grams", value: "gram" },
  { label: "Pieces", value: "pcs" },
];

const stocks = ref({
  // shared fields
  quantity: 0,
  kilo: 0,
  gram: 0,
  price: 0,
  pricePerGram: 0,
  pcs: 0,
});

const categoryConfigs = {
  sack: {
    fields: [
      { model: "quantity", label: "Sack Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Sack", type: "number" },
      { model: "gram", label: "Grams", type: "number", readonly: true },
      { model: "price", label: "Price per Sack", type: "number", prefix: "₱" },
      { model: "pricePerGram", label: "Price per Grams", type: "number", readonly: true, prefix: "₱" },
    ],
  },
  can: {
    fields: [
      { model: "quantity", label: "Can Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Can", type: "number" },
      { model: "gram", label: "Grams per Can", type: "number" },
      { model: "price", label: "Price per Can", type: "number", prefix: "₱" },
      { model: "pricePerGram", label: "Price per Gram", type: "number", readonly: true, prefix: "₱" },
    ],
  },
  bottle: {
    fields: [
      { model: "quantity", label: "Bottle Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Bottle", type: "number" },
      { model: "gram", label: "Grams per Bottle", type: "number" },
      { model: "price", label: "Price per Bottle", type: "number", prefix: "₱" },
      { model: "pricePerGram", label: "Price per Gram", type: "number", readonly: true, prefix: "₱" },
    ],
  },
  box: {
    fields: [
      { model: "quantity", label: "Box Quantity", type: "number" },
      { model: "pcs", label: "Pieces per Box", type: "number" },
      { model: "kilo", label: "Kilo per Pieces", type: "number" },
      { model: "gram", label: "Grams Per Pieces", type: "number" },
      { model: "price", label: "Price per Pieces", type: "number", prefix: "₱" },
      { model: "pricePerGram", label: "Price per grams", type: "number", readonly: true, prefix: "₱" },
    ],
  },
  tub: {
    fields: [
      { model: "quantity", label: "Tub Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Tub", type: "number" },
      { model: "gram", label: "Grams per Tub", type: "number", readonly: true },
      { model: "price", label: "Price per Tub", type: "number", prefix: "₱" },
      { model: "pricePerGram", label: "Price Per Gram", type: "number", readonly: true, prefix: "₱" },
    ],
  },
  gallon: {
    fields: [
      { model: "quantity", label: "Gallon Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Gallon", type: "number" },
      { model: "gram", label: "Grams per Gallon", type: "number" },
      { model: "price", label: "Price per Gallon", type: "number", prefix: "₱" },
      { model: "pricePerGram", label: "Price per Grams", type: "number", readonly: true, prefix: "₱" },
    ],
  },
  kilo: {
    fields: [
      { model: "quantity", label: "Kilo Quantity", type: "number" },
      { model: "gram", label: "Grams per Kilo", type: "number" },
      { model: "price", label: "Price per Kilo", type: "number", prefix: "₱" },
      { model: "pricePerGram", label: "Price per Gram", type: "number", readonly: true, prefix: "₱" },
    ],
  },
  gram: {
    fields: [
      { model: "quantity", label: "Quantity Grams", type: "number" },
      { model: "price", label: "Price", type: "number", prefix: "₱" },
      { model: "pricePerGram", label: "Price per Gram", type: "number", readonly: true, prefix: "₱" },
    ],
  },
  pcs: {
    fields: [
      { model: "quantity", label: "Quantity Pcs", type: "number" },
      { model: "price", label: "Price per pcs", type: "number", prefix: "₱" },
    ],
  },
};

const selectedCategoryConfig = computed(() => {
  return categoryConfigs[stocksCategory.value] || null;
});

// 🧮 CALCULATIONS
watch(
  stocksCategory,
  (newCategory, oldCategory) => {
    // 🛑 If this change was triggered by onRawMaterialSelected (auto-fill), DO NOT RESET.
    if (isInternalChange.value) return;

    const material = selectedRawMaterials.name;
    if (!material) {
      // If no material, just reset
      stocks.value.kilo = 0;
      stocks.value.gram = 0;
      stocks.value.price = 0;
      stocks.value.pricePerGram = 0;
      stocks.value.pcs = 0;
      return;
    }

    const pricePerGram = stocks.value.pricePerGram;
    const weight = Number(material.unit_weight) || 0;
    const pcsPerUnit = Number(material.unit_pcs) || 0;

    if (["sack", "can", "bottle", "tub", "gallon"].includes(newCategory)) {
      if (weight > 0) {
        stocks.value.kilo = weight / 1000;
        stocks.value.gram = weight;
        stocks.value.price = pricePerGram * weight;
      } else {
        stocks.value.kilo = 0;
        stocks.value.gram = 0;
        stocks.value.price = 0;
      }
    } else if (newCategory === "box") {
      if (pcsPerUnit > 0) {
        stocks.value.pcs = pcsPerUnit;
        stocks.value.price = pricePerGram * pcsPerUnit;
      } else {
        stocks.value.pcs = 0;
        stocks.value.price = 0;
      }

      // Automatically map the unit weight to kilo and gram if available
      if (weight > 0) {
        stocks.value.kilo = weight / 1000;
        stocks.value.gram = weight;
      } else {
        stocks.value.kilo = 0;
        stocks.value.gram = 0;
      }
    } else if (newCategory === "pcs") {
      stocks.value.gram = 1; 
      stocks.value.price = pricePerGram;
    } else if (newCategory === "gram") {
      stocks.value.gram = 1; 
      stocks.value.price = pricePerGram;
    } else if (newCategory === "kilo") {
      stocks.value.gram = 1000;
      stocks.value.price = pricePerGram * 1000;
    }
  }
);

watch(
  () => stocks.value.kilo,
  (newKilo) => {
    // sync grams with kilo if kilo is provided
    if (newKilo && !isNaN(newKilo)) {
      stocks.value.gram = newKilo * 1000;
    }
  }
);

watch(
  () => [stocks.value.price, stocks.value.gram, stocks.value.quantity, stocksCategory.value],
  ([newPrice, newGram, newQuantity, category]) => {
    if (category === "gram") {
      if (newPrice > 0 && newQuantity > 0) {
        stocks.value.pricePerGram = newPrice / newQuantity;
      } else if (stocks.value.pricePerGram === 0) {
        stocks.value.pricePerGram = 0;
      }
    } else {
      // 🛡️ Safety: If grams is 0 but we have a price, don't wipe the pricePerGram
      // if it was already set by auto-fill.
      if (newPrice > 0 && newGram > 0) {
        stocks.value.pricePerGram = newPrice / newGram;
      } else if (newPrice > 0 && (newGram === 0 || !newGram)) {
        // Keep existing pricePerGram if math is impossible
      } else {
        // Only reset if both are zero
        if (newPrice === 0) stocks.value.pricePerGram = 0;
      }
    }
  }
);

const unitOptions = [
  { label: "Sack (25 kg each)", value: "sack" },
  { label: "Kilo", value: "kilo" },
  { label: "Gram", value: "gram" },
  { label: "Pieces", value: "pcs" },
];

const loading = ref(false);
const searchLoading = ref(false);

const addToList = () => {
  if (!selectedRawMaterials.name || !stocksCategory.value) {
    return; // don't add if incomplete
  }

  rawMaterialsGroups.value.push({
    raw_materials_id: selectedRawMaterials.name.value,
    raw_materials_name: selectedRawMaterials.name.label,
    unit_type: selectedRawMaterials.name.suffix,
    category: stocksCategory.value,
    quantity: Number(stocks.value.quantity) || 0,
    kilo: Number(stocks.value.kilo) || 0,
    gram: Number(stocks.value.gram) || 0,
    pcs: Number(stocks.value.pcs) || 0,
    price_per_unit: Number(stocks.value.price) || 0,
    price_per_gram: Number(stocks.value.pricePerGram) || 0,
  });

  // log the updated list
  /* console.log("📦 rawMaterialsGroups:", rawMaterialsGroups.value); */

  // clear after add
  selectedRawMaterials.name = "";
  stocksCategory.value = "";
  stocks.value = {
    quantity: 0,
    kilo: 0,
    gram: 0,
    price: 0,
    pricePerGram: 0,
    pcs: 0,
  };
};

const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  clearData();
};

const from = ref("");
const to = ref("");

const fetchBranch = async () => {
  const branch = await branchesStore.fetchBranches();
  branchOptions.value = branchesStore.branches.map((val) => ({
    label: val.name,
    value: val.id,
  }));
  filterBranchOptions.value = branchOptions.value;
};

onMounted(fetchBranch);

const filteredBranches = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    filterBranchOptions.value =
      val === ""
        ? branchOptions.value
        : branchOptions.value.filter((v) =>
            v.label.toLowerCase().includes(needle)
          );
  });
};
const fetchWarehouse = async () => {
  const warehouse = await warehouseStore.fetchWarehouses();
  warehouseOptions.value = warehouseStore.warehouses.map((val) => ({
    label: val.name,
    value: val.id,
  }));
  filterWarehouseOptions.value = warehouseOptions.value;
};

onMounted(fetchWarehouse);

const filteredWarehouse = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    filterWarehouseOptions.value =
      val === ""
        ? warehouseOptions.value
        : warehouseOptions.value.filter((v) =>
            v.label.toLowerCase().includes(needle)
          );
  });
};

const filterRawMaterialsOptions = ref(rawMaterialsOptions.value);

const fetchRawMaterials = async () => {
  const from_designation = from.value; // Supplier | Warehouse | Branch
  const from_id = deliveryStocks.from?.value || deliveryStocks.from || null;
  const to_designation = to.value;
  const to_id = deliveryStocks.to?.value || deliveryStocks.to || null;

  // 🛑 If Source is Supplier, we need to know the Destination to show relevant items
  const fetch_designation = from_designation === "Supplier" ? to_designation : from_designation;
  const fetch_id = from_designation === "Supplier" ? to_id : from_id;

  if (!fetch_designation || !fetch_id) return;

  try {
    loading.value = true;
    await rawMaterialsStore.fetchBranchWarehouseRawMaterials(
      fetch_designation,
      fetch_id
    );

    rawMaterialsOptions.value = rawMaterialsStore.rawMaterials.map((val) => ({
      label: val.name,
      value: val.id,
      suffix: val.unit,
      delivery_unit: val.delivery_unit,
      available_at_source: val.available_at_source || 0,
      fifo_price: val.fifo_price || 0,
      unit_weight: val.unit_weight || 0,
      unit_pcs: val.unit_pcs || 0,
      // FIFO Packaging Info
      fifo_category: val.fifo_category,
      fifo_kilo: val.fifo_kilo,
      fifo_pcs: val.fifo_pcs,
      fifo_price_per_unit: val.fifo_price_per_unit,
    }));

    filterRawMaterialsOptions.value = rawMaterialsOptions.value;
  } catch (error) {
    console.error("Error fetching raw materials: ", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  // Only fetch if we have initial values
  if (to.value && deliveryStocks.to) {
    fetchRawMaterials();
  }
});

const clearData = () => {
  // reset selected raw materials
  (selectedRawMaterials.name = ""),
    (selectedRawMaterials.quantity = ""),
    (selectedRawMaterials.unit = "");

  // reset stock category
  stocksCategory.value = "";

  // reset stocks values
  stocks.value = {
    quantity: 0,
    kilo: 0,
    gram: 0,
    price: 0,
    pricePerGram: 0,
    pcs: 0,
  };

  // reset raw materials list
  rawMaterialsGroups.value = [];

  // reset delivery stocks
  deliveryStocks.raw_material_id = 0;
  deliveryStocks.from = "";
  deliveryStocks.from_name = "";
  deliveryStocks.from_designation = "";
  deliveryStocks.to = "";
  deliveryStocks.to_name = "";
  deliveryStocks.to_designation = "";
  deliveryStocks.supplier_name = "";
  deliveryStocks.quantity = 0.0;
  deliveryStocks.price_per_unit = 0.0;
  deliveryStocks.remarks = "";
  deliveryStocks.status = "pending";

  // also reset dropdowns
  from.value = "";
  to.value = "";
};

const formatSourceAvailability = (opt) => {
  if (!opt || opt.available_at_source === undefined) return "";
  const qty = Number(opt.available_at_source);
  const deliveryUnit = opt.delivery_unit;
  const unitWeight = Number(opt.unit_weight) || 0;
  const unitPcs = Number(opt.unit_pcs) || 0;
  const unit = opt.suffix;

  const formatNum = (v) => Number.isInteger(v) ? v : v.toFixed(2);

  if (deliveryUnit) {
    if (unitWeight > 0) {
      const units = qty / unitWeight;
      return `${formatNum(units)} ${deliveryUnit}${units > 1 ? 's' : ''}`;
    } else if (unitPcs > 0) {
      const units = qty / unitPcs;
      return `${formatNum(units)} ${deliveryUnit}${units > 1 ? 's' : ''}`;
    }
  }

  if (qty >= 1000 && unit === "Grams") {
    return `${formatNum(qty / 1000)} kilos`;
  }

  return `${formatNum(qty)} ${unit}`;
};

const onRawMaterialSelected = (val) => {
  if (!val) {
    stocksCategory.value = "";
    return;
  }

  isInternalChange.value = true; // 🛡️ Start Protection

  // 1. Set the category based on the material's default delivery unit or FIFO data
  const preferredCategory = val.fifo_category || val.delivery_unit;
  if (preferredCategory) {
    stocksCategory.value = preferredCategory;
  }

  // 2. If it's an internal transfer (not Supplier), auto-fill the price and units
  if (from.value !== "Supplier") {
    const pricePerGram = Number(val.fifo_price) || 0;
    const category = preferredCategory || "gram";

    // Set shared fields
    stocks.value.pricePerGram = pricePerGram;

    // Use FIFO specific data if available, otherwise fallback to material master data
    const weight =
      val.fifo_kilo !== null && val.fifo_kilo !== undefined
        ? Number(val.fifo_kilo) * 1000
        : Number(val.unit_weight) || 0;
    const pcsPerUnit =
      val.fifo_pcs !== null && val.fifo_pcs !== undefined
        ? Number(val.fifo_pcs)
        : Number(val.unit_pcs) || 0;
    const pricePerUnit =
      val.fifo_price_per_unit !== null && val.fifo_price_per_unit !== undefined
        ? Number(val.fifo_price_per_unit)
        : 0;

    // Calculate price and conversion based on the category
    if (["sack", "can", "bottle", "tub", "gallon"].includes(category)) {
      if (weight > 0) {
        stocks.value.kilo = weight / 1000;
        stocks.value.gram = weight;
        stocks.value.price = pricePerUnit || pricePerGram * weight;
      } else {
        stocks.value.kilo = 0;
        stocks.value.gram = 0;
        stocks.value.price = 0;
      }
    } else if (category === "box") {
      if (pcsPerUnit > 0) {
        stocks.value.pcs = pcsPerUnit;
        stocks.value.price = pricePerUnit || pricePerGram * pcsPerUnit;
      } else {
        stocks.value.pcs = 0;
        stocks.value.price = 0;
      }

      if (weight > 0) {
        stocks.value.kilo = weight / 1000;
        stocks.value.gram = weight;
      } else {
        stocks.value.kilo = 0;
        stocks.value.gram = 0;
      }
    } else if (category === "kilo") {
      stocks.value.gram = 1000;
      stocks.value.price = pricePerUnit || pricePerGram * 1000;
    } else if (category === "pcs" || category === "gram") {
      stocks.value.gram = 1;
      stocks.value.price = pricePerUnit || pricePerGram;
    }

    // 🚀 CRITICAL: Force the pricePerGram to be exactly what came from the DB
    setTimeout(() => {
      stocks.value.pricePerGram = pricePerGram;
    }, 50);
  }

  // 🔓 Lift protection after values are set
  setTimeout(() => {
    isInternalChange.value = false;
  }, 100);
};

const filterRawMaterials = (val, update) => {
  update(() => {
    if (val === "") {
      filterRawMaterialsOptions.value = rawMaterialsOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterRawMaterialsOptions.value = rawMaterialsOptions.value.filter((v) =>
        v.label.toLowerCase().includes(needle)
      );
    }
  });
};

const deliveryStocks = reactive({
  raw_material_id: 0,
  from: "",
  from_name: "",
  from_designation: "",
  to: "",
  to_name: "",
  to_designation: "",
  supplier_name: "",
  quantity: 0.0,
  price_per_unit: 0.0,
  remarks: "",
  status: "Pending",
});

// ---- WATCHES ---- //
watch([from, () => deliveryStocks.from], async ([newFromDesignation, newFromValue]) => {
  deliveryStocks.from_designation = newFromDesignation;

  if (newFromDesignation === "Supplier") {
    // Only fetch if we have 'to' destination
    if (to.value && deliveryStocks.to) await fetchRawMaterials();
  } else if (newFromDesignation && newFromValue) {
    // Fetch stocks from the Source (Warehouse/Branch)
    await fetchRawMaterials();
  }
});

watch([to, () => deliveryStocks.to], async ([newToDesignation, newToValue]) => {
  deliveryStocks.to_designation = newToDesignation;

  if (from.value === "Supplier" && newToDesignation && newToValue) {
    await fetchRawMaterials();
  } else if (from.value && from.value !== "Supplier") {
    // Already fetched based on source, but we might want to refresh
    // await fetchRawMaterials();
  }
});

const save = async () => {
  const payload = {
    employee_id: employeeId,
    from_designation: from.value, // Supplier | Warehouse | Branch
    from_id: deliveryStocks.from || null, // warehouse_id or branch_id
    from_name:
      from.value === "Supplier"
        ? deliveryStocks.supplier_name
        : deliveryStocks.from_name,
    to_designation: to.value, // Warehouse | Branch
    to_id:
      typeof deliveryStocks.to === "object"
        ? deliveryStocks.to?.value
        : deliveryStocks.to || null,
    remarks: deliveryStocks.remarks,
    status: "pending",

    // stocks-specific fields
    raw_materials_groups: rawMaterialsGroups.value || [],
  };

  /* console.log("Payloadssss : ", payload); */

  $q.loading.show();
  try {
    /* console.log("Payload : ", payload); */

    const response = await stocksDeliveryStore.createDeliveryStock(payload);

    /* console.log("Response : ", response); */
    // if your backend sends a success flag/message, check it
    if (
      response &&
      response.message === "Raw materials delivery created successfully"
    ) {
      // ✅ close dialog only when backend confirms success
      emit("reFetchDelivery");
      closeDialog();
    } else {
      console.error("❌ Failed to save delivery: ", response.message);
      return; // exit if not successful
    }
  } catch (error) {
    console.error("❌ Failed to save delivery:", error);
  } finally {
    $q.loading.hide();
  }
};

const formatTotalAmount = (row) => {
  const qty = Number(row.quantity) || 0;
  const category = (row.category || "").toLowerCase();

  if (category === "pcs") {
    return `${qty} pcs`;
  }

  const gramsPerUnit = Number(row.gram) || 0;
  const pcsPerUnit = Number(row.pcs) || 0;
  
  if (gramsPerUnit > 0) {
    let totalGrams = qty * gramsPerUnit;
    if (category === "gram") {
      totalGrams = qty; 
    }
    
    if (totalGrams >= 1000) {
      const kgs = totalGrams / 1000;
      return `${Number.isInteger(kgs) ? kgs : kgs.toFixed(2)} kgs`;
    } else {
      return `${totalGrams} grams`;
    }
  } else {
    if (pcsPerUnit > 0) {
      const totalPcs = qty * pcsPerUnit;
      return `${totalPcs} pcs`;
    }
    return `0`;
  }
};

const stagingColumns = [
  {
    name: "name",
    label: "Raw Materials Name",
    align: "left",
    field: "raw_materials_name",
  },
  {
    name: "category",
    label: "Category",
    align: "left",
    field: "category",
  },
  {
    name: "quantity",
    label: "Qty",
    align: "center",
    field: "quantity",
  },
  {
    name: "total_amount",
    label: "Total Amount",
    align: "center",
    field: (row) => formatTotalAmount(row),
  },
  {
    name: "price_per_unit",
    label: "Price/Unit",
    align: "right",
    field: "price_per_unit",
  },
  {
    name: "price_per_gram",
    label: "Price/Gram",
    align: "right",
    field: "price_per_gram",
  },
  {
    name: "action",
    label: "Action",
    align: "center",
  },
];
</script>

<style scoped>
.gradient-btn {
  background: linear-gradient(45deg, #103432, #d2bd00);
  border: none;
}

.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-cancel {
  background: linear-gradient(45deg, #ef5350, #e53935);
  color: #fff;
  font-weight: bold;
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
.staging-table {
  max-height: 250px;
}

.staging-table thead tr th {
  position: sticky;
  top: 0;
  z-index: 1;
}

.gradient-btn {
  background: linear-gradient(135deg, #103432, #2d5a57);
  color: white;
}

.box {
  border: 1px dashed #ccc;
  border-radius: 8px;
}
</style>
