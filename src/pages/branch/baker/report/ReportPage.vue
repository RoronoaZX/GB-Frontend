<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="fa-solid fa-layer-group" />
        Report
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-gutter-y-lg">
        <div class="row justify-between">
          <div>
            <ReportSearch @search="onSearchReport" />
          </div>
          <div>
            <ReportCreate />
          </div>
        </div>
        <div>
          <ReportTable :searchText="searchText" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import ReportSearch from "./components/ReportSearch.vue";
import ReportCreate from "./components/ReportCreate.vue";
import ReportTable from "./components/ReportTable.vue";
import { ref } from "vue";

const searchText = ref("");

const onSearchReport = (value) => {
  searchText.value = value;
};
</script>

<style lang="scss" scoped></style>
