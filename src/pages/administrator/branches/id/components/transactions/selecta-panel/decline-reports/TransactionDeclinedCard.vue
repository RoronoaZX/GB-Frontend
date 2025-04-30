<template>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="selectaData.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <template v-if="selectaData.length">
          <q-card v-for="(decline, index) in selectaData" :key="index">
            <q-card-section>
              <!-- Display the Selecta product status and creation time -->
              <div class="row justify-between">
                <div class="text-subtitle1">
                  {{ formatDate(decline.created_at) }}
                </div>
                <div class="text-subtitle1">
                  {{ formatTime(decline.created_at) }}
                </div>
                <div class="text-subtitle1">
                  {{ decline.branch.name }} -
                  {{ formatFullname(decline.employee) }}
                </div>
                <div>
                  <q-badge color="red" outlined> {{ decline.status }} </q-badge>
                </div>
                <div>
                  <TransactionView :report="decline" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </template>
        <template v-else>
          <!-- No data message -->
          <div class="data-error">
            <q-icon name="warning" color="warning" size="4em" />
            <div class="q-ml-sm text-h6">No data available</div>
          </div>
        </template>
      </div>
    </q-scroll-area>
  </div>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="pagination.page"
      color="purple"
      :max="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
      @update:model-value="onPageChange"
      boundary-numbers
    />
  </div>
</template>

<script setup>
import { useSelectaProductsStore } from "src/stores/selecta-product";
import TransactionView from "./TransactionView.vue";
import { useRoute } from "vue-router";
import { date as quasarDate } from "quasar";
import { computed, onMounted, ref } from "vue";

const route = useRoute();
const selectaProductStore = useSelectaProductsStore();
const selectedProductsDeclined = computed(
  () => selectaProductStore.declinedSelectaReports
);

const selectaData = ref([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const loading = ref(false);

const branchId = route.params.branch_id;
const category = ref("declined");
const fetchDeclinedSelectaStocks = async (
  branchId,
  page = 1,
  rowsPerPage = 5
) => {
  try {
    loading.value = true;
    const stocks = await selectaProductStore.fetchDeclinedSelectaStocks(
      branchId,
      category.value,
      page,
      rowsPerPage
    );
    console.log("selectedProductsDeclined", selectedProductsDeclined.value);

    const { data, current_page, per_page, total } =
      selectedProductsDeclined.value;

    selectaData.value = data;
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;
  } catch (error) {
    console.error("Error fetching decline stocks:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (branchId) {
    await fetchDeclinedSelectaStocks(branchId);
  }
});

const onPageChange = (page) => {
  pagination.value.page = page;

  fetchDeclinedSelectaStocks(branchId, page, pagination.value.rowsPerPage);
};

const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};

const formatTime = (timeString) => {
  return quasarDate.formatDate(timeString, "hh:mm A");
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};
</script>

<style lang="scss" scoped>
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
</style>
