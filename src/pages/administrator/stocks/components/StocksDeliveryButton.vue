<template>
  <q-card
    flat
    class="bg-amber-4 q-pa-md rounded-borders-lg row items-center justify-center cursor-pointer custom-shadow-light"
    @click="openDialog"
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
                <div class="q-gutter-sm">
                  <q-radio
                    keep-color
                    v-model="from"
                    val="Supplier"
                    label="Supplier"
                    color="teal"
                  />
                  <q-radio
                    keep-color
                    v-model="from"
                    val="Warehouse"
                    label="Warehouse"
                    color="orange"
                  />
                  <q-radio
                    keep-color
                    v-model="from"
                    val="Branch"
                    label="Branch"
                    color="red"
                  />
                </div>
              </div>
              <div>
                <q-input
                  v-if="from === 'Supplier'"
                  v-model="deliveryStocks.supplier_name"
                  outlined
                  dense
                  label="Enter Supplier Company Name"
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
                  label="Search Warehouse"
                  @filter="filteredWarehouse"
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
                  label="Search Branch"
                  @filter="filteredBranches"
                  behavior="menu"
                  hide-dropdown-icon
                />
              </div>
            </div>
            <div>
              <div>
                To:
                <div>
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
                </div>
                <div>
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
                      Quantity
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <!-- for the remove button -->
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
          <div class="row q-gutter-y-lg justify-between">
            <div>
              <div class="q-my-sm" align="center">Quantity</div>
              <q-input
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
          <div class="q-mt-sm" align="right">
            <q-btn padding="sm lg" outline dense icon="add" color="purple" />
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

const isFormValid = computed(() => {
  return rawMaterialsGroups.value.length > 0;
});

const unitOptions = [
  { label: "Sack (25 kg each)", value: "sack" },
  { label: "Kilo", value: "kilo" },
  { label: "Gram", value: "gram" },
  { label: "Pieces", value: "pcs" },
];

const loading = ref(false);
const searchLoading = ref(false);

const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
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
  (selectedRawMaterials.name = ""),
    (selectedRawMaterials.quantity = ""),
    (selectedRawMaterials.unit = "");
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
  from_designation: "",
  to: "",
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
    deliveryStocks.supplier_name = "";
  } else if (newVal === "Warehouse") {
    deliveryStocks.from = "";
  } else if (newVal === "Branch") {
    deliveryStocks.from = "";
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
    ...deliveryStocks,
    from: deliveryStocks.from.value,
    from_designation: from.value,
    supplier_name: deliveryStocks.from.label,
    to: deliveryStocks.from.value,
    to_designation: to.value,
  };

  console.log("save payload", payload);
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
