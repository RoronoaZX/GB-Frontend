<template>
  <div>
    <q-scroll-area style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <q-card> </q-card>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { useSoftdrinksProductStore } from "src/stores/softdrinks-products";
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

<style lang="scss" scoped></style>
