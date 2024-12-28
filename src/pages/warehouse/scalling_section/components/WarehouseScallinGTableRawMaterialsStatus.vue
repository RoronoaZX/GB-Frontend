<template>
  <q-btn
    color="info"
    icon="visibility"
    size="md"
    flat
    round
    dense
    @click="open_branch_status_dialog"
  >
    <q-tooltip class="bg-info" :delay="200">View</q-tooltip>
  </q-btn>
  <q-dialog v-model="brancheStatusDialog" full-width>
    <q-card class="my-card">
      <q-card-section
        class="row justify-between"
        style="background-color: #ef4444"
      >
        <div class="text-h6 text-white">
          <q-icon name="fa-solid fa-store" />
          {{ props.branch.name }}
        </div>
        <div class="text-white">
          <q-btn flat round dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <WarehouseScallingSearchEngine @update-search="updateSearch" />
      </q-card-section>
      <q-card-section>
        <div
          v-if="filteredBranchRawMaterials.length === 0"
          class="q-gutter-x-md data-error"
        >
          <q-icon name="warning" color="warning" size="4em" />
          <div>No data</div>
        </div>
        <div v-else>
          <q-table
            :rows="filteredBranchRawMaterials"
            :columns="rawMaterialsColumns"
            class="table-container sticky-header"
            flat
            dense
            virtual-scroll
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
            hide-bottom
            style="height: 340px"
          >
            <template v-slot:body-cell-total_quantity="props">
              <q-td :props="props">
                <q-badge
                  square
                  class="text-white cursor-pointer"
                  :class="getRawMaterialBadgeColor(props.row)"
                >
                  {{ formatTotalQuantity(props.row) }}
                </q-badge>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import WarehouseScallingSearchEngine from "./WarehouseScallingSearchEngine.vue";

const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();
const branchRawMaterialsRows = computed(
  () => warehouseRawMaterialsStore.branchRawMaterials
);
const searchEngine = ref("");
const props = defineProps({
  branch: Object,
});
const pagination = ref({
  rowsPerPage: 0,
});
const brancheStatusDialog = ref();

const branchId = props.branch.id;

const reloadBranchRawMaterials = async (branchId) => {
  await warehouseRawMaterialsStore.fetchBranchRawMaterials(branchId);
};

const open_branch_status_dialog = () => {
  reloadBranchRawMaterials(branchId);
  brancheStatusDialog.value = true;
};

const updateSearch = (searchTerm) => {
  console.log("Received search term in parent:", searchTerm); // Log the received value
  searchEngine.value = searchTerm.toLowerCase();
};

const filteredBranchRawMaterials = computed(() => {
  return branchRawMaterialsRows.value.filter((row) => {
    const name = row.ingredients.name.toLowerCase();
    return name.includes(searchEngine.value);
  });
});

const getRawMaterialBadgeColor = (row) => {
  const totalQuantity = row.total_quantity;
  const unit = row.ingredients.unit;
  if (unit === "Grams" && totalQuantity < 1000) {
    return "bg-red";
  }

  let stockValue;
  if (totalQuantity >= 1000) {
    stockValue = totalQuantity / 1000;
  } else {
    stockValue = totalQuantity;
  }

  if (stockValue < 5) {
    if (stockValue <= 2) {
      return "bg-red";
    } else if (stockValue <= 3) {
      return "bg-warning";
    } else {
      return "bg-warning";
    }
  } else {
    return "bg-positive";
  }
};

const formatTotalQuantity = (row) => {
  const totalQuantity = row.total_quantity;
  const unit = row.ingredients.unit;

  if (totalQuantity > 1000) {
    const totalQuantityKilo = (totalQuantity / 1000).toFixed(2);
    if (totalQuantityKilo.endsWith(".00")) {
      return `${Math.round(totalQuantity / 1000)} kilos`;
    } else {
      return `${totalQuantityKilo} kilos`;
    }
  } else if (totalQuantity > 1) {
    return `${totalQuantity} ${unit}`;
  } else {
    return `${totalQuantity} ${unit}`;
  }
};

const rawMaterialsColumns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.ingredients.name,
    format: (val) => `${val}`,
  },
  {
    name: "total_quantity",
    required: true,
    label: "Available Stocks",
    align: "left",
    field: (row) => row.total_quantity,
    format: (val) => `${val}`,
  },
];
</script>
<style scoped lang="scss">
.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
