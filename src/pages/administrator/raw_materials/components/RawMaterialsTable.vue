<template>
  <div align="left">
    <q-input
      v-model="filter"
      class="q-pb-lg q-pl-sm dynamic-width"
      outlined
      placeholder="Search"
      flat
      rounded
      dense
      debounce="100"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="filteredRows.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-table
      v-else
      class="table-container elegant-container sticky-header"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      style="height: 500px"
      :columns="rawMaterialsColumns"
      :rows="filteredRows"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
    >
      <!-- virtual-scroll -->
      <template v-slot:body-cell-name="props">
        <q-td key="name" :props="props">
          {{ capitalizeFirstLetter(props.row.name) }}
        </q-td>
      </template>
      <template v-slot:body-cell-category="props">
        <q-td key="name" :props="props">
          <q-badge
            :color="getRawMaterialBadgeCategoryColor(props.row.category)"
          >
            {{ props.row.category }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-unit="props">
        <q-td key="name" :props="props">
          <q-badge :color="getRawMaterialsBadgeUnitColor(props.row.unit)">
            {{ props.row.unit }}
          </q-badge>
        </q-td>
      </template>
      <!-- <template v-slot:body-cell-availableStocks="props">
        <q-td :props="props">
          <q-badge
            square
            class="text-white"
            :class="getRawMaterialBadgeColor(props.row.availableStocks)"
          >
            {{ props.row.availableStocks }}
          </q-badge>
        </q-td>
      </template> -->
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <RawMaterialsTableEdit :edit="props" />
            <RawMaterialsTableDelete :delete="props" />
          </div>
        </q-td>
      </template>
    </q-table>
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
    field: (row) => row.name,
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
<style scoped>
.elegant-container {
  background: #f7f8fc;
  /* padding: 1rem; */
  border-radius: 8px;
}
.absolute-full {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-container {
  max-height: 500px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}

.dynamic-width {
  width: 100%; /* default width */
  max-width: 500px;
  min-width: 300px; /* set a minimum width */
}

@media (max-width: 1500px) {
  .dynamic-width {
    max-width: 500px; /* smaller width for medium-sized screens */
  }
}

@media (max-width: 768px) {
  .dynamic-width {
    max-width: 500px; /* smaller width for tablets */
  }
}

@media (max-width: 480px) {
  .dynamic-width {
    max-width: 200px; /* smaller width for mobile screens */
  }
}
</style>
