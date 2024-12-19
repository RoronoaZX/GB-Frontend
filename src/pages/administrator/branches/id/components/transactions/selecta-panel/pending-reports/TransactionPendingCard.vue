<template>
  <div>
    <q-scroll-area style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <template v-if="selectaProductsPending.length">
          <q-card
            v-for="(pending, index) in selectaProductsPending"
            :key="index"
          >
            <q-card-section>
              <!-- Display the Selecta product status and creation time -->
              <div class="row justify-between">
                <div class="text-subtitle1">
                  {{ formatDate(pending.created_at) }}
                </div>
                <div class="text-subtitle1">
                  {{ formatTime(pending.created_at) }}
                </div>
                <div class="text-subtitle1">
                  {{ pending.branch.name }} -
                  {{ formatFullname(pending.employee) }}
                </div>
                <div>
                  <q-badge color="yellow" outlined> Pending </q-badge>
                </div>
                <div>
                  <TransactionView :report="pending" />
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
import { useSelectaProductsStore } from "src/stores/selecta-product";
import TransactionView from "./TransactionView.vue";
import { useRoute } from "vue-router";
import { date as quasarDate } from "quasar";
import { computed, onMounted, ref } from "vue";

const route = useRoute();
const selectaProductStore = useSelectaProductsStore();
const selectaProductsPending = computed(
  () => selectaProductStore.pendingSelectaReports
);

const branchId = route.params.branch_id;
const category = ref("pending");
const fetchPendingSelectaStocks = async () => {
  try {
    const stocks = await selectaProductStore.fetchPendingSelectaStocks(
      branchId,
      category.value
    );
    console.log(selectaProductsPending.value);
  } catch (error) {
    console.error("Error fetching pending stocks:", error);
  }
};

onMounted(async () => {
  if (branchId) {
    await fetchPendingSelectaStocks(branchId);
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
