<template>
  <div>
    <!-- <div class="text-h6"></div> -->
    <q-scroll-area style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <q-card>
          <q-card-section>
            {{ selectaProductsPending }}
            <div class="row justify-between">
              <div class="text-subtitle1">Dec 02, 2024</div>
              <div class="text-subtitle1">03:00 PM</div>
              <div class="text-subtitle1">Branch Name - Cashier 1</div>
              <div>
                <q-badge outlined> Pending </q-badge>
              </div>
              <div>
                <TransactionView />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { useSelectaProductsStore } from "src/stores/selecta-product";
import TransactionView from "./TransactionView.vue";
import { useRoute } from "vue-router";
import { date as quasarDate } from "quasar";
import { computed, onMounted } from "vue";

const route = useRoute();
const selectaProductStore = useSelectaProductsStore();
const selectaProductsPending = computed(
  () => selectaProductStore.selectaProducts
);

const branchId = route.params.branch_id;
const fetchPendingSelectaStocks = async () => {
  try {
    const stocks = await selectaProductStore.fetchPendingSelectaStocks(
      branchId
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

<style lang="scss" scoped></style>
