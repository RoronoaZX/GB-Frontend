<template>
  <div>
    <q-input
      class="q-pb-lg q-pl-md"
      outlined
      v-model="filter"
      placeholder="Search"
      debounce="1000"
      style="width: 450px; max-width: 1500px; min-width: 100px"
      flat
      dense
      rounded
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
    <div v-if="recipeCostData.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <!-- class="table-container sticky-header" -->
    <q-table
      v-else
      flat
      row-key="id"
      :columns="recipeCostColumn"
      :rows="recipeCostData || []"
      v-model:pagination="pagination"
      :rows-per-page-options="[3, 5, 7, 10, 0]"
      :loading="tableLoading"
      :filter="filter"
      @request="onPageRequest"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <q-btn
              color="black"
              icon="visibility"
              size="sm"
              flat
              round
              dense
              @click="openRecipeIngredients(props.row)"
            />
          </div>
        </q-td>
      </template>
      <template #loading>
        <q-inner-loading showing>
          <q-spinner-ios size="50px" color="grey-10" />
        </q-inner-loading>
      </template>
    </q-table>
  </div>
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

const fetchRecipeCosts = async (page = 0, rowsPerPage = 1, search = "") => {
  try {
    // ✅ If it's the first load (page just opened), show full spinner
    if (recipeCostData.value.length === 0 && !search) {
      loading.value = true;
    } else {
      tableLoading.value = true;
    }

    recipeCost.value = await recipeCostStore.fetchRecipeCosts(
      branchId,
      page,
      rowsPerPage,
      search
    );

    console.log("recipeCosts", recipeCost.value);

    const { data, current_page, per_page, total } = recipeCost.value;
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
    label: "Date",
    align: "center",
    field: (row) => formatTimestamp(row.created_at || "N/A"),
  },
  {
    name: "baker_name",
    label: "Baker's name",
    align: "center",
    field: (row) => formatFullname(row.user.employee || "N/A"),
  },
  {
    name: "recipe_name",
    label: "Recipe name",
    align: "center",
    field: (row) => capitalizeFirstLetter(row.recipe_name) || "N/A",
  },
  {
    name: "total_cost",
    label: "Total Cost",
    align: "center",
    field: (row) =>
      formatPrice(trimTrailingZeros(row.recipe_total_cost || "N/A")),
  },
  {
    name: "kilo",
    label: "Kilo",
    align: "center",
    field: (row) => trimTrailingZeros(row.kilo || "N/A"),
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
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
