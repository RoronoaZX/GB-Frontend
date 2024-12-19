<template>
  <div>
    <q-scroll-area style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <template v-if="softdrinksProductsConfirmed.length">
          <q-card
            v-for="(confirmed, index) in softdrinksProductsConfirmed"
            :key="index"
          >
            <q-card-section>
              <div class="row justify-between">
                <div class="text-subtitle1">
                  {{ formatDate(confirmed.created_at) }}
                </div>
                <div class="text-subtitle1">
                  {{ formatTime(confirmed.created_at) }}
                </div>
                <div class="text-subtitle1">
                  {{ confirmed.branch.name }} -
                  {{ formatFullname(confirmed.employee) }}
                </div>
                <div>
                  <q-badge color="green" outlined>
                    {{ confirmed.status }}
                  </q-badge>
                </div>
                <div>
                  <TransactionView :report="confirmed" />
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
</template>

<script setup>
import { useSoftdrinksProductStore } from "src/stores/softdrinks-products";
import TransactionView from "./TransactionView.vue";
import { useRoute } from "vue-router";
import { date as quasarDate } from "quasar";
import { computed, onMounted, ref } from "vue";
const route = useRoute();
const softdrinksProductStore = useSoftdrinksProductStore();
const softdrinksProductsConfirmed = computed(
  () => softdrinksProductStore.confirmedSoftdrinksReports
);

const branchId = route.params.branch_id;
const category = ref("confirmed");
const fetchConfirmedSoftdrinksStocks = async () => {
  try {
    const stocks = await softdrinksProductStore.fetchConfirmedSoftdrinksStocks(
      branchId,
      category.value
    );
    console.log(softdrinksProductsConfirmed.value);
  } catch (error) {
    console.error("Error fetching confirmed stocks", error);
  }
};

onMounted(async () => {
  if (branchId) {
    await fetchConfirmedSoftdrinksStocks(branchId);
  }
});

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
.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
