<template>
  <q-dialog v-model="show" full-width>
    <q-card class="elegant-card q-pa-md" style="max-width: 1000px; width: 100%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-weight-bold text-primary">
          <q-icon name="history" size="md" class="q-mr-sm" />
          {{ recipeName }} - Production History
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :loading="loading"
          v-model:pagination="pagination"
          @request="onRequest"
          class="history-table"
        >
          <template v-slot:body-cell-recipe_total_cost="props">
            <q-td :props="props" class="text-weight-bold text-positive">
              {{ formatPrice(props.value) }}
            </q-td>
          </template>

          <template v-slot:body-cell-details="props">
            <q-td :props="props">
              <q-btn
                flat
                round
                color="primary"
                icon="visibility"
                size="sm"
                @click="viewIngredients(props.row)"
              >
                <q-tooltip>View Ingredients</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRecipeCostStore } from "src/stores/recipe-cost";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useQuasar } from "quasar";
import RecipeIngredientsView from "src/pages/administrator/branches/id/components/recipe_cost/components/RecipeIngredientsView.vue";

const props = defineProps({
  recipeId: {
    type: Number,
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
  },
});

const { formatTimestamp, formatPrice } = typographyFormat();
const recipeCostStore = useRecipeCostStore();
const $q = useQuasar();

const show = ref(true);
const loading = ref(false);
const rows = ref([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

const columns = [
  {
    name: "created_at",
    label: "Date Created",
    field: "created_at",
    format: (val) => formatTimestamp(val),
    align: "left",
    sortable: true,
  },
  {
    name: "branch_name",
    label: "Branch",
    field: "branch_name",
    align: "left",
    sortable: true,
  },
  {
    name: "baker_name",
    label: "Baker",
    field: "baker_name",
    align: "left",
    sortable: true,
  },
  {
    name: "kilo",
    label: "Kilo Used",
    field: "kilo",
    align: "center",
  },
  {
    name: "recipe_total_cost",
    label: "Total Cost",
    field: "recipe_total_cost",
    align: "right",
    sortable: true,
  },
  {
    name: "details",
    label: "Details",
    align: "center",
  },
];

const fetchHistory = async (page = 1, rowsPerPage = 10) => {
  loading.value = true;
  try {
    const response = await recipeCostStore.fetchGlobalRecipeCosts(
      props.recipeId,
      page,
      rowsPerPage
    );
    rows.value = response.data;
    pagination.value.page = response.current_page;
    pagination.value.rowsPerPage = response.per_page;
    pagination.value.rowsNumber = response.total;
  } catch (error) {
    console.error("Error fetching recipe history:", error);
  } finally {
    loading.value = false;
  }
};

const onRequest = (props) => {
  const { page, rowsPerPage } = props.pagination;
  fetchHistory(page, rowsPerPage);
};

const viewIngredients = (row) => {
  $q.dialog({
    component: RecipeIngredientsView,
    componentProps: {
      row: row,
    },
  });
};

onMounted(() => {
  fetchHistory();
});
</script>

<style scoped>
.elegant-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.history-table {
  background: white;
}
</style>
