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
          <div>
            <div>
              <q-list dense separator class="box">
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-overline">
                      Raw Materials Name
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-overline">
                      Stocks Category
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-overline">
                      Quantity
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-overline">
                      Price per Unit
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-overline">
                      Price per Gram
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <!-- for the remove button -->
                    <q-item-label>Action</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-for="item in rawMaterialsGroups" :key="item.id">
                  <q-item-section>
                    <q-item-label>
                      {{ item.raw_materials_name }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      {{ item.category }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      {{ item.quantity }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label> ₱ {{ item.price_per_unit }} </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label> ₱ {{ item.price_per_gram }} </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      dense
                      flat
                      round
                      icon="delete"
                      color="red"
                      @click="
                        rawMaterialsGroups.splice(
                          rawMaterialsGroups.indexOf(item),
                          1
                        )
                      "
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
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
  { label: "Margarine Tub", value: "baro" },
  { label: "Gallon", value: "gallon" },
  { label: "Kilo", value: "kilo" },
  { label: "Gram", value: "gram" },
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
      {
        model: "pricePerGram",
        label: "Price per Gram",
        readonly: true,
        prefix: "₱",
      },
    ],
  },
  can: {
    fields: [
      { model: "quantity", label: "Can Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Can", type: "number" },
      { model: "gram", label: "Grams", type: "number" },
      {
        model: "price",
        label: "Price per Can",
        type: "number",
        prefix: "₱",
      },
      {
        model: "pricePerGram",
        label: "Price per Gram",
        readonly: true,
        prefix: "₱",
      },
    ],
  },
  bottle: {
    fields: [
      { model: "quantity", label: "Bottle Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Bottle", type: "number" },
      { model: "gram", label: "Grams" },
      // readonly: true
      {
        model: "price",
        label: "Price per Bottle",
        type: "number",
        prefix: "₱",
      },
      {
        model: "pricePerGram",
        label: "Price per Gram",
        readonly: true,
        prefix: "₱",
      },
    ],
  },
  box: {
    fields: [
      { model: "quantity", label: "Box Quantity", type: "number" },
      { model: "pcs", label: "Pieces per Box", type: "number" },
      { model: "kilo", label: "Kilo per Piece", type: "number" },
      { model: "gram", label: "Grams" },
      { model: "price", label: "Price per Box", type: "number", prefix: "₱" },
      {
        model: "pricePerGram",
        label: "Price per Gram",
        readonly: true,
        prefix: "₱",
      },
    ],
  },
  gallon: {
    fields: [
      { model: "quantity", label: "Gallon Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Gallon", type: "number" },
      { model: "gram", label: "Grams" },
      // readonly: true
      { model: "price", label: "Price per Gallon", type: "number" },
      { model: "pricePerGram", label: "Price per Gram", readonly: true },
    ],
  },
  baro: {
    fields: [
      { model: "quantity", label: "Tub Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Tub", type: "number" },
      { model: "gram", label: "Grams", readonly: true },
      { model: "price", label: "Price per Tub", type: "number" },
      { model: "pricePerGram", label: "Price per Gram", readonly: true },
    ],
  },
};

const selectedCategoryConfig = computed(() => {
  return categoryConfigs[stocksCategory.value] || null;
});

// 🧮 CALCULATIONS
watch(
  stocks,
  (val) => {
    // always sync grams with kilo
    if (val.kilo && !isNaN(val.kilo)) {
      val.gram = val.kilo * 1000;
    }

    // compute price per gram if we have price & gram
    if (val.price > 0 && val.gram > 0) {
      val.pricePerGram = (val.price / val.gram).toFixed(2);
    } else {
      val.pricePerGram = 0;
    }
  },
  { deep: true }
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
    quantity: stocks.value.quantity,
    kilo: stocks.value.kilo,
    gram: stocks.value.gram,
    pcs: stocks.value.pcs,
    price_per_unit: stocks.value.price,
    price_per_gram: stocks.value.pricePerGram,
  });

  // log the updated list
  console.log("📦 rawMaterialsGroups:", rawMaterialsGroups.value);

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
  try {
    loading.value = true;
    // fetchRawMaterials
    await rawMaterialsStore.fetchRawMaterials();

    rawMaterialsOptions.value = rawMaterialsStore.rawMaterials.map((val) => ({
      label: val.name,
      value: val.id,
      suffix: val.unit,
    }));

    filterRawMaterialsOptions.value = rawMaterialsOptions.value;
  } catch (error) {
    console.error("Error fetching raw materials: ", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRawMaterials);

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
watch(from, (newVal) => {
  deliveryStocks.from_designation = newVal;

  if (newVal === "Supplier") {
    deliveryStocks.from = "";
    deliveryStocks.from_name = "";
    deliveryStocks.supplier_name = "";
  } else if (newVal === "Warehouse") {
    deliveryStocks.from = "";
    deliveryStocks.from_name = "";
  } else if (newVal === "Branch") {
    deliveryStocks.from = "";
    deliveryStocks.from_name = "";
  }
});

watch(to, (newVal) => {
  deliveryStocks.to_designation = newVal;

  if (newVal === "Warehouse") {
    deliveryStocks.to = "";
  } else if (newVal === "Branch") {
    deliveryStocks.to = "";
  }
});

const save = async () => {
  const payload = {
    from_designation: from.value, // Supplier | Warehouse | Branch
    from_id: deliveryStocks.from?.value || null, // warehouse_id or branch_id
    from_name:
      from.value === "Supplier"
        ? deliveryStocks.supplier_name
        : deliveryStocks.from_name,
    to_designation: to.value, // Warehouse | Branch
    to_id: deliveryStocks.to?.value || null,
    remarks: deliveryStocks.remarks,
    status: "pending",

    // stocks-specific fields
    raw_materials_groups: rawMaterialsGroups.value || [],
  };

  try {
    console.log("Payload : ", payload);
    const response = await stocksDeliveryStore.createDeliveryStock(payload);

    // if your backend sends a success flag/message, check it
    if (response && response.success) {
      // ✅ close dialog only when backend confirms success
      closeDialog();
    } else {
      console.error("❌ Failed to save delivery: ", response.message);
      return; // exit if not successful
    }
  } catch (error) {
    console.error("❌ Failed to save delivery:", error);
  }
};
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
</style>
