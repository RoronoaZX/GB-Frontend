<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card style="width: 820px; max-width: 80vw">
      <!-- HEADER -->
      <q-card-section class="gradient-btn">
        <div class="row justify-between text-h6 text-white">
          <div>✏️ Edit Delivery</div>
          <div>
            <q-btn icon="close" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>

      <!-- FORM BODY -->
      <q-card-section>
        <div class="row justify-between q-col-gutter-md">
          <!-- From Section -->
          <div>
            <div>From:</div>
            <q-select
              v-model="form.from_designation"
              :options="fromOptions"
              label="Select Source"
              outlined
              dense
              style="width: 200px"
            />

            <div class="q-mt-md">
              <q-select
                v-if="form.from_designation === 'Warehouse'"
                v-model="form.from_id"
                :options="filterWarehouseOptions"
                outlined
                dense
                use-input
                clearable
                input-debounce="0"
                label="Search Warehouse"
                @filter="filterWarehouse"
                style="width: 350px"
              />
              <q-select
                v-if="form.from_designation === 'Branch'"
                v-model="form.from_id"
                :options="filterBranchOptions"
                outlined
                dense
                use-input
                clearable
                input-debounce="0"
                label="Search Branch"
                @filter="filterBranches"
                style="width: 350px"
              />
              <q-input
                v-if="form.from_designation === 'Supplier'"
                v-model="form.supplier_name"
                outlined
                dense
                label="Enter Supplier Company Name"
                style="width: 350px"
              />
            </div>
          </div>

          <!-- To Section -->
          <div>
            <div>To:</div>
            <q-select
              v-model="form.to_designation"
              :options="toOptions"
              label="Select Destination"
              outlined
              dense
              style="width: 200px"
            />

            <div class="q-mt-md">
              <q-select
                v-if="form.to_designation === 'Warehouse'"
                v-model="form.to_id"
                :options="filterWarehouseOptions"
                outlined
                dense
                use-input
                clearable
                input-debounce="0"
                label="Search Warehouse"
                @filter="filterWarehouse"
                style="width: 350px"
              />
              <q-select
                v-if="form.to_designation === 'Branch'"
                v-model="form.to_id"
                :options="filterBranchOptions"
                outlined
                dense
                use-input
                clearable
                input-debounce="0"
                label="Search Branch"
                @filter="filterBranches"
                style="width: 350px"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- STOCKS SECTION -->
      <q-card-section>
        <div>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">
            Raw Materials Included
          </div>
          <q-list dense separator>
            <q-item v-for="item in form.raw_materials_groups" :key="item.id">
              <q-item-section>
                <q-item-label>{{ item.raw_materials_name }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.category }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.quantity }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>₱{{ item.price_per_unit }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  dense
                  flat
                  round
                  icon="delete"
                  color="red"
                  @click="removeItem(item)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <!-- FOOTER -->
      <q-separator class="q-my-md" />
      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          color="primary"
          label="Save Changes"
          :disable="!isFormValid"
          @click="saveEdit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useWarehousesStore } from "src/stores/warehouse";
import { useBranchesStore } from "src/stores/branch";
import { useStockDelivery } from "src/stores/stock-delivery";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

// props from parent (passed delivery data)
const props = defineProps({
  delivery: {
    type: Object,
    required: true,
  },
});

// stores
const warehouseStore = useWarehousesStore();
const branchesStore = useBranchesStore();
const stocksDeliveryStore = useStockDelivery();

// dropdowns
const fromOptions = [
  { label: "Supplier", value: "Supplier" },
  { label: "Warehouse", value: "Warehouse" },
  { label: "Branch", value: "Branch" },
];

const toOptions = [
  { label: "Warehouse", value: "Warehouse" },
  { label: "Branch", value: "Branch" },
];

// form data
const form = reactive({
  id: props.delivery.id,
  from_designation: props.delivery.from_designation,
  from_id: props.delivery.from_id,
  to_designation: props.delivery.to_designation,
  to_id: props.delivery.to_id,
  supplier_name: props.delivery.supplier_name,
  remarks: props.delivery.remarks,
  raw_materials_groups: props.delivery.raw_materials_groups || [],
});

const warehouseOptions = ref([]);
const filterWarehouseOptions = ref([]);
const branchOptions = ref([]);
const filterBranchOptions = ref([]);

// fetch warehouses
const fetchWarehouses = async () => {
  await warehouseStore.fetchWarehouses();
  warehouseOptions.value = warehouseStore.warehouses.map((w) => ({
    label: w.name,
    value: w.id,
  }));
  filterWarehouseOptions.value = warehouseOptions.value;
};

// fetch branches
const fetchBranches = async () => {
  await branchesStore.fetchBranches();
  branchOptions.value = branchesStore.branches.map((b) => ({
    label: b.name,
    value: b.id,
  }));
  filterBranchOptions.value = branchOptions.value;
};

onMounted(() => {
  fetchWarehouses();
  fetchBranches();
});

const filterWarehouse = (val, update) => {
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

const filterBranches = (val, update) => {
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

// remove stock item
const removeItem = (item) => {
  const index = form.raw_materials_groups.indexOf(item);
  if (index > -1) form.raw_materials_groups.splice(index, 1);
};

// validation
const isFormValid = computed(() => {
  return (
    form.from_designation &&
    form.to_designation &&
    form.raw_materials_groups.length > 0
  );
});

// save edit
const saveEdit = async () => {
  try {
    const payload = { ...form };
    const response = await stocksDeliveryStore.updateDeliveryStock(payload);

    if (response?.message === "Raw materials delivery updated successfully") {
      onDialogOK(); // ✅ close dialog
    } else {
      console.error("❌ Failed to update delivery:", response);
    }
  } catch (error) {
    console.error("Error saving edit:", error);
  }
};
</script>
