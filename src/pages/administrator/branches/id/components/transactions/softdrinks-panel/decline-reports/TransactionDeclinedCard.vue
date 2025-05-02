<template>
  <div v-if="loading" class="spinner-wrapper">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="softdrinksData.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <template v-if="softdrinksData.length">
          <q-card v-for="(decline, index) in softdrinksData" :key="index">
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
import { useSoftdrinksProductStore } from "src/stores/softdrinks-products";
import { computed, onMounted, ref } from "vue";
import TransactionView from "./TransactionView.vue";
import { date as quasarDate } from "quasar";
import { useRoute } from "vue-router";

const route = useRoute();
const softdrinksProductStore = useSoftdrinksProductStore();
const softdrinksProductsDecline = computed(
  () => softdrinksProductStore.declinedSoftdrinksReports
);

const softdrinksData = ref([]);

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const loading = ref(false);

const branchId = route.params.branch_id;
const category = ref("declined");
const fetchDeclinedSoftdrinksStocks = async (
  branchId,
  page = 1,
  rowsPerPage = 5
) => {
  try {
    loading.value = true;
    const stocks = await softdrinksProductStore.fetchDeclinedSoftdrinksStocks(
      branchId,
      category.value,
      page,
      rowsPerPage
    );
    console.log(
      "softdrinksProductsDeclinedss",
      softdrinksProductsDecline.value
    );

    const { data, current_page, per_page, total } =
      softdrinksProductsDecline.value;
    softdrinksData.value = data;
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
    await fetchDeclinedSoftdrinksStocks(branchId);
  }
});

const onPageChange = (page) => {
  pagination.value.page = page;

  fetchDeclinedSoftdrinksStocks(branchId, page, pagination.value.rowsPerPage);
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
