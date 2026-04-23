<template>
  <div class="raw-materials-table-container">
    <div class="row items-center justify-between q-mb-lg">
      <div class="search-wrapper">
        <q-input
          v-model="filter"
          outlined
          placeholder="Search materials by name or code..."
          dense
          bg-color="white"
          class="search-input"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="primary" />
          </template>
        </q-input>
      </div>
      <div class="q-gutter-sm">
         <q-btn flat round color="grey-7" icon="filter_list">
            <q-tooltip>Filter Options</q-tooltip>
         </q-btn>
         <q-btn flat round color="grey-7" icon="refresh" @click="reloadTableData">
            <q-tooltip>Refresh Data</q-tooltip>
         </q-btn>
      </div>
    </div>

    <div class="spinner-wrapper" v-if="loading">
      <q-spinner-tail size="50px" color="primary" />
    </div>
    
    <div v-else>
      <div v-if="filteredRows.length === 0" class="data-error flex flex-center column">
        <q-icon name="inventory_2" color="grey-4" size="80px" />
        <div class="text-h6 text-grey-5 q-mt-md">No materials found</div>
        <div class="text-caption text-grey-4">Try adjusting your search or filters</div>
      </div>

      <q-table
        v-else
        class="premium-table"
        :filter="filter"
        flat
        :columns="rawMaterialsColumns"
        :rows="filteredRows"
        row-key="id"
        :pagination="pagination"
        hide-bottom
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-avatar size="32px" color="teal-1" text-color="teal" class="q-mr-sm">
                {{ props.row.code.charAt(0) }}
              </q-avatar>
              <div class="column">
                <div class="text-weight-bold text-dark">{{ props.row.code }}</div>
                <div class="text-caption text-grey-6">{{ props.row.name || 'Master Ingredient' }}</div>
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-category="props">
          <q-td :props="props">
            <q-chip
              outline
              size="sm"
              :color="getRawMaterialBadgeCategoryColor(props.row.category)"
              class="text-weight-bold text-uppercase"
            >
              {{ props.row.category }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-unit="props">
          <q-td :props="props">
            <div class="unit-badge">
               {{ props.row.unit }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="row justify-center q-gutter-x-sm">
              <RawMaterialsTableEdit :edit="props" />
              <RawMaterialsTableDelete :delete="props" />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import RawMaterialsTableEdit from "./RawMaterialsTableEdit.vue";
import RawMaterialsTableDelete from "./RawMaterialsTableDelete.vue";
import { useRawMaterialsStore } from "src/stores/raw-material";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter } = typographyFormat();
const { getRawMaterialBadgeCategoryColor, getRawMaterialsBadgeUnitColor } =
  badgeColor();

const materialStore = useRawMaterialsStore();
const rawMaterialsRow = computed(() => materialStore.rawMaterials);
const loading = ref(true);
const filter = ref("");
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});

const filteredRows = computed(() => {
  if (!filter.value) {
    return rawMaterialsRow.value;
  }
  return rawMaterialsRow.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    loading.value = true;
    await materialStore.fetchRawMaterials();
    console.time("rawMaterialsRow", rawMaterialsRow.value);
    if (!rawMaterialsRow.value.length) {
      showNoDataMessage.value = true;
    }
  } catch (error) {
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

watch(filter, async (newFilter) => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
  showNoDataMessage.value = filteredRows.value.length === 0;
});

const rawMaterialsColumns = [
  {
    name: "name",
    label: "Raw Materials Name",
    align: "left",
    field: (row) => row.code,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "code",
    label: "Code",
    align: "left",
    field: "code",
    sortable: true,
  },
  {
    name: "category",
    label: "Category",
    align: "left",
    field: "category",
  },
  {
    name: "unit",
    label: "Unit",
    align: "left",
    field: "unit",
  },
  {
    name: "action",
    label: "Action",
    align: "center",
  },
];

const getRawMaterialBadgeColor = (availableStocks) => {
  const stockValue = parseInt(availableStocks);
  if (stockValue <= 20) {
    return "bg-red";
  } else if (stockValue <= 50) {
    return "bg-warning";
  } else {
    return "bg-primary";
  }
};
</script>
<style lang="scss" scoped>
.raw-materials-table-container {
  padding: 8px;
}

.search-input {
  min-width: 350px;
  :deep(.q-field__control) {
    border-radius: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    &:before {
      border: none;
    }
  }
}

.premium-table {
  background: white;
  border-radius: 16px;
  
  :deep(.q-table__card) {
    box-shadow: none;
  }
  
  :deep(.q-table th) {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.05em;
    color: #64748b;
    padding: 16px;
    background: #f8fafc;
  }
  
  :deep(.q-table tbody td) {
    padding: 16px;
    font-size: 14px;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
  }
  
  :deep(.q-table tbody tr) {
    transition: all 0.2s ease;
    &:hover {
      background-color: #f1f5f9;
      transform: scale(1.002);
    }
  }
}

.unit-badge {
  background: #f1f5f9;
  color: #475569;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 12px;
  display: inline-block;
}

.spinner-wrapper {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-error {
  min-height: 400px;
}
</style>
