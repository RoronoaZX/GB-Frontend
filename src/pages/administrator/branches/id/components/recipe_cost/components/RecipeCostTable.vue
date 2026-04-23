<template>
  <q-card flat bordered class="recipe-cost-card">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6 text-weight-bold color-primary">Recipe Cost Tracking</div>
      <q-space />
      <q-input
        outlined
        v-model="filter"
        placeholder="Search recipe or baker..."
        debounce="1000"
        style="width: 300px"
        dense
        rounded
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card-section>

    <q-card-section>
      <div class="spinner-wrapper" v-if="loading">
        <q-spinner-dots size="50px" color="primary" />
      </div>

      <div v-else>
        <div v-if="recipeCostData.length === 0" class="data-error">
          <q-icon name="inventory_2" color="grey-5" size="4em" />
          <div class="q-mt-sm text-grey-7 text-subtitle1">No recipe costs recorded yet</div>
        </div>
        
        <q-table
          v-else
          flat
          row-key="id"
          :columns="recipeCostColumn"
          :rows="recipeCostData || []"
          v-model:pagination="pagination"
          :rows-per-page-options="[5, 10, 20, 50]"
          :loading="tableLoading"
          binary-state-sort
          @request="onPageRequest"
          class="recipe-table"
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                color="primary"
                icon="visibility"
                size="sm"
                flat
                round
                dense
                @click="openRecipeIngredients(props.row)"
              >
                <q-tooltip>View Detailed Ingredients Cost</q-tooltip>
              </q-btn>
            </q-td>
          </template>
          
          <template #loading>
            <q-inner-loading showing>
              <q-spinner-ios size="50px" color="primary" />
            </q-inner-loading>
          </template>
        </q-table>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRecipeCostStore } from "src/stores/recipe-cost";
import { useRoute } from "vue-router";
import { useQuasar, Notify } from "quasar";
import RecipeIngredientsView from "./RecipeIngredientsView.vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const {
  formatFullname,
  formatTimestamp,
  capitalizeFirstLetter,
  formatPrice,
  trimTrailingZeros,
} = typographyFormat();

const route = useRoute();
const branchId = route.params.branch_id;

const recipeCostStore = useRecipeCostStore();
const recipeCost = computed(() => recipeCostStore.recipeCosts);
const recipeCostData = ref([]);
const tableLoading = ref(false);
const loading = ref(true);

const $q = useQuasar();

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const filter = ref("");

const fetchRecipeCosts = async (page = 1, rowsPerPage = 5, search = "") => {
  try {
    // ✅ If it's the first load (page just opened), show full spinner
    if (recipeCostData.value.length === 0 && !search) {
      loading.value = true;
    } else {
      tableLoading.value = true;
    }

    const response = await recipeCostStore.fetchRecipeCosts(
      branchId,
      page,
      rowsPerPage,
      search
    );

    console.log("recipeCosts response", response);

    const { data, current_page, per_page, total } = response;
    recipeCostData.value = data;
    console.log("recipeCostData.value", recipeCostData.value);
    pagination.value.page = current_page;
    console.log("pagination.value.page", pagination.value.page);
    pagination.value.rowsPerPage =
      per_page === 0 ? pagination.value.rowsNumber : per_page;
    console.log("pagination.value.rowsPerPage", pagination.value.rowsPerPage);
    pagination.value.rowsNumber = total;
    console.log("pagination.value.rowsNumber", pagination.value.rowsNumber);
  } catch (error) {
    console.log(error);

    Notify.create({
      message: "Error fetching recipe costs",
      color: "negative",
      setTimeout: 1000,
    });
  } finally {
    loading.value = false;
    tableLoading.value = false;
  }
};
onMounted(fetchRecipeCosts);

const openRecipeIngredients = (row) => {
  console.log("Editing row:", row);

  $q.dialog({
    component: RecipeIngredientsView,
    componentProps: {
      row,
    },
  });
};

const onPageRequest = (props) => {
  console.log("props", props);
  fetchRecipeCosts(
    props.pagination.page,
    props.pagination.rowsPerPage,
    props.filter
  );
};

// watch(filter, async (newVal) => {
//   await fetchRecipeCosts(
//     pagination.value.page,
//     pagination.value.rowsPerPage,
//     newVal
//   );
// });

const recipeCostColumn = [
  {
    name: "date",
    label: "Date Created",
    align: "left",
    field: "created_at",
    format: (val) => formatTimestamp(val || "N/A"),
    sortable: true,
  },
  {
    name: "baker_name",
    label: "Baker Name",
    align: "left",
    field: (row) => formatFullname(row.user.employee || "N/A"),
    sortable: true,
  },
  {
    name: "recipe_name",
    label: "Recipe Name",
    align: "left",
    field: (row) => capitalizeFirstLetter(row.recipe_name) || "N/A",
    sortable: true,
  },
  {
    name: "kilo",
    label: "Kilo",
    align: "center",
    field: "kilo",
    format: (val) => trimTrailingZeros(val || 0),
    sortable: true,
  },
  {
    name: "total_cost",
    label: "Total Cost",
    align: "right",
    field: "recipe_total_cost",
    format: (val) => formatPrice(val || 0),
    sortable: true,
  },
  {
    name: "action",
    label: "Details",
    align: "center",
  },
];
</script>

<style scoped>
.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-wrapper {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-container {
  max-height: 450px; /* Adjust as needed */
  overflow: hidden;
}
</style>
