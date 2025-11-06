<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="scale" />
        Premix
      </div>
    </q-card-section>
    <q-card-section class="q-gutter-y-md">
      <div class="row justify-between">
        <div>
          <SearchPremix @search="onSearchPremix" />
        </div>
        <div>
          <RequestPremix />
        </div>
      </div>
      <div>
        <PremixTable :searchText="searchText" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import PremixTable from "./components/PremixTable.vue";
import SearchPremix from "./components/SearchPremix.vue";
import RequestPremix from "./components/RequestPremix.vue";
import { ref } from "vue";

const searchText = ref("");

const onSearchPremix = (value) => {
  searchText.value = value;
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #ff31c5, #471b3b);
}
</style>
